import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiFlutter, SiMysql } from 'react-icons/si';
import api from '../utils/api';

const iconMap = {
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
  FaJs: <FaJs />,
  FaReact: <FaReact />,
  FaNodeJs: <FaNodeJs />,
  FaDatabase: <FaDatabase />,
  SiTailwindcss: <SiTailwindcss />,
  SiTypescript: <SiTypescript />,
  SiFlutter: <SiFlutter />,
  SiMysql: <SiMysql />
};

const staticSkills = [
  { name: 'HTML5', icon: 'FaHtml5', color: 'text-orange-500', level: 90 },
  { name: 'CSS3', icon: 'FaCss3Alt', color: 'text-blue-500', level: 85 },
  { name: 'JavaScript', icon: 'FaJs', color: 'text-yellow-400', level: 80 },
  { name: 'React', icon: 'FaReact', color: 'text-cyan-400', level: 85 },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: 'text-sky-400', level: 90 },
  { name: 'TypeScript', icon: 'SiTypescript', color: 'text-blue-600', level: 70 },
  { name: 'Node.js', icon: 'FaNodeJs', color: 'text-green-500', level: 75 },
  { name: 'MongoDB', icon: 'FaDatabase', color: 'text-emerald-500', level: 70 },
  { name: 'MySQL', icon: 'SiMysql', color: 'text-blue-400', level: 80 },
  { name: 'Flutter', icon: 'SiFlutter', color: 'text-cyan-500', level: 65 },
];

export default function Skills() {
  const [dynamicSkills, setDynamicSkills] = useState(staticSkills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/portfolio/skills');
        if (res.data && res.data.length > 0) {
          setDynamicSkills(res.data);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return null;

  return (
    <section id="skill" className="bg-[#0d0f24] text-white py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-cyan-400">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            My journey in development has allowed me to master a variety of modern technologies. 
            Here's a snapshot of my technical toolkit.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {dynamicSkills.map((skill, index) => (
            <motion.div
              key={skill.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center group transition-all duration-300"
            >
              <div className={`text-5xl ${skill.color || 'text-cyan-400'} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                {iconMap[skill.icon] || <FaCode />}
              </div>
              <h3 className="text-lg font-bold mb-4">{skill.name}</h3>
              
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]"
                ></motion.div>
              </div>
              <span className="mt-2 text-xs text-gray-400 font-medium">{skill.level}% Proficiency</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

