import React from "react";
import { Button } from "@/components/ui/button";
import { FiFileText, FiGithub, FiLink } from "react-icons/fi";
import { MAJOR_PROJECTS, GITHUB_PROJECTS } from "@/data/portfolio";
import TiltCard from "@/components/ui/TiltCard";
import StaggerContainer from "@/components/ui/StaggerContainer";

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
    <section className="py-20 bg-white" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Projects</h2>
        <div className="space-y-8">
          <StaggerContainer>
            {MAJOR_PROJECTS.map((project, index) => (
              <TiltCard key={index} className={`border-l-4 ${getProjectColor(project.type)} pl-8 pb-8 mb-8`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-1">{project.description}</p>
                <p className="text-gray-700 mb-4 leading-relaxed">
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
            ))}
          </StaggerContainer>

          {/* Other GitHub Projects */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Other Projects on GitHub</h4>
            <ul className="space-y-4">
              {GITHUB_PROJECTS.map((project, idx) => (
                <TiltCard key={idx} className="border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between bg-gray-50 mb-4 cursor-default">
                  <div>
                    <div className="font-semibold text-gray-900">{project.name}</div>
                    <div className="text-gray-700 mb-2">{project.description}</div>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 md:mt-0"
                  >
                    <Button variant="outline" size="sm">
                      <FiGithub className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </a>
                </TiltCard>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
