import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logo() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
  }
  return (
    <div className="text-xl font-extrabold bg-yellow-300 p-1 h-8 w-5 rounded-full"
    onClick={handleClick}
    >V</div>
  )
}
