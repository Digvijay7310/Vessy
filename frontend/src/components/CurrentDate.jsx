import React from 'react'

function CurrentDate() {
    const now = new Date(Date.now());
  return (
    <p>{now.toLocaleString()}</p>
  )
}

export default CurrentDate