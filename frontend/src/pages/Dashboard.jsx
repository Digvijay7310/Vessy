import React from 'react'

function Dashboard() {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 p-6'>
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg p-6 shadow">
            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                Welcome, Admin
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
                you're viewing the dashboard in dark/light mode using default Tailwind colors.
            </p>
        </div>
    </div>
  )
}

export default Dashboard