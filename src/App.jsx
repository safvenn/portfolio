import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink, 
  Download, Menu, X, Send, ArrowRight, ArrowUp,
  BarChart3, Database, FileSpreadsheet, 
  BrainCircuit, Table2, PieChart, TrendingUp,
  Award, Briefcase, GraduationCap,
  Activity, Target, Lightbulb, Globe,
  ChevronDown
} from 'lucide-react';
import Resume from './components/Resume';

// =============================================
// SMOOTH FADE-IN WRAPPER
// =============================================
const FadeIn = ({ children, delay = 0, direction = 'up', className, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 },
  };
  const d = directions[direction];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: d.y, x: d.x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// =============================================
// STAGGER CONTAINER
// =============================================
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// =============================================
// ANIMATED COUNTER
// =============================================
const AnimatedCounter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// =============================================
// MAGNETIC CURSOR (desktop only)
// =============================================
const MagneticCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(hover: none)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

// =============================================
// SCROLL PROGRESS BAR
// =============================================
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

// =============================================
// BACK TO TOP
// =============================================
const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const toggle = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 900,
            width: 44, height: 44, borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))',
            border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// =============================================
// NAVBAR
// =============================================
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navLinks = useMemo(() => [
    { name: 'About',          href: '#about'          },
    { name: 'Skills',         href: '#skills'         },
    { name: 'Projects',       href: '#projects'       },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact',        href: '#contact'        },
  ], []);

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      padding: isScrolled ? '0.75rem 0' : '1.5rem 0',
      background: isScrolled ? 'rgba(6,8,13,0.9)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
      transform: isHidden && !isMenuOpen ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.a
          href="#"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div style={{ 
            width: 32, height: 32, borderRadius: '10px', 
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontWeight: 800, fontSize: '0.85rem', color: '#fff' 
          }}>S</div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.03em' }}>Safvan</span>
        </motion.a>

        {/* Desktop Nav */}
        <motion.div
          className="nav-desktop"
          style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2, color: '#60a5fa' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button
          className="nav-mobile-toggle"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ cursor: 'pointer', display: 'none', background: 'none', border: 'none', color: '#fff', padding: '8px', minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(6,8,13,0.98)', backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              gap: '0.5rem', overflow: 'hidden'
            }}
          >
            {/* Close button inside */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', padding: '8px', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)',
                  padding: '0.75rem 2rem', letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-hero)'
                }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              className="btn btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginTop: '1.5rem', width: 'auto', padding: '0.85rem 2rem' }}
              onClick={() => { setIsMenuOpen(false); window.open('https://mail.google.com/mail/?view=cm&fs=1&to=safvankallayi7@gmail.com&su=Hiring Inquiry'); }}
            >
              Hire Me <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .nav-desktop { display: flex !important; } .nav-mobile-toggle { display: none !important; } }
        @media (max-width: 768px)  { .nav-desktop { display: none !important; } .nav-mobile-toggle { display: flex !important; } }
      `}</style>
    </nav>
  );
};

// =============================================
// SECTION HEADER
// =============================================
const SectionHeader = ({ label, title, subtitle }) => (
  <div style={{ marginBottom: '3.5rem' }}>
    <FadeIn>
      <div className="section-label">{label}</div>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', marginBottom: '1rem', fontWeight: 800 }}>
        {title}
      </h2>
    </FadeIn>
    {subtitle && (
      <FadeIn delay={0.2}>
        <p style={{ fontSize: '1rem', color: 'var(--text-2)', maxWidth: '560px', lineHeight: 1.7 }}>
          {subtitle}
        </p>
      </FadeIn>
    )}
  </div>
);

// =============================================
// TILT CARD (desktop only)
// =============================================
const TiltCard = ({ children, className, style }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(hover: none)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: y * 6, y: -x * 6 });
  }, [isMobile]);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      style={{
        ...style,
        transform: isMobile ? undefined : `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-4px)' : ''}`,
        transition: isHovered ? 'transform 0.08s ease' : 'transform 0.4s ease',
      }}
    >
      {children}
    </div>
  );
};

// =============================================
// HERO
// =============================================
const Hero = () => {
  const roles = useMemo(() => ['Data Analyst', 'BI Developer', 'Dashboard Creator', 'SQL Expert'], []);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex(prev => (prev + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="hero-section">
      <div className="hero-grid-bg" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      {/* Floating icons — hidden on mobile */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hero-floating-icon"
        style={{ position: 'absolute', top: '15%', right: '12%', opacity: 0.07, zIndex: 0 }}
      >
        <BarChart3 size={100} color="#3b82f6" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -15, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="hero-floating-icon"
        style={{ position: 'absolute', bottom: '20%', left: '8%', opacity: 0.05, zIndex: 0 }}
      >
        <PieChart size={80} color="#06b6d4" />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1.2rem', borderRadius: '9999px',
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(59,130,246,0.06)',
              fontSize: '0.75rem', color: '#60a5fa',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              marginBottom: '2rem'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}
            />
            Available for opportunities
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
          }}>
            Hi, I'm{' '}
            <span className="gradient-text">Safvan Sidheeq</span>
          </h1>

          {/* Rotating role */}
          <div style={{ height: '2.5rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  fontSize: 'clamp(1.1rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: '#06b6d4',
                  letterSpacing: '-0.02em'
                }}
              >
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'var(--text-2)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.8,
              padding: '0 1rem',
            }}
          >
            Final-year BCA student specializing in Data Analytics, Business Intelligence, and Data Visualization. 
            Transforming raw data into actionable business insights using Python, SQL, Excel, and Power BI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="hero-cta-row"
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              href="#projects" className="btn btn-primary">
              <BarChart3 size={15} /> View Projects
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              href="#contact" className="btn btn-outline">
              <Send size={15} /> Get in Touch
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="stats-row"
            style={{ maxWidth: '580px', margin: '3rem auto 0' }}
          >
            {[
              { number: '4', suffix: '+', label: 'Projects' },
              { number: '150', suffix: 'K+', label: 'Records Processed' },
              { number: '10', suffix: '+', label: 'SQL Queries' },
              { number: '2', suffix: '', label: 'Certifications' },
            ].map((stat, i) => (
              <motion.div key={i} className="stat-item" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <div className="stat-number gradient-text">
                  <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ marginTop: '3rem' }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} color="var(--text-3)" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hero-floating-icon { display: none !important; } }
      `}</style>
    </section>
  );
};

// =============================================
// ABOUT
// =============================================
const About = () => {
  const expertise = useMemo(() => [
    { icon: <Table2 size={20} />, title: 'Data Cleaning', desc: 'Transforming messy, incomplete datasets into structured, analysis-ready data.', color: '#3b82f6' },
    { icon: <Database size={20} />, title: 'SQL & Data Modeling', desc: 'Building multi-table data models and executing complex analytical queries.', color: '#06b6d4' },
    { icon: <BarChart3 size={20} />, title: 'Dashboard Creation', desc: 'Designing interactive Power BI and Excel dashboards for KPI tracking.', color: '#8b5cf6' },
    { icon: <TrendingUp size={20} />, title: 'Statistical Analysis', desc: 'Identifying patterns, trends, and outliers to support data-driven decisions.', color: '#f59e0b' },
    { icon: <BrainCircuit size={20} />, title: 'EDA & Insights', desc: 'Conducting exploratory analysis to uncover hidden business insights.', color: '#10b981' },
    { icon: <Target size={20} />, title: 'Business Intelligence', desc: 'Translating data findings into actionable business recommendations.', color: '#ef4444' },
  ], []);

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader label="About Me" title="Who I Am" subtitle="A detail-oriented aspiring Data Analyst passionate about turning data into decisions." />
        
        <FadeIn>
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
              I am a detail-oriented aspiring Data Analyst with strong skills in data cleaning, exploratory data analysis, 
              multi-table integration, and dashboard creation. I have hands-on experience working with real-world datasets 
              using <span style={{ color: '#60a5fa', fontWeight: 600 }}>Python</span>, <span style={{ color: '#06b6d4', fontWeight: 600 }}>SQL</span>, 
              <span style={{ color: '#8b5cf6', fontWeight: 600 }}> Excel</span>, and <span style={{ color: '#f59e0b', fontWeight: 600 }}>Power BI</span> to 
              generate meaningful business insights.
            </p>
            <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.85 }}>
              I have completed professional job simulations from <strong style={{ color: 'var(--text-1)' }}>Deloitte</strong> and <strong style={{ color: 'var(--text-1)' }}>Tata</strong> through Forage, 
              where I applied real-world data analysis and visualization workflows. My goal is to build scalable data 
              solutions and grow into advanced analytics and predictive modeling roles.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Core Expertise
          </h3>
        </FadeIn>

        <motion.div
          className="expertise-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {expertise.map((item, idx) => (
            <motion.div key={idx} variants={staggerItem} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ 
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${item.color}12`, border: `1px solid ${item.color}22`,
                borderRadius: '10px', color: item.color, marginBottom: '1rem'
              }}>
                {item.icon}
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.65 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn delay={0.2}>
          <blockquote style={{ marginTop: '3rem', padding: '1.5rem 1.75rem', borderLeft: '2px solid #3b82f6', background: 'rgba(59,130,246,0.04)', borderRadius: '0 12px 12px 0' }}>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-2)', lineHeight: 1.8 }}>
              "I believe every dataset has a story to tell. My job is to clean the noise, find the patterns, and present insights that drive real business impact."
            </p>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
};

// =============================================
// SKILLS
// =============================================
const Skills = () => {
  const skills = useMemo(() => [
    { category: 'Programming', icon: <FileSpreadsheet size={20}/>, color: '#3b82f6',
      items: ['Python', 'Pandas', 'NumPy', 'SQL / MySQL'] },
    { category: 'Visualization', icon: <BarChart3 size={20}/>, color: '#06b6d4',
      items: ['Power BI', 'Matplotlib', 'Seaborn', 'Microsoft Excel'] },
    { category: 'Data Analysis', icon: <TrendingUp size={20}/>, color: '#8b5cf6',
      items: ['Data Cleaning', 'EDA', 'Data Segmentation', 'Outlier Detection'] },
    { category: 'Data Modeling', icon: <Database size={20}/>, color: '#f59e0b',
      items: ['Multi-table Integration', 'ETL Pipelines', 'KPI Reporting', 'Statistical Analysis'] },
    { category: 'Database', icon: <Table2 size={20}/>, color: '#10b981',
      items: ['MySQL', 'SQLAlchemy', 'JOIN Operations', 'Aggregations'] },
    { category: 'Excel Skills', icon: <FileSpreadsheet size={20}/>, color: '#ef4444',
      items: ['Pivot Tables', 'Power Query', 'VLOOKUP / XLOOKUP', 'Data Validation'] },
  ], []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader label="Tech Stack" title="Technical Skills" subtitle="Tools, languages, and frameworks I use for data analysis and visualization." />
        <motion.div
          className="skills-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {skills.map((skill, idx) => (
            <motion.div key={idx} variants={staggerItem} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${skill.color}14`, border: `1px solid ${skill.color}28`,
                  borderRadius: '10px', color: skill.color
                }}>
                  {skill.icon}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{skill.category}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {skill.items.map((item, i) => (
                  <span key={i} className="skill-tag"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.35rem 0.7rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '6px', fontSize: '0.76rem',
                      border: '1px solid var(--border)',
                      color: 'var(--text-2)', fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: skill.color, display: 'inline-block' }} />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// =============================================
// PROJECTS
// =============================================
const Projects = () => {
  const projects = useMemo(() => [
    {
      title: 'Petrol Station Analytics — End-to-End Python → Power BI',
      tag: 'Python · Power BI · Full Pipeline',
      description: 'Complete end-to-end analytics project transforming messy petrol station datasets into business insights. Processed 150,000+ transactions covering ₹2.15B revenue and 22M+ liters. Built Operations and HR dashboards in Power BI with data cleaning pipeline using IQR outlier detection.',
      tools: ['Python', 'Pandas', 'NumPy', 'Power BI', 'Matplotlib', 'Seaborn'],
      link: 'https://github.com/safvenn/petrol-pumb-analysis',
      accent: '#f59e0b',
      highlights: ['150K+ Transactions', '₹2.15B Revenue Analyzed', '2 Dashboards Built']
    },
    {
      title: 'Hospital Doctor Utilization & Patient Cost Analysis',
      tag: 'Python · SQL · Full Pipeline',
      description: 'Integrated 4 relational datasets into a unified analytical model. Built multi-table data pipeline, cleaned healthcare datasets, and executed 10+ SQL queries to extract KPIs. Identified 3 high-cost patient segments and recommended staffing optimizations.',
      tools: ['Python', 'Pandas', 'MySQL', 'SQLAlchemy', 'Matplotlib', 'Seaborn', 'Excel'],
      link: 'https://github.com/safvenn/hospital_Multi_table_analysis',
      accent: '#3b82f6',
      highlights: ['4 Datasets Integrated', '10+ SQL Queries', '3 Segments Identified']
    },
    {
      title: 'Netflix Dataset — Data Cleaning & Content Segmentation',
      tag: 'Python · Power BI · EDA',
      description: 'Cleaned 8,000+ dataset records by removing nulls, standardizing text, and fixing date formats. Performed genre distribution and actor frequency analysis, identified Top 20 actors, and created Power BI visualizations.',
      tools: ['Python', 'Pandas', 'Excel', 'Power BI'],
      link: 'https://github.com/safvenn',
      accent: '#06b6d4',
      highlights: ['8K+ Records Cleaned', 'Top 20 Actors Identified', 'Power BI Dashboard']
    },
    {
      title: 'Sales Performance Dashboard',
      tag: 'Power BI · Excel · KPI',
      description: 'Developed an interactive sales dashboard tracking 6 KPIs with monthly sales analysis, top-product reports, automated Excel summaries, interactive slicers, and drill-through analysis for real-time business monitoring.',
      tools: ['Power BI', 'Excel'],
      link: 'https://github.com/safvenn',
      accent: '#8b5cf6',
      highlights: ['6 KPIs Tracked', 'Interactive Slicers', 'Drill-through Analysis']
    }
  ], []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader label="Portfolio" title="Featured Projects" subtitle="End-to-end data analysis projects showcasing cleaning, modeling, and visualization skills." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map((project, idx) => (
            <FadeIn key={idx} delay={idx * 0.08}>
              <TiltCard className="glass-card" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
                <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${project.accent}12 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span className="tag-label" style={{ color: project.accent, marginBottom: '0.5rem', display: 'inline-block' }}>{project.tag}</span>
                  
                  <h3 style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', fontWeight: 700, marginBottom: '0.85rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{project.title}</h3>
                  
                  <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '700px' }}>{project.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {project.highlights.map((h, i) => (
                      <span key={i} style={{
                        padding: '0.3rem 0.7rem', borderRadius: '6px',
                        background: `${project.accent}10`, border: `1px solid ${project.accent}25`,
                        fontSize: '0.72rem', fontWeight: 600, color: project.accent,
                        fontFamily: 'var(--font-mono)'
                      }}>{h}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {project.tools.map((t, i) => (
                      <span key={i} style={{
                        padding: '0.2rem 0.5rem', borderRadius: '4px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)'
                      }}>{t}</span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link} target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{ padding: '0.45rem 1rem', fontSize: '0.76rem', color: project.accent, borderColor: `${project.accent}30`, width: 'auto' }}
                  >
                    <Github size={14} /> View on GitHub <ExternalLink size={12} />
                  </motion.a>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================
// CERTIFICATIONS
// =============================================
const Certifications = () => {
  const certifications = useMemo(() => [
    { title: 'Exploratory Data Analysis with Python and Pandas', provider: 'Coursera', year: '2026', icon: '📊', color: '#3b82f6', skills: ['Data Cleaning', 'Data Transformation', 'EDA', 'Statistical Summaries'] },
    { title: 'Databases and SQL for Data Science with Python', provider: 'IBM / Coursera', year: '2026', icon: '🗃️', color: '#06b6d4', skills: ['SQL Queries', 'Database Management', 'Data Retrieval', 'Aggregations'] },
  ], []);

  const simulations = useMemo(() => [
    { title: 'Deloitte — Data Analytics Job Simulation', platform: 'Forage', completed: 'April 2026', icon: '🏢', color: '#8b5cf6', tasks: ['Data Analysis', 'Forensic Technology', 'Dataset Interpretation', 'Business Insight Reporting'] },
    { title: 'Tata — Data Visualization Job Simulation', platform: 'Forage', completed: 'April 2026', icon: '📈', color: '#f59e0b', tasks: ['Business Scenario Framing', 'Selecting Visualization Types', 'Creating Business Charts', 'Communicating Insights'] },
  ], []);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionHeader label="Credentials" title="Certifications & Simulations" subtitle="Industry-recognized certifications and professional job simulations." />
        
        <FadeIn>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={17} color="#3b82f6" /> Certifications
          </h3>
        </FadeIn>
        <motion.div
          className="cert-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {certifications.map((cert, idx) => (
            <motion.div key={idx} variants={staggerItem} className="cert-card">
              <div className="cert-badge" style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}>{cert.icon}</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{cert.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: cert.color, fontWeight: 600 }}>{cert.provider}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>• {cert.year}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cert.skills.map((s, i) => (
                  <span key={i} className="skill-tag" style={{ padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={17} color="#8b5cf6" /> Job Simulations
          </h3>
        </FadeIn>
        <motion.div
          className="cert-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {simulations.map((sim, idx) => (
            <motion.div key={idx} variants={staggerItem} className="cert-card">
              <div className="cert-badge" style={{ background: `${sim.color}12`, border: `1px solid ${sim.color}25` }}>{sim.icon}</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{sim.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: sim.color, fontWeight: 600 }}>{sim.platform}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>• {sim.completed}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {sim.tasks.map((t, i) => (
                  <span key={i} className="skill-tag" style={{ padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// =============================================
// CONTACT
// =============================================
const Contact = ({ setIsResumeOpen }) => {
  const interests = useMemo(() => [
    'Data Analytics', 'Business Intelligence', 'Dashboard Development',
    'Data Mining', 'Artificial Intelligence', 'Predictive Analytics',
    'Data Visualization', 'Business Insights'
  ], []);

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader label="Contact" title="Let's Connect" subtitle="Open to Data Analyst roles and analytical project collaborations." />
        <FadeIn>
          <div className="glass-card contact-grid" style={{ padding: 'clamp(1.5rem, 4vw, 3.5rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', marginBottom: '1rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
                Let's Turn Data<br /><span className="gradient-text">Into Decisions.</span>
              </h2>
              <p style={{ color: 'var(--text-2)', marginBottom: '2rem', fontSize: '0.92rem', lineHeight: 1.75 }}>
                Currently seeking entry-level Data Analyst roles where data accuracy, reporting, and decision-making insights are critical.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                  { Icon: Mail,   label: 'Email',    val: 'safvankallayi7@gmail.com' },
                  { Icon: Phone,  label: 'Phone',    val: '+91 8590207382' },
                  { Icon: MapPin, label: 'Location', val: 'Kerala, India' }
                ].map(({ Icon, label, val }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', flexShrink: 0 }}>
                      <Icon size={16} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>{label}</div>
                      <div style={{ fontWeight: 500, fontSize: '0.88rem', wordBreak: 'break-all' }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Interests</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {interests.map((interest, i) => (
                    <span key={i} className="interest-pill">
                      <Lightbulb size={10} color="#3b82f6" /> {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem', justifyContent: 'center' }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="btn btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '0.82rem' }}
                onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=safvankallayi7@gmail.com&su=Data Analyst Opportunity&body=Hi Safvan, I saw your portfolio and would like to connect.')}>
                <Send size={15} /> Send a Message
              </motion.button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  href="https://linkedin.com/in/safvenn" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  <Linkedin size={15} /> LinkedIn
                </motion.a>
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  href="https://github.com/safvenn" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  <Github size={15} /> GitHub
                </motion.a>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="btn btn-outline" style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', borderColor: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}
                onClick={() => setIsResumeOpen(true)}>
                <Download size={15} /> View Full Resume
              </motion.button>

              <div style={{ marginTop: '0.5rem', padding: '1.15rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <GraduationCap size={15} color="#06b6d4" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Education</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
                  BCA (Final Year) — Kerala, India<br />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>Expected Graduation: 2026</span>
                </p>
                <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Globe size={15} color="#06b6d4" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Languages</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>
                  English (Professional) • Malayalam (Native) • Hindi (Conversational)
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

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
    const timer = setTimeout(() => setIsLoading(false), 1800);

    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => { clearTimeout(timer); clearInterval(interval); window.removeEventListener('open-resume', handleOpenResume); };
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#06080d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>S</div>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.04em', color: '#fff' }}>Safvan</span>
            </motion.div>
            <div>
              <div className="loader-bar">
                <motion.div
                  style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '2px' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(loadPct, 100)}%` }}
                  transition={{ duration: 0.2 }}
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            <MagneticCursor />
            <Navbar />
            <BackToTop />

            <main>
              <Hero />
              <hr className="glow-rule" />
              <About />
              <hr className="glow-rule" />
              <Skills />
              <hr className="glow-rule" />
              <Projects />
              <hr className="glow-rule" />
              <Certifications />
              <hr className="glow-rule" />
              <Contact setIsResumeOpen={setIsResumeOpen} />
            </main>

            <Resume isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

            <footer style={{ padding: '3rem 0', borderTop: '1px solid var(--border)', background: 'rgba(6,8,13,0.5)' }}>
              <div className="container footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '6px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.65rem', color: '#fff' }}>S</div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.03em' }}>Safvan</span>
                  </div>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.78rem' }}>© 2026 Safvan Sidheeq. All rights reserved.</p>
                </div>
                <div className="footer-links" style={{ display: 'flex', gap: '1.5rem' }}>
                  {[
                    { href: 'https://github.com/safvenn', icon: <Github size={14} />, label: 'GitHub' },
                    { href: 'https://linkedin.com/in/safvenn', icon: <Linkedin size={14} />, label: 'LinkedIn' },
                    { href: 'mailto:safvankallayi7@gmail.com', icon: <Mail size={14} />, label: 'Email' },
                  ].map(link => (
                    <motion.a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      whileHover={{ y: -2, color: '#60a5fa' }}
                      style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
                      {link.icon} {link.label}
                    </motion.a>
                  ))}
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
