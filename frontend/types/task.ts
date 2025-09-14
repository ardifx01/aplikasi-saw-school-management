// Task and Subtask interfaces

export interface Subtask {
  id: number
  title: string
  completed: boolean
  image?: string
}

export interface Task {
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