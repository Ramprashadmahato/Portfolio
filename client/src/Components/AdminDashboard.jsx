import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaRocket, FaCode, FaPaintBrush, FaEnvelope, FaReply, FaCog, FaLock, FaHome, FaLink, FaImage, FaDownload } from 'react-icons/fa';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [heroData, setHeroData] = useState({
    name: '',
    titles: '',
    description: '',
    linkedin: '',
    github: '',
    facebook: '',
    instagram: '',
    cvUrl: '',
    profileImage: ''
  });
  const [replyData, setReplyData] = useState({ to: '', subject: '', message: '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [newService, setNewService] = useState({ 
    title: '', 
    description: '', 
    icon: 'FaRocket', 
    color: 'from-blue-500 to-cyan-500', 
    details: '' 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchContacts();
    fetchHeroData();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get('/portfolio/services');
      setServices(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHeroData = async () => {
    try {
      const res = await api.get('/portfolio/hero');
      if (res.data) setHeroData(res.data);
    } catch (err) {
      console.error('Error fetching hero data:', err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const handleUpdateHero = async (e) => {
    e.preventDefault();
    try {
      await api.post('/portfolio/hero', heroData);
      alert('Home content updated successfully!');
    } catch (err) {
      alert('Error updating home content');
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/portfolio/services', newService);
      setNewService({ title: '', description: '', icon: 'FaRocket', color: 'from-blue-500 to-cyan-500', details: '' });
      fetchServices();
    } catch (err) {
      alert('Error adding service');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/portfolio/services/${id}`);
      fetchServices();
    } catch (err) {
      alert('Error deleting service');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      alert('Error deleting inquiry');
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contacts/reply', replyData);
      alert('Reply sent successfully!');
      setShowReplyModal(false);
      setReplyData({ to: '', subject: '', message: '' });
    } catch (err) {
      alert('Failed to send reply');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/change-password', passwordData);
      alert('Password updated successfully!');
      setPasswordData({ oldPassword: '', newPassword: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update password');
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="text-white p-20 text-center text-2xl font-bold">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d0f24] text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto pt-16 md:pt-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin <span className="text-cyan-400">Dashboard</span></h1>
            <p className="text-gray-400 text-sm md:text-base">Manage your portfolio and user inquiries from here.</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full lg:w-auto overflow-x-auto no-scrollbar">
             <button 
               onClick={() => setActiveTab('services')}
               className={`flex-1 lg:flex-none px-6 md:px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'services' ? 'bg-cyan-500 text-[#0d0f24] shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
             >
               Services
             </button>
             <button 
               onClick={() => setActiveTab('inquiries')}
               className={`flex-1 lg:flex-none px-6 md:px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'inquiries' ? 'bg-cyan-500 text-[#0d0f24] shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
             >
               Inquiries {contacts.length > 0 && <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{contacts.length}</span>}
             </button>
             <button 
               onClick={() => setActiveTab('home')}
               className={`flex-1 lg:flex-none px-6 md:px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'home' ? 'bg-cyan-500 text-[#0d0f24] shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
             >
               Home
             </button>
             <button 
               onClick={() => setActiveTab('settings')}
               className={`flex-1 lg:flex-none px-6 md:px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'settings' ? 'bg-cyan-500 text-[#0d0f24] shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
             >
               Settings
             </button>
          </div>
        </div>

        {activeTab === 'services' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add Service Initial Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 h-fit lg:sticky lg:top-32"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
                <FaPlus /> Add New Service
              </h2>
              <form onSubmit={handleCreateService} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Web Development"
                    value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1">Short Summary</label>
                  <textarea
                    placeholder="Briefly describe the service..."
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none h-24 resize-none text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1">Detailed Content</label>
                  <textarea
                    placeholder="Provide full details about this service..."
                    value={newService.details}
                    onChange={(e) => setNewService({...newService, details: e.target.value})}
                    className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none h-32 resize-none text-sm"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0d0f24] font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 mt-4 active:scale-95 text-sm md:text-base"
                >
                  Publish Service
                </button>
              </form>
            </motion.div>

            {/* List of Services */}
            <div className="lg:col-span-2 space-y-4">
               <h2 className="text-xl font-bold mb-6">Published Services</h2>
               {services.length === 0 && !loading && <p className="text-gray-500 italic">No dynamic services found. Default static ones are currently shown on the site.</p>}
               {services.map(service => (
                 <motion.div 
                   key={service.id}
                   layout
                   className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-cyan-500/30 transition-all gap-4"
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
                       <FaRocket size={18} />
                     </div>
                     <div>
                       <h3 className="font-bold text-base md:text-lg">{service.title}</h3>
                       <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                     </div>
                   </div>
                   <div className="flex gap-2 w-full md:w-auto">
                     <button className="flex-1 md:flex-none p-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl transition-all flex justify-center">
                       <FaEdit size={16} />
                     </button>
                     <button 
                       onClick={() => handleDeleteService(service.id)}
                       className="flex-1 md:flex-none p-3 bg-red-500/10 hover:bg-red-500 text-red-500 rounded-xl transition-all flex justify-center"
                     >
                       <FaTrash size={16} />
                     </button>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        ) : activeTab === 'home' ? (
          <div className="max-w-4xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
             >
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                      <FaHome size={24} />
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold">Manage Home Page</h2>
                      <p className="text-gray-500 text-sm">Customize your hero section and social links</p>
                   </div>
                </div>

                <form onSubmit={handleUpdateHero} className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Full Name</label>
                         <input 
                           type="text"
                           value={heroData.name}
                           onChange={(e) => setHeroData({...heroData, name: e.target.value})}
                           className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-3 px-4 focus:border-cyan-500 outline-none transition-all"
                           placeholder="Ram Prashad Mahato"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Titles (Comma Separated)</label>
                         <input 
                           type="text"
                           value={heroData.titles}
                           onChange={(e) => setHeroData({...heroData, titles: e.target.value})}
                           className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-3 px-4 focus:border-cyan-500 outline-none transition-all"
                           placeholder="Web Developer, Designer"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Description</label>
                      <textarea 
                        value={heroData.description}
                        onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                        className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-3 px-4 focus:border-cyan-500 outline-none h-32 resize-none"
                        placeholder="Tell visitors about yourself..."
                      />
                   </div>

                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <FaImage className="text-cyan-400/50" /> Profile Image URL
                         </label>
                         <input 
                           type="text"
                           value={heroData.profileImage}
                           onChange={(e) => setHeroData({...heroData, profileImage: e.target.value})}
                           className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-3 px-4 focus:border-cyan-500 outline-none transition-all"
                           placeholder="https://example.com/photo.jpg"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <FaDownload className="text-cyan-400/50" /> CV Download URL
                         </label>
                         <input 
                           type="text"
                           value={heroData.cvUrl}
                           onChange={(e) => setHeroData({...heroData, cvUrl: e.target.value})}
                           className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-3 px-4 focus:border-cyan-500 outline-none transition-all"
                           placeholder="Link to your PDF CV"
                         />
                      </div>
                   </div>

                   <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                         <FaLink /> Social Connect
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs text-gray-400">LinkedIn</label>
                            <input 
                              type="text"
                              value={heroData.linkedin}
                              onChange={(e) => setHeroData({...heroData, linkedin: e.target.value})}
                              className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-2 px-4 focus:border-cyan-500 outline-none"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs text-gray-400">GitHub</label>
                            <input 
                              type="text"
                              value={heroData.github}
                              onChange={(e) => setHeroData({...heroData, github: e.target.value})}
                              className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-2 px-4 focus:border-cyan-500 outline-none"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs text-gray-400">Facebook</label>
                            <input 
                              type="text"
                              value={heroData.facebook}
                              onChange={(e) => setHeroData({...heroData, facebook: e.target.value})}
                              className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-2 px-4 focus:border-cyan-500 outline-none"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs text-gray-400">Instagram</label>
                            <input 
                              type="text"
                              value={heroData.instagram}
                              onChange={(e) => setHeroData({...heroData, instagram: e.target.value})}
                              className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-2 px-4 focus:border-cyan-500 outline-none"
                            />
                         </div>
                      </div>
                   </div>

                   <button 
                     type="submit"
                     className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0d0f24] font-black py-4 rounded-xl transition-all shadow-xl shadow-cyan-500/20 active:scale-95"
                   >
                     Save Home Changes
                   </button>
                </form>
             </motion.div>
          </div>
        ) : activeTab === 'inquiries' ? (
          <div className="max-w-4xl mx-auto space-y-6">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">User Inquiries</h2>
                <span className="bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{contacts.length} Total</span>
             </div>
             
             {contacts.length === 0 ? (
               <div className="text-center py-20 md:py-32 bg-white/5 rounded-3xl border border-white/10">
                 <FaEnvelope className="mx-auto text-4xl text-gray-700 mb-4" />
                 <p className="text-gray-500 text-lg">Your inbox is empty.</p>
               </div>
             ) : (
               <div className="grid gap-6">
                 {contacts.map(contact => (
                   <motion.div 
                     key={contact.id}
                     layout
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl hover:border-cyan-500/30 transition-all group"
                   >
                     <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg md:text-xl font-bold text-white">{contact.name}</h3>
                            <span className="bg-white/5 text-gray-500 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-tighter">Client</span>
                          </div>
                          <p className="text-cyan-400 font-medium text-sm md:text-base">{contact.email}</p>
                        </div>
                        <div className="flex gap-3 w-full lg:w-auto">
                          <button 
                            onClick={() => {
                              setReplyData({ to: contact.email, subject: `Re: ${contact.subject}`, message: '' });
                              setShowReplyModal(true);
                            }}
                            className="flex-1 lg:flex-none bg-cyan-500 hover:bg-cyan-400 text-[#0d0f24] px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                          >
                            <FaReply /> Reply
                          </button>
                          <button 
                            onClick={() => handleDeleteContact(contact.id)}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-all flex items-center justify-center"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                     </div>
                     <div className="bg-black/20 rounded-2xl p-4 md:p-6 border border-white/5">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Message Content</p>
                        <p className="text-gray-300 font-bold mb-4 tracking-tight text-sm md:text-base">Subject: {contact.subject}</p>
                        <p className="text-gray-400 leading-relaxed italic text-sm md:text-base">"{contact.message}"</p>
                     </div>
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-2">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">DATE: {new Date(contact.createdAt).toLocaleDateString()}</p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">TIME: {new Date(contact.createdAt).toLocaleTimeString()}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl"
             >
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                      <FaCog size={24} />
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold">Account Settings</h2>
                      <p className="text-gray-500 text-sm">Update your security credentials</p>
                   </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-1">Current Password</label>
                      <div className="relative">
                         <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                         <input 
                           type="password"
                           required
                           value={passwordData.oldPassword}
                           onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                           className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
                           placeholder="••••••••"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-1">New Password</label>
                      <div className="relative">
                         <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300/30" />
                         <input 
                           type="password"
                           required
                           value={passwordData.newPassword}
                           onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                           className="w-full bg-[#0d0f24] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
                           placeholder="••••••••"
                         />
                      </div>
                   </div>

                   <button 
                     type="submit"
                     className="w-full bg-white text-[#0d0f24] font-black py-4 rounded-xl hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-500/10 active:scale-95"
                   >
                     Update Security Key
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             className="bg-[#1a1c3a] w-full max-w-2xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden relative"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
              
              <h2 className="text-3xl font-bold mb-2">Send <span className="text-cyan-400">Reply</span></h2>
              <p className="text-gray-400 mb-8 border-b border-white/5 pb-4">Drafting an email response to <span className="text-white font-medium">{replyData.to}</span></p>
              
              <form onSubmit={handleSendReply} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1 font-bold uppercase">Subject Line</label>
                  <input 
                    type="text" 
                    value={replyData.subject} 
                    onChange={(e) => setReplyData({...replyData, subject: e.target.value})}
                    className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1 font-bold uppercase">Email Body</label>
                  <textarea 
                    value={replyData.message} 
                    onChange={(e) => setReplyData({...replyData, message: e.target.value})}
                    className="w-full bg-[#0d0f24] border border-white/10 rounded-xl px-4 py-3 h-56 focus:border-cyan-500 outline-none transition-all resize-none"
                    placeholder="Type your professional response here..."
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowReplyModal(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 py-4 rounded-xl font-bold transition-all text-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-[#0d0f24] py-4 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/30"
                  >
                    Send Response <FaReply className="inline ml-2 mb-0.5" />
                  </button>
                </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
}
