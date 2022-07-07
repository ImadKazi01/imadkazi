import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import logo from '../Assets/icon.svg'
import { Transition } from '@headlessui/react';

export const Nav = () => {
    const [isShowing, setIsShowing] = useState(false);
  return (
    <>
        <nav className="fixed top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 bg-zinc-50">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <div className='flex justify-center items-center m-0'>
                    <a href='/'>
                        <img
                        src={logo}
                        className="w-[40px] py-2 font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase text-white m-0"
                        alt='logo'
                        >
                        </img>
                    </a>
                    
                </div>
                
                <button
                className="text-white cursor-pointer text-3xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setIsShowing((isShowing) => !isShowing)}
                >
                <FontAwesomeIcon className="text-zinc-800" icon={faBars}></FontAwesomeIcon>
                </button>
            </div>
            <div
                className="hidden lg:flex flex-grow items-center">
                <ul className="flex flex-col gap-2 lg:flex-row list-none lg:ml-auto mt-1">
                    <NavLink exact={true} to="/" className="nav-item px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-zinc-800 hover:text-orange-400 hover:scale-110 cursor-pointer">
                        Home
                    </NavLink>
                    <NavLink to="/showcase" className="nav-item px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-zinc-800 hover:text-orange-400 hover:scale-110 hover:ease-in cursor-pointer">
                        Showcase
                    </NavLink>
                    <NavLink to="/about" className="nav-item px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-zinc-800 hover:text-orange-400 hover:scale-110 hover:ease-in cursor-pointer">
                        About
                    </NavLink>
                    <NavLink to="/contact" className="nav-item px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-zinc-800 hover:text-orange-400 hover:scale-110 hover:ease-in cursor-pointer">
                        Contact
                    </NavLink>
                </ul>
            </div>
        </div>
        </nav>
        <Transition show={isShowing}>
            <Transition.Child
                className="lg:hidden flex top-0 right-0 w-full bg-slate-900 p-10 text-white justify-item items-start fixed h-full z-50 transition duration-300"
                enter="duration-300 ease-in-out"
                enterFrom="translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="duration-300 ease-out"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-full opacity-100"
            >
                <button
                    className="fixed text-4xl bg-orange-400 px-5 py-3 rounded-sm z-20 flex items-center cursor-pointer top-5 right-8"
                    onClick={() => setIsShowing(!isShowing)}
                    >
                    <FontAwesomeIcon className='text-white' icon={faClose} />
                </button>
                <ul className="flex flex-col gap-2 lg:flex-row list-none lg:ml-auto mt-20 w-full">
                    <NavLink exact={true} to="/" className="nav-item px-3 py-2 flex items-center text-3xl uppercase font-semibold leading-snug text-slate-100 hover:text-orange-400 cursor-pointer">
                        Home
                    </NavLink>
                    <NavLink to="/showcase" className="nav-item px-3 py-2 flex items-center text-3xl uppercase font-semibold leading-snug text-slate-100 hover:text-orange-400 cursor-pointer">
                        Showcase
                    </NavLink>
                    <NavLink to="/about" className="nav-item px-3 py-2 flex items-center text-3xl uppercase font-semibold leading-snug text-slate-100 hover:text-orange-400 cursor-pointer">
                        About
                    </NavLink>
                    <NavLink to="/contact" className="nav-item px-3 py-2 flex items-center text-3xl uppercase font-semibold leading-snug text-slate-100 hover:text-orange-400 cursor-pointer">
                        Contact
                    </NavLink>
                </ul>
            </Transition.Child>
        </Transition>
       
    </>

  )
}
