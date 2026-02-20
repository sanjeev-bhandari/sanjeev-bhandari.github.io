import React from 'react';
import { FiLink, FiClock, FiCalendar } from 'react-icons/fi';
import { BLOG_POSTS } from '@/data/portfolio';

const Blog = () => {
  const blogPosts = BLOG_POSTS;

  return (
    <section className="section-padding relative overflow-hidden" id="blog">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/2"></div>

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
            Blog
          </span>
          <h2 className="heading-xl text-gray-900 mb-4">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sharing insights on machine learning, AI research, and the future of technology
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <article className="h-full gradient-card rounded-2xl overflow-hidden shadow-lg card-hover border-gradient">
                {/* Gradient accent */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                
                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="tag hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more link */}
                  <div className="flex items-center text-indigo-600 text-sm font-medium">
                    <span>Read on Medium</span>
                    <FiLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="https://medium.com/@sanjeev-bhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FiLink className="w-4 h-4" />
            <span>Follow on Medium</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
