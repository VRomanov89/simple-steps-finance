'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample blog data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: '5 Simple Steps to Create Your First Budget',
    excerpt: 'Learn how to create a budget that actually works for your lifestyle. We\'ll walk you through the process step by step.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Budgeting',
    readTime: '5 min read',
    image: '/blog/budget-basics.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'Understanding Credit Scores: A Beginner\'s Guide',
    excerpt: 'Your credit score impacts many aspects of your financial life. Here\'s everything you need to know to improve yours.',
    author: 'Mike Chen',
    date: '2024-01-12',
    category: 'Credit',
    readTime: '7 min read',
    image: '/blog/credit-score.jpg',
    featured: false
  },
  {
    id: 3,
    title: 'The Debt Snowball vs. Avalanche Method',
    excerpt: 'Which debt repayment strategy is right for you? We compare the two most popular methods.',
    author: 'Lisa Rodriguez',
    date: '2024-01-10',
    category: 'Debt',
    readTime: '6 min read',
    image: '/blog/debt-methods.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'Building Your Emergency Fund: How Much Do You Need?',
    excerpt: 'An emergency fund is your financial safety net. Learn how to calculate the right amount and start saving today.',
    author: 'Sarah Johnson',
    date: '2024-01-08',
    category: 'Savings',
    readTime: '4 min read',
    image: '/blog/emergency-fund.jpg',
    featured: true
  },
  {
    id: 5,
    title: 'Automating Your Finances for Success',
    excerpt: 'Set up your finances on autopilot and never miss a payment again. Here\'s how to automate your money management.',
    author: 'Mike Chen',
    date: '2024-01-05',
    category: 'Automation',
    readTime: '5 min read',
    image: '/blog/automation.jpg',
    featured: false
  },
  {
    id: 6,
    title: 'Side Hustles to Boost Your Income',
    excerpt: 'Looking to increase your income? These side hustle ideas can help you earn extra money in your spare time.',
    author: 'Lisa Rodriguez',
    date: '2024-01-03',
    category: 'Income',
    readTime: '8 min read',
    image: '/blog/side-hustles.jpg',
    featured: false
  }
];

const categories = ['All', 'Budgeting', 'Credit', 'Debt', 'Savings', 'Automation', 'Income'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        paddingTop: '3rem',
        paddingBottom: '4rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Financial Insights Blog
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              Expert advice and practical tips to help you master your money
            </p>
            
            {/* Search Bar */}
            <div style={{
              maxWidth: '32rem',
              margin: '0 auto',
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '2rem',
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease-in-out'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.25rem'
              }}>
                🔍
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section style={{
          paddingTop: '3rem',
          paddingBottom: '3rem',
          backgroundColor: '#f9fafb'
        }}>
          <div className="container">
            <div className="card card-elevated" style={{
              padding: '0',
              overflow: 'hidden',
              maxWidth: '72rem',
              margin: '0 auto'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                alignItems: 'center'
              }}>
                <div style={{
                  padding: '3rem',
                  order: 1
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.375rem 0.75rem',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    Featured Article
                  </div>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '1rem',
                    lineHeight: '1.2'
                  }}>
                    {featuredPost.title}
                  </h2>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '1.125rem'
                  }}>
                    {featuredPost.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <span>{featuredPost.author}</span>
                    <span>•</span>
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link href={`/blog/${featuredPost.id}`}>
                    <button className="btn btn-primary">
                      Read Full Article
                    </button>
                  </Link>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  height: '100%',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  order: 2
                }}>
                  <span style={{ fontSize: '5rem', opacity: 0.3 }}>📊</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section style={{
        paddingTop: '2rem',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '2rem',
                  border: '2px solid',
                  borderColor: selectedCategory === category ? '#2563eb' : '#e5e7eb',
                  backgroundColor: selectedCategory === category ? '#2563eb' : '#ffffff',
                  color: selectedCategory === category ? '#ffffff' : '#4b5563',
                  fontWeight: '500',
                  fontSize: '0.9375rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#93c5fd';
                    e.currentTarget.style.backgroundColor = '#eff6ff';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section style={{
        paddingBottom: '5rem',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '72rem',
            margin: '0 auto'
          }}>
            {filteredPosts.map(post => (
              <article key={post.id} className="card card-elevated" style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${
                    post.category === 'Budgeting' ? '#10b981' :
                    post.category === 'Credit' ? '#f59e0b' :
                    post.category === 'Debt' ? '#ef4444' :
                    post.category === 'Savings' ? '#3b82f6' :
                    post.category === 'Automation' ? '#8b5cf6' :
                    '#6366f1'
                  } 0%, ${
                    post.category === 'Budgeting' ? '#059669' :
                    post.category === 'Credit' ? '#d97706' :
                    post.category === 'Debt' ? '#dc2626' :
                    post.category === 'Savings' ? '#2563eb' :
                    post.category === 'Automation' ? '#7c3aed' :
                    '#4f46e5'
                  } 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '3rem', opacity: 0.3 }}>
                    {post.category === 'Budgeting' ? '💰' :
                     post.category === 'Credit' ? '💳' :
                     post.category === 'Debt' ? '📉' :
                     post.category === 'Savings' ? '🏦' :
                     post.category === 'Automation' ? '🤖' :
                     '💵'}
                  </span>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    alignSelf: 'flex-start'
                  }}>
                    {post.category}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '0.75rem',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    flex: 1
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem'
            }}>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280'
              }}>
                No articles found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{
        paddingTop: '3rem',
        paddingBottom: '5rem',
        backgroundColor: '#f9fafb'
      }}>
        <div className="container">
          <div className="card card-elevated" style={{
            maxWidth: '48rem',
            margin: '0 auto',
            padding: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Stay Updated
            </h2>
            <p style={{
              color: '#4b5563',
              marginBottom: '2rem',
              fontSize: '1.125rem'
            }}>
              Get the latest financial tips and insights delivered to your inbox weekly.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '32rem',
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '0.875rem 1.25rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  minWidth: '250px'
                }}
              />
              <button className="btn btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}