import { SKILLS } from '@/data/portfolio';
import { FiCode, FiCpu, FiDatabase, FiZap } from 'react-icons/fi';

const About = () => {
  const icons = [FiCpu, FiCode, FiDatabase, FiZap];

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="about">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2"></div>

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
            About Me
          </span>
          <h2 className="heading-xl text-gray-900 mb-4">
            Passionate about building
            <span className="gradient-text"> intelligent systems</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transforming ideas into reality through the power of machine learning and AI
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column - About Text */}
          <div className="lg:col-span-3 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed">
                I'm a <span className="font-semibold text-gray-900">Machine Learning Engineer</span> with 
                a deep passion for advancing the field of artificial intelligence. My work focuses on 
                developing innovative ML solutions that bridge the gap between cutting-edge research 
                and real-world applications.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With a background in both theoretical foundations and practical implementation, I enjoy 
                tackling complex challenges in <span className="font-medium text-gray-900">computer vision</span>, 
                <span className="font-medium text-gray-900"> natural language processing</span>, and 
                <span className="font-medium text-gray-900"> deep learning</span>. I believe that AI has 
                the potential to transform industries and improve lives worldwide.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                When I'm not coding or training models, you'll find me writing technical articles on Medium, 
                diving into the latest research papers, experimenting with low-level programming, and 
                continuously exploring new technologies.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { value: '3+', label: 'Years Exp.' },
                { value: '10+', label: 'Projects' },
                // { value: '5+', label: 'Papers' },
                { value: '∞', label: 'Curiosity' },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="text-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* Research Interests */}
            <div className="gradient-card rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <FiCpu className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{SKILLS[0].category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(SKILLS[0].items as string[]).map((interest, i) => (
                  <span
                    key={i}
                    className="tag tag-primary hover:bg-indigo-100 cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="gradient-card rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <FiCode className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{SKILLS[1].category}</h3>
              </div>
              <div className="space-y-4">
                {(SKILLS[1].items as { name: string, value: string }[]).map((skill, i) => {
                  const IconComponent = icons[i % icons.length];
                  return (
                    <div key={skill.name} className="group">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      </div>
                      <p className="text-sm text-gray-500 pl-6">{skill.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;
