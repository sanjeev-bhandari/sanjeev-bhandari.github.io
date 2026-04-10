import { motion } from 'framer-motion';
import Magnetic from './ui/Magnetic';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SiHuggingface, SiMedium } from 'react-icons/si';
import { FiMail, FiHeart } from 'react-icons/fi';

const socialLinks = [
  { icon: <FaGithub className="w-4 h-4" />, href: 'https://github.com/realsanjeev', label: 'GitHub' },
  { icon: <FaLinkedinIn className="w-4 h-4" />, href: 'https://linkedin.com/in/realsanjeev', label: 'LinkedIn' },
  { icon: <SiHuggingface className="w-4 h-4" />, href: 'https://huggingface.co/sanjeev-bhandari01', label: 'Hugging Face' },
  { icon: <SiMedium className="w-4 h-4" />, href: 'https://medium.com/@sanjeev-bhandari', label: 'Medium' },
  { icon: <FiMail className="w-4 h-4" />, href: 'mailto:075bei033.sanjeev@pcampus.edu.np', label: 'Email' },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-50 dark:bg-gray-950/80 border-t border-gray-100 dark:border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent dark:via-violet-500/30" />

      <div className="section-container py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 items-start mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-violet-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-700" />
                <span className="relative z-10 flex items-center justify-center w-full h-full text-white font-bold text-lg">S</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-base">Sanjeev Bhandari</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">ML Engineer · Nepal</div>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Building the future of Machine Learning & AI through innovative solutions and research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors animated-underline inline-block w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s, i) => (
                <Magnetic key={i} amount={0.2}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all duration-200 shadow-sm"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <p>© {year} Sanjeev Bhandari. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with
            <FiHeart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            and a lot of
            <span className="gradient-text font-semibold">Python</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
