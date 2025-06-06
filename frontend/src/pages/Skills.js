import React, { useState } from 'react';
import { useApi } from '../context/ApiContext';

const Skills = () => {
  const { skills, loading, error } = useApi();
  const [activeCategory, setActiveCategory] = useState('All');

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
          <p className="text-xl font-semibold">Error loading skills data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  // Filter skills by active category
  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="pt-20 pb-16 bg-teal-50">
      <div className="container mx-auto px-4 md:px-6 ">
        {/* Header */}
        <div className="text-center mb-16 ">
          <h1 className="text-4xl font-bold text-teal-900 mb-4">Skills & Expertise</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and areas of expertise.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{skill.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {skill.category}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Proficiency</span>
                    <span className="text-sm text-gray-600">{skill.proficiency}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= skill.proficiency ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No skills available for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;