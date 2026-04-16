import {useState, useEffect} from 'react'
import axiosInstance from '../../utils/axiosInstance'

export default function Profile() {
    const [admin, setAdmin] = useState("")

    const fetchProfile = async() => {
    try {
      const res = await axiosInstance.get("/admins/get-profile")
      setAdmin(res.data)
    //   console.log(res.data)
    } catch (error) {
      console.log("Error in fetching admin profile")
    //   console.log(error)
    }
  }

  useEffect(() => {
      fetchProfile()
    }, [])
  return (
        <div className="flex flex-col gap-1 mb-2">
        <h4 className='text-lg text-center'><b>Name:</b> {admin.fullName}</h4>
        <p className='text-xs text-center'><b>Email:</b> {admin.email}</p>
        <p className='text-xs text-center'><b>Role: </b>{admin.role}</p>
        <div className="flex justify-around gap-2">
          <p className="text-xs"><b>D.O.J</b> {new Date(admin.createdAt).toLocaleDateString()}</p>
          <p className="text-xs"><b>Last Edit:</b> {new Date(admin.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
  )
}
