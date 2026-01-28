import { EXPERIENCES } from "@/data/portfolio";
import StaggerContainer from "@/components/ui/StaggerContainer";
import TiltCard from "@/components/ui/TiltCard";
import ParallaxContent from "@/components/ui/ParallaxContent";

const Experience = () => {
  const experiences = EXPERIENCES;

  return (
    <section className="py-20 bg-transparent relative z-10" id="experience">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center tracking-tighter uppercase">Experience</h2>

        <div className="space-y-8">
          <StaggerContainer>
            {experiences.map((exp, index) => (
              <ParallaxContent key={index} speed={0.05} className="mb-8">
                <TiltCard className="glass-card p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 font-medium">{exp.period}</span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </ParallaxContent>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Experience;
