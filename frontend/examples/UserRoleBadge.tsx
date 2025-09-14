// Example usage of the Role enum in a component
import { Role } from '../types';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

const UserRoleBadge: React.FC<{ user: User }> = ({ user }) => {
  const getRoleStyle = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return 'bg-red-900 text-red-300';
      case Role.PRINCIPAL:
        return 'bg-blue-900 text-blue-300';
      case Role.OPERATOR:
        return 'bg-green-900 text-green-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const getRoleDisplayName = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return 'Administrator';
      case Role.PRINCIPAL:
        return 'Principal';
      case Role.OPERATOR:
        return 'Operator';
      default:
        return role;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
      {getRoleDisplayName(user.role)}
    </span>
  );
};

export default UserRoleBadge;