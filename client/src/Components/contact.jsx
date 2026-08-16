import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook, FaPaperPlane, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import api from "../utils/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Send to backend (backend handles auto-reply email)
      await api.post('/contacts', formData);
      alert("Inquiry submitted successfully! A confirmation email has been sent to you.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to send message, please try again.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-[#0d0f24] text-white py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or just want to chat? Feel free to reach out. 
            I'm always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-gray-400 max-w-md">
                I'm currently looking for new opportunities. My inbox is always open. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-[#0d0f24] transition-all duration-300">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Me</p>
                  <p className="text-gray-200">rpxingh201@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-[#0d0f24] transition-all duration-300">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Location</p>
                  <p className="text-gray-200">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/in/ram-parsad-mahato-63b4412b1/" },
                  { icon: <FaGithub size={20} />, href: "https://github.com/Ramprashadmahato" },
                  { icon: <FaFacebook size={20} />, href: "https://www.facebook.com/share/1F3TaC8N3C/" },
                  { icon: <FaInstagram size={20} />, href: "https://www.instagram.com/ramparsad3011?igsh=am5wa2Q1b3E0YXNq" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="How can I help you?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 text-[#0d0f24] font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                {isSending ? "Sending..." : (
                  <>
                    Send Message <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <footer className="mt-24 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} <span className="text-cyan-400">Ram Prashad Mahato</span>. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
}

