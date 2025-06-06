import React from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useApi } from '../context/ApiContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { profile } = useApi();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-800 text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Me</h3>
            <p className="text-black mb-4">
              {profile?.bio?.substring(0, 150)}
              {profile?.bio && profile.bio.length > 150 ? '...' : ''}
            </p>
            {profile?.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white hover:bg-white-100 text-black py-1 px-3 rounded-md transition-colors"
              >
                Get Resume
              </a>
            )}
          </div>

          <div className=''>
            <h3 className="text-xl font-bold mb-4 ">Quick Links</h3>
            <ul className="space-y-6 flex ">
              <ul className="space-y-6 flex ">
                <li>
                  <Link to="/" className="space-y-5 text-blue-100 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
              </ul>
              <ul className="space-y-6 flex ">
                <li>
                  <Link to="/education" className="space-y-5 text-blue-100 hover:text-white transition-colors">
                    Education
                  </Link>
                </li>
              
                <li>
                  <Link to="/skills" className="space-y-5 text-blue-100 hover:text-white transition-colors">
                    Skills
                  </Link>
                </li>
                
              </ul>
            </ul>

            <ul className="space-y-6 flex justify-center">  
              <li>
                <Link to="/projects" className="space-y-5 text-blue-100 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <ul className="space-y-6 flex">
                <li>
                  <Link to="/experience" className="space-y-5 text-blue-100 hover:text-white transition-colors">
                    Experience
                  </Link>
                </li>
                <ul className="space-y-6 flex">
                  <li>
                    <Link to="/contact" className="space-y-5 text-blue-100 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </ul> 
            </ul>

          </div>

          <div className=''>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {profile?.email && (
                <li className="flex items-center">
                  <Mail size={18} className="mr-2 text-blue-300" />
                  <a href={`mailto:${profile.email}`} className="text-blue-100 hover:text-white">
                    {profile.email}
                  </a>
                </li>
              )}
              {profile?.phone && (
                <li className="flex items-center">
                  <Phone size={18} className="mr-2 text-blue-300" />
                  <a href={`tel:${profile.phone}`} className="text-blue-100 hover:text-white">
                    {profile.phone}
                  </a>
                </li>
              )}
              {profile?.location && (
                <li className="flex items-center">
                  <MapPin size={18} className="mr-2 text-blue-300" />
                  <span className="text-blue-100">{profile.location}</span>
                </li>
              )}
            </ul>

            <div className="mt-6 flex space-x-4">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Github size={24} />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {profile?.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Twitter size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-black mt-6 text-center text-blue-200">
          <p className='p-2'>
            &copy; {currentYear} {profile?.name || 'Portfolio'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;