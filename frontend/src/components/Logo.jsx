import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logo() {
    const navigate = useNavigate()

  return (
    <div className='hover:cursor-pointer' onClick={() => navigate("/")}>
        <h2 className='bg-red-700 text-yellow-300 font-medium rounded-t-4xl rounded-l-full p-1'>Vessy</h2>
    </div>
  )
}

export default Logo