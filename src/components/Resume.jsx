import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, Mail, Phone, MapPin, Github, Linkedin, Award, Briefcase, GraduationCap, Globe } from 'lucide-react';

const Resume = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const skills = [
    { name: 'Python (Pandas, NumPy)', level: '85%' },
    { name: 'SQL / MySQL', level: '90%' },
    { name: 'Power BI', level: '80%' },
    { name: 'Microsoft Excel', level: '85%' },
    { name: 'Data Cleaning & EDA', level: '90%' },
    { name: 'Data Visualization', level: '85%' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(5, 5, 10, 0.98)',
        zIndex: 2000,
        overflowY: 'auto',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div className="container" style={{ padding: '4rem 2rem', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'fixed', top: '2rem', right: '2rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: 'white', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10, transition: 'all 0.3s' }}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'var(--font-hero)' }}>SAFVAN SIDHEEQ</h1>
          <p style={{ 
            fontSize: '1.2rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Data Analyst</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-2)', fontSize: '0.9rem' }}><Mail size={15} /> safvankallayi7@gmail.com</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-2)', fontSize: '0.9rem' }}><Phone size={15} /> +91 8590207382</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-2)', fontSize: '0.9rem' }}><MapPin size={15} /> Kerala, India</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            <a href="https://linkedin.com/in/safvenn" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontSize: '0.85rem' }}>
              <Linkedin size={14} /> linkedin.com/in/safvenn
            </a>
            <a href="https://github.com/safvenn" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontSize: '0.85rem' }}>
              <Github size={14} /> github.com/safvenn
            </a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {/* Left Column */}
          <div>
            {/* Professional Summary */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>PROFESSIONAL SUMMARY</h2>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                Detail-oriented aspiring Data Analyst with strong skills in data cleaning, exploratory data analysis, 
                multi-table integration, and dashboard creation. Experienced in transforming raw data into structured datasets 
                and developing dashboards using Python, SQL, Excel, and Power BI. Completed professional job simulations 
                from Deloitte and Tata through Forage.
              </p>
            </section>

            {/* Education */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
                <GraduationCap size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />EDUCATION
              </h2>
              <div>
                <h3 style={{ fontSize: '1.05rem' }}>Bachelor of Computer Applications (BCA)</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>Kerala, India</p>
                <p style={{ fontSize: '0.85rem', color: '#60a5fa' }}>Expected Graduation: 2026</p>
              </div>
            </section>

            {/* Certifications */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
                <Award size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />CERTIFICATIONS
              </h2>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem' }}>Exploratory Data Analysis with Python and Pandas</h3>
                <p style={{ color: '#06b6d4', fontSize: '0.85rem' }}>Coursera — 2026</p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem' }}>Databases and SQL for Data Science with Python</h3>
                <p style={{ color: '#06b6d4', fontSize: '0.85rem' }}>IBM / Coursera — 2026</p>
              </div>
            </section>

            {/* Job Simulations */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
                <Briefcase size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />JOB SIMULATIONS
              </h2>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem' }}>Deloitte — Data Analytics Simulation</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>Forage • April 2026</p>
                <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Data Analysis, Forensic Technology, Business Insight Reporting</p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem' }}>Tata — Data Visualization Simulation</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>Forage • April 2026</p>
                <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Business Scenario Framing, Creating Charts, Communicating Insights</p>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
                <Globe size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />LANGUAGES
              </h2>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>English — Professional</span>
                <span style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>Malayalam — Native</span>
                <span style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>Hindi — Conversational</span>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div>
            {/* Skills */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>TECHNICAL SKILLS</h2>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>{skill.name}</span>
                    <span style={{ color: '#60a5fa', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{skill.level}</span>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: skill.level }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '3px' }}
                    />
                  </div>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>KEY PROJECTS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.95rem' }}>Petrol Station Analytics — Python → Power BI</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.3rem' }}>
                    End-to-end pipeline processing 150K+ transactions (₹2.15B revenue). Built Operations & HR dashboards with IQR outlier detection.
                  </p>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>Python • Pandas • NumPy • Power BI • Matplotlib</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem' }}>Hospital Doctor Utilization & Patient Cost Analysis</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.3rem' }}>
                    Integrated 4 datasets, built multi-table pipeline, executed 10+ SQL queries. Identified 3 high-cost patient segments.
                  </p>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>Python • Pandas • MySQL • SQLAlchemy • Matplotlib</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem' }}>Netflix Dataset — Cleaning & Segmentation</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.3rem' }}>
                    Cleaned 8,000+ records, performed genre/actor analysis, created Power BI visualizations.
                  </p>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>Python • Pandas • Excel • Power BI</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem' }}>Sales Performance Dashboard</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.3rem' }}>
                    Interactive dashboard tracking 6 KPIs with drill-through analysis and automated summaries.
                  </p>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>Power BI • Excel</p>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section>
              <h2 style={{ borderBottom: '1px solid rgba(59,130,246,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.08em' }}>KEY ACHIEVEMENTS</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Built multi-table hospital analytics integrating 4 datasets',
                  'Developed SQL-based analytical workflows with 10+ queries',
                  'Completed Deloitte and Tata professional simulations',
                  'Earned certifications in Python and SQL from Coursera/IBM',
                  'Built end-to-end data pipelines from raw data to visualization'
                ].map((achievement, i) => (
                  <li key={i} style={{ 
                    display: 'flex', alignItems: 'flex-start', gap: '0.6rem', 
                    color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.5 
                  }}>
                    <span style={{ 
                      width: 6, height: 6, borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
                      flexShrink: 0, marginTop: '0.45rem' 
                    }} />
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem 3rem' }}
            onClick={() => {
              alert('To save as PDF:\n1. Press Ctrl+P (Cmd+P)\n2. Select "Save as PDF"\n3. Click Save');
              window.print();
            }}
          >
            <Download size={18} /> Download / Print Resume
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
