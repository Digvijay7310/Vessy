import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className='min-h-screen flex bg-zinc-300'>
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Header />
            <div className="p-1">
                <Outlet />
            </div>
        </div>
    </div>
  )
}
