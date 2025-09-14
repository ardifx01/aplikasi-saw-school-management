'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../DashboardLayout'
import KanbanBoard from '../../../components/KanbanBoard'
import taskData from '../../../data/tasks.json'
import { Task } from '../../../types/task'

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // Load tasks from JSON data
    setTasks(taskData as Task[])
  }, [])

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const handleDeleteTask = (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)]">
        <KanbanBoard 
          tasks={tasks} 
          onUpdateTask={handleUpdateTask} 
          onDeleteTask={handleDeleteTask} 
        />
      </div>
    </DashboardLayout>
  )
}