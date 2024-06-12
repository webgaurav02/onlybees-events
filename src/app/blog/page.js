import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

//Components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UnderDev from '../components/UnderDev'

const Blog = () => {
    return (
        <div className='bg-white text-black '>
            <Navbar mode="light" />
            <UnderDev />
            <Footer mode="light" />
        </div>
    )
}

export default Blog

