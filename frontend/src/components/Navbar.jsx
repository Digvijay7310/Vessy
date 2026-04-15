import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex gap-2'>
        <a href="#">Home</a>
        <a href="#">Accounts</a>
        <a href="#">Help & Support</a>
        <a href="#">Become Partner</a>
    </nav>
  )
}
