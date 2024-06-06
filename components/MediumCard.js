import Image from 'next/image'
import React from 'react'

function MediumCard({img, title }) {
  return (
    <div className='cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'>
    <div className='relative h-64 w-64'>
       
        <Image src={img}  layout="fill"
          className='rounded-xl' />
           </div>

           <div>
         <h2 className='text-2xl text-black mt-3'>{title}</h2>
       
         </div>
  </div>
  )
}

export default MediumCard