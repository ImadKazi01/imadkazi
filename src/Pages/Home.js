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
        <Link to='latest-work' spy={true} smooth={true}>
          <div className='animate-bounce flex flex-col items-center justify-center text-slate-900 py-4 mb-18 md:mb-0'>
          <h3 className='text-2xl font-semibold px-6 py-2 rounded-md text-slate-100'> Explore</h3>
          <FontAwesomeIcon className=' text-3xl text-orange-500' icon={faChevronDown} />
        </div>
        </Link>
        
      </div>
      <div className='flex flex-col p-7 md:p-10 gap-10' classId='latest-work'>
        <HomeShowcase />
      </div>
    </>
  )
}
