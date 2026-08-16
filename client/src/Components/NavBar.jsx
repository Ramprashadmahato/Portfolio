import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home', to: 'home' },
    { name: 'about', to: 'about' },
    { name: 'service', to: 'service' },
    { name: 'skill', to: 'skill' },
    { name: 'project', to: 'project' },
    { name: 'contact', to: 'contact' },
  ];

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center px-4 py-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-in-out ${
          scrolled 
            ? 'bg-[#0d0f24]/80 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-5xl w-full' 
            : 'bg-transparent px-6 py-4 w-full max-w-7xl'
        }`}
      >
        {/* Logo */}
        <RouterLink to="/" className="cursor-pointer group flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500 flex items-center justify-center">
            <span className="text-[#0d0f24] font-black -rotate-45 group-hover:-rotate-90 transition-transform duration-500">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">Portfolio</span>
        </RouterLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              onSetActive={() => setActiveSection(link.to)}
              className="px-4 py-2 relative group cursor-pointer"
            >
              <span className={`text-sm font-medium transition-colors duration-300 ${
                activeSection === link.to ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
              }`}>
                {link.name}
              </span>
              
              {activeSection === link.to && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </ScrollLink>
          ))}
          
          <div className="h-6 w-[1px] bg-white/10 mx-4"></div>

          {user ? (
            <div className="flex items-center gap-4">
              {user.role === 'admin' && (
                <RouterLink to="/admin" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Dashboard
                </RouterLink>
              )}
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="bg-white/10 hover:bg-red-500/20 text-white hover:text-red-500 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/5 border-transparent"
              >
                Logout
              </button>
            </div>
          ) : (
            <RouterLink 
              to="/login"
              className="bg-cyan-500 hover:bg-cyan-400 text-[#0d0f24] px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95"
            >
              Login
            </RouterLink>
          )}
        </div>


        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-20 right-0 left-0 bg-[#0d0f24]/95 backdrop-blur-2xl border border-white/10 mx-4 rounded-3xl p-8 shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-6 items-center">
                {navLinks.map((link) => (
                  <ScrollLink
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold capitalize transition-all ${
                      activeSection === link.to ? 'text-cyan-400 scale-110' : 'text-gray-400'
                    }`}
                  >
                    {link.name}
                  </ScrollLink>
                ))}
                
                <div className="w-full h-[1px] bg-white/10"></div>
                
                {user ? (
                   <>
                    {user.role === 'admin' && (
                      <RouterLink to="/admin" onClick={() => setIsOpen(false)} className="text-cyan-400 font-bold">Dashboard</RouterLink>
                    )}
                    <button onClick={() => { logout(); setIsOpen(false); navigate('/'); }} className="text-red-500 font-bold">Logout</button>
                   </>
                ) : (
                  <RouterLink to="/login" onClick={() => setIsOpen(false)} className="bg-cyan-500 text-[#0d0f24] px-8 py-3 rounded-xl font-bold w-full text-center">Login</RouterLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

export default NavBar;




