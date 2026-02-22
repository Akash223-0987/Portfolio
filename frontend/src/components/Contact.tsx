import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, Github, CheckCircle, AlertCircle, Loader2, Instagram } from 'lucide-react';
import { useState } from 'react';
import { submitContact } from '../services/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Auto-reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-neutral-200 mb-6">Let's talk about your project</h3>
            <p className="text-neutral-200 mb-10 text-lg leading-relaxed">
              Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <a href="mailto:akashdora2@gmail.com" className="flex items-center gap-4 text-neutral-300 hover:text-white group transition-colors">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} className="text-emerald-400 group-hover:text-emerald-300" />
                </div>
                <span className="text-lg">akashdora2@gmail.com</span>
              </a>
              
              <div className="flex items-center gap-4 text-neutral-300 group">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={20} className="text-emerald-400 group-hover:text-emerald-300" />
                </div>
                <span className="text-lg">Berhampur, Odisha</span>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a
                href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="group w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/15 hover:shadow-[0_0_16px_rgba(10,102,194,0.4)]"
              >
                <Linkedin size={20} className="text-neutral-200 group-hover:text-[#5badee] transition-colors" />
              </a>
              <a
                href="https://github.com/Akash223-0987" target="_blank" rel="noreferrer"
                className="group w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-teal-400/60 hover:bg-gradient-to-br hover:from-teal-600/20 hover:to-cyan-600/20 hover:shadow-[0_0_20px_rgba(167,139,250,0.5)]"
              >
                <Github size={20} className="text-neutral-200 group-hover:text-teal-300 transition-colors duration-300" />
              </a>
              <a
                href="https://www.instagram.com/__.akashdora.__?igsh=aW5wejZ5MmI3amh5" target="_blank" rel="noreferrer"
                className="group w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-[#E1306C]/60 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#e6683c]/20 hover:to-[#bc1888]/20 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]"
              >
                <Instagram size={20} className="text-neutral-200 group-hover:text-[#E1306C] transition-colors duration-300" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
          >
            {/* Success state */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                  <p className="text-neutral-400 text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      disabled={status === 'loading'}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      disabled={status === 'loading'}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-200 mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      disabled={status === 'loading'}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none disabled:opacity-50"
                      placeholder="How can I help you?"
                    />
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{errorMsg || 'Failed to send message. Is the backend running?'}</span>
                    </motion.div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-white text-neutral-950 hover:bg-neutral-200 font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
