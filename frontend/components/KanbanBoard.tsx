'use client'

import { useState } from 'react'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import SubtaskModal from './SubtaskModal'
import { Task } from '../types/task'

interface KanbanBoardProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: number) => void
}

const statuses = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
]

export default function KanbanBoard({ tasks, onUpdateTask, onDeleteTask }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskForSubtask, setTaskForSubtask] = useState<Task | null>(null)

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    if (draggedTask) {
      const updatedTask = { ...draggedTask, status: status as 'todo' | 'in-progress' | 'done' }
      onUpdateTask(updatedTask)
      setDraggedTask(null)
    }
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleViewTask = (task: Task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleAddSubtask = (task: Task) => {
    setTaskForSubtask(task)
    setIsSubtaskModalOpen(true)
  }

  const handleUpdateSubtask = (task: Task) => {
    onUpdateTask(task)
  }

  const handleSubmitTask = (taskData: Task) => {
    if (editingTask) {
      // Update existing task
      onUpdateTask(taskData)
    } else {
      // Add new task
      const newTask: Task = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        assignee: taskData.assignee,
        dueDate: taskData.dueDate,
        tags: taskData.tags,
        subtasks: taskData.subtasks
      }
      onUpdateTask(newTask)
    }
    setIsTaskModalOpen(false)
  }

  const groupedTasks = statuses.map(status => ({
    ...status,
    tasks: tasks.filter(task => task.status === status.id)
  }))

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        {groupedTasks.map(column => (
          <div
            key={column.id}
            className="bg-gray-800 rounded-xl shadow flex flex-col h-full"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="px-4 py-3 border-b border-gray-700">
              <h2 className="font-semibold text-white flex items-center">
                <span className="mr-2">{column.title}</span>
                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </h2>
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
              <div className="space-y-4">
                {column.tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDragStart={() => handleDragStart(task)}
                    onEdit={() => handleEditTask(task)}
                    onView={() => handleViewTask(task)}
                    onAddSubtask={() => handleAddSubtask(task)}
                    onDelete={onDeleteTask}
                  />
                ))}
                {column.tasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No tasks</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleSubmitTask}
        task={editingTask}
      />

      <SubtaskModal
        isOpen={isSubtaskModalOpen}
        onClose={() => setIsSubtaskModalOpen(false)}
        onSubmit={handleUpdateSubtask}
        task={taskForSubtask}
      />
    </div>
  )
}