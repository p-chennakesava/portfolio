import React, { useState } from 'react';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { useApi } from '../context/ApiContext';

const Projects = () => {
  const { projects, loading, error } = useApi();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
          <p className="text-xl font-semibold">Error loading projects data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Filter projects by category and search term
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Projects</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my portfolio of projects that showcase my skills and experience in various technologies.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-700 text-white text-xs font-bold px-2 py-1">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(project.completion_date)}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {project.description.substring(0, 120)}
                    {project.description.length > 120 ? '...' : ''}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    {project.github_url ? (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
                      >
                        <Github size={16} className="mr-1" />
                        <span>Code</span>
                      </a>
                      ) : (
                        <div className="flex items-center text-gray-400 cursor-not-allowed">
                          <Github size={16} className="mr-1" />
                          <span>Code</span>
                        </div>
                      )
                    }
                    {project.live_url ? (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        <span>Live Demo</span>
                      </a>
                      ) : (
                        <div className="flex items-center text-gray-600 cursor-not-allowed">
                          <ExternalLink size={16} className="mr-1" />
                          <span>Live Demo</span>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;