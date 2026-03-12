import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from 'lucide-react';

const Resume = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const skills = [
    { name: 'Flutter & Dart', level: '95%' },
    { name: 'Firebase (Auth, Firestore, DB)', level: '90%' },
    { name: 'MERN Stack', level: '70%' },
    { name: 'MVVM Architecture', level: '85%' },
    { name: 'State Management (Riverpod)', level: '80%' },
    { name: 'Python & Java', level: '65%' },
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
        background: 'rgba(5, 5, 5, 0.98)',
        zIndex: 2000,
        overflowY: 'auto',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div className="container" style={{ padding: '4rem 2rem', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'fixed', top: '2rem', right: '2rem', background: 'var(--glass)', border: 'none', color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>SAFVAN SIDHEEQ</h1>
          <p style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Flutter & Firebase Developer</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Mail size={16} /> mkdsafwan4@gmail.com</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Phone size={16} /> +91 8590207382</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><MapPin size={16} /> Mannarkkad, Kerala</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {/* Left Column */}
          <div>
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>EDUCATION</h2>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>BCA (Final Year)</h3>
                <p style={{ color: 'var(--text-muted)' }}>Focused on Software & Mobile Dev</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>2024 - Present</p>
              </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>EXPERIENCE</h2>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Flutter Intern</h3>
                <p style={{ color: 'white' }}>Perinthalmanna, Kerala</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Hands-on development of scalable mobile apps and real-time database integration.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>MERN Stack Intern</h3>
                <p style={{ color: 'white' }}>Kozhikode, Kerala</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Developed responsive web interfaces and learned backend architecture basics.</p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div>
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>SKILLS</h2>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--primary)' }}>{skill.level}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--glass)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: skill.level }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      style={{ height: '100%', background: 'var(--primary)' }}
                    />
                  </div>
                </div>
              ))}
            </section>

            <section>
              <h2 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>PROJECTS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem' }}>BikeSpot (Live)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-world motorcycle marketplace with Firebase.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem' }}>TripMaster</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Advanced itinerary planning application.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem' }}>ACSolutions</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full-stack accounting tracker.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem 3rem' }}
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume_ats.html';
              link.target = '_blank';
              link.download = 'Safvan_Sidheeq_Resume.html';
              link.click();
              alert('Opening ATS Resume. To save as PDF:\n1. Press Ctrl+P (Cmd+P)\n2. Select "Save as PDF"');
            }}
          >
            <Download size={20} /> Download/Print ATS Resume
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
