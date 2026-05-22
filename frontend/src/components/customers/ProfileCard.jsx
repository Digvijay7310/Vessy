import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

export default function Profile() {
    const [user, setUser] = useState(null)

    const fetchUSer = async() => {
        try {
            const res = await axiosInstance.get("/customer/me")
            setUser(res.data.data)
        } catch (error) {
            console.log("error in fetch user")
        }
    }
    useEffect(() => {
        fetchUSer()
    }, [])
  return (
    <div>
        {/* {user} */}
    </div>
  )
}
