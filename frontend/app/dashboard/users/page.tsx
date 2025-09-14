'use client'

import { useState } from 'react'
import DashboardLayout from '../../DashboardLayout'
import UserModal from '../../../components/UserModal'
import { Role } from '../../../types'

interface User {
  id: number
  name: string
  email: string
  role: Role
  status: 'Active' | 'Pending'
}

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: Role.ADMIN,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice@example.com',
      role: Role.PRINCIPAL,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      role: Role.OPERATOR,
      status: 'Pending'
    }
  ])

  const handleAddUser = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleSubmitUser = (userData: Omit<User, 'id'> & { id?: number }) => {
    if (userData.id) {
      // Update existing user
      setUsers(users.map(u => u.id === userData.id ? { ...userData, id: userData.id } as User : u))
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: userData.status
      }
      setUsers([...users, newUser])
    }
  }

  const getRoleDisplayName = (role: Role) => {
    switch (role) {
      case Role.ADMIN: return 'Administrator'
      case Role.PRINCIPAL: return 'Principal'
      case Role.OPERATOR: return 'Operator'
      default: return role
    }
  }

  const getStatusBadgeClass = (status: 'Active' | 'Pending') => {
    return status === 'Active' 
      ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300'
      : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-900 text-amber-300'
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
  }

  const getUserAvatarClass = (name: string) => {
    const initials = getUserInitials(name)
    const charCode = initials.charCodeAt(0)
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-amber-500',
      'bg-green-500',
      'bg-pink-500',
      'bg-indigo-500'
    ]
    return colors[charCode % colors.length]
  }

  return (
    <DashboardLayout>
      <div id="users-page" className="space-y-6">
        <div id="users-header" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 id="users-title" className="text-2xl font-bold text-white">Users</h1>
            <p id="users-subtitle" className="text-gray-400 mt-1">Manage your team members and their permissions</p>
          </div>
          <button 
            id="add-user-button" 
            onClick={handleAddUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add User
          </button>
        </div>

        <div id="users-table-container" className="bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table id="users-table" className="min-w-full divide-y divide-gray-700">
              <thead id="users-table-header" className="bg-gray-750">
                <tr>
                  <th id="user-column" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                  <th id="email-column" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th id="role-column" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th id="status-column" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th id="actions-column" scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody id="users-table-body" className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} id={`user-row-${user.id}`}>
                    <td id={`user-cell-${user.id}`} className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div id={`user-avatar-${user.id}`} className={`h-10 w-10 rounded-full ${getUserAvatarClass(user.name)} flex items-center justify-center`}>
                          <span className="text-white font-medium">{getUserInitials(user.name)}</span>
                        </div>
                        <div className="ml-4">
                          <div id={`user-name-${user.id}`} className="text-sm font-medium text-white">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td id={`user-email-${user.id}`} className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </td>
                    <td id={`user-role-${user.id}`} className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{getRoleDisplayName(user.role)}</div>
                    </td>
                    <td id={`user-status-${user.id}`} className="px-6 py-4 whitespace-nowrap">
                      <span id={`status-badge-${user.id}`} className={getStatusBadgeClass(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td id={`user-actions-${user.id}`} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        id={`edit-user-${user.id}`} 
                        onClick={() => handleEditUser(user)}
                        className="text-blue-400 hover:text-blue-300 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        id={`delete-user-${user.id}`} 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="users-table-footer" className="bg-gray-750 px-6 py-4 flex items-center justify-between border-t border-gray-700">
            <div id="pagination-info" className="text-sm text-gray-300">
              Showing <span id="start-result" className="font-medium">1</span> to <span id="end-result" className="font-medium">{users.length}</span> of{' '}
              <span id="total-results" className="font-medium">{users.length}</span> results
            </div>
            <div id="pagination-controls" className="flex space-x-2">
              <button id="previous-page-button" className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 text-sm">
                Previous
              </button>
              <button id="next-page-button" className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitUser}
        user={editingUser}
      />
    </DashboardLayout>
  )
}