import React from 'react';
import { ArrowRight, Download, Award, Briefcase, Code, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../context/ApiContext';

const Home = () => {
  const { profile, projects, skills, loading, error } = useApi();

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
          <p className="text-xl font-semibold">Error loading data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  
  // Get top skills (highest proficiency)
  const topSkills = [...skills].sort((a, b) => b.proficiency - a.proficiency).slice(0, 8);

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r bg-teal-900 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-center items-end ">
            <div className="md:w-1/4 flex ">
              {profile?.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="rounded-full h-80 w-80 object-cover border-black  shadow-xl"
                />
              ) : (
                <div className="rounded-full h-80 w-80 bg-blue-800 flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-6xl font-bold text-white">
                    {profile?.name?.charAt(0) || 'ck'}
                  </span>
                </div>
              )}
            </div>
            <div className="md:w-1/2 mb-10 md:mb-0 text-center ">
              <h6 className="text-2xl md:text-5xl lg:text-4xl font-bold mb-4 text-white">
                <span className='text-black'>Hi, I'm</span> Pagadala Chennakesava
              </h6>
              <h2 className="text-base md:text-lg text-blue-200 mb-6">
                {profile?.title || 'Software Developer'}
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-xl  mx-auto ">
                {profile?.bio?.substring(0, 201)}
                {profile?.bio && profile.bio.length > 201 ? '...' : ''}
              </p>
              <div className="flex flex-wrap gap-6 justify-center  ">
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 px-4 py-2 rounded-md font-medium flex items-center transition-colors"
                >
                  Contact Me <ArrowRight size={18} className="ml-2" />
                </Link>
                {profile?.resume && (
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 px-4 py-2 rounded-md font-medium flex items-center transition-colors"
                  >
                    Download CV <Download size={18} className="ml-2" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Code size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{projects.length}</h3>
                <p className="text-gray-600">Projects Completed</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Award size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{skills.length}</h3>
                <p className="text-gray-600">Skills & Technologies</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Briefcase size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{profile?.experience || 'Fresher'}</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <GraduationCap size={24} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">MCA</h3>
                <p className="text-gray-600">Computer Applications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of my recent work that showcases my skills and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {project.description.substring(0, 100)}
                      {project.description.length > 100 ? '...' : ''}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.split(',').map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900 font-medium"
                        >
                          GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900 font-medium"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No featured projects available yet.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center bg-teal-700 hover:bg-teal-900 text-white px-2 py-2 rounded-md font-medium transition-colors"
            >
              View All Projects <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">My Skills</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here are some of the technologies and tools I work with.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topSkills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="w-full mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.proficiency}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/skills"
              className="inline-flex items-center bg-teal-700 hover:bg-teal-900 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              View All Skills <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray text-teal-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-blue-900 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded-md font-medium transition-colors"
          >
            Get In Touch <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;