import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Database, 
  Smartphone,
  Download,
  Menu,
  X,
  ChevronRight,
  Send,
  Sparkles,
  Layers
} from 'lucide-react';
import BackgroundScene from './components/Background';
import Resume from './components/Resume';
import KeyboardScene from './components/Keyboard';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      padding: isScrolled ? '1rem 0' : '2rem 0',
      background: isScrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-1px' }}
        >
          <span style={{ color: 'var(--primary)' }}>S</span>afvan.
        </motion.div>

        <motion.div 
          style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', display: 'none' }} 
          className="desktop-nav"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
              style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-muted)' }} 
              onMouseOver={(e) => e.target.style.color = 'white'} 
              onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button 
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            className="btn btn-primary" 
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mkdsafwan4@gmail.com&su=Hiring Inquiry&body=Hi Safvan, I am interested in hiring you for a project.')}
          >
            Hire Me
          </motion.button>
        </motion.div>

        {/* Mobile Toggle */}
        <div style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ 
              background: 'var(--bg-dark)', 
              overflow: 'hidden',
              borderBottom: '1px solid var(--glass-border)'
            }}
          >
            <div className="container" style={{ paddingBottom: '2rem' }}>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ display: 'block', padding: '1rem 0', fontSize: '1.2rem', borderBottom: '1px solid var(--glass)' }}
                >
                  {link.name}
                </a>
              ))}
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mkdsafwan4@gmail.com&su=Hiring Inquiry&body=Hi Safvan, I am interested in hiring you for a project.');
                }}
              >
                Hire Me Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          nav ~ div:not(.bg-gradient):not(.bg-image) { cursor: none; } /* Could add custom cursor here */
        }
      `}</style>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="section hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               style={{ 
                 display: 'inline-flex', 
                 alignItems: 'center', 
                 gap: '0.5rem', 
                 padding: '0.5rem 1rem', 
                 background: 'var(--glass)', 
                 borderRadius: '2rem',
                 border: '1px solid var(--glass-border)',
                 marginBottom: '2rem',
                 fontSize: '0.85rem'
               }}
            >
              <Sparkles size={14} style={{ color: 'var(--primary)' }} />
              <span>Available for Real-world Projects</span>
            </motion.div>
            
            <h1 style={{ fontSize: 'min(5rem, 12vw)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
               Building <span className="gradient-text">Impactful</span><br />Digital Experiences
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem' }}>
              Hi, I'm <span style={{ color: '#fff', fontWeight: 600 }}>Safvan Sidheeq</span>. A dedicated Flutter & Firebase Developer and Problem Solver based in Kerala, India. Specializing in building scalable mobile applications.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                View Projects <ChevronRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}>
                See Resume
              </button>
              <button 
                className="btn btn-outline" 
                style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}
                onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mkdsafwan4@gmail.com&su=Hiring Inquiry&body=Hi Safvan, I am interested in hiring you for a project.')}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .hero-graphic { display: block !important; width: 500px !important; }
        }
        @media (max-width: 1023px) {
          .hero-graphic { width: 100% !important; max-width: 400px; margin: 2rem auto; }
        }
      `}</style>
    </section>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: '4rem' }}>
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}
    >
      {title}
    </motion.h2>
    <motion.div 
       initial={{ width: 0 }}
       whileInView={{ width: '60px' }}
       viewport={{ once: true }}
       style={{ height: '4px', background: 'var(--primary)', marginBottom: '1.5rem', borderRadius: '2px' }}
    />
    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{subtitle}</p>
  </div>
);

const About = () => {
  const experiences = [
    {
      title: 'Flutter Developer (Internship)',
      company: 'Perinthalmanna, Kerala',
      period: 'Recent',
      description: 'Gained hands-on experience in building mobile applications, focusing on clean UI and state management.'
    },
    {
      title: 'MERN Stack Developer (Internship)',
      company: 'Kozhikode, Kerala',
      period: 'Recent',
      description: 'Explored web development using MongoDB, Express, React, and Node.js to build full-stack interfaces.'
    },
    {
      title: 'BCA Final Year',
      company: 'University Program',
      period: '2024 - Present',
      description: 'Focusing on Software Development, Mobile App Development, and Database Management.'
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader title="About & Experience" subtitle="My journey in software development and professional training." />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
            >
              <div style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>{exp.period}</div>
              <h3 style={{ marginBottom: '0.25rem' }}>{exp.title}</h3>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>{exp.company}</div>
              <p style={{ color: 'var(--text-muted)' }}>{exp.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '4rem', padding: '2rem', borderLeft: '4px solid var(--primary)', background: 'var(--glass)' }}
        >
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>
            "I'm a problem solver at heart. Whether it's architecting a scalable Flutter app with Riverpod or debugging complex Firebase rules, I thrive on creating simple, efficient solutions for real-world problems."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { category: 'Mobile Dev', icon: <Smartphone size={24} />, items: ['Flutter', 'Dart', 'MVVM Architecture', 'WebGL'] },
    { category: 'Backend/Firebase', icon: <Database size={24} />, items: ['Auth', 'Firestore', 'Realtime DB', 'Cloud functions'] },
    { category: 'State Management', icon: <Layers size={24} />, items: ['Riverpod', 'Provider', 'Stateful widgets'] },
    { category: 'Languages & Web', icon: <Code2 size={24} />, items: ['HTML', 'CSS', 'Python', 'Java', 'Dart', 'MERN Stack'] },
  ];

  return (
    <section id="skills" className="section" style={{ background: 'rgba(59, 130, 246, 0.02)' }}>
      <div className="container">
        <SectionHeader title="Technical Arsenal" subtitle="The tools and technologies I use to bring ideas to life." />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {skills.map((skill, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--glass)', borderRadius: '0.75rem', color: 'var(--primary)' }}>
                  {skill.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>{skill.category}</h3>
              </div>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {skill.items.map((item, i) => (
                  <li key={i} style={{ 
                    padding: '0.4rem 1rem', 
                    background: 'var(--glass)', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.9rem',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-muted)'
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'BikeSpot',
      tag: 'Real Project • Live',
      description: 'A comprehensive motorcycle listing platform hosted with Firebase. Features real-time search, price tracking, and "Add Bike" functionality.',
      image: '/bikespot_live.png',
      link: 'https://github.com/safvenn/bikespot',
      live: 'https://stop-chat-3ab7b.web.app/'
    },
    {
      title: 'TripMaster',
      tag: 'Live Web App',
      description: 'A dedicated web application for travel enthusiasts, focusing on seamless user interface and responsive design.',
      image: '/trip.png',
      link: 'https://github.com/safvenn/tripmaster',
      live: 'https://roadstog00.netlify.app/'
    },
    {
      title: 'ACSolutions',
      tag: 'Flutter + Firebase',
      description: 'Track income, expenses, and profit/loss in real-time with secure cloud storage.',
      image: '/accounting.png',
      link: 'https://github.com/safvenn/acsolutions'
    },
    {
      title: 'Dart E-commerce',
      tag: 'Full E-commerce',
      description: 'Authentication, cart management, and order tracking system using Firebase backend.',
      image: '/shopping.png',
      link: 'https://github.com/safvenn/dart'
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader title="Featured Works" subtitle="A selection of my recent mobile and web development projects." />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card project-card"
            >
              <div className="project-img-container">
                <img src={project.image} alt={project.title} className="project-img" />
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', fontWeight: 600 }}>{project.tag}</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{project.description}</p>
                <a href={project.live || project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {project.live ? 'Visit Site' : 'Source Code'} <ExternalLink size={16} />
                </a>
                {project.live && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted" style={{ marginLeft: '1rem', fontSize: '0.85rem', textDecoration: 'underline' }}>
                    Github
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ setIsResumeOpen }) => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="glass-card" style={{ padding: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', overflow: 'hidden', position: 'relative' }}>
          {/* Background Highlight */}
          <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Let's Build <br /><span className="gradient-text">Something Great.</span></h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Currently seeking new opportunities as a Flutter Developer or Intern. If you're looking for a dedicated problem solver, let's talk!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--glass)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><Mail size={20} /></div>
                <div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email</div>
                   <div style={{ fontWeight: 500 }}>mkdsafwan4@gmail.com</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--glass)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><Phone size={20} /></div>
                <div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone</div>
                   <div style={{ fontWeight: 500 }}>+91 8590207382</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--glass)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><MapPin size={20} /></div>
                <div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</div>
                   <div style={{ fontWeight: 500 }}>Mannarkkad, Kerala, India</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.02 }}>
               <button 
                 className="btn btn-primary" 
                 style={{ width: '100%', padding: '1.5rem', justifyContent: 'center', fontSize: '1.1rem' }} 
                 onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mkdsafwan4@gmail.com&su=Project Inquiry&body=Hi Safvan, I saw your portfolio and would like to connect.')}
               >
                 <Send size={18} /> Send a Message
               </button>
            </motion.div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <a href="https://www.linkedin.com/in/safvan-sidheeq-b78539352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" className="btn btn-outline" style={{ justifyContent: 'center' }}><Linkedin size={18} /> LinkedIn</a>
               <a href="https://github.com/safvenn" target="_blank" className="btn btn-outline" style={{ justifyContent: 'center' }}><Github size={18} /> GitHub</a>
            </div>

            <button 
              className="btn btn-outline" 
              style={{ width: '100%', padding: '1rem', justifyContent: 'center', borderColor: 'var(--accent)' }}
              onClick={() => setIsResumeOpen(true)}
            >
               <Layers size={18} /> See Full Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Opening animation delay
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    // Adaptive Color Logic
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const sections = ['about', 'projects', 'skills', 'contact'];
      let currentSection = 'hero';

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && scrollPos > el.offsetTop) {
          currentSection = id;
        }
      });

      const colors = {
        hero: { primary: '#0ea5e9', accent: '#6366f1' },      // Ocean Blue & Indigo
        about: { primary: '#10b981', accent: '#0ea5e9' },     // Emerald & Blue
        projects: { primary: '#f59e0b', accent: '#d97706' },  // Amber & Gold
        skills: { primary: '#8b5cf6', accent: '#6366f1' },    // Violet & Indigo
        contact: { primary: '#0ea5e9', accent: '#10b981' }    // Blue & Emerald
      };

      const theme = colors[currentSection] || colors.hero;
      document.documentElement.style.setProperty('--theme-primary', theme.primary);
      document.documentElement.style.setProperty('--theme-accent', theme.accent);
    };

    window.addEventListener('scroll', handleScroll);
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-resume', handleOpenResume);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#010103',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              style={{ height: '2px', background: 'var(--primary)', borderRadius: '1px' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '8px', color: 'white' }}
            >
              SAFVAN.DEV
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <BackgroundScene />
            <KeyboardScene />
            
            <Navbar />
            
            {/* Sequential Keyboard-like Entrance for Sections */}
            <motion.main
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3 // Keyboard-like sequential appearance
                  }
                }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8 }}>
                <section id="hero"><Hero /></section>
              </motion.div>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, var(--primary), transparent 70%)', opacity: 0.05, pointerEvents: 'none', filter: 'blur(100px)' }}></div>
                <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8 }}>
                  <section id="about"><About /></section>
                </motion.div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, var(--accent), transparent 70%)', opacity: 0.05, pointerEvents: 'none', filter: 'blur(100px)' }}></div>
                <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8 }}>
                  <section id="skills"><Skills /></section>
                </motion.div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, var(--primary), transparent 70%)', opacity: 0.05, pointerEvents: 'none', filter: 'blur(100px)' }}></div>
                <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8 }}>
                  <section id="projects"><Projects /></section>
                </motion.div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, var(--accent), transparent 70%)', opacity: 0.05, pointerEvents: 'none', filter: 'blur(100px)' }}></div>
                <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8 }}>
                  <section id="contact"><Contact setIsResumeOpen={setIsResumeOpen} /></section>
                </motion.div>
              </div>
            </motion.main>

            <Resume isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>SAFVAN.</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2024 Safvan Sidheeq. All rights reserved.</p>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <a href="https://github.com/safvenn" className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Github size={18} /> GitHub</a>
                  <a href="https://www.linkedin.com/in/safvan-sidheeq-b78539352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Linkedin size={18} /> LinkedIn</a>
                  <a href="mailto:mkdsafwan4@gmail.com" className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} /> Email</a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
