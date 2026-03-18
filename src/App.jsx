import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink, 
  Code2, Database, Smartphone, Download, Menu, X,
  ChevronRight, Send, Sparkles, Layers, Layout, Globe,
  Cpu, FileCode, Braces, ArrowRight, Zap
} from 'lucide-react';
import Resume      from './components/Resume';

// =============================================
// MAGNETIC CURSOR (Huly-style: mix-blend difference)
// =============================================
const MagneticCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

// =============================================
// NAVBAR — Huly: transparent, ultra-slim links, pill sign-up (hides on scroll)
// =============================================
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About',       href: '#about'    },
    { name: 'Experiences', href: '#skills'   },
    { name: 'Projects',    href: '#projects' },
    { name: 'Contact',     href: '#contact'  },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      padding: isScrolled ? '1.5rem 0' : '2.5rem 0',
      background: 'transparent',
      transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)',
      opacity: isScrolled ? 0 : 1,
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      pointerEvents: isScrolled ? 'none' : 'auto'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Desktop Nav - Centered links */}
        <motion.div
          className="desktop-nav"
          style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
              style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ cursor: 'pointer', display: 'none', position: 'absolute', right: '2rem' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(9,10,12,0.97)', backdropFilter: 'blur(24px)', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="container" style={{ paddingBottom: '2rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ display: 'block', padding: '0.85rem 0', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-2)' }}
                >
                  {link.name}
                </a>
              ))}
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
                onClick={() => { setIsMenuOpen(false); window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mkdsafwan4@gmail.com&su=Hiring Inquiry'); }}>
                Hire Me <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .desktop-nav { display: flex !important; } .mobile-toggle { display: none !important; } }
        @media (max-width: 768px)  { .desktop-nav { display: none !important; } .mobile-toggle { display: block !important; } }
      `}</style>
    </nav>
  );
};

// =============================================
// SECTION HEADER
// =============================================
const SectionHeader = ({ label, title, subtitle }) => (
  <div style={{ marginBottom: '4rem' }}>
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="section-label"
    >
      {label}
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', fontWeight: 800 }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ fontSize: '1rem', color: 'var(--text-2)', maxWidth: '520px', lineHeight: 1.7 }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// =============================================
// 3D TILT CARD
// =============================================
const TiltCard = ({ children, className, style }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: y * 6, y: -x * 6 });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      style={{
        ...style,
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-4px)' : ''}`,
        transition: isHovered ? 'transform 0.08s ease' : 'transform 0.4s ease',
      }}
    >
      {children}
    </div>
  );
};

// =============================================
// HERO — Scroll Animated Sequence
// =============================================
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Smooth out the scroll progress for a buttery image sequence
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameCount = 61;
  const startFrame = 140;

  useEffect(() => {
    const images = [];
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/hero-sequence/ezgif-frame-${startFrame + i}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) setImagesLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    
    const renderFrame = (progress) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx || !imagesRef.current.length) return;
      
      const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      const img = imagesRef.current[frameIndex];
      
      if (img && img.complete && img.width > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(scrollYProgress.get());
      }
    };
    
    handleResize();
    const unsubscribe = smoothProgress.onChange(renderFrame);
    window.addEventListener('resize', handleResize);
    
    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, smoothProgress]);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div 
        style={{ 
          position: 'sticky',
          top: 0, 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden'
        }}
      >
        <canvas 
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.95
          }}
        />
        
        {/* Gradient Overlay for blending */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(9,10,12,0.3) 0%, rgba(9,10,12,0.1) 50%, rgba(9,10,12,1) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        {/* Stylish Side/Bottom Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="hero-text-container"
        >
          <div className="hero-title">
            Safvan Sidheeq
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="hero-subtitle"
          >
            <div className="hero-subtitle-line" />
            Flutter Developer & Designer
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

// =============================================
// ABOUT
// =============================================
const About = () => {
  const experiences = [
    { title: 'Flutter Developer (Internship)', company: 'Perinthalmanna, Kerala', period: 'Recent', description: 'Gained hands-on experience building mobile applications, focusing on clean UI and state management with Riverpod.' },
    { title: 'MERN Stack Developer (Internship)', company: 'Kozhikode, Kerala', period: 'Recent', description: 'Explored full-stack web development using MongoDB, Express, React, and Node.js to build rich interfaces.' },
    { title: 'BCA Final Year', company: 'University Program', period: '2024 – Present', description: 'Focusing on Software Development, Mobile App Development, and Database Management Systems.' }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader label="Journey" title="About & Experience" subtitle="My professional path through mobile and web development." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="glass-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
                <div className="timeline-dot" />
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '0.75rem', letterSpacing: '0.06em' }}>{exp.period}</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.3rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{exp.title}</h3>
              <div style={{ color: 'var(--text-3)', fontSize: '0.82rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>{exp.company}</div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.7 }}>{exp.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ marginTop: '3.5rem', padding: '1.75rem 2rem', borderLeft: '2px solid var(--primary)', background: 'rgba(90,111,255,0.04)', borderRadius: '0 12px 12px 0' }}
        >
          <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-2)', lineHeight: 1.8 }}>
            "I'm a problem solver at heart. Whether it's architecting a scalable Flutter app with Riverpod or debugging complex Firebase rules, I thrive on creating simple, efficient solutions for real-world problems."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

// =============================================
// SKILLS
// =============================================
const Skills = () => {
  const skills = [
    { category: 'Mobile Dev', icon: <Smartphone size={20}/>, color: '#5a6fff',
      items: [{ name: 'Flutter', icon: <Smartphone size={12}/> }, { name: 'Dart', icon: <Code2 size={12}/> }, { name: 'MVVM', icon: <Layout size={12}/> }] },
    { category: 'Backend / Firebase', icon: <Database size={20}/>, color: '#9b8fff',
      items: [{ name: 'Auth', icon: <Database size={12}/> }, { name: 'Firestore', icon: <Database size={12}/> }, { name: 'Realtime DB', icon: <Database size={12}/> }, { name: 'Cloud Functions', icon: <Code2 size={12}/> }] },
    { category: 'State Management', icon: <Layers size={20}/>, color: '#7ca4ff',
      items: [{ name: 'Riverpod', icon: <Layers size={12}/> }, { name: 'Provider', icon: <Layers size={12}/> }, { name: 'Stateful Widgets', icon: <Layers size={12}/> }] },
    { category: 'Languages & Web', icon: <Code2 size={20}/>, color: '#5acdff',
      items: [{ name: 'HTML/CSS', icon: <Globe size={12}/> }, { name: 'Python', icon: <FileCode size={12}/> }, { name: 'Java', icon: <Braces size={12}/> }, { name: 'MERN Stack', icon: <Cpu size={12}/> }] },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader label="Specialization" title="Technical Arsenal" subtitle="Tools, frameworks, and languages I work with daily." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
              className="glass-card"
              style={{ padding: '1.6rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${skill.color}14`, border: `1px solid ${skill.color}28`,
                  borderRadius: '10px', color: skill.color
                }}>
                  {skill.icon}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{skill.category}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="skill-tag"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      border: '1px solid var(--border)',
                      color: 'var(--text-2)',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'default'
                    }}
                  >
                    <span style={{ color: skill.color }}>{item.icon}</span>
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================
// PROJECTS
// =============================================
const Projects = () => {
  const projects = [
    { title: 'BikeSpot', tag: 'Full Stack · Mobile', description: 'A high-end motorcycle listing platform with real-time Firebase tracking, secure Auth, and dynamic search.', image: '/bikespot_live.png', link: 'https://github.com/safvenn/bikespot', live: 'https://stop-chat-3ab7b.web.app/', accent: '#5a6fff' },
    { title: 'Roadstogo', tag: 'College Project · Live', description: 'A comprehensive trip management system for travel enthusiasts. Built as a major college project with Flutter.', image: '/trip.png', link: 'https://github.com/safvenn/masterplann.git', live: 'https://roadstog00.netlify.app/', accent: '#9b8fff' },
    { title: 'MERN E-commerce', tag: 'Internship Project', description: 'A professional full-stack e-commerce solution built during internship. Features product management and user flows.', image: '/shopping.png', link: 'https://github.com/safvenn/LAST.git', accent: '#7ca4ff' },
    { title: 'AC Solutions', tag: 'Flutter + Firebase', description: 'Advanced accounting tracker for real-time sales, income, and profit/loss monitoring with secure cloud storage.', image: '/accounting.png', link: 'https://github.com/safvenn/ac-solutions.git', accent: '#5acdff' },
    { title: 'E-commerce Admin', tag: 'Flutter · Dart', description: 'Sophisticated e-commerce app with full admin control, integrated shopping cart, and Firebase backend.', image: '/shopping.png', link: 'https://github.com/safvenn/dart.git', accent: '#a0aaff' }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader label="Projects" title="Featured Works" subtitle="A selection of recent mobile and web development projects." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.75rem' }}>
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
            >
              <TiltCard className="glass-card project-card">
                {/* accent glow */}
                <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: `radial-gradient(circle, ${project.accent}12 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
                <div className="project-img-container">
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span className="tag-label" style={{ color: project.accent, marginBottom: '0.4rem' }}>{project.tag}</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem', letterSpacing: '-0.03em' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.65, flex: 1, marginBottom: '1.25rem' }}>{project.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <a href={project.live || project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline"
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem', color: project.accent, borderColor: `${project.accent}30` }}>
                      {project.live ? 'Visit Site' : 'Source Code'} <ExternalLink size={12} />
                    </a>
                    {project.live && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Github size={13} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================
// CONTACT
// =============================================
const Contact = ({ setIsResumeOpen }) => (
  <section id="contact" className="section">
    <div className="container">
      <SectionHeader label="Contact" title="Let's Connect" subtitle="Open to new opportunities and interesting projects." />
      <div className="glass-card" style={{ padding: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3.5rem', overflow: 'hidden', position: 'relative' }}>
        {/* subtle accent */}
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(90,111,255,0.07) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '1rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
            Let's Build<br /><span className="gradient-text">Something Great.</span>
          </h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '2.5rem', fontSize: '0.95rem', lineHeight: 1.75 }}>
            Currently seeking new opportunities as a Flutter Developer or Intern. Looking for a dedicated problem solver? Let's talk!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { Icon: Mail,   label: 'Email',    val: 'mkdsafwan4@gmail.com' },
              { Icon: Phone,  label: 'Phone',    val: '+91 8590207382' },
              { Icon: MapPin, label: 'Location', val: 'Mannarkkad, Kerala, India' }
            ].map(({ Icon, label, val }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 36, height: 36, background: 'rgba(90,111,255,0.08)', border: '1px solid rgba(90,111,255,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>{label}</div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', justifyContent: 'center', fontSize: '0.85rem' }}
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mkdsafwan4@gmail.com&su=Project Inquiry&body=Hi Safvan, I saw your portfolio and would like to connect.')}>
            <Send size={15} /> Send a Message
          </motion.button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <a href="https://www.linkedin.com/in/safvan-sidheeq-b78539352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href="https://github.com/safvenn" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>
              <Github size={15} /> GitHub
            </a>
          </div>
          <motion.button whileHover={{ scale: 1.02 }}
            className="btn btn-outline" style={{ width: '100%', padding: '0.9rem', justifyContent: 'center', borderColor: 'rgba(90,111,255,0.2)', color: 'var(--primary)' }}
            onClick={() => setIsResumeOpen(true)}>
            <Download size={15} /> View Full Resume
          </motion.button>
        </div>
      </div>
    </div>
  </section>
);

// =============================================
// APP
// =============================================
const App = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLoading, setIsLoading]       = useState(true);
  const [loadPct, setLoadPct]           = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPct(p => { if (p >= 100) { clearInterval(interval); return 100; } return Math.min(p + Math.floor(Math.random() * 14) + 5, 100); });
    }, 100);
    const timer = setTimeout(() => setIsLoading(false), 2000);

    const handleScroll = () => {
      const sp = window.scrollY + window.innerHeight / 2;
      const sections = ['about', 'projects', 'skills', 'contact'];
      let cur = 'hero';
      sections.forEach(id => { const el = document.getElementById(id); if (el && sp > el.offsetTop) cur = id; });
      const colors = {
        hero:     { primary: '#e3000f', accent: '#ff4d4d' },
        about:    { primary: '#d4000f', accent: '#ff3333' },
        projects: { primary: '#ff1a1a', accent: '#cc0000' },
        skills:   { primary: '#e3000f', accent: '#ff4d4d' },
        contact:  { primary: '#cc0000', accent: '#ff1a1a' }
      };
      const t = colors[cur] || colors.hero;
      document.documentElement.style.setProperty('--theme-primary', t.primary);
      document.documentElement.style.setProperty('--theme-accent',  t.accent);
    };

    window.addEventListener('scroll', handleScroll);
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => { clearTimeout(timer); clearInterval(interval); window.removeEventListener('scroll', handleScroll); window.removeEventListener('open-resume', handleOpenResume); };
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#090a0c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}
          >
            {/* Huly-style simple logo loader */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #e3000f, #ff4d4d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>S</div>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.04em', color: '#fff' }}>Safvan</span>
            </motion.div>

            {/* Progress bar */}
            <div>
              <div className="loader-bar">
                <motion.div
                  style={{ height: '100%', background: 'linear-gradient(90deg, #e3000f, #ff4d4d)', borderRadius: '2px' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(loadPct, 100)}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)' }}>
                {Math.min(loadPct, 100)}%
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          >
            <Navbar />

            <main>
              <section id="hero"><Hero /></section>
              <hr className="glow-rule" />
              <section id="about"><About /></section>
              <hr className="glow-rule" />
              <section id="skills"><Skills /></section>
              <hr className="glow-rule" />
              <section id="projects"><Projects /></section>
              <hr className="glow-rule" />
              <section id="contact"><Contact setIsResumeOpen={setIsResumeOpen} /></section>
            </main>

            <Resume isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

            <footer style={{ padding: '3.5rem 0', borderTop: '1px solid var(--border)', background: 'rgba(9,10,12,0.5)' }}>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '6px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.65rem', color: '#fff' }}>S</div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.03em' }}>Safvan</span>
                  </div>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.8rem' }}>© 2025 Safvan Sidheeq. All rights reserved.</p>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <a href="https://github.com/safvenn" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-2)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-3)'}>
                    <Github size={14} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/safvan-sidheeq-b78539352" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-2)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-3)'}>
                    <Linkedin size={14} /> LinkedIn
                  </a>
                  <a href="mailto:mkdsafwan4@gmail.com" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-2)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-3)'}>
                    <Mail size={14} /> Email
                  </a>
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
