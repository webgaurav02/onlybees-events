"use client";

import React, { useState, useEffect } from 'react'

//Components
import CheckoutContainer from './CheckoutContainer';
import TicketSelection from './TicketSelection';
import TicketDetails from './TicketDetails';
import Header from './Header';

const Ticket = ({ event }) => {
  const [tickets, setTickets] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [page, setPage] = useState("ticket");
  const [convFee, setConvFee] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // This is required for Chrome to show the confirmation dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
    }
  }, [event]);

  const updateAmounts = (tickets) => {
    const subtotalAmt = tickets.reduce((acc, ticket) => acc + ticket.amount, 0);
    const convFeeAmt = Math.round(0.02 * subtotalAmt);
    const platformFeeAmt = Math.round(0.02 * subtotalAmt);
    const totalAmtCalc = subtotalAmt + convFeeAmt + platformFeeAmt;

    setSubtotal(subtotalAmt);
    setConvFee(convFeeAmt);
    setPlatformFee(platformFeeAmt);
    setTotalAmt(totalAmtCalc);
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
      updateAmounts(newTickets);
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
      updateAmounts(newTickets);
      return newTickets;
    });
  };

  const handleCheckout = () => {
    alert("/Checkout");
  };

  return (
    <>
      <Header
        mode="dark"
        page={page}
        setPage={setPage}
        event={event}
      />
      {page === "ticket" && (
        <TicketSelection
          event={event}
          tickets={tickets}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          subtotal={subtotal}
        />
      )}
      {page === "details" && (
        <TicketDetails
          event={event}
          tickets={tickets}
          totalAmt={totalAmt}
          convFee={convFee}
          platformFee={platformFee}
        />
      )}
      <CheckoutContainer
        totalAmt={totalAmt}
        handleCheckout={handleCheckout}
        page={page}
        setPage={setPage}
        subtotal={subtotal}
        tickets={tickets}
      />
    </>
  );
};

export default Ticket;
