import jwt from 'jsonwebtoken';
import { User, IUser } from '@/models/User';
import { AppError } from '@/middleware/errorHandler';
import { UserRole } from '@/types/enums';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, password } = credentials;

    // Find user and include password field
    const user = await User.findOne({ email, isActive: true }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = this.generateToken(user._id, user.email, user.role);

    // Remove password from response
    user.password = undefined as any;

    return {
      user,
      token,
    };
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { email, password, firstName, lastName, role = UserRole.OPERATOR } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    await user.save();

    // Generate token
    const token = this.generateToken(user._id, user.email, user.role);

    return {
      user,
      token,
    };
  }

  async verifyToken(token: string): Promise<{
    userId: string;
    email: string;
    role: UserRole;
  }> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      return {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    const decoded = await this.verifyToken(token);

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new AppError('User not found or inactive', 401);
    }

    // Generate new token
    const newToken = this.generateToken(user._id, user.email, user.role);

    return {
      user,
      token: newToken,
    };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify old password
    const isOldPasswordValid = await user.comparePassword(oldPassword);
    if (!isOldPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    // Update password
    user.password = newPassword;
    await user.save();
  }

  private generateToken(userId: string, email: string, role: UserRole): string {
    return jwt.sign(
      {
        userId,
        email,
        role,
      },
      this.jwtSecret,
      {
        expiresIn: this.jwtExpiresIn,
      } as jwt.SignOptions
    );
  }

  async getCurrentUser(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }
}

export const authService = new AuthService();