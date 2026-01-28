import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FiMail } from 'react-icons/fi';
import { SiHuggingface } from 'react-icons/si';
import { FaGithub, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import Magnetic from './ui/Magnetic';
import TiltCard from './ui/TiltCard';

const Contact = () => {
  return (
    <section className="py-24 bg-transparent relative z-10" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-none">
            Let's <span className="text-blue-600">Connect</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            I'm always open to discussing new opportunities, research collaborations, or chatting about the future of AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <TiltCard className="glass-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Direct Info</h3>
              <div className="space-y-6">
                {[
                  { icon: <FiMail />, text: "075bei033.sanjeev@pcampus.edu.np", href: "mailto:075bei033.sanjeev@pcampus.edu.np" },
                  { icon: <FaLinkedinIn />, text: "linkedin.com/in/realsanjeev", href: "https://linkedin.com/in/realsanjeev" },
                  { icon: <FaGithub />, text: "github.com/realsanjeev", href: "https://github.com/realsanjeev" },
                  { icon: <SiHuggingface />, text: "huggingface.co/sanjeev-bhandari01", href: "https://huggingface.co/sanjeev-bhandari01" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center group">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 transition-colors break-all text-sm font-medium"
                    >
                      {item.text}
                    </a>
                  </div>
                ))}
              </div>
            </TiltCard>

            <div className="p-8 border-l-2 border-blue-600/20">
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Areas of Interest</h4>
              <ul className="space-y-3">
                {['Research collaborations in AI/ML', 'Consulting on ML projects', 'Speaking opportunities', 'Open source contributions'].map((area, i) => (
                  <li key={i} className="flex items-center text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <TiltCard className="glass-card p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-tight text-center lg:text-left">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Your Name"
                    className="bg-white/50 border-gray-200/50 focus:border-blue-500 h-12 rounded-xl"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-white/50 border-gray-200/50 focus:border-blue-500 h-12 rounded-xl"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="bg-white/50 border-gray-200/50 focus:border-blue-500 h-12 rounded-xl"
                />
                <textarea
                  placeholder="Tell me about your project or inquiry..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Magnetic amount={0.1}>
                  <Button className="w-full lg:w-auto px-12 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                    Send Message
                  </Button>
                </Magnetic>
              </form>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
