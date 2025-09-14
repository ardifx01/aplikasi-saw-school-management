'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation
    if (email && password) {
      // In a real app, you would authenticate with a server here
      console.log('Login attempt with:', { email, password })
      // Redirect to dashboard after successful login
      router.push('/dashboard')
    }
  }

  return (
    <div id="login-page" className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div id="login-container" className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div id="login-content" className="px-8 py-10">
          <div id="login-header" className="text-center">
            <div id="login-icon" className="mx-auto h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 id="login-title" className="mt-6 text-2xl font-bold text-white">Welcome back</h2>
            <p id="login-subtitle" className="mt-2 text-gray-400">Sign in to your account</p>
          </div>

          <form id="login-form" className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div id="email-field">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div id="password-field">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="text-sm">
                  <a id="forgot-password-link" href="#" className="font-medium text-blue-500 hover:text-blue-400">
                    Forgot password?
                  </a>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div id="submit-button-container">
              <button
                id="login-submit-button"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div id="register-section" className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  New to Admin Dashboard?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                id="register-button"
                onClick={() => router.push('/register')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}