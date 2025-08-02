'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Simulate form submission
    try {
      // In a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just show a success message
      setSubmitMessage({
        type: 'success',
        text: 'Thank you for contacting us! We\'ll get back to you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>💬</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Get in Touch
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              lineHeight: '1.6'
            }}>
              Have questions about your financial journey? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{
        paddingTop: '3rem',
        paddingBottom: '5rem',
        backgroundColor: '#f9fafb'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            maxWidth: '72rem',
            margin: '0 auto'
          }}>
            {/* Contact Form */}
            <div className="card card-elevated" style={{ padding: '2.5rem' }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '2rem'
              }}>
                Send Us a Message
              </h2>

              {submitMessage && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                  backgroundColor: submitMessage.type === 'success' ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${submitMessage.type === 'success' ? '#86efac' : '#fecaca'}`,
                  color: submitMessage.type === 'success' ? '#166534' : '#991b1b'
                }}>
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.2s ease-in-out',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.2s ease-in-out',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div>
                  <label htmlFor="subject" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.2s ease-in-out',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.2s ease-in-out',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '150px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{
                    width: '100%',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="card card-elevated" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '2rem'
                }}>
                  Other Ways to Reach Us
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>📧</span> Email Support
                    </h3>
                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                      support@simplestepsfinance.com<br />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        We respond within 24 hours
                      </span>
                    </p>
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>🕐</span> Business Hours
                    </h3>
                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>💡</span> Quick Help
                    </h3>
                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                      Check out our <a href="/faq" style={{
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}>FAQ page</a> for instant answers to common questions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="card" style={{
                padding: '1.5rem',
                backgroundColor: '#eff6ff',
                border: '1px solid #93c5fd'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1e40af',
                  marginBottom: '0.5rem'
                }}>
                  💬 Average Response Time
                </h3>
                <p style={{
                  color: '#1e40af',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>
                  We typically respond to all inquiries within 12-24 hours during business days. 
                  Priority support is available for premium members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}