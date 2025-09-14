'use client'

import DashboardLayout from '../DashboardLayout'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div id="dashboard-page" className="space-y-6">
        <div id="dashboard-header">
          <h1 id="dashboard-title" className="text-2xl font-bold text-white">Dashboard</h1>
          <p id="dashboard-subtitle" className="text-gray-400 mt-1">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div id="users-stat-card" className="bg-gray-800 rounded-xl p-6 shadow">
            <div className="flex items-center">
              <div id="users-icon-container" className="p-3 rounded-lg bg-blue-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 id="users-stat-label" className="text-sm font-medium text-gray-400">Total Users</h3>
                <p id="users-stat-value" className="text-2xl font-semibold text-white mt-1">1,254</p>
              </div>
            </div>
            <div className="mt-4">
              <p id="users-stat-change" className="text-sm text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>

          <div id="documents-stat-card" className="bg-gray-800 rounded-xl p-6 shadow">
            <div className="flex items-center">
              <div id="documents-icon-container" className="p-3 rounded-lg bg-green-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 id="documents-stat-label" className="text-sm font-medium text-gray-400">Documents</h3>
                <p id="documents-stat-value" className="text-2xl font-semibold text-white mt-1">542</p>
              </div>
            </div>
            <div className="mt-4">
              <p id="documents-stat-change" className="text-sm text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                5% from last month
              </p>
            </div>
          </div>

          <div id="tasks-stat-card" className="bg-gray-800 rounded-xl p-6 shadow">
            <div className="flex items-center">
              <div id="tasks-icon-container" className="p-3 rounded-lg bg-amber-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 id="tasks-stat-label" className="text-sm font-medium text-gray-400">Tasks</h3>
                <p id="tasks-stat-value" className="text-2xl font-semibold text-white mt-1">86</p>
              </div>
            </div>
            <div className="mt-4">
              <p id="tasks-stat-change" className="text-sm text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                2% from last month
              </p>
            </div>
          </div>

          <div id="completion-stat-card" className="bg-gray-800 rounded-xl p-6 shadow">
            <div className="flex items-center">
              <div id="completion-icon-container" className="p-3 rounded-lg bg-purple-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 id="completion-stat-label" className="text-sm font-medium text-gray-400">Completion Rate</h3>
                <p id="completion-stat-value" className="text-2xl font-semibold text-white mt-1">78%</p>
              </div>
            </div>
            <div className="mt-4">
              <p id="completion-stat-change" className="text-sm text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                3% from last month
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div id="recent-activity-section" className="bg-gray-800 rounded-xl shadow">
          <div id="recent-activity-header" className="px-6 py-5 border-b border-gray-700">
            <h2 id="recent-activity-title" className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div id="recent-activity-content" className="p-6">
            <ul id="activity-list" className="space-y-4">
              <li id="activity-item-1" className="flex items-start">
                <div className="flex-shrink-0">
                  <div id="activity-icon-1" className="h-3 w-3 rounded-full bg-green-500 mt-2"></div>
                </div>
                <div className="ml-4 flex-1">
                  <p id="activity-text-1" className="text-sm text-white">New user registered: John Doe</p>
                  <p id="activity-time-1" className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                </div>
              </li>
              <li id="activity-item-2" className="flex items-start">
                <div className="flex-shrink-0">
                  <div id="activity-icon-2" className="h-3 w-3 rounded-full bg-blue-500 mt-2"></div>
                </div>
                <div className="ml-4 flex-1">
                  <p id="activity-text-2" className="text-sm text-white">Document "Project Proposal" was uploaded</p>
                  <p id="activity-time-2" className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </li>
              <li id="activity-item-3" className="flex items-start">
                <div className="flex-shrink-0">
                  <div id="activity-icon-3" className="h-3 w-3 rounded-full bg-amber-500 mt-2"></div>
                </div>
                <div className="ml-4 flex-1">
                  <p id="activity-text-3" className="text-sm text-white">Task "Update documentation" was completed</p>
                  <p id="activity-time-3" className="text-xs text-gray-400 mt-1">3 hours ago</p>
                </div>
              </li>
              <li id="activity-item-4" className="flex items-start">
                <div className="flex-shrink-0">
                  <div id="activity-icon-4" className="h-3 w-3 rounded-full bg-purple-500 mt-2"></div>
                </div>
                <div className="ml-4 flex-1">
                  <p id="activity-text-4" className="text-sm text-white">New settings were updated</p>
                  <p id="activity-time-4" className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}