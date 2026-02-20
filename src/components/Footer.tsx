import React from 'react';
import Magnetic from './ui/Magnetic';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SiHuggingface } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/realsanjeev", label: "GitHub" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com/in/realsanjeev", label: "LinkedIn" },
    { icon: <SiHuggingface />, href: "https://huggingface.co/sanjeev-bhandari01", label: "Hugging Face" },
    { icon: <FiMail />, href: "mailto:075bei033.sanjeev@pcampus.edu.np", label: "Email" },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gray-50 border-t border-gray-100">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="section-container py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Sanjeev Bhandari</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Building the future of Machine Learning & AI through innovative solutions and research.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors animated-underline"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex justify-center md:justify-end gap-3">
              {socialLinks.map((social, idx) => (
                <Magnetic key={idx} amount={0.2}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-sm"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {currentYear} Sanjeev Bhandari. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Designed with 
            <span className="text-red-500 animate-pulse">( ◡̀_◡́)ᕤ</span> 
             passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
