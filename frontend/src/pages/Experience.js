import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useApi } from '../context/ApiContext';

const Experience = () => {
  const { experience, loading, error } = useApi();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error loading experience data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Professional Experience</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My professional journey and work experience in the industry.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="">
          {experience.length > 0 ? (
            <div className="relative max-w-4xl mx-auto ">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 z-0"></div>

              {experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative mb-12 md:flex md:items-start ${
                    index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'
                  }`}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                >
                  
                  <div
                    className={`bg-white p-6 rounded-lg shadow-md md:w-1/2 px-4 hover:shadow-lg ${
                    index % 2 === 0 ? 'md:mr-auto text-right' : 'md:ml-auto text-right'
                    }`}
                  > 
                    <div className="flex items-center mb-3">
                      <Briefcase className="text-blue-700 mr-2" size={20} />
                      <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    </div>
                    <h4 className="text-lg font-semibold text-blue-700 mb-2">{exp.company}</h4>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar size={16} className="mr-2" />
                      <span>
                        {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                      </span>
                      {exp.current && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="mr-2" />
                      <span>{exp.location}</span>
                    </div>
                    
                    <p className="text-gray-600 whitespace-pre-line text-left">{exp.description}</p>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-8 h-8 text-center text-white font-bold rounded-full bg-black border-4 border-white shadow-md">
                        {index +1}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No experience information available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;