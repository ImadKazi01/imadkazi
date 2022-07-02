import React from 'react'

export const Hero = () => {
  return (
    <div className="flex flex-wrap md items-center h-full">
        <div className="flex flex-col items-center justify-center w-full">
            <div className=" flex flex-col items-center gap-4 px-2 mt-44 text-slate-100">
                <h1 className="md:text-9xl text-6xl font-bold uppercase tracking-wider border-orange-500 ">Imad Kazi</h1> 
                <p className="uppercase md:text-xl text-md font-bold">
                    DESIGNER | DEVELOPER | PHOTOGRAPHER
                </p>
            </div>
        </div>
    </div>
  )
}
