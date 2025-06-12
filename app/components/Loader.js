import React from 'react'
import { GridLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0a1e3c] to-[#0b2b5a] text-white flex items-center justify-center'>
        <GridLoader color='#0ff207' />
    </div>
  )
}
