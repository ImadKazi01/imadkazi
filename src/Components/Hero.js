import React from "react";
import logo from "../Assets/memoji.png";

export const Hero = () => {
  return (
    <div className="flex flex-wrap md items-center h-full z-20">
      <div className="flex flex-col items-center justify-center w-full">
        <div className=" flex flex-col items-center md:gap-8 gap-4 px-2 text-slate-50">
          <img className="md:w-[350px] w-[200px] bg-orange-400 rounded-full border-white md:border-8 border-4" src={logo} alt="Imad" />
          <p className="uppercase md:text-xl text-md font-bold">
            Website coming soon...
          </p>
          <h1 className="md:text-8xl text-4xl font-bold uppercase border-orange-500 ">
            Imad Kazi
          </h1>
          <p className="uppercase md:text-xl text-md font-bold">
            DESIGNER | DEVELOPER | PHOTOGRAPHER
          </p>
          <p className="md:text-xl text-md font-bold">
            Contact me at{" "}
            <a
              className="underline hover:text-orange-400"
              href="mailto:hello@imadkazi.co.uk"
            >
              hello@imadkazi.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
