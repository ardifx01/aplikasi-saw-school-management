# Role Enum

This document explains the role enum used in the application for user permissions and access control.

## Definition

```typescript
export enum Role {
  ADMIN = 'ADMIN',
  PRINCIPAL = 'PRINCIPAL',
  OPERATOR = 'OPERATOR'
}
```

## Role Descriptions

### ADMIN
- **Description**: Full system administrator with unrestricted access
- **Permissions**: 
  - Full access to all system features
  - User management (create, read, update, delete)
  - System configuration
  - All data access

### PRINCIPAL
- **Description**: School principal with management privileges
- **Permissions**:
  - Access to school management features
  - Teacher and student management
  - Reports and analytics
  - Limited system configuration

### OPERATOR
- **Description**: Staff member with limited access
- **Permissions**:
  - Daily operational tasks
  - Data entry and updates
  - View-only access to reports
  - Limited configuration options

## Usage

Import the role enum in your components:

```typescript
import { Role } from '../types';

// Check user role
if (user.role === Role.ADMIN) {
  // Show admin features
}

// Map roles to display names
const roleDisplayNames = {
  [Role.ADMIN]: 'Administrator',
  [Role.PRINCIPAL]: 'Principal',
  [Role.OPERATOR]: 'Operator'
};
```

## Access Control

The role enum is used throughout the application to control access to features:

1. **Sidebar Navigation**: Menu items are shown/hidden based on user role
2. **Page Access**: Certain pages are restricted to specific roles
3. **Actions**: Buttons and actions are enabled/disabled based on role permissions
4. **Data Access**: API requests may filter data based on user role

## Extensibility

To add new roles:

1. Add the new role to the enum in `types/role.ts`
2. Update access control logic where needed
3. Add appropriate UI elements for the new role