import React from 'react';
import { motion } from 'framer-motion';
import Images from '../Images/About.jpg';

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-[#0d0f24] text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left: Glowing Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <img
              src={Images}
              alt="About me"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
            />
            {/* Decorative Border */}
            <div className="absolute -inset-4 border-2 border-cyan-500/30 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200">
            Aspiring <span className="text-cyan-400">Full Stack Developer</span>
          </h3>
          
          <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
            <p>
              I’m currently pursuing a BSc (Hons) degree in Computing at Islington College, 
              where I’ve been building a strong foundation in modern web technologies. 
              I’m passionate about developing innovative, user-friendly digital solutions 
              and always eager to learn new frameworks and best practices.
            </p>
            <p>
              My goal is to become a versatile Software Developer, delivering high-quality 
              custom solutions. I thrive in collaborative environments and I'm currently 
              seeking an internship to apply my skills to real-world challenges.
            </p>
          </div>

          <div className="mt-10 flex gap-4">
            <button className="px-8 py-3 bg-cyan-500 text-[#0d0f24] rounded-lg font-bold hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20">
              Read More
            </button>
            <button className="px-8 py-3 border border-cyan-500 text-cyan-400 rounded-lg font-bold hover:bg-cyan-500/10 transition-all duration-300">
              My Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

