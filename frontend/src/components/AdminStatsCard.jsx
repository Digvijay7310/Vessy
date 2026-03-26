import React from 'react'

export default function AdminStatsCard({title, value}) {
  return (
    <div className='bg-white p-2 rounded shadow flex flex-col items-center justify-center'>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="font-bold text-xs">{value}</p>
    </div>
  )
}
