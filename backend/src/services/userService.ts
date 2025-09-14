import { User, IUser } from '@/models/User';
import { UserRole } from '@/types/enums';
import { PaginatedResponse } from '@/types/common';
import { AppError } from '@/middleware/errorHandler';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
  search?: string; // Search in firstName, lastName, or email
}

class UserService {
  async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }): Promise<IUser> {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new AppError('User with this email already exists', 409);
      }

      const user = new User(userData);
      await user.save();
      return user;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to create user', 500);
    }
  }

  async getUsersPaginated(
    filters: UserFilters = {},
    options: PaginationOptions = {}
  ): Promise<PaginatedResponse<IUser[]>> {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = options;

      const { role, isActive, search } = filters;

      // Build query
      const query: any = {};

      if (role) {
        query.role = role;
      }

      if (typeof isActive === 'boolean') {
        query.isActive = isActive;
      }

      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      // Calculate pagination
      const skip = (page - 1) * limit;
      const sortOptions: any = {};
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

      // Execute query
      const [users, total] = await Promise.all([
        User.find(query)
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .select('-password'), // Exclude password
        User.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data: users,
        pagination: {
          page,
          limit,
          total,
          pages: totalPages,
        },
      };
    } catch (error: any) {
      throw new AppError('Failed to fetch users', 500);
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id).select('-password');
      return user;
    } catch (error: any) {
      throw new AppError('Failed to fetch user', 500);
    }
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user', 500);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      return !!user;
    } catch (error: any) {
      throw new AppError('Failed to delete user', 500);
    }
  }

  async getUserStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    byRole: Record<UserRole, number>;
  }> {
    try {
      const [totalUsers, activeUsers, usersByRole] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isActive: true }),
        User.aggregate([
          {
            $group: {
              _id: '$role',
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

      const byRole = {} as Record<UserRole, number>;
      Object.values(UserRole).forEach((role) => {
        byRole[role] = 0;
      });

      usersByRole.forEach((item) => {
        byRole[item._id as UserRole] = item.count;
      });

      return {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        byRole,
      };
    } catch (error: any) {
      throw new AppError('Failed to fetch user statistics', 500);
    }
  }
}

export const userService = new UserService();