import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShareFab from './components/ShareFab';
import Home from './pages/Home';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import { ApiProvider } from './context/ApiContext';

import AOS from 'aos';
import 'aos/dist/aos.css';
import "./index.css"; // Tailwind styles

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  return (
    <ApiProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <ShareFab />
          </main>
          <Footer />
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;