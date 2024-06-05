import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        {children}
      </body>
      {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
      
    </html>
  );
}
