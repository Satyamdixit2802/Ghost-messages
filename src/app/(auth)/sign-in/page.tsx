'use client'
import { Button } from '@/components/ui/button';
import React from 'react'
import {toast} from 'sonner'
const Signin = () => {
  return (
    <div className= 'bg-black h-screen text-white'>
      <Button variant={'outline' }  onClick={()=>{  toast.error('Signup failed',
            {
                description :"validity compromises",
                 position: "top-left"
                
            },
          
      )}}>
    
    Default
  
      </Button>
      
    </div>
  )
}

export default Signin
