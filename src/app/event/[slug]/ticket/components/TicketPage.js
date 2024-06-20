"use client";

//HTTP client
import axios from 'axios';

// Importing UUID v4 for generating unique IDs
import { generateReceiptId } from "@/lib/uniqueReceipt"

import React, { useState, useEffect } from 'react'

import loadRazorpay from '@/lib/loadRazorpay';

//Components
import CheckoutContainer from './CheckoutContainer';
import TicketSelection from './TicketSelection';
import TicketDetails from './TicketDetails';
import Header from './Header';


import { toast, Toaster } from "react-hot-toast";

//Context
import { useAuth } from '@/context/AuthContext';


import { useRouter } from "next/navigation"

// Import razorpay instance
// import razorpay from '@/lib/razorpay';

import Razorpay from 'razorpay';

const Ticket = ({ event }) => {
  const [tickets, setTickets] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [page, setPage] = useState("ticket");
  const [convFee, setConvFee] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const { user, login } = useAuth();
  const [ph, setPh] = useState("");
  const [form, setForm] = useState({
    firstname: null,
    lastname: null,
    email: null,
  });

  const router = useRouter();

  //To verify user jwt token using cookies
  const verifyUser = async () => {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        login(data.user, true);
        setLoading(false);
      }
    } catch (error) {
      return
    }
  };

  const loadScript = () => {
    loadRazorpay('https://checkout.razorpay.com/v1/checkout.js', () => {
        console.log('Razorpay Checkout script loaded successfully.');
    });
};

  //If user exists
  useEffect(() => {
    verifyUser();
    loadScript();
  }, [])


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

  const saveOrder = async (ticket, orderDetails) => {
    try {
      const res = await axios.post('/api/razorpay/save-order', {
        ticket,
        orderDetails,
        convenienceFee: convFee,
        platformFee,
        phone: ph,
        email: form.email,
      });
    } catch (error) {
      console.log("Some error occured")
    }
  }

  const createNewUser = async () => {
    try {
      const res = await fetch('/api/auth/registeruser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, phoneNumber: ph }),
      });

      const data = await res.json();
      if (data.success) {
        // verifyUser();
        return true;
      }
      else {
        toast.error('Some error occured!');
        return false
      }
    } catch (error) {
      toast.error('Some error occured!');
      return false
    }
  }

  const userExists = async () => {
    try {
      const url = new URL('/api/auth/finduser', window.location.origin);
      url.searchParams.append('phone', ph);

      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });


      if (res.ok) {
        const data = await res.json();
        return data.success;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const handleCheckout = async () => {
    try {
      const receiptId = generateReceiptId();
      const ticketDetails = tickets.filter(ticket => ticket.selected > 0).map(ticket => ({
        ticketType: ticket.phaseName, // Assuming phaseName serves as ticketType
        quantity: ticket.selected,    // Number of tickets selected
        price: ticket.price,          // Price per ticket
        // Add any other necessary fields here
      }));

      const userID = (user.isRegistered) ? user.userData._id : "1000000001";
      const notes = (user.isRegistered) ? "" : "New user";

      const response = await axios.post('/api/razorpay/order', {
        userId: userID, // Replace with actual user ID
        eventId: event._id, // Replace with actual event ID
        ticketDetails: ticketDetails,
        amount: totalAmt,
        currency: 'INR',
        receipt: receiptId, // Replace with actual receipt ID
        notes: { notes }, // Optional: Replace with any additional notes
      });

      const { order, ticket, orderDetails } = response.data;

      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      const razorpay = new Razorpay({
        key_id: "rzp_test_Bvrz7QTptAtItz",
        key_secret: "H3eOJ7LSzslugW2OIiKKGsMT",
      });

      // Open Razorpay checkout form
      const options = {
        key: razorpay.key_id,
        amount: order.amount * 100, // Amount in paise
        currency: order.currency,
        name: 'Onlybees',
        image: "https://shorturl.at/kPO66",
        description: `Entry tickets for ${event.title}`,
        order_id: order.id,

        handler: async function (response) {
          // alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
          const paymentId = response.razorpay_payment_id;
          if (user.userData) {
            saveOrder(ticket, { ...orderDetails, paymentId });
          }
          else {
            userExists().then((exists) => {
              if (exists) {
                saveOrder(ticket, { ...orderDetails, paymentId });
              } else {
                createNewUser().then((created) => {
                  saveOrder(ticket, { ...orderDetails, paymentId });
                })
              }
            });
          }
          router.push("/dashboard/my-tickets")
        },

        prefill: {
          name: `${form.firstname} ${form.lastname}`,
          email: form.email,
          contact: ph,
        },
        theme: {
          color: '#00FF38',
        },
      };

      if (typeof window !== 'undefined' && typeof window.Razorpay === 'function') {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error('Razorpay library not available');
      }


    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
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
          form={form}
          setForm={setForm}
          ph={ph}
          setPh={setPh}
        />
      )}
      <CheckoutContainer
        totalAmt={totalAmt}
        handleCheckout={handleCheckout}
        page={page}
        setPage={setPage}
        subtotal={subtotal}
        tickets={tickets}
        form={form}
        ph={ph}
      />
    </>
  );
};

export default Ticket;
