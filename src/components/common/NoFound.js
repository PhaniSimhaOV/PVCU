import React from 'react'

const NoFound = ({name}) => {
  return (
    <div className='my-6 text-center bg-[#FFE7C1] text-[#8B4513] font-medium py-1 rounded-sm'>
      <p>No {name} Found</p>
    </div>
  )
}

export default NoFound
