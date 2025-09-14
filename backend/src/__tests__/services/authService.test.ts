import jwt from 'jsonwebtoken';
import { authService } from '@/services/authService';
import { User } from '@/models/User';
import { UserRole } from '@/types/enums';
import { AppError } from '@/middleware/errorHandler';

// Mock the User model
jest.mock('@/models/User');
const MockedUser = User as jest.Mocked<typeof User>;

// Mock jwt
jest.mock('jsonwebtoken');
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
      password: 'hashedPassword',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.OPERATOR,
      isActive: true,
      comparePassword: jest.fn(),
    };

    it('should successfully login with valid credentials', async () => {
      // Setup mocks
      MockedUser.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      } as any);
      mockUser.comparePassword.mockResolvedValue(true);
      (mockedJwt.sign as any).mockReturnValue('mock-token');

      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(credentials);

      expect(MockedUser.findOne).toHaveBeenCalledWith({
        email: credentials.email,
        isActive: true,
      });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(credentials.password);
      expect(mockedJwt.sign).toHaveBeenCalled();
      expect(result).toEqual({
        user: expect.objectContaining({
          _id: 'user123',
          email: 'test@example.com',
        }),
        token: 'mock-token',
      });
    });

    it('should throw error for non-existent user', async () => {
      MockedUser.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      } as any);

      const credentials = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      await expect(authService.login(credentials)).rejects.toThrow(AppError);
      await expect(authService.login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw error for invalid password', async () => {
      MockedUser.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      } as any);
      mockUser.comparePassword.mockResolvedValue(false);

      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await expect(authService.login(credentials)).rejects.toThrow(AppError);
      await expect(authService.login(credentials)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('register', () => {
    const mockUser = {
      _id: 'user123',
      email: 'newuser@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: UserRole.OPERATOR,
      save: jest.fn().mockResolvedValue(true),
    };

    it('should successfully register new user', async () => {
      MockedUser.findOne.mockResolvedValue(null);
      MockedUser.prototype.save = jest.fn().mockResolvedValue(mockUser);
      (MockedUser as any).mockImplementation(() => mockUser as any);
      (mockedJwt.sign as any).mockReturnValue('mock-token');

      const userData = {
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: UserRole.OPERATOR,
      };

      const result = await authService.register(userData);

      expect(MockedUser.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockedJwt.sign).toHaveBeenCalled();
      expect(result).toEqual({
        user: expect.objectContaining({
          email: 'newuser@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
        }),
        token: 'mock-token',
      });
    });

    it('should throw error if user already exists', async () => {
      MockedUser.findOne.mockResolvedValue(mockUser as any);

      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      await expect(authService.register(userData)).rejects.toThrow(AppError);
      await expect(authService.register(userData)).rejects.toThrow('User with this email already exists');
    });
  });

  describe('verifyToken', () => {
    it('should successfully verify valid token', async () => {
      const mockDecoded = {
        userId: 'user123',
        email: 'test@example.com',
        role: UserRole.OPERATOR,
      };

      mockedJwt.verify.mockReturnValue(mockDecoded as any);

      const result = await authService.verifyToken('valid-token');

      expect(mockedJwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret-key');
      expect(result).toEqual(mockDecoded);
    });

    it('should throw error for invalid token', async () => {
      mockedJwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.verifyToken('invalid-token')).rejects.toThrow(AppError);
      await expect(authService.verifyToken('invalid-token')).rejects.toThrow('Invalid or expired token');
    });
  });

  describe('changePassword', () => {
    const mockUser = {
      _id: 'user123',
      password: 'oldHashedPassword',
      comparePassword: jest.fn(),
      save: jest.fn(),
    };

    it('should successfully change password', async () => {
      MockedUser.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      } as any);
      mockUser.comparePassword.mockResolvedValue(true);
      mockUser.save.mockResolvedValue(true);

      await authService.changePassword('user123', 'oldPassword', 'newPassword');

      expect(MockedUser.findById).toHaveBeenCalledWith('user123');
      expect(mockUser.comparePassword).toHaveBeenCalledWith('oldPassword');
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should throw error if user not found', async () => {
      MockedUser.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(
        authService.changePassword('nonexistent', 'oldPassword', 'newPassword')
      ).rejects.toThrow(AppError);
      await expect(
        authService.changePassword('nonexistent', 'oldPassword', 'newPassword')
      ).rejects.toThrow('User not found');
    });

    it('should throw error if old password is incorrect', async () => {
      MockedUser.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      } as any);
      mockUser.comparePassword.mockResolvedValue(false);

      await expect(
        authService.changePassword('user123', 'wrongPassword', 'newPassword')
      ).rejects.toThrow(AppError);
      await expect(
        authService.changePassword('user123', 'wrongPassword', 'newPassword')
      ).rejects.toThrow('Current password is incorrect');
    });
  });
});