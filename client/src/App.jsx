import React from 'react';
import { Element } from 'react-scroll';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Services';
import Skills from './Components/Skills';
import Projects from './Components/Project';
import Contact from './Components/contact';
import ServiceDetails from './Components/ServiceDetails';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminDashboard from './Components/AdminDashboard';

function MainPage() {
  return (
    <div className="pt-20">
      <Element name="home">
        <Home />
      </Element>
      <Element name="about">
        <About />
      </Element>
      <Element name="service">
        <Services />
      </Element>
      <Element name="skill">
        <Skills />
      </Element>
      <Element name="project">
        <Projects />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
