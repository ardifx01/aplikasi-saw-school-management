'use client'

import { useState } from 'react'
import { Task, Subtask } from '../types/task'
import SubtaskDetailModal from './SubtaskDetailModal'

interface TaskCardProps {
  task: Task
  onDragStart: () => void
  onEdit: () => void
  onView: () => void
  onAddSubtask: () => void
  onDelete: (taskId: number) => void
}

export default function TaskCard({ task, onDragStart, onEdit, onView, onAddSubtask, onDelete }: TaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false)
  const [selectedSubtask, setSelectedSubtask] = useState<Subtask | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-900 text-red-300'
      case 'medium': return 'bg-yellow-900 text-yellow-300'
      case 'low': return 'bg-green-900 text-green-300'
      default: return 'bg-gray-900 text-gray-300'
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length
  const totalSubtasks = task.subtasks.length

  return (
    <div 
      id={`task-card-${task.id}`}
      className="bg-gray-750 rounded-lg shadow p-4 cursor-move hover:bg-gray-700 transition-colors"
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start">
        <h3 id={`task-title-${task.id}`} className="font-medium text-white mb-2">{task.title}</h3>
        <div className="relative">
          <button 
            id={`task-menu-button-${task.id}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 hover:text-white p-1 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <button
                onClick={() => {
                  onView()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  onEdit()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onAddSubtask()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Add Subtask
              </button>
              <button
                onClick={() => {
                  onDelete(task.id)
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {task.description && (
        <p id={`task-description-${task.id}`} className="text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex flex-wrap gap-1 mb-3">
        <span id={`task-priority-${task.id}`} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        {task.tags.map((tag, index) => (
          <span key={tag} id={`task-tag-${task.id}-${index}`} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
            {tag}
          </span>
        ))}
      </div>
      
      {totalSubtasks > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Subtasks</span>
            <span>{completedSubtasks}/{totalSubtasks}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
            <div 
              className="bg-blue-600 h-1.5 rounded-full" 
              style={{ width: `${totalSubtasks ? (completedSubtasks / totalSubtasks) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {task.subtasks.map(subtask => (
              <div key={subtask.id} id={`subtask-${subtask.id}`} className="flex items-center text-xs text-gray-300">
                <input
                  id={`subtask-checkbox-${subtask.id}`}
                  type="checkbox"
                  checked={subtask.completed}
                  readOnly
                  className="h-3 w-3 mr-2 rounded text-blue-500 focus:ring-blue-400"
                />
                <span 
                  id={`subtask-title-${subtask.id}`} 
                  className={`cursor-pointer hover:underline ${subtask.completed ? 'line-through text-gray-500' : ''}`}
                  onClick={() => {
                    setSelectedSubtask(subtask)
                    setIsSubtaskModalOpen(true)
                  }}
                >
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center text-xs text-gray-400">
        <div className="flex items-center">
          <div id={`task-assignee-avatar-${task.id}`} className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
            <span className="text-xs font-medium">{task.assignee.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
          </div>
          <span id={`task-assignee-${task.id}`}>{task.assignee}</span>
        </div>
        <span id={`task-due-date-${task.id}`}>{formatDate(task.dueDate)}</span>
      </div>
      <SubtaskDetailModal 
        isOpen={isSubtaskModalOpen}
        onClose={() => setIsSubtaskModalOpen(false)}
        subtask={selectedSubtask}
      />
    </div>
  )
}
