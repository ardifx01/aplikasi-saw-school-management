# Kanban Board Implementation

This document explains how the Kanban board implementation works in the admin dashboard.

## Overview

The Kanban board provides a visual way to manage tasks using columns representing different stages of work:
- **To Do**: Tasks that need to be started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks

## Components

### KanbanBoard
The main component that orchestrates the Kanban board functionality:
- Manages drag and drop between columns
- Handles task creation, editing, and deletion
- Coordinates modals for task and subtask management

### TaskCard
Represents an individual task in the Kanban board:
- Displays task details (title, description, priority, assignee, due date)
- Shows progress of subtasks
- Provides menu for actions (view, edit, add subtask, delete)
- Supports drag and drop

### TaskModal
Modal dialog for creating and editing tasks:
- Form for task details (title, description, status, priority, assignee, due date, tags)
- Validation for required fields
- Separate handling for add vs. edit modes

### SubtaskModal
Modal dialog for adding subtasks to tasks:
- Form for subtask title
- Image upload functionality
- Preview of uploaded images

## Features

### Drag and Drop
Tasks can be moved between columns using drag and drop:
1. Click and hold a task card
2. Drag it to the desired column
3. Release to drop the task in that column
4. The task's status is automatically updated

### Task Management
Tasks can be managed through multiple interfaces:
- **Add Task**: Click the "Add Task" button to create a new task
- **Edit Task**: Use the dropdown menu on a task card to edit task details
- **View Task**: Use the dropdown menu to view task details
- **Delete Task**: Use the dropdown menu to delete a task (with confirmation)

### Subtask Management
Each task can have multiple subtasks:
- **Add Subtask**: Use the dropdown menu to add subtasks to a task
- **Subtask Progress**: Visual progress bar shows completion status
- **Image Attachments**: Subtasks can include image attachments

### Priority System
Tasks have three priority levels:
- **High**: Red badge
- **Medium**: Yellow badge
- **Low**: Green badge

### Tagging System
Tasks can be tagged for categorization:
- Multiple tags can be added to each task
- Tags are displayed as blue badges
- Tags help with filtering and organization

## Data Structure

### Task
```typescript
interface Task {
  id: number
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
  tags: string[]
  subtasks: Subtask[]
}
```

### Subtask
```typescript
interface Subtask {
  id: number
  title: string
  completed: boolean
  image?: string
}
```

## Styling

The Kanban board uses the same monochromatic deep gray color scheme as the rest of the dashboard:
- Dark backgrounds (`bg-gray-800`, `bg-gray-750`)
- Light text (`text-white`, `text-gray-300`)
- Blue accents for primary actions (`bg-blue-600`)
- Color-coded priority badges
- Appropriate contrast for accessibility

## Technical Implementation

### State Management
The Kanban board uses React's `useState` hook for state management:
- Task data is managed in the parent TasksPage component
- Modal visibility states are managed locally in KanbanBoard
- Editing states track which task is being modified

### Drag and Drop
Drag and drop is implemented using HTML5 drag and drop API:
- `onDragStart` captures the dragged task
- `onDragOver` prevents default browser behavior
- `onDrop` handles dropping the task in a new column

### Event Handling
Key event handlers include:
- `handleAddTask()`: Opens modal in add mode
- `handleEditTask(task)`: Opens modal in edit mode with task data
- `handleViewTask(task)`: Opens modal in view mode with task data
- `handleAddSubtask(task)`: Opens subtask modal for a specific task
- `handleSubmitTask(taskData)`: Processes task form submission
- `handleDeleteTask(taskId)`: Deletes a task after confirmation

### Modals
Modals are implemented as controlled components:
- Visibility controlled by boolean state
- Data passed as props to populate forms
- Callback functions for form submission
- Proper accessibility attributes

## Accessibility

The Kanban board implementation includes accessibility features:
- Proper ARIA attributes
- Keyboard navigation support
- Semantic HTML structure
- Sufficient color contrast
- Focus management in modals

## Responsive Design

The Kanban board is fully responsive:
- Single column layout on mobile devices
- Three-column layout on tablet and desktop
- Appropriate spacing and sizing for all screen sizes
- Scrollable columns for overflow content

## Performance Considerations

The implementation optimizes performance through:
- Efficient rendering with `key` prop on task cards
- Local state management to minimize re-renders
- Memoization of computed values where appropriate
- Lazy loading of images in subtasks