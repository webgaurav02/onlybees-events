import QRCode from 'qrcode';
import connectMongo from '@/lib/mongodb';
import Order from '@/models/Order';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import Event from '@/models/Event'
import { sendEmail } from '@/lib/nodemailer'; // Adjust the import path
import emailTemplate from '@/templates/emailTemplate.hbs'; // Import the precompiled template
import pdfTemplate from '@/templates/pdfTemplate.hbs'; // Import the precompiled template
import { generatePdfFromHtml } from '@/lib/generateTicketPDF';



const generateQrCodeUrl = async (text) => {
    try {
        const qrCodeUrl = await QRCode.toDataURL(text);
        return qrCodeUrl;
    } catch (err) {
        console.error('Error generating QR code', err);
        throw err;
    }
};

const formatDate = (date) => {
    // Parse the date string into a Date object
    const newDate = new Date(date);
    // Define the offset for the target timezone (+05:30)
    const targetOffset = 5.5 * 60; // 5.5 hours in minutes
    // Get the current offset of the local system timezone
    const localOffset = newDate.getTimezoneOffset(); // in minutes
    // Calculate the total offset to apply
    const totalOffset = targetOffset + localOffset;
    // Apply the offset to the date
    date.setMinutes(newDate.getMinutes() + totalOffset);
    // Format the date to the desired string representation
    const pad = (num) => String(num).padStart(2, '0');
    const formattedDate = `${newDate.getFullYear()}-${pad(newDate.getMonth() + 1)}-${pad(newDate.getDate())}, ${pad(newDate.getHours())}:${pad(newDate.getMinutes())}:${pad(newDate.getSeconds())}.${String(newDate.getMilliseconds()).padStart(3, '0')}+05:30`;
    return formattedDate; // "2024-06-16, 17:49:46.255+05:30"
}


export const POST = async (req, res) => {
    try {
        await connectMongo();

        const { ticket, orderDetails, convenienceFee, platformFee, phone, email } = await req.json();

        const totalQuantity = ticket.ticketDetails.reduce((accumulator, current) => {
            return accumulator + current.quantity;
        }, 0);

        const selectedTickets = ticket.ticketDetails.map(ticketItem => `${ticketItem.ticketType} (x${ticketItem.quantity})`);

        const user = await User.findOne({ phone: phone });
        if (!user) {
            return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
        }

        const event = await Event.findOne({ _id: ticket.event });
        if (!event) {
            return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
        }
        const dateObj = new Date(event.date);
        const date = dateObj.getDate(); // 10
        const month = dateObj.toLocaleString('default', { month: 'long' }); // June

        // Include user ID in ticket and order details
        const userId = user._id;
        const newTicket = new Ticket({ ...ticket, user: userId });
        const newOrder = new Order({ ...orderDetails, user: userId });

        //Calculate amount
        const amount = orderDetails.amount - (convenienceFee + platformFee);

        // Generate QR code for the pdf ticket
        const qrCodeUrl = await generateQrCodeUrl(newTicket._id.toString());

        // Render the ticket template
        const emailHtml = emailTemplate({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            amount: amount,
            convenienceFee: convenienceFee,
            platformFee: platformFee,
            totalAmount: orderDetails.amount,
            eventTitle: event.title,
            venue: event.venue,
            eventDateTime: formatDate(event.date),
            bookingDate: formatDate(newOrder.createdAt),
            tickets: selectedTickets,
            transactionId: orderDetails.paymentId,
            bookingId: newOrder._id.toString(),
        });

        // Render the ticket template
        const pdfHtml = await pdfTemplate({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            amount: amount,
            convenienceFee: convenienceFee,
            platformFee: platformFee,
            totalAmount: orderDetails.amount,
            totalQuantity: totalQuantity,
            eventTitle: event.title,
            venue: event.venue,
            formattedDate: date,
            formattedMonth: month,
            formattedTime: '9:00 PM',
            tickets: selectedTickets,
            bookingId: ticket._id,
            transactionId: orderDetails.paymentId,
            image: qrCodeUrl, // reference to the CID of the attached image
        });

        const ticketId = ticket._id;

        // await Ticket.findByIdAndUpdate( ticketId, { qrLink: qrCodeUrl, })

        await newOrder.save();
        await newTicket.save();

        // Update user's bookings
        await User.findByIdAndUpdate(userId, {
            $push: {
                bookings: {
                    eventId: ticket.event,
                    ticketDetails: ticket.ticketDetails,
                    bookingDate: new Date(),
                    orderId: newOrder._id,
                    ticketId: ticketId,
                    qrLink: qrCodeUrl,
                },
            },
        });


        // Generate PDF from HTML
        const pdfBuffer = await generatePdfFromHtml(pdfHtml);

        // Send the email with PDF and QR code attachments
        await sendEmail(email, `Booking Confirmation & Tickets - ${event.title}`, emailHtml, pdfBuffer, ticketId);

        return new Response(JSON.stringify({ success: true }), { status: 201 });


    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
};
