/**
 * User roles in the system
 * 
 * ADMIN: Full system access
 * PRINCIPAL: School principal with management privileges
 * OPERATOR: Staff member with limited access
 */
export enum Role {
  ADMIN = 'ADMIN',
  PRINCIPAL = 'PRINCIPAL',
  OPERATOR = 'OPERATOR'
}

export default Role;