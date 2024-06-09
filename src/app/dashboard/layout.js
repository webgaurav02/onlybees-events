import React from 'react'

const Dashboard = ({ children }) => {
  return (
    <div className='bg-white min-h-[100svh] text-black'>
        { children }
    </div>
  )
}

export default Dashboard