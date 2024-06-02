import React from 'react'

//Components
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import TicketContainer from './components/TicketContainer';


const Ticket = ({ params }) => {

    const { slug } = params;

    return (
        <div className="bg-black text-white">
            <Navbar mode="dark" />
            <TicketContainer slug={slug} />
            <Footer mode="dark" />
        </div>
    )
}

export default Ticket