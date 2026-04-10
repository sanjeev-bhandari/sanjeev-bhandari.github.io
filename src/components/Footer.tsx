import { motion } from 'framer-motion';
import Magnetic from './ui/Magnetic';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SiHuggingface, SiMedium } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

const socials = [
  { href: 'https://github.com/realsanjeev', icon: <FaGithub className="w-4 h-4" />, label: 'GitHub' },
  { href: 'https://linkedin.com/in/realsanjeev', icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn' },
  { href: 'https://medium.com/@realsanjeev', icon: <SiMedium className="w-4 h-4" />, label: 'Medium' },
  { href: 'https://huggingface.co/realsanjeev', icon: <SiHuggingface className="w-4 h-4" />, label: 'HuggingFace' },
  { href: 'mailto:075bei033.sanjeev@pcampus.edu.np', icon: <FiMail className="w-4 h-4" />, label: 'Email' },
];

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-10 overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)' }}
      />

      {/* Big background text */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[12vw] font-black leading-none select-none pointer-events-none whitespace-nowrap"
        style={{
          fontFamily: 'Space Grotesk',
          color: 'rgba(167,139,250,0.04)',
          letterSpacing: '-0.03em',
        }}
      >
        SANJEEV
      </div>

      <div className="container-xl relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}
              >
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>S</span>
              </div>
              <span className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk' }}>Sanjeev Bhandari</span>
            </div>
            <p className="text-xs max-w-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              ML Engineer building intelligent systems at the intersection of AI research and real-world impact.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {navLinks.map(l => (
              <a
                key={l.name}
                href={l.href}
                className="text-sm transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a78bfa')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                {l.name}
              </a>
            ))}
          </motion.nav>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {socials.map((s, i) => (
              <Magnetic key={i} amount={0.3}>
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(167,139,250,0.1)';
                    el.style.borderColor = 'rgba(167,139,250,0.25)';
                    el.style.color = '#a78bfa';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.04)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  {s.icon}
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Sanjeev Bhandari. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Built with React + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
