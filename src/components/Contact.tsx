import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Input } from '@/components/ui/input';
import { FiMail, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { SiHuggingface } from 'react-icons/si';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import Magnetic from './ui/Magnetic';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    { icon: <FiMail className="w-5 h-5" />, label: 'Email', value: '075bei033.sanjeev@pcampus.edu.np', href: 'mailto:075bei033.sanjeev@pcampus.edu.np' },
    { icon: <FaLinkedinIn className="w-5 h-5" />, label: 'LinkedIn', value: 'linkedin.com/in/realsanjeev', href: 'https://linkedin.com/in/realsanjeev' },
    { icon: <FaGithub className="w-5 h-5" />, label: 'GitHub', value: 'github.com/realsanjeev', href: 'https://github.com/realsanjeev' },
    { icon: <SiHuggingface className="w-5 h-5" />, label: 'Hugging Face', value: 'huggingface.co/sanjeev-bhandari01', href: 'https://huggingface.co/sanjeev-bhandari01' },
  ];

  const interests = [
    '🤝 Research collaborations in AI/ML',
    '🧠 Consulting on ML projects',
    '🎤 Speaking opportunities',
    '🔧 Open source contributions',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section className="section-padding bg-white dark:bg-transparent relative overflow-hidden" id="contact" ref={sectionRef}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-25 dark:opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 dark:opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Contact</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 mt-4 tracking-tight">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, research collaborations, or chatting about the future of AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Contact links card */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5">Get in Touch</h3>
              <div className="space-y-2">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/8 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-all duration-200 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Open For</h3>
              <ul className="space-y-3">
                {interests.map((area, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {area}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl flex items-center gap-3 text-green-700 dark:text-green-400"
                >
                  <FiCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Message sent! I'll get back to you soon.</span>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400"
                >
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Failed to send. Please email me directly.</span>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                    { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{f.label}</label>
                      <Input
                        name={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.name !== 'subject'}
                        className="h-11 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <Input
                    name="subject"
                    placeholder="What's this about?"
                    className="h-11 bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all resize-none text-sm"
                  />
                </div>
                <div className="pt-2">
                  <Magnetic amount={0.1}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
