import React from 'react'
import { useAuth } from '../context/AuthContext'

function Profile() {
    const {user} = useAuth()
  return (
    <div>
        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            My Profile
        </h2>
        {user ? (
            <div className='mt-4 space-y-1'>
                <p><strong>Name: </strong>{user.name}</p>
                <p><strong>Email: </strong>{user.email}</p>
                <p><strong>Role: </strong>{user.role}</p>
            </div>
        ): (
            <p className="mt-2 text-gray-700 dark:text-gray-300">Loading...</p>
        )}
    </div>
  )
}

export default Profile