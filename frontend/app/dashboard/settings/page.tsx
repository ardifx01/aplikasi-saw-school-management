'use client'

import DashboardLayout from '../../DashboardLayout'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div id="settings-page" className="space-y-6">
        <div id="settings-header">
          <h1 id="settings-title" className="text-2xl font-bold text-white">Settings</h1>
          <p id="settings-subtitle" className="text-gray-400 mt-1">Manage your account and application settings</p>
        </div>

        <div id="general-settings-section" className="bg-gray-800 rounded-xl shadow">
          <div id="general-settings-header" className="px-6 py-5 border-b border-gray-700">
            <h2 id="general-settings-title" className="text-lg font-semibold text-white">General Settings</h2>
          </div>
          <div id="general-settings-content" className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <div id="site-name-field">
                <label htmlFor="site-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  id="site-name"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="Admin Dashboard"
                />
              </div>
              <div id="timezone-field">
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  id="timezone"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="utc"
                >
                  <option value="utc">UTC</option>
                  <option value="est">Eastern Time (EST)</option>
                  <option value="pst">Pacific Time (PST)</option>
                  <option value="cet">Central European Time (CET)</option>
                </select>
              </div>
              <div id="language-field">
                <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  id="language"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="en"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div id="notifications-field" className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  defaultChecked
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-300">
                  Enable notifications
                </label>
              </div>
            </div>
          </div>
        </div>

        <div id="security-settings-section" className="bg-gray-800 rounded-xl shadow">
          <div id="security-settings-header" className="px-6 py-5 border-b border-gray-700">
            <h2 id="security-settings-title" className="text-lg font-semibold text-white">Security</h2>
          </div>
          <div id="security-settings-content" className="p-6">
            <div className="space-y-6">
              <div id="current-password-field">
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div id="new-password-field">
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div id="confirm-password-field">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="settings-actions" className="flex justify-end space-x-3">
          <button id="cancel-button" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Cancel
          </button>
          <button id="save-changes-button" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}