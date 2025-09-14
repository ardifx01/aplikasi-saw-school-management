# Using the Role Enum

This document provides examples of how to use the Role enum in your components.

## Importing the Role Enum

```typescript
import { Role } from '../types';
```

## Basic Usage

### Checking User Roles

```typescript
import { Role } from '../types';

// Check if user is admin
if (user.role === Role.ADMIN) {
  // Show admin-only features
  console.log('User is an administrator');
}

// Check if user has management privileges
if (user.role === Role.ADMIN || user.role === Role.PRINCIPAL) {
  // Show management features
  console.log('User has management privileges');
}
```

### Displaying Role Names

```typescript
import { Role } from '../types';

const roleDisplayNames = {
  [Role.ADMIN]: 'Administrator',
  [Role.PRINCIPAL]: 'Principal',
  [Role.OPERATOR]: 'Operator'
};

const userRoleDisplayName = roleDisplayNames[user.role];
```

### Conditional Rendering

```typescript
import { Role } from '../types';

// Render different components based on role
const renderActions = (userRole: Role) => {
  switch (userRole) {
    case Role.ADMIN:
      return (
        <div>
          <button>Edit</button>
          <button>Delete</button>
          <button>Manage Users</button>
        </div>
      );
    case Role.PRINCIPAL:
      return (
        <div>
          <button>Edit</button>
          <button>View Reports</button>
        </div>
      );
    case Role.OPERATOR:
      return (
        <div>
          <button>View</button>
        </div>
      );
    default:
      return null;
  }
};
```

## Example Component

See `examples/UserRoleBadge.tsx` for a complete example of how to use the Role enum in a component.

## Best Practices

1. **Always use the enum values** instead of hardcoded strings
2. **Use TypeScript** to ensure type safety
3. **Implement role-based UI** to show/hide elements based on user permissions
4. **Validate roles on the backend** as well for security