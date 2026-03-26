import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../utils/axios'
import ProtectedRoute from '../context/ProtectedRoute'
import Sidebar from '../components/Sidebar'
import AdminStatsCard from '../components/AdminStatsCard'
import CategoryAndSubCategory from '../components/CategoryAndSubCategory'
import AddCategoryOrSubCategory from '../components/AddCategoryOrSubCategory'

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const {admin} = useAuth()

  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get('/admins/stats');
      setStats(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

          {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="p-1 space-y-6">
            <h1 className="text-lg font-bold">Dashboard</h1>
            {/* <span>{admin}</span> */}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {stats && (
                <>
                <AdminStatsCard title="Total Users" value={stats.totalUsers} />
                <AdminStatsCard title="Total Admins" value={stats.totalAdmins} />
                </>
              )}
            </div>

            {/* User Table */}
            <div className="mt-5 border">
              <h3 className="font-bold text-lg">Category & SubCategory</h3>
              <CategoryAndSubCategory />
              <AddCategoryOrSubCategory />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AdminDashboard