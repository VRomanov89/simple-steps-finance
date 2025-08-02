'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        paddingTop: '4rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.1) 0%, transparent 25%), 
                           radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.05) 0%, transparent 25%)`,
          zIndex: 0
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '56rem', margin: '0 auto' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '2rem' }}>👨‍💼</span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              From Engineer to Entrepreneur:<br />
              <span style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                A Journey Towards Financial Clarity and Freedom
              </span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '2.5rem'
            }}>
              My name is Vlad, and I founded Simple Steps Finance to help you achieve financial freedom through clear, actionable guidance based on real experience and proven principles.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginTop: '2.5rem'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 1.5rem',
                borderRadius: '2rem',
                border: '1px solid rgba(37, 99, 235, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🎓</span>
                <span style={{ fontWeight: '600', color: '#111827' }}>MBA McGill University</span>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 1.5rem',
                borderRadius: '2rem',
                border: '1px solid rgba(37, 99, 235, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>⚙️</span>
                <span style={{ fontWeight: '600', color: '#111827' }}>Engineering Background</span>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 1.5rem',
                borderRadius: '2rem',
                border: '1px solid rgba(37, 99, 235, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                <span style={{ fontWeight: '600', color: '#111827' }}>Serial Entrepreneur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#f9fafb'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              The Journey That Built Simple Steps Finance
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              Every step of my career contributed to understanding what truly matters in financial success
            </p>
          </div>

          <div style={{
            maxWidth: '64rem',
            margin: '0 auto',
            position: 'relative'
          }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '2rem',
              bottom: '2rem',
              width: '2px',
              background: 'linear-gradient(to bottom, #2563eb, #1d4ed8)',
              transform: 'translateX(-50%)',
              zIndex: 0
            }} />

            {/* Timeline Items */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              
              {/* Engineer */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '2rem',
                alignItems: 'center',
                marginBottom: '4rem'
              }}>
                <div className="card card-elevated" style={{
                  padding: '2.5rem',
                  textAlign: 'right',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#dbeafe',
                    borderRadius: '50%',
                    marginBottom: '1.5rem',
                    marginLeft: 'auto'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>⚙️</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Engineering Foundation
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}>
                    My career began in engineering, where I developed structured thinking, precision, and data driven decision making. These analytical skills became the foundation for everything that followed, teaching me to approach problems systematically and find practical solutions.
                  </p>
                </div>
                
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#2563eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px #ffffff, 0 0 0 8px #dbeafe'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>1</span>
                </div>
                
                <div></div>
              </div>

              {/* Saving & Investing */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '2rem',
                alignItems: 'center',
                marginBottom: '4rem'
              }}>
                <div></div>
                
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px #ffffff, 0 0 0 8px #d1fae5'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>2</span>
                </div>
                
                <div className="card card-elevated" style={{
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#d1fae5',
                    borderRadius: '50%',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>💰</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Saving & First Investment
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}>
                    I saved diligently and invested in my first property, marking my transition from earning income to building real wealth. This experience taught me about asset appreciation, leveraging equity, and managing financial risks and opportunities firsthand.
                  </p>
                </div>
              </div>

              {/* MBA */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '2rem',
                alignItems: 'center',
                marginBottom: '4rem'
              }}>
                <div className="card card-elevated" style={{
                  padding: '2.5rem',
                  textAlign: 'right',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)',
                  border: '1px solid #fde68a'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#fde68a',
                    borderRadius: '50%',
                    marginBottom: '1.5rem',
                    marginLeft: 'auto'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🎓</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    MBA & Financial Acumen
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}>
                    My MBA from McGill University dramatically expanded my perspective on strategic thinking, finance, and business operations. More importantly, it revealed the pressing need for better financial education among professionals and everyday individuals.
                  </p>
                </div>
                
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#f59e0b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px #ffffff, 0 0 0 8px #fde68a'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>3</span>
                </div>
                
                <div></div>
              </div>

              {/* Corporate Experience */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '2rem',
                alignItems: 'center',
                marginBottom: '4rem'
              }}>
                <div></div>
                
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px #ffffff, 0 0 0 8px #e9d5ff'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>4</span>
                </div>
                
                <div className="card card-elevated" style={{
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%)'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#e9d5ff',
                    borderRadius: '50%',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🏢</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Corporate Leadership
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}>
                    Working with industry leaders like Procter & Gamble and Kraft Heinz, I encountered countless talented individuals who struggled with financial management not due to lack of intelligence, but simply gaps in financial literacy.
                  </p>
                </div>
              </div>

              {/* Entrepreneurship */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '2rem',
                alignItems: 'center'
              }}>
                <div className="card card-elevated" style={{
                  padding: '2.5rem',
                  textAlign: 'right',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fecaca 100%)',
                  border: '1px solid #fca5a5'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#fca5a5',
                    borderRadius: '50%',
                    marginBottom: '1.5rem',
                    marginLeft: 'auto'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🚀</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Entrepreneurship & Realization
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}>
                    As an entrepreneur founding and growing my own ventures, I realized the need to demystify personal finance. This inspired Simple Steps Finance: transforming complex financial concepts into simple, clear steps anyone can follow confidently.
                  </p>
                </div>
                
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px #ffffff, 0 0 0 8px #fca5a5'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>5</span>
                </div>
                
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Built on Experience, Driven by Results
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              Your financial success is backed by proven experience and real world expertise
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {/* Education */}
            <div className="card card-elevated" style={{
              padding: '2.5rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)'
            }}>
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
                <span style={{ fontSize: '1.5rem' }}>🎓</span>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                MBA from McGill University
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Advanced business education with focus on strategic finance, operations, and analytical decision making
              </p>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '2rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Strategic Finance
              </div>
            </div>

            {/* Professional Experience */}
            <div className="card card-elevated" style={{
              padding: '2.5rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🏢</span>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Fortune 500 Leadership
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Proven track record with industry leaders including Procter & Gamble and Kraft Heinz in strategic roles
              </p>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  P&G
                </span>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  Kraft Heinz
                </span>
              </div>
            </div>

            {/* Entrepreneurial Success */}
            <div className="card card-elevated" style={{
              padding: '2.5rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Serial Entrepreneur
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Founded and scaled multiple successful ventures, understanding both business growth and personal finance management
              </p>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#fde68a',
                color: '#92400e',
                borderRadius: '2rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Proven Execution
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#2563eb',
                marginBottom: '0.5rem'
              }}>
                15+
              </div>
              <p style={{
                color: '#4b5563',
                fontWeight: '600'
              }}>
                Years Experience
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                3
              </div>
              <p style={{
                color: '#4b5563',
                fontWeight: '600'
              }}>
                Successful Ventures
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#f59e0b',
                marginBottom: '0.5rem'
              }}>
                8
              </div>
              <p style={{
                color: '#4b5563',
                fontWeight: '600'
              }}>
                Financial Stages
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#8b5cf6',
                marginBottom: '0.5rem'
              }}>
                1000+
              </div>
              <p style={{
                color: '#4b5563',
                fontWeight: '600'
              }}>
                People Helped
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#f9fafb'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '56rem',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '2rem'
            }}>
              My Vision for Simple Steps Finance
            </h2>
            
            <div className="card card-elevated" style={{
              padding: '3rem',
              textAlign: 'left',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <p style={{
                fontSize: '1.25rem',
                color: '#374151',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                Today, my mission is clear: to empower individuals just like you to achieve financial clarity, reduce debt, build sustainable wealth, and ultimately gain the freedom to pursue the lives they truly desire.
              </p>
              
              <p style={{
                fontSize: '1.125rem',
                color: '#4b5563',
                lineHeight: '1.7',
                marginBottom: '2rem'
              }}>
                Simple Steps Finance is not just another financial tool. It is your personal guide, carefully crafted from real world lessons, strategic insights, and proven financial wisdom. Every resource, tool, and piece of guidance you will find here is the result of careful design, driven by my structured, analytical background and extensive hands on experience.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginTop: '2.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: '#dbeafe',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>🎯</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.5rem'
                    }}>
                      Transparency
                    </h4>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9375rem'
                    }}>
                      Clear, honest guidance with no hidden agendas
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: '#d1fae5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>✅</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.5rem'
                    }}>
                      Authenticity
                    </h4>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9375rem'
                    }}>
                      Real experience, not just theory
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: '#fde68a',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>📈</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.5rem'
                    }}>
                      Results
                    </h4>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9375rem'
                    }}>
                      Tangible outcomes and measurable progress
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#ffffff',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '48rem',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div className="card card-elevated" style={{
              padding: '4rem 3rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}>
                <span style={{ fontSize: '2rem' }}>🚀</span>
              </div>
              
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                Ready to Transform Your Financial Future?
              </h2>
              
              <p style={{
                fontSize: '1.25rem',
                color: '#4b5563',
                lineHeight: '1.7',
                marginBottom: '2.5rem'
              }}>
                This is not theory. This is a structured path grounded in practical steps and tangible outcomes. I am committed to your long term success.
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <Link href="/quiz">
                  <button className="btn btn-primary btn-lg" style={{
                    minWidth: '280px',
                    fontSize: '1.25rem',
                    padding: '1.25rem 2.5rem'
                  }}>
                    Take Your Free Assessment Quiz
                  </button>
                </Link>
                <p style={{
                  fontSize: '0.9375rem',
                  color: '#6b7280'
                }}>
                  Get your personalized roadmap in under 3 minutes
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                  100% Free Assessment
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                  Instant Results
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                  Personalized Guidance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}