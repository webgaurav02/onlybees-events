// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use 'gmail' or another email service
//     auth: {
//         user: process.env.EMAIL_USER, // Your email address
//         pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//     },
// });

// export const sendTicketEmail = async (email, ticketDetails) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER, // Your email address
//         to: email, // Recipient's email address
//         subject: 'Your Ticket Details',
//         text: `Thank you for your purchase. Here are your ticket details: ${JSON.stringify(ticketDetails)}`,
//         html: `<strong>Thank you for your purchase. Here are your ticket details:</strong><br>${JSON.stringify(ticketDetails)}`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };


// lib/sendEmail.js
import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        // Set email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
