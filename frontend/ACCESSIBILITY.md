# Accessibility and Testing IDs

This document explains the ID attributes added to components for accessibility and testing purposes.

## ID Naming Convention

All IDs follow a consistent naming convention:
- `kebab-case` format for readability
- Descriptive names that indicate the component's purpose
- Prefixed with the page or section name when applicable

## Dashboard Layout IDs

### Sidebar
- `dashboard-layout` - Main container
- `sidebar` - Sidebar navigation
- `sidebar-header` - Sidebar header section
- `app-title` - Application title
- `sidebar-close-button` - Button to close sidebar on mobile
- `sidebar-navigation` - Navigation container
- `sidebar-menu` - Menu list
- `menu-item-{name}` - Individual menu items (e.g., `menu-item-dashboard`)
- `nav-link-{name}` - Navigation links
- `sidebar-footer` - Sidebar footer
- `logout-button` - Logout button

### Header
- `main-content` - Main content area
- `main-header` - Header section
- `sidebar-toggle-button` - Button to toggle sidebar on mobile
- `page-title` - Current page title
- `notifications-button` - Notifications button
- `user-menu-button` - User menu button

### Main Content
- `main-content-area` - Main content area

## Page-Specific IDs

### Login Page
- `login-page` - Main container
- `login-container` - Login form container
- `login-content` - Login form content
- `login-header` - Header section
- `login-icon` - Login icon
- `login-title` - Login title
- `login-subtitle` - Login subtitle
- `login-form` - Login form
- `email-field` - Email input field container
- `email` - Email input
- `password-field` - Password input field container
- `password` - Password input
- `forgot-password-link` - Forgot password link
- `submit-button-container` - Submit button container
- `login-submit-button` - Login submit button
- `register-section` - Register section
- `register-button` - Register button

### Register Page
- `register-page` - Main container
- `register-container` - Register form container
- `register-content` - Register form content
- `register-header` - Header section
- `register-icon` - Register icon
- `register-title` - Register title
- `register-subtitle` - Register subtitle
- `register-form` - Register form
- `name-field` - Name input field container
- `name` - Name input
- `email-field` - Email input field container
- `email` - Email input
- `password-field` - Password input field container
- `password` - Password input
- `confirm-password-field` - Confirm password input field container
- `confirmPassword` - Confirm password input
- `submit-button-container` - Submit button container
- `register-submit-button` - Register submit button
- `login-section` - Login section
- `login-button` - Login button

### Dashboard Page
- `dashboard-page` - Main container
- `dashboard-header` - Header section
- `dashboard-title` - Dashboard title
- `dashboard-subtitle` - Dashboard subtitle
- `stats-grid` - Statistics grid container
- `users-stat-card` - Users statistics card
- `users-icon-container` - Users icon container
- `users-stat-label` - Users statistics label
- `users-stat-value` - Users statistics value
- `users-stat-change` - Users statistics change indicator
- `documents-stat-card` - Documents statistics card
- `documents-icon-container` - Documents icon container
- `documents-stat-label` - Documents statistics label
- `documents-stat-value` - Documents statistics value
- `documents-stat-change` - Documents statistics change indicator
- `tasks-stat-card` - Tasks statistics card
- `tasks-icon-container` - Tasks icon container
- `tasks-stat-label` - Tasks statistics label
- `tasks-stat-value` - Tasks statistics value
- `tasks-stat-change` - Tasks statistics change indicator
- `completion-stat-card` - Completion statistics card
- `completion-icon-container` - Completion icon container
- `completion-stat-label` - Completion statistics label
- `completion-stat-value` - Completion statistics value
- `completion-stat-change` - Completion statistics change indicator
- `recent-activity-section` - Recent activity section
- `recent-activity-header` - Recent activity header
- `recent-activity-title` - Recent activity title
- `recent-activity-content` - Recent activity content
- `activity-list` - Activity list
- `activity-item-{number}` - Individual activity items
- `activity-icon-{number}` - Activity icons
- `activity-text-{number}` - Activity text
- `activity-time-{number}` - Activity timestamps

### Users Page
- `users-page` - Main container
- `users-header` - Header section
- `users-title` - Users title
- `users-subtitle` - Users subtitle
- `add-user-button` - Add user button
- `users-table-container` - Users table container
- `users-table` - Users table
- `users-table-header` - Users table header
- `user-column` - User column header
- `email-column` - Email column header
- `role-column` - Role column header
- `status-column` - Status column header
- `actions-column` - Actions column header
- `users-table-body` - Users table body
- `user-row-{number}` - Individual user rows
- `user-cell-{number}` - User cell containers
- `user-avatar-{number}` - User avatars
- `user-name-{number}` - User names
- `user-email-{number}` - User emails
- `user-role-{number}` - User roles
- `user-status-{number}` - User status containers
- `status-badge-{number}` - Status badges
- `user-actions-{number}` - User actions containers
- `edit-user-{number}` - Edit user buttons
- `delete-user-{number}` - Delete user buttons
- `users-table-footer` - Users table footer
- `pagination-info` - Pagination information
- `start-result` - Starting result number
- `end-result` - Ending result number
- `total-results` - Total results
- `pagination-controls` - Pagination controls
- `previous-page-button` - Previous page button
- `next-page-button` - Next page button

### Documents Page
- `documents-page` - Main container
- `documents-header` - Header section
- `documents-title` - Documents title
- `documents-subtitle` - Documents subtitle
- `upload-document-button` - Upload document button
- `documents-grid` - Documents grid
- `document-card-{number}` - Individual document cards
- `document-content-{number}` - Document content
- `document-icon-container-{number}` - Document icon containers
- `document-title-{number}` - Document titles
- `document-date-{number}` - Document dates
- `document-menu-button-{number}` - Document menu buttons
- `document-description-{number}` - Document descriptions
- `document-footer-{number}` - Document footers
- `document-author-avatar-{number}` - Document author avatars
- `document-author-{number}` - Document authors
- `document-type-{number}` - Document types
- `document-actions-{number}` - Document actions
- `download-button-{number}` - Download buttons
- `edit-button-{number}` - Edit buttons

### Tasks Page
- `tasks-page` - Main container
- `tasks-header` - Header section
- `tasks-title` - Tasks title
- `tasks-subtitle` - Tasks subtitle
- `add-task-button` - Add task button
- `tasks-list` - Tasks list
- `task-card-{number}` - Individual task cards
- `task-{number}` - Task checkboxes
- `task-status-{number}` - Task status badges
- `task-{number}-description` - Task descriptions
- `task-assignee-avatar-{number}` - Task assignee avatars
- `task-assignee-{number}` - Task assignees
- `task-due-date-{number}` - Task due dates

### Settings Page
- `settings-page` - Main container
- `settings-header` - Header section
- `settings-title` - Settings title
- `settings-subtitle` - Settings subtitle
- `general-settings-section` - General settings section
- `general-settings-header` - General settings header
- `general-settings-title` - General settings title
- `general-settings-content` - General settings content
- `site-name-field` - Site name field container
- `site-name` - Site name input
- `timezone-field` - Timezone field container
- `timezone` - Timezone select
- `language-field` - Language field container
- `language` - Language select
- `notifications-field` - Notifications field container
- `notifications` - Notifications checkbox
- `security-settings-section` - Security settings section
- `security-settings-header` - Security settings header
- `security-settings-title` - Security settings title
- `security-settings-content` - Security settings content
- `current-password-field` - Current password field container
- `current-password` - Current password input
- `new-password-field` - New password field container
- `new-password` - New password input
- `confirm-password-field` - Confirm password field container
- `confirm-password` - Confirm password input
- `settings-actions` - Settings actions container
- `cancel-button` - Cancel button
- `save-changes-button` - Save changes button

## Benefits

These IDs provide several benefits:

1. **Accessibility**: Screen readers can better navigate the interface
2. **Testing**: Easier to write reliable end-to-end tests
3. **Debugging**: Simpler to inspect and debug specific components
4. **Development**: More maintainable and organized codebase