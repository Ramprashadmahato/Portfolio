import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaRocket, FaCode, FaPaintBrush } from 'react-icons/fa';
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

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        const res = await api.get(`/portfolio/services`);
        let found = res.data.find(s => s.id === parseInt(id));
        if (!found) {
           found = staticServices.find(s => s.id === parseInt(id));
        }
        setService(found);
      } catch (err) {
        console.error(err);
        const fallback = staticServices.find(s => s.id === parseInt(id));
        setService(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0d0f24] flex items-center justify-center text-white">Loading...</div>;

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0d0f24] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <Link to="/" className="text-cyan-400 flex items-center gap-2">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0f24] text-white pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
        >
          {/* Animated Background Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12 relative z-10">
            <div className={`text-6xl text-cyan-400 bg-cyan-400/10 w-24 h-24 flex items-center justify-center rounded-2xl`}>
              {iconMap[service.icon] || <FaRocket />}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {service.title}
              </h1>
              <div className={`h-1 w-24 bg-gradient-to-r ${service.color || 'from-blue-500 to-cyan-500'} rounded-full`}></div>
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {service.details}
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Key Features</h2>
                <ul className="space-y-3">
                  {[
                    "Customized Solutions",
                    "Modern Tech Stack",
                    "Responsive Design",
                    "SEO Optimized",
                    "Scalable Architecture"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <FaCheckCircle className="text-cyan-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Why Choose This?</h2>
                <p className="text-gray-400 italic">
                  "We don\'t just deliver a service; we deliver an experience that drives results for your business."
                </p>
                <button className="mt-6 w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0d0f24] font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
                  Get Started Now
                </button>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
