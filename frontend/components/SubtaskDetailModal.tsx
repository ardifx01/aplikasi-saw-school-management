'use client'

import { Subtask } from '../types/task'

interface SubtaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  subtask: Subtask | null
}

export default function SubtaskDetailModal({ isOpen, onClose, subtask }: SubtaskDetailModalProps) {
  if (!isOpen || !subtask) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-white mb-4">
                Subtask Details
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white rounded-md p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-2">
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">Title</h4>
                <p className="text-white">{subtask.title}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-300 mb-2">Status</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subtask.completed ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                  {subtask.completed ? 'Completed' : 'Pending'}
                </span>
              </div>

              {subtask.image && (
                <div className="mb-4">
                  <h4 className="text-md font-medium text-gray-300 mb-2">Image Attachment</h4>
                  <div className="mt-2">
                    <img 
                      src={subtask.image} 
                      alt="Subtask attachment" 
                      className="max-w-full h-auto rounded-md border border-gray-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-750 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
