// "use client"

// import { useEffect, useState } from "react";

//Components
import Navbar from "../../components/Navbar";
import EventDetails from "../../components/EventDetails";
import Footer from "../../components/Footer";

//Context
// import { useEvent } from "@/context/EventContext";


// export const metadata = {
//   metadataBase: new URL('https://event.onlybees.in'),
//   alternates: {
//     canonical: '/',
//     languages: {
//       'en-US': '/en-US',
//       'de-DE': '/de-DE',
//     },
//   },
//   openGraph: {
//     images: "/opengraph-hoot.png",
//     title: "Mix N Match - Hoot Society",
//     description: "Book your tickets for Mix N Match - Hoot Society",
//   },
//   title: "Mix N Match - Hoot Society Anniversary | Quills | Aedrian",
//   description: "Introducing \"Mix N Match\" - an innovative event IP poised to revolutionize Meghalaya's nightlife scene with a vibrant fusion of Hip-Hop, R&B, and Afrobeats music. Prepare to be immersed in an unparalleled audiovisual journey. At the heart of our mission is bridging the gap between local talent and national luminaries. We strive to spotlight the rich pool of talent within Meghalaya while also featuring renowned artists from across the nation. Through collaboration and adedicated platform, \"Mix N Match\" serves as a catalyst for artistic advancement and cultural exchange. With a steadfast commitment to excellence, every facet of the event is meticulously curated to ensure an unforgettable experience for all attendees.",
//   keywords: [
//     "Aedrian", "Quills", "Mix N Match event", "Hoot Society", "Meghalaya nightlife", "music festival in Meghalaya",
//     "Hip-Hop and R&B", "Afrobeats music", "local talent in Meghalaya", "national artists in India",
//     "live music event", "cultural exchange", "audiovisual experience", "entertainment in Meghalaya",
//     "upcoming music festivals", "music events in India"
//   ],
//   twitter: {
//     images: "/mm11.png",
//     card: "summary_large_image",
//     site: "@OnlyBees",
//     title: "Mix N Match - Hoot Society",
//     description: "Book your tickets for Mix N Match - Hoot Society",
//   },
//   date: "2024-06-15",
//   location: "Shillong, Meghalaya India",
//   tags: ["Music Festival", "Nightlife", "Live Performance", "Cultural Event", "DJ Night", "The Yeastern Civilization"],
//   organizer: "Onlybees, Hoot Society",
//   audience: "Music enthusiasts, Party-goers, Cultural explorers, Local and National artists",
//   socialMediaHashtags: ["#MixNMatchHootSociety", "#MeghalayaMusic", "#HootSocietyEvents"],
// };




export async function generateMetadata({ params }) {

  const { slug } = params;


  // try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events/eventinfo?slug=${slug}`);
    const result = await response.json();

    if (!result.success) {
      return {
        title: 'Event Not Found',
        description: 'The requested event could not be found.',
      };
    }

    const eventData = result.data;

    return {
      metadataBase: new URL('https://event.onlybees.in'),
      alternates: {
        canonical: '/',
        languages: {
          'en-US': '/en-US',
          'de-DE': '/de-DE',
        },
      },
      openGraph: {
        images: "/BeesLogoBg.png",
        title: eventData.title,
        description: eventData.description,
      },
      title: `${eventData.title} - Book Tickets on Onlybees.in`,
      description: eventData.description,
      twitter: {
        images: "/BeesLogoBg.png",
        card: "summary_large_image",
        site: "@OnlyBees",
        title: eventData.title,
        description: eventData.description,
      },
      date: eventData.date,
      location: eventData.venue,
      organizer: eventData.organizer,
      audience: "Music enthusiasts, Party-goers, Cultural explorers, Local and National artists",
      socialMediaHashtags: ["#Rave", "#MeghalayaMusic", "#Events"],
    };
  // } catch (error) {
  //   return {
  //     title: 'Error',
  //     description: 'An error occurred while fetching event details.',
  //   };
  // }
}



export default function Event({ params }) {

  const { slug } = params;




  return (
    <div className="bg-black text-white">
      <Navbar mode="dark" />
      <EventDetails slug={slug} />
      <Footer mode="dark" />
    </div>
  );
}
