
import React from 'react';
import Magnetic from './ui/Magnetic';
import { FaGithub, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { SiHuggingface } from 'react-icons/si';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/realsanjeev", color: "hover:text-gray-900" },
        { icon: <FaLinkedinIn />, href: "https://linkedin.com/in/realsanjeev", color: "hover:text-blue-600" },
        { icon: <SiHuggingface />, href: "https://huggingface.co/sanjeev-bhandari01", color: "hover:text-yellow-500" },
        { icon: <FaXTwitter />, href: "https://x.com/realsanjeev2", color: "hover:text-blue-400" },
    ];

    return (
        <footer className="py-12 border-t border-white/10 bg-white/5 backdrop-blur-sm relative z-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase mb-2">Sanjeev Bhandari</h3>
                    <p className="text-gray-600 text-sm">Building the future of Machine Learning & AI.</p>
                </div>

                <div className="flex gap-6">
                    {socialLinks.map((social, idx) => (
                        <Magnetic key={idx} amount={0.3}>
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-2xl text-gray-500 transition-colors duration-300 ${social.color}`}
                            >
                                {social.icon}
                            </a>
                        </Magnetic>
                    ))}
                </div>

                <div className="text-center md:text-right">
                    <p className="text-gray-500 text-sm leading-relaxed">
                        &copy; {currentYear} Sanjeev Bhandari. <br />
                        Designed with precision and ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
