import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useApi } from '../context/ApiContext';

const Education = () => {
  const { education, loading, error } = useApi();

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
          <p className="text-xl font-semibold">Error loading education data</p>
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
  const sortedEducation = [...education].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 bg-[#d4d7c4]">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Education</h1>
          <p className="text-blue-900 max-w-2xl mx-auto">
            My academic journey and qualifications that have shaped my knowledge and expertise.
          </p>
        </div>

        {/* Education Timeline */}
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 z-0"></div>

          {sortedEducation.map((edu, index) => (
            <div 
              key={edu.id} 
              className="relative mb-12 md:flex md:items-start"
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            >
              {/* Timeline Dot */}
              <div className="hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-md"></div>
              </div>

              {/* Education Card */}
              <div
                className={`md:w-1/2 px-4 bg-[#f2f2e9] ${
                index % 2 === 0 ? 'md:mr-auto text-right' : 'md:ml-auto text-right'
                }`}
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-3">
                    <GraduationCap className="text-blue-700 mr-2" size={20} />
                    <h3 className="text-xl font-bold text-[#000080]">{edu.degree}</h3>
                  </div>

                  <h4 className="text-base font-semibold text-blue-700 mb-2">
                    {edu.institution}
                  </h4>

                  <div className="flex justify-start items-center text-gray-600 mb-2  md:justify-start">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                    </span>
                  </div>

                  <div className="flex justify-start items-center text-gray-600 mb-4  md:justify-start">
                    <MapPin size={16} className="mr-2" />
                    <span>{edu.location}</span>
                  </div>

                  {edu.gpa && (
                    <div className="mb-4 flex flex-wrap justify-end gap-2 font-bold">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        GPA: {edu.gpa}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {edu.percentage}%
                      </span>
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-gray-600 text-center">{edu.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Education;
