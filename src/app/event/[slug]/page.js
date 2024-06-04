"use client"

import { useEffect, useState } from "react";

//Components
import Navbar from "../../components/Navbar";
import EventDetails from "../../components/EventDetails";
import Footer from "../../components/Footer";
import Loading from "@/app/components/Loading";
import EventNotFound from "@/app/components/EventNotFound";




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







export default function Event({ params }) {

  const { slug } = params;
  const [ eventData, setEventData ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  const fetchEventData = async (slug) => {
    setIsLoading(true);
    const res = await fetch(`/api/events/eventinfo?slug=${slug}`);
    const dataRecv = await res.json();

    if (!dataRecv.success) {
      setIsLoading(false);
      throw new Error('Event not found');
    }
    setIsLoading(false);
    return dataRecv.data;
  }

  useEffect(() => {
    fetchEventData(slug)
      .then(setEventData)
      .catch(setError);
  }, [slug]);



  return (
    <div className="bg-black text-white">
      <Navbar mode="dark" />
      { error && <EventNotFound />}
      { isLoading && <Loading />}
      { !error && !isLoading && <EventDetails event={eventData} slug={slug} />}
      <Footer mode="dark" />
    </div>
  );
}
