import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Layout({children}) {
  return (
    <div className='flex max-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950'>
    <Sidebar />
    <div className="flex flex-col flex-1">
       <Navbar />
       <main className="flex-1 p-6 overflow-y-auto text-gray-900 dark:text-gray-100">{children}</main>
        </div>    
    </div>
  )
}

export default Layout