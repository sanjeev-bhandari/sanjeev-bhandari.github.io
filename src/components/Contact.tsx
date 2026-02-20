import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FiMail, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { SiHuggingface } from 'react-icons/si';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import Magnetic from './ui/Magnetic';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    { 
      icon: <FiMail />, 
      label: 'Email', 
      value: '075bei033.sanjeev@pcampus.edu.np', 
      href: 'mailto:075bei033.sanjeev@pcampus.edu.np' 
    },
    { 
      icon: <FaLinkedinIn />, 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/realsanjeev', 
      href: 'https://linkedin.com/in/realsanjeev' 
    },
    { 
      icon: <FaGithub />, 
      label: 'GitHub', 
      value: 'github.com/realsanjeev', 
      href: 'https://github.com/realsanjeev' 
    },
    { 
      icon: <SiHuggingface />, 
      label: 'Hugging Face', 
      value: 'huggingface.co/sanjeev-bhandari01', 
      href: 'https://huggingface.co/sanjeev-bhandari01' 
    },
  ];

  const interests = [
    'Research collaborations in AI/ML',
    'Consulting on ML projects',
    'Speaking opportunities',
    'Open source contributions'
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
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="contact">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-50 translate-y-1/2"></div>

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
            Contact
          </span>
          <h2 className="heading-xl text-gray-900 mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, research collaborations, or chatting about the future of AI
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Card */}
            <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-xl border-gradient">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                      <span className="text-gray-600 group-hover:text-indigo-600 transition-colors">
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                      <div className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-xl border-gradient">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Areas of Interest</h3>
              <ul className="space-y-3">
                {interests.map((area, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0"></span>
                    <span className="text-sm">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-3">
            <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-xl border-gradient">
              <h3 className="text-lg font-bold text-gray-900 mb-6 text-center lg:text-left">Send a Message</h3>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                  <FiCheck className="w-5 h-5 flex-shrink-0" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Failed to send message. Please try again or email me directly.</span>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      className="h-12 bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="h-12 bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input
                    name="subject"
                    placeholder="What's this about?"
                    className="h-12 bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <Magnetic amount={0.1}>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </Magnetic>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
