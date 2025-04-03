import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageBanner from '../components/PageBanner';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description?: string;
  summary?: string;
  time?: string;
  organizer?: string;
  capacity?: string;
  requirements?: string[];
  agenda?: { time: string; activity: string }[];
  image?: string;
  banner?: string;
}

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the event data from an API
    // For now, we'll mock the data based on the eventId
    const mockEvents: Record<string, Event> = {
      '1': {
        id: 1,
        name: "AI/ML Bootcamp",
        date: "April 15, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "Online",
        description: "A hands-on workshop on AI and ML fundamentals, featuring industry experts. Learn the basics of machine learning algorithms, data preparation, and model training.",
        organizer: "NexHub AI Team",
        capacity: "100 participants",
        banner: "/banners/ai-ml-bootcamp.jpg",
        requirements: [
          "Basic programming knowledge",
          "Laptop with internet connection",
          "Python installed (preferably with Anaconda)"
        ],
        agenda: [
          { time: "10:00 AM", activity: "Introduction to ML concepts" },
          { time: "11:30 AM", activity: "Data preparation workshop" },
          { time: "1:00 PM", activity: "Lunch break" },
          { time: "2:00 PM", activity: "Building your first ML model" },
          { time: "3:30 PM", activity: "Q&A and next steps" }
        ]
      },
      '2': {
        id: 2,
        name: "Web3 Workshop Series",
        date: "May 10, 2025",
        time: "11:00 AM - 5:00 PM",
        location: "NexHub HQ",
        description: "Explore blockchain technology, smart contracts, and decentralized applications in this comprehensive workshop. Perfect for developers looking to expand their skills into Web3.",
        organizer: "NexHub Blockchain Division",
        capacity: "50 participants",
        requirements: [
          "JavaScript knowledge",
          "Basic understanding of web development",
          "Laptop with MetaMask installed"
        ],
        agenda: [
          { time: "11:00 AM", activity: "Web3 fundamentals" },
          { time: "12:30 PM", activity: "Smart contract basics" },
          { time: "1:30 PM", activity: "Lunch break" },
          { time: "2:30 PM", activity: "Building a simple dApp" },
          { time: "4:00 PM", activity: "Deployment and best practices" }
        ]
      },
      // Add more events as needed
    };

    // Adding older events
    const oldEvents: Record<string, Event> = {
      '101': {
        id: 101,
        name: "HackWave 2024",
        date: "January 10, 2024",
        time: "9:00 AM - 9:00 PM (36 hours)",
        location: "NexHub HQ",
        summary: "A 36-hour hackathon where teams built innovative solutions for community challenges.",
        description: "HackWave 2024 was our biggest hackathon yet, bringing together over 200 developers, designers, and innovators to solve real-world problems. Teams worked for 36 hours straight to build prototypes that addressed community challenges.",
        image: "/event-hackathon.jpg",
        organizer: "NexHub Events Team",
      },
      // Add more previous events
    };

    const allEvents = { ...mockEvents, ...oldEvents };
    
    setTimeout(() => {
      if (eventId && allEvents[eventId]) {
        setEvent(allEvents[eventId]);
      }
      setLoading(false);
    }, 500); // Simulate loading

  }, [eventId]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-24 pb-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Event not found</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">The event you're looking for does not exist or has been removed.</p>
        <Link to="/events" className="mt-6 inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          Back to Events
        </Link>
      </div>
    );
  }

  const isPastEvent = new Date(event.date) < new Date();

  return (
    <div className="pt-24 pb-16">
      {/* Event Banner */}
      <PageBanner 
        title={event.name} 
        subtitle={`${event.date} | ${event.location}`}
        backgroundImage={event.banner || "https://placehold.co/1200x400/3563E9/FFFFFF?text=" + encodeURIComponent(event.name)}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Event header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{event.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  {event.time && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </div>
                  )}
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  {event.organizer && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {event.organizer}
                    </div>
                  )}
                  {event.capacity && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {event.capacity}
                    </div>
                  )}
                </div>
              </div>
              
              {!isPastEvent && (
                <Link 
                  to={`/events/${event.id}/register`}
                  className="mt-4 md:mt-0 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
                >
                  Register Now
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Event description */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About This Event</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {event.description || event.summary}
              </p>

              {/* Requirements */}
              {event.requirements && event.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                    {event.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Agenda */}
              {event.agenda && event.agenda.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Event Agenda</h3>
                  <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-6 mt-1 bg-primary h-2.5 w-2.5 rounded-full"></div>
                        <div>
                          <span className="font-medium text-primary dark:text-primary-light">{item.time}</span>
                          <p className="text-gray-600 dark:text-gray-300">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Registration CTA for upcoming events */}
            {!isPastEvent && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Ready to join us?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Secure your spot at this exciting event. Spaces are limited!
                </p>
                <Link 
                  to={`/events/${event.id}/register`}
                  className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors inline-flex items-center"
                >
                  Register Now
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation links */}
        <div className="mt-8 flex justify-between">
          <Link 
            to="/events" 
            className="text-primary dark:text-primary-light hover:underline flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>
          {!isPastEvent && (
            <Link 
              to={`/events/${event.id}/register`}
              className="text-primary dark:text-primary-light hover:underline flex items-center"
            >
              Register
              <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 