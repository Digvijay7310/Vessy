import React, { useState } from 'react'

export default function SelectMenu() {

    const [state, setState] = useState(null)
    const handleSubmit = (e) => {
        setState(e.target.value)
    }
   return (
    <div className='w-sm bg-sky-800 text-white p-2'>
        <select
        className='bg-sky-100 text-red-800'
        onChange={handleSubmit}>
                <option value="">-- Select State --</option>
                <option value="delhi">Delhi</option>
                <option value="pune">pune</option>
                <option value="kolkata">kolkata</option>
                <option value="mumbai">mumbai</option>
                <option value="chennai">Chennai</option>
            </select>
            <h3>Selected State {state}</h3>
    </div>
  )
}
