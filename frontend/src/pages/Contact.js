import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useApi } from '../context/ApiContext';

const Contact = () => {
  const { profile, submitContact } = useApi();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await submitContact(formData);
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  };

  return (
    <div className="pt-20 pb-16 bg-blue-100">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to contact me using the form below.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-blue-800 text-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {profile?.email && (
                  <div className="flex items-start">
                    <div className="bg-blue-700 p-3 rounded-full mr-4">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-200">Email</h3>
                      <a href={`mailto:${profile.email}`} className="text-white hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile?.phone && (
                  <div className="flex items-start">
                    <div className="bg-blue-700 p-3 rounded-full mr-4">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-200">Phone</h3>
                      <a href={`tel:${profile.phone}`} className="text-white hover:underline">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile?.location && (
                  <div className="flex items-start">
                    <div className="bg-blue-700 p-3 rounded-full mr-4">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-200">Location</h3>
                      <p className="text-white">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                  {profile?.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 p-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  )}
                  
                  {profile?.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 p-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}
                  
                  {profile?.twitter && (
                    <a
                      href={profile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 p-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Me a Message</h2>
              
              {formStatus.submitted ? (
                <div
                  className={`p-4 mb-6 rounded-md ${
                    formStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  <div className="flex items-center">
                    {formStatus.success ? (
                      <CheckCircle className="mr-2" size={20} />
                    ) : (
                      <AlertCircle className="mr-2" size={20} />
                    )}
                    <p>{formStatus.message}</p>
                  </div>
                  <button
                    onClick={() => {
                      setFormStatus({ submitted: false, success: false, message: '' });
                      setFormErrors({});
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Project Inquiry"
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.subject}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your message here..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors w-full"
                  >
                    Send Message <Send size={18} className="ml-2" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
