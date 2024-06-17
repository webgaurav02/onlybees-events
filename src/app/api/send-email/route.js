import QRCode from 'qrcode';
import connectMongo from '@/lib/mongodb';
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

        const { phone } = await req.json();

        const user = await User.findOne({ phone: phone });
        if (!user) {
            return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
        }

        // Include user ID in ticket and order details
        const userId = user._id;

        // Generate QR code for the ticket ID
        const qrCodeBuffer = await generateQrCodeBuffer(userId.toString());

        // Render the ticket template
        const ticketHtml = await ticketTemplate({
            userName: 'Gaurav',
            userEmail: 'gauravgames26@gmail.com',
            userPhone: user.phone,
            orderAmount: '2000.00',
            // feeAndTaxes: orderDetails.feeAndTaxes,
            // totalAmount: orderDetails.totalAmount,
            // eventName: orderDetails.eventName,
            // eventVenue: orderDetails.eventVenue,
            // eventDateTime: orderDetails.eventDateTime,
            bookingId: '1234214398189371289',
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
