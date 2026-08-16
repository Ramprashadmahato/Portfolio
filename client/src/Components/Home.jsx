import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaFacebook, FaInstagram, FaDownload, FaRocket } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Images from '../Images/Ram.png';
import api from '../utils/api';

export default function Home() {
  const [hero, setHero] = useState({
    name: 'Ram Prashad Mahato',
    titles: 'Web Developer, Software Developer, Freelancer',
    description: "I'm an aspiring Web & Software Developer with a strong foundation in modern technologies.",
    linkedin: "https://www.linkedin.com/in/ram-parsad-mahato-63b4412b1/",
    github: "https://github.com/Ramprashadmahato",
    facebook: "https://www.facebook.com/share/1F3TaC8N3C/",
    instagram: "https://www.instagram.com/ramparsad3011?igsh=am5wa2Q1b3E0YXNq",
    cvUrl: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get('/portfolio/hero');
        if (res.data) setHero(res.data);
      } catch (err) {
        console.error('Error fetching hero:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-20 bg-[#0d0f24] text-white flex items-center justify-center px-6"
    >
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center py-6">
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 order-2 md:order-1"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold tracking-tight"
          >
            {hero.name}
          </motion.h1>

          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold"
          >
            I'm a{' '}
            <span className="text-cyan-400">
              {hero.titles && (
                <TypeAnimation
                  key={hero.titles}
                  sequence={hero.titles.split(',').flatMap(t => [t.trim(), 2000])}
                  speed={50}
                  repeat={Infinity}
                />
              )}
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg leading-relaxed max-w-xl"
          >
            {hero.description}
          </motion.p>

          {/* Social Icons & CV */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-6 items-center"
          >
            <a
              href={hero.cvUrl || "/Ram Prashad Mahato Cv.pdf"}
              download
              className="px-8 py-3 bg-cyan-500 text-[#0d0f24] rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <FaDownload /> Download CV
            </a>
            
            <div className="flex gap-4 text-2xl">
              {[
                { icon: <FaLinkedinIn />, href: hero.linkedin || "#" },
                { icon: <FaGithub />, href: hero.github || "#" },
                { icon: <FaFacebook />, href: hero.facebook || "#" },
                { icon: <FaInstagram />, href: hero.instagram || "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 bg-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button className="text-cyan-400 font-semibold border-b-2 border-cyan-400 hover:text-cyan-300 hover:border-cyan-300 transition-all">
              More About Me
            </button>
          </motion.div>
        </motion.div>

        {/* Right Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center order-1 md:order-2"
        >
          <div className="relative group">
            {/* Animated Ring 1 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin-slow opacity-75 blur-sm"></div>
            
            {/* Animated Ring 2 */}
            <div className="absolute -inset-2 rounded-full border border-cyan-500/30 animate-pulse"></div>

            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full p-2 bg-[#0d0f24] overflow-hidden flex items-center justify-center border border-white/10">
              <img
                src={hero.profileImage || Images}
                alt={hero.name}
                className="w-full h-full object-cover rounded-full z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

