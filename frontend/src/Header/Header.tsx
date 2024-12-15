import React from 'react'
import {IconAsset} from "@tabler/icons-react"

function Header() {
  return (
    <div className='w-full bg-black px-6 text-white flex justify-between h-28 items-center'>
        <div className='flex gap-2 items-center'>
            <IconAsset className='h-10 w-10' stroke={1.25}/>
            <div className='text-2xl font-semibold'>Hustlr</div>
            
        </div>
        <div>
            links  
        </div>
        <div>
            profile
        </div>

    </div>
  )
}

export default Header