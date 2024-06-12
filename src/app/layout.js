import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

//Context
import { AuthProvider } from '../context/AuthContext';
import { EventProvider } from '../context/EventContext';

export const metadata = {
  title: "Onlybees Events",
  description: "Developed by Gaurav Joshi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <EventProvider>
            {children}
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
