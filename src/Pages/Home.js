import React from 'react';
import { Hero } from '../Components/Hero';
import { HomeShowcase } from '../Components/HomeShowcase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';

export const Home = () => {
  return (
    <>
      <div className='flex flex-col h-screen bg'>
        <Hero />
        <Link className='cursor-pointer z-30' to='latest-work' spy={true} smooth={true}>
          <div className='flex flex-col items-center justify-center text-slate-900 py-4 mb-24 md:mb-0'>
            <h3 className='text-2xl font-semibold px-6 py-2 rounded-md text-zinc-800'> Explore</h3>
            <FontAwesomeIcon className=' text-3xl text-orange-500 animate-bounce' icon={faChevronDown} />
          </div>
        </Link>
        
      </div>
      <div className='flex flex-col p-7 md:p-10 gap-10' id='latest-work'>
        <HomeShowcase />
      </div>
    </>
  )
}
