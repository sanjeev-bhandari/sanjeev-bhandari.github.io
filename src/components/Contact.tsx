import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ScrambleText from '@/components/ui/ScrambleText';
import { FiMail, FiSend, FiCheck, FiAlertCircle, FiGithub, FiLinkedin } from 'react-icons/fi';
import Magnetic from '@/components/ui/Magnetic';

const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (form.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_KEY) {
      window.location.href = `mailto:075bei033.sanjeev@pcampus.edu.np?subject=Hello from ${form.name}&body=${form.message}`;
      return;
    }
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current!, { publicKey: EMAILJS_KEY });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'white',
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <section id="contact" className="section-py relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.2), transparent)' }} />

      {/* Background glow for this section */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(234,88,12,0.08) 0%, transparent 70%)' }} />

      <div className="container-xl relative">
        {/* Header - centered big CTA style */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="label-pill">Contact</span>
          </motion.div>
          <h2
            className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-6"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ScrambleText text="Let's build" trigger={inView} delay={150} framesPerChar={5} />
              </motion.div>
            </div>
            <br />
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gradient-text">
                  <ScrambleText text="something great" trigger={inView} delay={400} framesPerChar={5} />
                </span>
              </motion.div>
            </div>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base max-w-lg mx-auto"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Open to interesting problems, collaborations, and conversations about AI.
            Let's connect and create something remarkable.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
          {/* Left sidebar info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Email */}
            <a
              href="mailto:075bei033.sanjeev@pcampus.edu.np"
              className="card-dark rounded-2xl p-5 group flex items-start gap-4 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #ea580c, #5b21b6)' }}
              >
                <FiMail className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Email</div>
                <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                  075bei033.sanjeev<br />@pcampus.edu.np
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/realsanjeev"
              target="_blank"
              rel="noopener noreferrer"
              className="card-dark rounded-2xl p-5 group flex items-start gap-4 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <FiGithub className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>GitHub</div>
                <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">@realsanjeev</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/realsanjeev"
              target="_blank"
              rel="noopener noreferrer"
              className="card-dark rounded-2xl p-5 group flex items-start gap-4 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.2)' }}
              >
                <FiLinkedin className="w-5 h-5" style={{ color: 'rgba(6,182,212,0.9)' }} />
              </div>
              <div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>LinkedIn</div>
                <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">realsanjeev</div>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="card-dark rounded-2xl p-6 md:p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                  >
                    <FiCheck className="w-8 h-8" style={{ color: '#10b981' }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>I'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 btn-outline-glow text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold mb-2" style={{ color: errors.name ? 'rgba(248,113,113,0.9)' : 'rgba(255,255,255,0.4)' }}>Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        autoComplete="name"
                        style={{
                          ...inputStyle,
                          borderColor: errors.name ? 'rgba(239,68,68,0.4)' : inputStyle.borderColor,
                          boxShadow: errors.name ? '0 0 0 3px rgba(239,68,68,0.08)' : 'none',
                        }}
                        onFocus={e => { e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.4)' : 'rgba(251,146,60,0.4)'; e.target.style.boxShadow = errors.name ? '0 0 0 3px rgba(239,68,68,0.08)' : '0 0 0 3px rgba(251,146,60,0.08)'; }}
                        onBlur={e => { e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                      />
                      {errors.name && <p className="text-xs mt-1" style={{ color: 'rgba(248,113,113,0.9)' }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold mb-2" style={{ color: errors.email ? 'rgba(248,113,113,0.9)' : 'rgba(255,255,255,0.4)' }}>Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        autoComplete="email"
                        style={{
                          ...inputStyle,
                          borderColor: errors.email ? 'rgba(239,68,68,0.4)' : inputStyle.borderColor,
                          boxShadow: errors.email ? '0 0 0 3px rgba(239,68,68,0.08)' : 'none',
                        }}
                        onFocus={e => { e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.4)' : 'rgba(251,146,60,0.4)'; e.target.style.boxShadow = errors.email ? '0 0 0 3px rgba(239,68,68,0.08)' : '0 0 0 3px rgba(251,146,60,0.08)'; }}
                        onBlur={e => { e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                      />
                      {errors.email && <p className="text-xs mt-1" style={{ color: 'rgba(248,113,113,0.9)' }}>{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="contact-message" className="block text-xs font-semibold" style={{ color: errors.message ? 'rgba(248,113,113,0.9)' : 'rgba(255,255,255,0.4)' }}>Message</label>
                      <span className="text-xs" style={{ color: form.message.length > 500 ? 'rgba(248,113,113,0.7)' : 'rgba(255,255,255,0.3)' }}>{form.message.length}/500</span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      maxLength={500}
                      placeholder="Tell me about your project or idea..."
                      style={{
                        ...inputStyle,
                        resize: 'none',
                        borderColor: errors.message ? 'rgba(239,68,68,0.4)' : inputStyle.borderColor,
                        boxShadow: errors.message ? '0 0 0 3px rgba(239,68,68,0.08)' : 'none',
                      }}
                      onFocus={e => { e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.4)' : 'rgba(251,146,60,0.4)'; e.target.style.boxShadow = errors.message ? '0 0 0 3px rgba(239,68,68,0.08)' : '0 0 0 3px rgba(251,146,60,0.08)'; }}
                      onBlur={e => { e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {errors.message && <p className="text-xs mt-1" style={{ color: 'rgba(248,113,113,0.9)' }}>{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div
                      className="flex items-center gap-2 text-sm p-3 rounded-xl"
                      style={{ background: 'rgba(239,68,68,0.1)', color: 'rgba(248,113,113,0.9)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <FiAlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Try emailing directly.
                    </div>
                  )}

                  <Magnetic amount={0.2}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-glow w-full justify-center disabled:opacity-50"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
