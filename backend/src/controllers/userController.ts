import { Request, Response } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { userService, PaginationOptions, UserFilters } from '@/services/userService';
import { UserRole } from '@/types/enums';

export const getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    page = '1',
    limit = '10',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    role,
    isActive,
    search,
  } = req.query;

  const paginationOptions: PaginationOptions = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  };

  const filters: UserFilters = {};

  if (role && Object.values(UserRole).includes(role as UserRole)) {
    filters.role = role as UserRole;
  }

  if (isActive !== undefined) {
    filters.isActive = isActive === 'true';
  }

  if (search) {
    filters.search = search as string;
  }

  const result = await userService.getUsersPaginated(filters, paginationOptions);
  res.json(result);
});

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    res.status(404).json({
      success: false,
      error: { message: 'User not found' },
    });
    return;
  }

  res.json({
    success: true,
    data: user,
  });
});

export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, role } = req.body;

  const user = await userService.createUser({
    email,
    password,
    firstName,
    lastName,
    role: role || UserRole.OPERATOR,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData = req.body;

  // Remove password from update data for security
  delete updateData.password;

  const user = await userService.updateUser(id, updateData);

  res.json({
    success: true,
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await userService.deleteUser(id);

  res.json({
    success: true,
    data: { message: 'User deactivated successfully' },
  });
});

export const getUserStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const stats = await userService.getUserStats();

  res.json({
    success: true,
    data: stats,
  });
});