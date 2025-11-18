import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logo() {
    const navigate = useNavigate()

  return (
    <div className='hover:cursor-pointer' onClick={() => navigate("/")}>
        <h2 className='bg-red-700 text-3xl text-yellow-300 font-bold rounded-l-full rounded-b-full p-2'>Vessy</h2>
    </div>
  )
}

export default Logo