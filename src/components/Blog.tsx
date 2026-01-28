import React from 'react';
import { Button } from '@/components/ui/button';
import { FiLink } from 'react-icons/fi';
import { BLOG_POSTS } from '@/data/portfolio';
import TiltCard from '@/components/ui/TiltCard';

const Blog = () => {
  const blogPosts = BLOG_POSTS;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Blog & Articles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sharing insights on machine learning, AI research, and the future of technology.
            Follow my journey as I explore the cutting edge of artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <TiltCard key={index} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-sm text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <FiLink className="mr-2 h-4 w-4" />
                    Read on Medium
                  </Button>
                </a>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://medium.com/@sanjeev-bhandari"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <FiLink className="mr-2 h-5 w-5" />
              Follow on Medium
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
