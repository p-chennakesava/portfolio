import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { getCookie } from '.src/utils/csrf';

// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Create the context
const ApiContext = createContext();

// Provider component
export const ApiProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   // 👇 This ensures CSRF token cookie is set
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        await axios.get(`${API_BASE_URL}profile/`, {
          withCredentials: true,
        });
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err);
      }
    };

    fetchCSRFToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const profileRes = await axios.get(`${API_BASE_URL}profile/`, { withCredentials: true });
        if (profileRes.data.length > 0) {
          setProfile(profileRes.data[0]);
        }

        const educationRes = await axios.get(`${API_BASE_URL}education/`, { withCredentials: true });
        setEducation(educationRes.data);

        const skillsRes = await axios.get(`${API_BASE_URL}skills/`, { withCredentials: true });
        setSkills(skillsRes.data);

        const projectsRes = await axios.get(`${API_BASE_URL}projects/`, { withCredentials: true });
        setProjects(projectsRes.data);

        const experienceRes = await axios.get(`${API_BASE_URL}experience/`, { withCredentials: true });
        setExperience(experienceRes.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitContact = async (data) => {
    try {
      const csrfToken = getCookie('csrftoken');
      await axios.post(`${API_BASE_URL}contact/`, data, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
      withCredentials: true, 
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      throw new Error('Failed to submit contact form. Please try again later.');
    }
  };

  return (
    <ApiContext.Provider
      value={{
        profile,
        education,
        skills,
        projects,
        experience,
        loading,
        error,
        submitContact,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
