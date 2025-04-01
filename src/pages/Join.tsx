import { motion } from 'framer-motion';

const JoinBenefitCard = ({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full">
    <div className="text-primary dark:text-primary-light mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
  </div>
);

const Join = () => {
  const benefits = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Join a Thriving Community",
      description: "Connect with like-minded tech enthusiasts, share ideas, and collaborate on exciting projects."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Exclusive Workshop Access",
      description: "Get priority registration and discounts for all workshops, hackathons, and special events."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Career Opportunities",
      description: "Access job postings, networking events, and mentorship opportunities to accelerate your career."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Knowledge Sharing",
      description: "Access our resource library, discussion forums, and code repositories to enhance your skills."
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Header Section */}
      <div className="bg-primary dark:bg-primary-dark py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Become a Part of NexHub!</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Join our community of developers, designers, and tech enthusiasts.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Why Join NexHub?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We welcome developers, designers, and tech enthusiasts to join our community. 
            Stay updated with events, collaborate, and grow your skills with us!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <JoinBenefitCard
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Ready to Join?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Sign up today to become a part of our growing community of tech enthusiasts!
          </p>
          <a 
            href="https://forms.google.com/nexhub-signup" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-lg font-medium"
          >
            Sign Up Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Is there a membership fee?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, joining NexHub is completely free. Some special events may have nominal fees to cover costs, but community membership is free.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Do I need to be an expert to join?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Not at all! We welcome members of all skill levels, from beginners to experts. Our community is all about learning and growing together.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                How can I contribute to the community?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                There are many ways to contribute: presenting at meetups, helping organize events, mentoring others, or contributing to community projects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Join; 