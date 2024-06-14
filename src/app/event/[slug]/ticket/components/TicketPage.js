"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image';

//Components
import CheckoutContainer from './CheckoutContainer';

//React Accordian
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';

const Ticket = ({ event }) => {

  // console.log(event);

  const [tickets, setTickets] = useState([])
  const [ totalAmt, setTotalAmt ] = useState(0);

  useEffect(() => {
    if (event && event.ticketPrice) {
      const transformedData = Object.entries(event.ticketPrice).map(([phaseName, { quantity, price }]) => ({
        phaseName,
        quantity,
        price,
        selected: 0,
        amount: 0,
      }));
      setTickets(transformedData);
      console.log(tickets)
    }
  }, [event]);

  const updateTotalAmount = (tickets) => {
    const total = tickets.reduce((acc, ticket) => acc + ticket.amount, 0);
    setTotalAmt(total);
  };

  const handleIncrement = (phaseName) => {
    setTickets((prevState) => {
      const newTickets = prevState.map((ticket) =>
        ticket.phaseName === phaseName && ticket.selected < ticket.quantity && ticket.selected < 10
          ? {
              ...ticket,
              selected: ticket.selected + 1,
              amount: (ticket.selected + 1) * ticket.price,
            }
          : ticket
      );
      updateTotalAmount(newTickets);
      return newTickets;
    });
  };

  const handleDecrement = (phaseName) => {
    setTickets((prevState) => {
      const newTickets = prevState.map((ticket) =>
        ticket.phaseName === phaseName && ticket.selected > 0
          ? {
              ...ticket,
              selected: ticket.selected - 1,
              amount: (ticket.selected - 1) * ticket.price,
            }
          : ticket
      );
      updateTotalAmount(newTickets);
      return newTickets;
    });
  };
  
  const handleCheckout = () => {
    alert("/Checkout")
  }



  //To get formatted date
  const options = {
    weekday: 'short', // Fri
    year: 'numeric',
    month: 'short', // May
    day: '2-digit', // 31
  };
  const date2 = new Date(event.date);
  const formattedDate = date2.toLocaleString('en-US', options);

  return (
    <div className='py-20 flex flex-col items-center justify-center'>
      <div className='md:w-[60vw] w-[82vw]'>
        <div className='flex flex-row gap-4 justify-center mr-6'>
          <div className="p-0 flex flex-col justify-between h-[120px]">
            <p className="lg:mt-3 text-right text-2xl font-bold mb-1">{event.title}</p>
            <p className="text-right text-sm font-light mb-1">{event.venue}</p>
            <p className="text-right text-sm text-[#00FF38] mb-1">{formattedDate}</p>
            <p className="text-right text-sm">{event.city}</p>
          </div>
          <div className="flyer max-w-[150px] aspect-w-1 aspect-h-1">
            <Image
              src={event.imageUrl}
              loading='lazy'
              width={200}
              height={200}
              alt="Event Flyer"
            />
          </div>
        </div>
        <div className='h-fit mt-16 text-black bg-white p-3 rounded-lg'>
        <Accordion allowZeroExpanded>
            {tickets.map((ticket, index) => (
              <AccordionItem key={index} className=" border-gray-200">
                <AccordionItemHeading>
                  <AccordionItemButton className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-100">
                    <div className="flex items-center">
                      <div className="mr-4">
                        {/* Replace this with actual icons if available */}
                        <span role="img" aria-label="ticket-icon" className="text-2xl">🎟️</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{ticket.phaseName}</h3>
                        <p className="text-[0.6rem] font-light">Pass for {formattedDate}</p>
                      </div>
                    </div>
                    <div className="text-lg font-medium">₹{ticket.price}</div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="p-4 border border-black border-opacity-20 rounded-[15px]">
                  <div className="flex justify-center items-center">
                    <div className="flex gap-5 items-center">
                      <button
                        onClick={() => handleDecrement(ticket.phaseName)}
                        className=""
                      >
                        <span className='text-[2rem] font-light h-fit'>-</span>
                      </button>
                      <span className="mx-2 text-3xl">{ticket.selected}</span>
                      <button
                        onClick={() => handleIncrement(ticket.phaseName)}
                        className=""
                      >
                        <span className='text-[2rem] font-light h-fit'>+</span>
                      </button>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <CheckoutContainer totalAmt={totalAmt} handleCheckout={handleCheckout}/>
    </div>
  )
}

export default Ticket