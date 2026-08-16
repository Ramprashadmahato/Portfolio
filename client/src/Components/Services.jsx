import React, { useState, useEffect } from 'react';
import { FaCode, FaPaintBrush, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const iconMap = {
  FaCode: <FaCode />,
  FaPaintBrush: <FaPaintBrush />,
  FaRocket: <FaRocket />
};

const staticServices = [
  {
    id: 1,
    icon: 'FaCode',
    title: 'Web Development',
    description: 'Building responsive, high-performance websites using modern frameworks like React and Next.js. I focus on clean code and SEO best practices.',
    details: 'Our web development service covers everything from simple landing pages to complex web applications. We use the latest technologies like React, Next.js, and Node.js to ensure your site is fast, secure, and scalable.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    icon: 'FaPaintBrush',
    title: 'UI/UX Design',
    description: 'Creating intuitive and aesthetically pleasing user interfaces. I focus on user experience, accessibility, and modern design trends.',
    details: 'We believe that great design is not just about looks but also about how it works. Our UI/UX design process centers on the user.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    icon: 'FaRocket',
    title: 'Performance Optimization',
    description: 'Enhancing website speed and performance for better user engagement and search engine rankings. Mobile-first approach always.',
    details: 'A slow website can cost you customers. We specialize in optimizing website performance to ensure fast loading times and a smooth user experience.',
    color: 'from-green-500 to-emerald-500'
  },
];

export default function Services() {
  const [dynamicServices, setDynamicServices] = useState(staticServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/portfolio/services');
        if (res.data && res.data.length > 0) {
          setDynamicServices(res.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return null;

  return (
    <section id="service" className="bg-[#0d0f24] text-white py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-cyan-400">Services</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            I offer a wide range of services to help you build a strong digital presence. 
            From design to deployment, I\'ve got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dynamicServices.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color || 'from-blue-500 to-cyan-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`}></div>
              
              <div className="text-4xl text-cyan-400 mb-6 bg-cyan-400/10 w-16 h-16 flex items-center justify-center rounded-xl group-hover:bg-cyan-400 group-hover:text-[#0d0f24] transition-all duration-300">
                {iconMap[service.icon] || <FaRocket />}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-8">
                {service.description}
              </p>
              
              <Link to={`/service/${service.id}`} className="flex items-center gap-2 text-cyan-400 font-semibold group/btn">
                Learn More 
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

