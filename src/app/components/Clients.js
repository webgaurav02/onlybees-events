import React from 'react'

import Image from 'next/image'

//Assets
import clients from "../../../public/clients.png"

const Clients = () => {
    return (
        <div className='md:mx-40 mx-10'>
            <h2 className='text-black font-semibold text-3xl lg:text-3xl my-5 mb-5 mx-auto font-coolvetica uppercase text-center'>CLIENTS</h2>
            <Image
                src={clients}
                width="0"
                height="0"
                sizes="100vw"
                className='rounded-2xl mt-2 h-full w-full object-cover'
                alt='Clients'
            />
            <p className='font-light text-center'>AND MORE</p>
        </div>
    )
}

export default Clients