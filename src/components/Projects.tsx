import React from "react";
import { Button } from "@/components/ui/button";
import { FiFileText, FiGithub, FiLink, FiFolder } from "react-icons/fi";
import { MAJOR_PROJECTS, GITHUB_PROJECTS } from "@/data/portfolio";

const Projects = () => {
  const getProjectTypeStyles = (type?: string) => {
    switch (type) {
      case 'major':
        return {
          badge: 'bg-indigo-50 text-indigo-700',
          border: 'from-indigo-500 to-purple-500'
        };
      case 'minor':
        return {
          badge: 'bg-emerald-50 text-emerald-700',
          border: 'from-emerald-500 to-teal-500'
        };
      case 'internship':
        return {
          badge: 'bg-amber-50 text-amber-700',
          border: 'from-amber-500 to-orange-500'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-700',
          border: 'from-gray-400 to-gray-500'
        };
    }
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="projects">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-50"></div>

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
            Projects
          </span>
          <h2 className="heading-xl text-gray-900 mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in machine learning and AI
          </p>
        </div>

        {/* Major Projects */}
        <div className="space-y-8 mb-20">
          {MAJOR_PROJECTS.map((project, index) => {
            const styles = getProjectTypeStyles(project.type);
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Gradient border effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${styles.border} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>
                
                <div className="relative gradient-card rounded-2xl p-6 md:p-8 shadow-xl card-hover">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Project Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${styles.border} flex items-center justify-center shadow-lg`}>
                        <FiFolder className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {project.name}
                        </h3>
                        {project.type && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
                            {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-3">{project.description}</p>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {project.detailedDescription}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {project.downloadUrl && (
                          <a
                            href={project.downloadUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline" size="sm" className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-gray-50">
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
                            <Button variant="outline" size="sm" className="rounded-full border-gray-200 hover:border-gray-300 hover:bg-gray-50">
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
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other GitHub Projects */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <h3 className="text-lg font-semibold text-gray-900">Other Engineering Work</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GITHUB_PROJECTS.map((project, idx) => (
              <a
                key={idx}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-full gradient-card rounded-2xl p-6 shadow-lg card-hover border-gradient">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                      <FiGithub className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                        {project.name}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center text-indigo-600 text-sm font-medium">
                    <span>View Project</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
