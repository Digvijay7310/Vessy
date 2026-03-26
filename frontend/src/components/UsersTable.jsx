import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'

function UsersTable() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async() => {
        try {
            const res = await axiosInstance.get("/admins/users");
            setUsers(res.data.data.users)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    if(loading) return <p className="text-red-500">Loading users...</p>
  return (
    <table className='w-full border-collapse border'>
        <thead>
            <tr className="bg-gray-200">
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Full Name</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Status</th>
            </tr>
        </thead>
        <tbody>
            {users.map((u, idx) => (
                <tr key={u._id} className='hover:bg-gray-100'>
                    <td className="border px-2 py-1">{idx +1 }</td>
                    <td className="border px-2 py-1">{u.fullName}</td>
                    <td className="border px-2 py-1">{u.email}</td>
                    <td className="border px-2 py-1">
                        {u.isBlocked ? "Blocked": "Active"}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default UsersTable