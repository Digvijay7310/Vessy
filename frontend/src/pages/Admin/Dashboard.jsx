import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { adminStats } from '../../api/adminApi'

function Dashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        adminStats().then((r) => setStats(r.data.data))
    }, [])

    if(!stats) return <p>Loading...</p>
  return (
    <div>
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-6 bg-white rounded shadow">
                <h2>Total Users</h2>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>

            <div className="p-6 bg-white rounded shadow">
                <h2>Total Amins</h2>
                <p className="text-3xl font-bold">{stats.totalAdmins}</p>
            </div>
        </div>
    </div>
  )
}

export default Dashboard