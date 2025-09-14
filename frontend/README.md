# Admin Dashboard

A modern admin dashboard built with Next.js and Tailwind CSS featuring a monochromatic deep gray color scheme.

## Features

- Login and registration pages
- Sidebar navigation with collapsible menu
- Dashboard overview with statistics
- Users management page with modal-based forms
- Documents management page
- Tasks management page with Kanban board
- Settings page
- Mobile-first responsive design
- Accessibility improvements with comprehensive ID attributes
- Role-based access control (ADMIN, PRINCIPAL, OPERATOR)

## Recent Improvements

- **UI/UX Fixes**: Resolved broken components and improved overall user experience
- **Accessibility**: Added comprehensive ID attributes to all components for better accessibility and testing
- **Mobile Responsiveness**: Enhanced mobile-first design approach across all pages
- **Visual Design**: Improved visual hierarchy and consistent design language
- **Access Control**: Implemented role-based access system
- **User Management**: Added modal-based forms for adding and editing users
- **Task Management**: Implemented Kanban board with drag and drop functionality

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: As mentioned by the user, you don't need to run the development server as they will test it themselves.

## Project Structure

```
.
├── app/                 # Next.js app directory
│   ├── dashboard/       # Dashboard pages
│   │   ├── documents/   
│   │   ├── settings/     
│   │   ├── tasks/       
│   │   ├── users/       
│   │   └── page.tsx     
│   ├── register/        # Registration page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Login page (homepage)
├── components/          # Reusable components
├── public/              # Static assets
├── types/               # TypeScript types and enums
└── ...
```

## Customization

The color scheme can be customized in `tailwind.config.js`. The current palette uses various shades of gray for a monochromatic look.

## Accessibility

This dashboard includes comprehensive ID attributes on all interactive elements for:
- Screen reader support
- Easier end-to-end testing
- Better debugging and development experience

## Responsive Design

The dashboard follows a mobile-first approach with:
- Collapsible sidebar navigation
- Responsive grids and layouts
- Touch-friendly interface elements
- Adaptive components for all screen sizes

## Role-Based Access Control

The application implements role-based access control with three user roles:
- **ADMIN**: Full system access
- **PRINCIPAL**: School management access
- **OPERATOR**: Limited operational access

See [ROLES.md](ROLES.md) for detailed information about roles and permissions.

## User Management

The user management system uses modal dialogs for adding and editing users:
- **Add User**: Click the "Add User" button to open a modal form
- **Edit User**: Click the "Edit" button next to any user to open a pre-filled modal form
- **Validation**: Client-side form validation with error messaging
- **Responsive**: Works seamlessly on all device sizes

See [USER_MODAL.md](USER_MODAL.md) for detailed information about the user management modal system.

## Task Management

The tasks page features a Kanban board implementation with:
- **Drag and Drop**: Move tasks between columns
- **Three Columns**: To Do, In Progress, Done
- **Task Cards**: Visual representation of tasks with details
- **Subtasks**: Break down tasks into smaller items
- **Image Attachments**: Add images to subtasks
- **Priority Levels**: Low, Medium, High
- **Tagging System**: Categorize tasks with tags
- **Modal Interfaces**: Add, edit, and view tasks/subtasks in modals

See [KANBAN_BOARD.md](KANBAN_BOARD.md) for detailed information about the Kanban board implementation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.