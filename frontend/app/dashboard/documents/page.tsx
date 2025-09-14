'use client'

import DashboardLayout from '../../DashboardLayout'

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div id="documents-page" className="space-y-6">
        <div id="documents-header" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 id="documents-title" className="text-2xl font-bold text-white">Documents</h1>
            <p id="documents-subtitle" className="text-gray-400 mt-1">Manage and organize your documents</p>
          </div>
          <button id="upload-document-button" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Upload Document
          </button>
        </div>

        <div id="documents-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} id={`document-card-${item}`} className="bg-gray-800 rounded-xl overflow-hidden shadow">
              <div id={`document-content-${item}`} className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div id={`document-icon-container-${item}`} className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 id={`document-title-${item}`} className="font-medium text-white">Document {item}</h3>
                      <p id={`document-date-${item}`} className="text-gray-400 text-sm mt-1">Created 2 days ago</p>
                    </div>
                  </div>
                  <button id={`document-menu-button-${item}`} className="text-gray-400 hover:text-white p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </div>
                <p id={`document-description-${item}`} className="mt-4 text-gray-300 text-sm">
                  This is a sample document description. It contains important information about the project.
                </p>
                <div id={`document-footer-${item}`} className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div id={`document-author-avatar-${item}`} className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">JD</span>
                    </div>
                    <span id={`document-author-${item}`} className="ml-2 text-gray-400 text-sm">John Doe</span>
                  </div>
                  <span id={`document-type-${item}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                    PDF
                  </span>
                </div>
              </div>
              <div id={`document-actions-${item}`} className="bg-gray-750 px-5 py-3 flex justify-end space-x-3">
                <button id={`download-button-${item}`} className="text-gray-300 hover:text-white p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button id={`edit-button-${item}`} className="text-gray-300 hover:text-white p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}