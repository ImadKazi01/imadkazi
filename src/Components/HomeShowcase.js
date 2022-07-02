import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export const HomeShowcase = () => {
  return (
    <>
        <h3 className='text-3xl font-semibold text-center' id='latest-work'>Latest Work</h3>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
          <div className='w-100 py-32 rounded-lg shadow-lg bg-orange-400 flex justify-center hover:scale-105 ease-in-out duration-300'>
            <div className='opacity-0 hover:opacity-100 ease-in-out duration-300 absolute inset-0 z-10 flex justify-center items-center text-6xl text-white font-semibold' >
                01
            </div>
          </div>
          
        </div>
    </>
  )
}
