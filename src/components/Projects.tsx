import React from "react";
import { Button } from "@/components/ui/button";
import { FiFileText, FiGithub, FiLink } from "react-icons/fi";
import { MAJOR_PROJECTS, GITHUB_PROJECTS } from "@/data/portfolio";
import TiltCard from "@/components/ui/TiltCard";
import StaggerContainer from "@/components/ui/StaggerContainer";
import ParallaxContent from "@/components/ui/ParallaxContent";

const Projects = () => {
  const getProjectColor = (type?: string) => {
    switch (type) {
      case 'major': return 'border-blue-500';
      case 'minor': return 'border-green-500';
      case 'internship': return 'border-purple-500';
      default: return 'border-gray-200';
    }
  };

  return (
    <section className="py-20 bg-transparent relative z-10" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center tracking-tighter uppercase">Projects</h2>
        <div className="space-y-12">
          <StaggerContainer>
            {MAJOR_PROJECTS.map((project, index) => (
              <ParallaxContent key={index} speed={0.08} className="mb-12">
                <TiltCard className={`glass-card border-l-4 ${getProjectColor(project.type)} p-8`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {project.detailedDescription}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <FiFileText className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </a>
                    )}
                    {project.url && project.url !== '#' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          {project.type === 'internship' ? (
                            <>
                              <FiLink className="mr-2 h-4 w-4" />
                              Read on Medium
                            </>
                          ) : (
                            <>
                              <FiGithub className="mr-2 h-4 w-4" />
                              View on GitHub
                            </>
                          )}
                        </Button>
                      </a>
                    )}
                  </div>
                </TiltCard>
              </ParallaxContent>
            ))}
          </StaggerContainer>

          {/* Other GitHub Projects */}
          <div className="pt-12">
            <h4 className="text-xl font-bold mb-8 text-gray-900 uppercase tracking-tight">Other Engineering Work</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GITHUB_PROJECTS.map((project, idx) => (
                <TiltCard key={idx} className="glass-card p-6 flex flex-col justify-between cursor-default group">
                  <div>
                    <div className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{project.name}</div>
                    <div className="text-gray-700 mb-4 line-clamp-2">{project.description}</div>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <FiGithub className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </a>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
