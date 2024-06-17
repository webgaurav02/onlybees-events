import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import QRCode from 'qrcode';
import connectMongo from '@/lib/mongodb';
import Order from '@/models/Order';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { sendEmail } from '@/lib/nodemailer'; // Adjust the import path


const renderTemplate = async (templatePath, data) => {
    const templateContent = await readFile(templatePath, 'utf-8');
    const template = compile(templateContent);
    return template(data);
};

const generateQrCode = async (text) => {
    try {
        const qrCodeUrl = await QRCode.toDataURL(text);
        return qrCodeUrl;
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
        const qrCodeUrl = await generateQrCode(newTicket._id.toString());

        // Render the ticket template
        const ticketHtml = await renderTemplate('../../../../templates/ticketTemplate.hbs', {
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone,
            orderAmount: orderDetails.amount,
            feeAndTaxes: orderDetails.feeAndTaxes,
            totalAmount: orderDetails.totalAmount,
            eventName: orderDetails.eventName,
            eventVenue: orderDetails.eventVenue,
            eventDateTime: orderDetails.eventDateTime,
            bookingId: newOrder._id.toString(),
            qrCodeUrl: qrCodeUrl,
        });

        
        // Send the email
        await sendEmail(user.email, 'Booking Confirmation', ticketHtml);

        return new Response(JSON.stringify({ success: true }), { status: 201 });


    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
};
