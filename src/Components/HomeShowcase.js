import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {ShowcaseData} from '../ShowcaseData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
AOS.init();

export const HomeShowcase = () => {
  return (
    <>
        <h3 className='text-3xl font-semibold text-center' id='latest-work'>Latest Work</h3>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 cursor-pointer text-center '>
          {ShowcaseData.map(data => (
            <div className='h-100 rounded-lg shadow-lg text-slate-100 text-3xl font-bold flex flex-col justify-center items-center gap-2 hover:scale-105 hover:bg-orange-400 ease-in-out duration-300 tb' key={data.id}  style={{backgroundImage:`linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${data.thumbnail})`}}>
                <h3 className='z-20'>{data.name}</h3>
                <p className='text-xl z-20 px-4'>{data.project}</p>
              <div className='flex flex-col opacity-0 hover:opacity-100 hover:bg-orange-400/70 rounded-lg ease-in-out duration-200 absolute inset-0 justify-center items-center text-white font-semibold' >
                <p className='text-xl font-regular translate-y-20 hover:translate-x-4 ease-in duration-300'>View Project <FontAwesomeIcon className='ml-1' icon={faArrowRight}/></p>
              </div>
            </div>
          ))}  
        </div>
    </>
  )
}
