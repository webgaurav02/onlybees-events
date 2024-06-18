import nodemailer from 'nodemailer';

// export const sendEmail = async (to, subject, htmlContent, pdfBuffer, qrCodeBuffer, ticketId) => {
export const sendEmail = async (to, subject, htmlContent, qrCodeBuffer, ticketId) => {
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
            html: htmlContent,
            attachments: [
                // {
                //     filename: `ticket_${ticketId}.pdf`,
                //     content: pdfBuffer,
                //     contentType: 'application/pdf',
                // },
                {
                    filename: 'qrcode.png',
                    content: qrCodeBuffer,
                    contentType: 'image/png',
                    cid: 'qrCodeImage', // same cid value as in the html img src
                },
            ],
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
