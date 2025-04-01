import { motion } from 'framer-motion';
import React from 'react';

// Import team member images
import shivamImg from '../assets/MembersImages/shivam.jpg'; 
import namanImg from '../assets/MembersImages/naman.jpg';
import vaidicImg from '../assets/MembersImages/vaidic.jpg';
import adityaImg from '../assets/MembersImages/adityaa.jpeg';
import shivaniImg from '../assets/MembersImages/shivani.jpg';
import arnavImg from '../assets/MembersImages/arnav.jpg';
import shreyImg from '../assets/MembersImages/shrey.jpg';
import mitaliImg from '../assets/MembersImages/mitali.jpg';

const TeamMember = ({ 
  name, 
  role, 
  image,
  linkedin = "#", 
  instagram = "#" 
}: { 
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  instagram?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="mb-4 rounded-lg overflow-hidden w-full max-w-xs">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-60 object-contain object-center"
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
        {name}
      </h3>
      
      <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full px-4 py-1 text-sm font-medium mt-2 mb-4">
        {role}
      </div>
      
      <div className="flex space-x-4">
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn`}>
          <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Instagram`}>
          <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Shivam Sharma",
      role: "Chairperson",
      image: shivamImg
    },
    {
      id: 2,
      name: "Vaidic Tiwari",
      role: "Advisor",
      image: vaidicImg
    },
    {
      id: 3,
      name: "Naman Sisodiya",
      role: "Advisor",
      image: namanImg
    },
    {
      id: 4,
      name: "Aditya Patel",
      role: "Vice Chairperson & Technical Head",
      image: adityaImg
    },
    {
      id: 5,
      name: "Shivani Rathore",
      role: "PR Head",
      image: shivaniImg
    },
    {
      id: 6,
      name: "Arnav Bhokre",
      role: "Event coordinator",
      image: arnavImg
    },
    {
      id: 7,
      name: "Shrey Patidar",
      role: "Treasurer",
      image: shreyImg
    },
    {
      id: 8,
      name: "Mitali Rampurkar",
      role: "General Secretary",
      image: mitaliImg
    },
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-primary dark:text-primary-light">Team</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the passionate individuals behind NexHub Community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member) => (
            <TeamMember 
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team; 