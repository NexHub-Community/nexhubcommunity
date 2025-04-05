import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import React from 'react';
import { submitRecruitmentApplication } from '../utils/api';

const JoinBenefitCard = ({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full">
    <div className="text-primary dark:text-primary-light mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
  </div>
);

const Join = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioLink: '',
    role: '',
    experience: '',
    message: '',
    resume: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Use the API utility to submit the application
      const response = await submitRecruitmentApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        portfolioLink: formData.portfolioLink,
        role: formData.role,
        experience: formData.experience,
        message: formData.message
      });
      
      // If resume file is uploaded, handle it separately (would require additional API for file upload)
      // This is a placeholder for future file upload implementation
      
      if (response.success) {
        console.log('Application submitted successfully:', response);
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          portfolioLink: '',
          role: '',
          experience: '',
          message: '',
          resume: null
        });
      } else {
        throw new Error(response.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'There was an error submitting your application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative">
              <span className="relative inline-block">
                Join Our <span className="text-primary dark:text-primary-light">Team</span>
                <div className="absolute -top-6 -right-6 w-12 h-12 text-primary dark:text-primary-light animate-spin-slow hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Be part of a dynamic team that's shaping the future of technology and innovation. 
              At NexHub, we value creativity, passion, and dedication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800"></div>
        <div className="container mx-auto px-4 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 relative"
          >
            Our <span className="text-primary dark:text-primary-light">Recruitment</span> Process
            <div className="absolute -top-4 -right-4 w-8 h-8 text-primary/30 dark:text-primary-light/30 animate-ping hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
      </div>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative space-y-4">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-primary dark:text-primary-light"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Application Review</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Submit your application and portfolio. Our team will review your skills and experience.
                </p>
              </div>
        </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative space-y-4">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-primary dark:text-primary-light"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Team Interview</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Meet with our team to discuss your experience, showcase your skills, and learn about NexHub.
                </p>
              </div>
            </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative space-y-4">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-primary dark:text-primary-light"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
            </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Final Selection</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Selected candidates will receive an offer to join our dynamic team.
                </p>
              </div>
        </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-900/50 dark:to-transparent"></div>
        <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-primary-light/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 dark:bg-primary-light/5 rounded-full blur-2xl"></div>
            
            <h2 className="text-4xl font-bold text-center mb-12 relative text-gray-800 dark:text-white">
              Apply Now
              <div className="absolute -top-2 -right-2 w-6 h-6 text-primary/30 dark:text-primary-light/30 animate-bounce hidden md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                </svg>
              </div>
          </h2>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-green-600 dark:text-green-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Application Submitted Successfully!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  Thank you for your interest in joining our team. We'll review your application and get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-all duration-300"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Portfolio/GitHub Link</label>
                    <input
                      type="url"
                      placeholder="Enter your portfolio or GitHub link"
                      className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Position/Role *</label>
                    <select
                      required
                      className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select a role</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="content-creator">Content Creator</option>
                      <option value="event-coordinator">Event Coordinator</option>
                      <option value="marketing">Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Experience Level *</label>
                    <select
                      required
                      className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="experienced">Experienced (3-5 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Why do you want to join our team? *</label>
                  <textarea
                    required
                    placeholder="Tell us about yourself and why you want to join NexHub"
                    className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white h-32"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
            </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">Upload Resume/CV</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-5 py-3 border-2 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary dark:focus:ring-primary-light/30 dark:focus:border-primary-light transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    onChange={handleFileChange}
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Accepted formats: PDF, DOC, DOCX (max 5MB)
              </p>
            </div>

                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
                    {submitError}
                  </div>
                )}

                <div className="flex justify-center mt-12">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
            </div>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
          </div>
              </form>
            )}
        </motion.div>
      </div>
      </section>
    </div>
  );
};

export default Join; 