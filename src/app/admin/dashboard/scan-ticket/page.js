"use client"

import React, { useState } from 'react'


//QR Code Scanner
import QrScanner from 'react-qr-scanner';

const ScanTicket = () => {
    const [result, setResult] = useState(null);

    const handleScan = (data) => {
        if (data) {
            setResult(data);
            // Call your API to mark the ticket as scanned
            fetch('/api/tickets/scan-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticketId: data.text }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 320,
        width: 320,
        objectFit: "cover",
        outline: "2px solid #00FF38",
        outlineOffset: "-30px",
    };

    return (
        <div className='text-center h-screen flex flex-col justify-center items-center'>
            <div className=''>
                {!result && <QrScanner
                    delay={2000}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                    legacyMode={true}
                    className="mx-auto w-full"
                />}
                {result && <p>Ticket with ID #{result.text} successfuly scanned!</p>}
            </div>
        </div>
    );
}

export default ScanTicket;