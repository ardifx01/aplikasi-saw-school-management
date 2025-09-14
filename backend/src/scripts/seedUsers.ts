import { database } from '@/config/database';
import { User } from '@/models/User';
import { UserRole } from '@/types/enums';
import { logger } from '@/utils/logger';

interface SeedUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const seedUsers: SeedUser[] = [
  // Admin users (3)
  {
    email: 'admin@school.edu',
    password: 'admin123',
    firstName: 'System',
    lastName: 'Administrator',
    role: UserRole.ADMIN,
  },
  {
    email: 'alice.admin@school.edu',
    password: 'password123',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: UserRole.ADMIN,
  },
  {
    email: 'bob.admin@school.edu',
    password: 'password123',
    firstName: 'Bob',
    lastName: 'Davis',
    role: UserRole.ADMIN,
  },

  // Principal users (4)
  {
    email: 'principal@school.edu',
    password: 'principal123',
    firstName: 'Dr. Sarah',
    lastName: 'Williams',
    role: UserRole.PRINCIPAL,
  },
  {
    email: 'principal.high@school.edu',
    password: 'password123',
    firstName: 'Michael',
    lastName: 'Thompson',
    role: UserRole.PRINCIPAL,
  },
  {
    email: 'principal.middle@school.edu',
    password: 'password123',
    firstName: 'Jennifer',
    lastName: 'Brown',
    role: UserRole.PRINCIPAL,
  },
  {
    email: 'principal.elementary@school.edu',
    password: 'password123',
    firstName: 'David',
    lastName: 'Wilson',
    role: UserRole.PRINCIPAL,
  },

  // Operator users (18)
  {
    email: 'operator1@school.edu',
    password: 'password123',
    firstName: 'Emily',
    lastName: 'Garcia',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator2@school.edu',
    password: 'password123',
    firstName: 'James',
    lastName: 'Martinez',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator3@school.edu',
    password: 'password123',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator4@school.edu',
    password: 'password123',
    firstName: 'Robert',
    lastName: 'Lee',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator5@school.edu',
    password: 'password123',
    firstName: 'Lisa',
    lastName: 'Taylor',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator6@school.edu',
    password: 'password123',
    firstName: 'Christopher',
    lastName: 'Anderson',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator7@school.edu',
    password: 'password123',
    firstName: 'Amanda',
    lastName: 'Thomas',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator8@school.edu',
    password: 'password123',
    firstName: 'Matthew',
    lastName: 'Jackson',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator9@school.edu',
    password: 'password123',
    firstName: 'Jessica',
    lastName: 'White',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator10@school.edu',
    password: 'password123',
    firstName: 'Daniel',
    lastName: 'Harris',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator11@school.edu',
    password: 'password123',
    firstName: 'Ashley',
    lastName: 'Clark',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator12@school.edu',
    password: 'password123',
    firstName: 'Joshua',
    lastName: 'Lewis',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator13@school.edu',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Walker',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator14@school.edu',
    password: 'password123',
    firstName: 'Andrew',
    lastName: 'Hall',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator15@school.edu',
    password: 'password123',
    firstName: 'Nicole',
    lastName: 'Allen',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator16@school.edu',
    password: 'password123',
    firstName: 'Ryan',
    lastName: 'Young',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator17@school.edu',
    password: 'password123',
    firstName: 'Michelle',
    lastName: 'King',
    role: UserRole.OPERATOR,
  },
  {
    email: 'operator18@school.edu',
    password: 'password123',
    firstName: 'Kevin',
    lastName: 'Wright',
    role: UserRole.OPERATOR,
  },
];

export const seedDatabase = async (): Promise<void> => {
  try {
    logger.info('Starting database seeding...');

    // Connect to database
    await database.connect();

    // Clear existing users
    logger.info('Clearing existing users...');
    await User.deleteMany({});

    // Create users
    logger.info(`Creating ${seedUsers.length} users...`);
    const createdUsers = await User.insertMany(seedUsers);

    logger.info(`Successfully created ${createdUsers.length} users`);

    // Log statistics
    const stats = {
      total: createdUsers.length,
      admin: createdUsers.filter(u => u.role === UserRole.ADMIN).length,
      principal: createdUsers.filter(u => u.role === UserRole.PRINCIPAL).length,
      operator: createdUsers.filter(u => u.role === UserRole.OPERATOR).length,
    };

    logger.info('Seeding completed successfully!');
    logger.info('User statistics:', stats);

    // Disconnect from database
    await database.disconnect();
    process.exit(0);

  } catch (error: any) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}