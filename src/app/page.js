

import './globals.css';


import Image from 'next/image';


//Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventSection from './components/EventSection';
import OurWorkSection from './components/OurWorkSection';
import WhatWeDo from './components/WhatWeDo';
import Clients from './components/Clients';
import SecondaryText from './components/SecondaryText';

//Assets
import text from "../../public/Text.svg"


const Home = () => {

  return (
    <div className='home-page bg-white text-black min-h-[100svh] overflow-x-hidden'>
      <Navbar mode="light" />
      <div className='pt-10 pb-20 home-page'>
        <HeroSection />
        <hr className='mx-10 my-10 border-0 border-b border-black' />
        <EventSection />
        <hr className='mx-10 my-10 border-0 border-b border-black' />
        <OurWorkSection />
        <hr className='mx-10 my-10 border-0 border-b border-black' />
        <Image
          src={text}
          width="0"
          height="0"
          sizes="100vw"
          className="h-full w-full object-cover md:w-1/2 md:mx-auto md:px-0 px-10 my-20" alt="WE ARE CREATIVE PROBLEM SOLVERS. ONLY THE BEST."
        />
        <hr className='mx-10 my-10 border-0 border-b border-black' />
        <WhatWeDo />
        <hr className='mx-10 my-10 border-0 border-b border-black' />
        <Clients />
        <hr className='mx-10 my-10 border-0 border-b border-black' />
        <SecondaryText />
      </div>
      <Footer mode="light" />
    </div>
  );
}

export default Home;
