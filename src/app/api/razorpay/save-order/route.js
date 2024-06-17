import QRCode from 'qrcode';
import connectMongo from '@/lib/mongodb';
import Order from '@/models/Order';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { sendEmail } from '@/lib/nodemailer'; // Adjust the import path
import ticketTemplate from '@/templates/ticketTemplate.hbs'; // Import the precompiled template
import { generatePdfFromHtml } from '@/lib/generateTicketPDF';


const generateQrCodeBuffer = async (text) => {
    try {
        const qrCodeBuffer = await QRCode.toBuffer(text);
        return qrCodeBuffer;
    } catch (err) {
        console.error('Error generating QR code', err);
        throw err;
    }
};



export const POST = async (req, res) => {
    try {
        await connectMongo();

        const { ticket, orderDetails, phone } = await req.json();

        const user = await User.findOne({ phone: phone });
        if (!user) {
            return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
        }

        // Include user ID in ticket and order details
        const userId = user._id;
        const newTicket = new Ticket({ ...ticket, user: userId });
        const newOrder = new Order({ ...orderDetails, user: userId });

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
                },
            },
        });

        // Generate QR code for the ticket ID
        const qrCodeBuffer = await generateQrCodeBuffer(newTicket._id.toString());

        // Render the ticket template
        const ticketHtml = ticketTemplate({
            userName: user.firstname,
            userEmail: user.email,
            userPhone: user.phone,
            orderAmount: orderDetails.amount,
            // feeAndTaxes: orderDetails.feeAndTaxes,
            // totalAmount: orderDetails.totalAmount,
            // eventName: orderDetails.eventName,
            // eventVenue: orderDetails.eventVenue,
            // eventDateTime: orderDetails.eventDateTime,
            bookingId: newOrder._id.toString(),
            qrCodeCid: 'qrCodeImage', // reference to the CID of the attached image
        });

        // Generate PDF from HTML
        const pdfBuffer = await generatePdfFromHtml(ticketHtml);

        // Send the email with PDF and QR code attachments
        await sendEmail(user.email, 'Booking Confirmation', ticketHtml, pdfBuffer, qrCodeBuffer);

        return new Response(JSON.stringify({ success: true }), { status: 201 });


    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
};
