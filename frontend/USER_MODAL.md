# User Management Modal

This document explains how the user management modal works in the admin dashboard.

## Overview

The user management system uses a modal dialog for both adding new users and editing existing users. This approach provides a better user experience by keeping the user in context without navigating to separate pages.

## Components

### UserModal Component

The `UserModal` component is a reusable modal dialog that handles both add and edit operations:

- **Location**: `/components/UserModal.tsx`
- **Props**:
  - `isOpen`: Boolean indicating if the modal should be displayed
  - `onClose`: Function to close the modal
  - `onSubmit`: Function to handle form submission
  - `user`: Optional user object for edit mode

### UsersPage Integration

The `UsersPage` component manages the modal state and user data:

- **Location**: `/app/dashboard/users/page.tsx`
- **State Management**:
  - `isModalOpen`: Controls modal visibility
  - `editingUser`: Stores user data when editing
  - `users`: Array of user objects

## Features

### Add New User

1. Click the "Add User" button in the users page header
2. The modal opens with empty form fields
3. Fill in user details
4. Click "Add User" to submit or "Cancel" to close

### Edit Existing User

1. Click the "Edit" button next to any user in the table
2. The modal opens with the user's current data pre-filled
3. Modify user details as needed
4. Click "Update User" to save changes or "Cancel" to close

### Form Validation

The modal includes client-side validation for:

- **Name**: Required field
- **Email**: Required and must be a valid email format
- **Role**: Required selection
- **Status**: Required selection

Validation errors are displayed below the respective fields.

### User Roles

The system supports three user roles defined in the `Role` enum:

- `ADMIN`: Full system access
- `PRINCIPAL`: School management access
- `OPERATOR`: Limited operational access

## Styling

The modal uses the same monochromatic deep gray color scheme as the rest of the dashboard:

- Dark backgrounds (`bg-gray-800`, `bg-gray-700`)
- Light text (`text-white`, `text-gray-300`)
- Blue accents for primary actions (`bg-blue-600`)
- Appropriate contrast for accessibility

## Technical Implementation

### State Management

The modal state is managed using React's `useState` hook:

```typescript
const [isModalOpen, setIsModalOpen] = useState(false)
const [editingUser, setEditingUser] = useState<User | null>(null)
```

### Event Handlers

Key event handlers include:

- `handleAddUser()`: Opens modal in add mode
- `handleEditUser(user)`: Opens modal in edit mode with user data
- `handleSubmitUser(userData)`: Processes form submission
- `handleDeleteUser(userId)`: Deletes a user after confirmation

### Dynamic Form Behavior

The modal dynamically adjusts its behavior based on whether it's in add or edit mode:

- Title changes from "Add New User" to "Edit User"
- Submit button text changes from "Add User" to "Update User"
- Form fields are pre-populated when editing

## Accessibility

The modal implementation includes accessibility features:

- Proper ARIA attributes
- Keyboard navigation support
- Focus trapping within the modal
- Semantic HTML structure
- Sufficient color contrast

## Responsive Design

The modal is fully responsive and works on all device sizes:

- Full-width on mobile devices
- Centered dialog on larger screens
- Appropriate spacing and sizing for touch targets
- Scrollable content area for long forms