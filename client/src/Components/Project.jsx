import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaTimes, FaCheckCircle } from 'react-icons/fa';
import api from '../utils/api';

// Default images as fallback
import Ecommerce from '../Images/E-commerce.png';
import classroom from '../Images/classroom.png';
import learning from '../Images/E-LearningPlatform.png';
import Inventor from '../Images/Inventor.png';
import Furniture from '../Images/Furnuter.png';
import School from '../Images/school.png';

const imageMap = {
  'E-commerce.png': Ecommerce,
  'classroom.png': classroom,
  'E-LearningPlatform.png': learning,
  'Inventor.png': Inventor,
  'Furnuter.png': Furniture,
  'school.png': School
};

const staticProjects = [
  {
    id: 1,
    image: 'E-commerce.png',
    title: 'ITVE Official Application of Client',
    category: 'Full Stack',
    description: 'A comprehensive Education solution with Exam, Result, Register, Center, Course, and generate all required Document.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    githubLink: 'https://github.com/Ramprashadmahato/ITVE',
    liveLink: 'https://itve-red.vercel.app'
  },
  {
    id: 2,
    image: 'E-LearningPlatform.png',
    title: 'E-Learning System',
    category: 'Full Stack',
    description: 'An interactive platform for online learning with course tracking features.',
    technologies: ['React', 'Express', 'Node.js', 'PostgreSQL'],
    githubLink: 'https://github.com/Ramprashadmahato/Full_Stack_E-Learning-Platform',
    liveLink: 'https://full-stack-e-learning-platform-opal.vercel.app'
  },
  {
    id: 3,
    image: 'Inventor.png',
    title: 'Inventory Pro',
    category: 'Full Stack',
    description: 'Real-time inventory management system for small to medium businesses.',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/Ramprashadmahato/Royal-Consultancy-Service',
    liveLink: 'https://royal-consultancy-service.vercel.app'
  },
    {
    id: 3,
    image: 'Inventor.png',
    title: 'Consultancy Application',
    category: 'Full Stack',
    description: 'Real-time inventory management system for small to medium businesses.',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/Ramprashadmahato/RCS',
    liveLink: 'https://rcs-psi.vercel.app'
  },
   {
    id: 3,
    image: 'Inventor.png',
    title: 'Blood Donation Application',
    category: 'Full Stack',
    description: 'Real-time Blood Donation management system for Donor or Reciver.',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/Ramprashadmahato/Full_Stack_Blood_Donation_System',
    liveLink: 'https://full-stack-blood-donation-system.vercel.app'
  },
    {
    id: 3,
    image: 'Inventor.png',
    title: 'Live Location Teacking Application',
    category: 'Full Stack',
    description: 'Real-time Bussiness E,mployees Live location tracking system for small to medium businesses.',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/Ramprashadmahato/Business_Employes_Live_Location',
    liveLink: 'https://business-employes-live-location.vercel.app'
  },
  {
    id: 4,
    image: 'Furnuter.png',
    title: 'Courier Management System',
    category: 'Full Stack',
    description: 'Full Stack Web application for managing Customer, Driver, Delivery, and Real time live notification and update.',
    technologies: ['React.js', 'Node.js', 'MySQL', 'Mongodb', 'Express.js'],
    githubLink: 'https://github.com/Ramprashadmahato/Courier-Management-System',
    liveLink: 'https://vercel.com/ram-prashad-mahatos-projects/courier-management-system'
  },
  {
    id: 5,
    image: 'school.png',
    title: 'FYP Project Global School Management System',
    category: 'Full Stack',
    description: 'Full Stack Web application for managing student, teacher,parents, records, attendance, and grading.',
    technologies: ['React.js', 'Node.js', 'MySQL', 'Mongodb', 'Express.js'],
    githubLink: 'https://github.com/Ramprashadmahato/Global_School_Management_System',
    liveLink: 'https://global-school-management-system.vercel.app'
  },
  {
    id: 6,
    image: 'classroom.png',
    title: 'Hostel management System',
    category: 'Full Stack',
    description: 'Full Stack Web application for managing student, and Hostel Owner Activities and update in real times',
    technologies: ['React.js', 'Node.js', 'MySQL', 'Mongodb', 'Express.js'],
    githubLink: 'https://github.com/Ramprashadmahato/Hostel-Management-System',
    liveLink: 'https://hostel-management-system-red.vercel.app'
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [dynamicProjects, setDynamicProjects] = useState(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/portfolio/projects');
        if (res.data && res.data.length > 0) {
          setDynamicProjects(res.data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) return null;

  return (
    <section id="project" className="bg-[#0d0f24] text-white py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            A collection of projects ranging from web applications to system software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dynamicProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={imageMap[project.image] || project.image || School}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f24] via-transparent to-transparent opacity-80"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-cyan-500 text-[#0d0f24] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(project.technologies) ? project.technologies : []).map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-tighter border border-cyan-400/20 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaGithub size={20} /></a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors"><FaExternalLinkAlt size={18} /></a>
                  </div>
                  <button
                    onClick={() => openModal(project)}
                    className="text-sm font-bold text-cyan-400 hover:underline cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1c3a] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <FaTimes size={18} />
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-y-auto">
                <div className="md:w-1/2">
                  <img
                    src={imageMap[selectedProject.image] || selectedProject.image || School}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>

                <div className="md:w-1/2 p-8 md:p-10 space-y-6">
                  <div>
                    <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest">{selectedProject.category}</span>
                    <h2 className="text-3xl font-bold mt-2">{selectedProject.title}</h2>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white border-l-4 border-cyan-400 pl-4">Key Features</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {["Custom Solutions", "High Performance", "Modern UI"].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-400">
                          <FaCheckCircle className="text-cyan-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {(Array.isArray(selectedProject.technologies) ? selectedProject.technologies : []).map(tag => (
                      <span key={tag} className="bg-white/5 border border-white/10 text-cyan-400 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6">
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <FaGithub size={20} /> View Source
                    </a>
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-[#0d0f24] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      Live Demo <FaExternalLinkAlt size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


