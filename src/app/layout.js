import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { AuthProvider, useAuth } from '../context/AuthContext';

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
          {children}
        </AuthProvider>
      </body>
      {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}

    </html>
  );
}
