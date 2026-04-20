import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink, 
  Download, Menu, X, Send, ArrowRight, 
  BarChart3, Database, FileSpreadsheet, LineChart, 
  BrainCircuit, Table2, PieChart, TrendingUp,
  Award, BookOpen, Briefcase, GraduationCap,
  Activity, Target, Lightbulb, Globe,
  ChevronRight
} from 'lucide-react';
import Resume from './components/Resume';

// =============================================
// MAGNETIC CURSOR
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

  const navLinks = [
    { name: 'About',          href: '#about'          },
    { name: 'Skills',         href: '#skills'         },
    { name: 'Projects',       href: '#projects'       },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact',        href: '#contact'        },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      padding: isScrolled ? '1rem 0' : '2rem 0',
      background: isScrolled ? 'rgba(6,8,13,0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
      transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <div style={{ 
            width: 32, height: 32, borderRadius: '10px', 
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontWeight: 800, fontSize: '0.85rem', color: '#fff' 
          }}>S</div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.03em' }}>Safvan</span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.div
          className="desktop-nav"
          style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
              style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ cursor: 'pointer', display: 'none' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            style={{ background: 'rgba(6,8,13,0.97)', backdropFilter: 'blur(24px)', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="container" style={{ paddingBottom: '2rem' }}>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}
                  style={{ display: 'block', padding: '0.85rem 0', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-2)' }}
                >{link.name}</a>
              ))}
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
                onClick={() => { setIsMenuOpen(false); window.open('https://mail.google.com/mail/?view=cm&fs=1&to=safvankallayi7@gmail.com&su=Hiring Inquiry'); }}>
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
        style={{ fontSize: '1rem', color: 'var(--text-2)', maxWidth: '560px', lineHeight: 1.7 }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// =============================================
// TILT CARD
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
// HERO — Data Analyst
// =============================================
const Hero = () => {
  const roles = ['Data Analyst', 'BI Developer', 'Dashboard Creator', 'SQL Expert'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      {/* Background decorations */}
      <div className="hero-grid-bg" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      {/* Floating data icons */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '15%', right: '12%', opacity: 0.08, zIndex: 0 }}
      >
        <BarChart3 size={120} color="#3b82f6" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -15, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '20%', left: '8%', opacity: 0.06, zIndex: 0 }}
      >
        <PieChart size={100} color="#06b6d4" />
      </motion.div>
      <motion.div
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '60%', right: '25%', opacity: 0.05, zIndex: 0 }}
      >
        <Database size={80} color="#8b5cf6" />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Label pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1.2rem', borderRadius: '9999px',
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(59,130,246,0.06)',
              fontSize: '0.78rem', color: '#60a5fa',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              marginBottom: '2rem'
            }}
          >
            <Activity size={13} /> Available for opportunities
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
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
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
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
              fontSize: '1.05rem',
              color: 'var(--text-2)',
              maxWidth: '620px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.8,
            }}
          >
            Final-year BCA student specializing in Data Analytics, Business Intelligence, and Data Visualization. 
            Transforming raw data into actionable business insights using Python, SQL, Excel, and Power BI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              href="#projects" className="btn btn-primary">
              <BarChart3 size={15} /> View Projects
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
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
            style={{ maxWidth: '650px', margin: '3rem auto 0' }}
          >
            {[
              { number: '4+', label: 'Projects' },
              { number: '150K+', label: 'Records Processed' },
              { number: '10+', label: 'SQL Queries' },
              { number: '2', label: 'Certifications' },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number gradient-text">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// =============================================
// ABOUT
// =============================================
const About = () => {
  const expertise = [
    { icon: <Table2 size={20} />, title: 'Data Cleaning', desc: 'Transforming messy, incomplete datasets into structured, analysis-ready data.' },
    { icon: <Database size={20} />, title: 'SQL & Data Modeling', desc: 'Building multi-table data models and executing complex analytical queries.' },
    { icon: <BarChart3 size={20} />, title: 'Dashboard Creation', desc: 'Designing interactive Power BI and Excel dashboards for KPI tracking.' },
    { icon: <TrendingUp size={20} />, title: 'Statistical Analysis', desc: 'Identifying patterns, trends, and outliers to support data-driven decisions.' },
    { icon: <BrainCircuit size={20} />, title: 'EDA & Insights', desc: 'Conducting exploratory analysis to uncover hidden business insights.' },
    { icon: <Target size={20} />, title: 'Business Intelligence', desc: 'Translating data findings into actionable business recommendations.' },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader label="About Me" title="Who I Am" subtitle="A detail-oriented aspiring Data Analyst passionate about turning data into decisions." />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card"
          style={{ padding: '2.5rem', marginBottom: '3rem' }}
        >
          <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            I am a detail-oriented aspiring Data Analyst with strong skills in data cleaning, exploratory data analysis, 
            multi-table integration, and dashboard creation. I have hands-on experience working with real-world datasets 
            using <span style={{ color: '#60a5fa', fontWeight: 600 }}>Python</span>, <span style={{ color: '#06b6d4', fontWeight: 600 }}>SQL</span>, 
            <span style={{ color: '#8b5cf6', fontWeight: 600 }}> Excel</span>, and <span style={{ color: '#f59e0b', fontWeight: 600 }}>Power BI</span> to 
            generate meaningful business insights.
          </p>
          <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.85 }}>
            I have completed professional job simulations from <strong style={{ color: 'var(--text-1)' }}>Deloitte</strong> and <strong style={{ color: 'var(--text-1)' }}>Tata</strong> through Forage, 
            where I applied real-world data analysis and visualization workflows. My goal is to build scalable data 
            solutions and grow into advanced analytics and predictive modeling roles.
          </p>
        </motion.div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Core Expertise
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {expertise.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
              className="glass-card"
              style={{ padding: '1.5rem' }}
            >
              <div style={{ 
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: '10px', color: '#60a5fa', marginBottom: '1rem'
              }}>
                {item.icon}
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.65 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ marginTop: '3rem', padding: '1.75rem 2rem', borderLeft: '2px solid #3b82f6', background: 'rgba(59,130,246,0.04)', borderRadius: '0 12px 12px 0' }}
        >
          <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-2)', lineHeight: 1.8 }}>
            "I believe every dataset has a story to tell. My job is to clean the noise, find the patterns, and present insights that drive real business impact."
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
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader label="Tech Stack" title="Technical Skills" subtitle="Tools, languages, and frameworks I use for data analysis and visualization." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
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
                  <span key={i} className="skill-tag"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '6px', fontSize: '0.78rem',
                      border: '1px solid var(--border)',
                      color: 'var(--text-2)', fontFamily: 'var(--font-mono)',
                      cursor: 'default'
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: skill.color, display: 'inline-block' }} />
                    {item}
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
    {
      title: 'Petrol Station Analytics — End-to-End Python → Power BI',
      tag: 'Python · Power BI · Full Pipeline',
      description: 'Complete end-to-end analytics project transforming messy petrol station datasets into business insights. Processed 150,000+ transactions covering ₹2.15B revenue and 22M+ liters. Built Operations and HR dashboards in Power BI with data cleaning pipeline using IQR outlier detection, missing value handling, and data modeling.',
      tools: ['Python', 'Pandas', 'NumPy', 'Power BI', 'Matplotlib', 'Seaborn'],
      link: 'https://github.com/safvenn/petrol-pumb-analysis',
      accent: '#f59e0b',
      highlights: ['150K+ Transactions', '₹2.15B Revenue Analyzed', '2 Dashboards Built']
    },
    {
      title: 'Hospital Doctor Utilization & Patient Cost Analysis',
      tag: 'Python · SQL · Full Pipeline',
      description: 'Integrated 4 relational datasets into a unified analytical model. Built multi-table data pipeline, cleaned healthcare datasets, created calculated features, and executed 10+ SQL queries to extract KPIs. Identified 3 high-cost patient segments and recommended staffing optimizations.',
      tools: ['Python', 'Pandas', 'MySQL', 'SQLAlchemy', 'Matplotlib', 'Seaborn', 'Excel'],
      link: 'https://github.com/safvenn/hospital_Multi_table_analysis',
      accent: '#3b82f6',
      highlights: ['4 Datasets Integrated', '10+ SQL Queries', '3 Segments Identified']
    },
    {
      title: 'Netflix Dataset — Data Cleaning & Content Segmentation',
      tag: 'Python · Power BI · EDA',
      description: 'Cleaned 8,000+ dataset records by removing nulls, standardizing text, and fixing date formats. Performed genre distribution and actor frequency analysis, identified Top 20 actors, and created Power BI visualizations for content trends.',
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
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader label="Portfolio" title="Featured Projects" subtitle="End-to-end data analysis projects showcasing cleaning, modeling, and visualization skills." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
            >
              <TiltCard className="glass-card" style={{ padding: '2.5rem' }}>
                {/* accent glow */}
                <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${project.accent}12 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="tag-label" style={{ color: project.accent }}>{project.tag}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{project.title}</h3>
                  
                  <p style={{ color: 'var(--text-2)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '700px' }}>{project.description}</p>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    {project.highlights.map((h, i) => (
                      <span key={i} style={{
                        padding: '0.3rem 0.75rem', borderRadius: '6px',
                        background: `${project.accent}10`, border: `1px solid ${project.accent}25`,
                        fontSize: '0.75rem', fontWeight: 600, color: project.accent,
                        fontFamily: 'var(--font-mono)'
                      }}>{h}</span>
                    ))}
                  </div>

                  {/* Tools */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {project.tools.map((t, i) => (
                      <span key={i} style={{
                        padding: '0.25rem 0.6rem', borderRadius: '4px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)'
                      }}>{t}</span>
                    ))}
                  </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.78rem', color: project.accent, borderColor: `${project.accent}30` }}>
                    <Github size={14} /> View on GitHub <ExternalLink size={12} />
                  </a>
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
// CERTIFICATIONS & SIMULATIONS
// =============================================
const Certifications = () => {
  const certifications = [
    {
      title: 'Exploratory Data Analysis with Python and Pandas',
      provider: 'Coursera',
      year: '2026',
      icon: '📊',
      color: '#3b82f6',
      skills: ['Data Cleaning', 'Data Transformation', 'EDA', 'Statistical Summaries']
    },
    {
      title: 'Databases and SQL for Data Science with Python',
      provider: 'IBM / Coursera',
      year: '2026',
      icon: '🗃️',
      color: '#06b6d4',
      skills: ['SQL Queries', 'Database Management', 'Data Retrieval', 'Aggregations']
    },
  ];

  const simulations = [
    {
      title: 'Deloitte — Data Analytics Job Simulation',
      platform: 'Forage',
      completed: 'April 2026',
      icon: '🏢',
      color: '#8b5cf6',
      tasks: ['Data Analysis', 'Forensic Technology', 'Dataset Interpretation', 'Business Insight Reporting']
    },
    {
      title: 'Tata — Data Visualization Job Simulation',
      platform: 'Forage',
      completed: 'April 2026',
      icon: '📈',
      color: '#f59e0b',
      tasks: ['Business Scenario Framing', 'Selecting Visualization Types', 'Creating Business Charts', 'Communicating Insights']
    },
  ];

  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionHeader label="Credentials" title="Certifications & Simulations" subtitle="Industry-recognized certifications and professional job simulations." />
        
        {/* Certifications */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={18} color="#3b82f6" /> Certifications
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="cert-card"
            >
              <div className="cert-badge" style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}>
                {cert.icon}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{cert.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: cert.color, fontWeight: 600 }}>{cert.provider}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>• {cert.year}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cert.skills.map((s, i) => (
                  <span key={i} className="skill-tag" style={{
                    padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                    color: 'var(--text-2)', fontFamily: 'var(--font-mono)'
                  }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Simulations */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Briefcase size={18} color="#8b5cf6" /> Job Simulations
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {simulations.map((sim, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="cert-card"
            >
              <div className="cert-badge" style={{ background: `${sim.color}12`, border: `1px solid ${sim.color}25` }}>
                {sim.icon}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{sim.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: sim.color, fontWeight: 600 }}>{sim.platform}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>• {sim.completed}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {sim.tasks.map((t, i) => (
                  <span key={i} className="skill-tag" style={{
                    padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                    color: 'var(--text-2)', fontFamily: 'var(--font-mono)'
                  }}>{t}</span>
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
// CONTACT
// =============================================
const Contact = ({ setIsResumeOpen }) => {
  const interests = [
    'Data Analytics', 'Business Intelligence', 'Dashboard Development',
    'Data Mining', 'Artificial Intelligence', 'Predictive Analytics',
    'Data Visualization', 'Business Insights'
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader label="Contact" title="Let's Connect" subtitle="Open to Data Analyst roles and analytical project collaborations." />
        <div className="glass-card" style={{ padding: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3.5rem', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '1rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
              Let's Turn Data<br /><span className="gradient-text">Into Decisions.</span>
            </h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Currently seeking entry-level Data Analyst roles where data accuracy, reporting, and decision-making insights are critical.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                { Icon: Mail,   label: 'Email',    val: 'safvankallayi7@gmail.com' },
                { Icon: Phone,  label: 'Phone',    val: '+91 8590207382' },
                { Icon: MapPin, label: 'Location', val: 'Kerala, India' }
              ].map(({ Icon, label, val }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 36, height: 36, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>{label}</div>
                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Interests</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {interests.map((interest, i) => (
                  <span key={i} className="interest-pill">
                    <Lightbulb size={11} color="#3b82f6" /> {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', justifyContent: 'center', fontSize: '0.85rem' }}
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=safvankallayi7@gmail.com&su=Data Analyst Opportunity&body=Hi Safvan, I saw your portfolio and would like to connect.')}>
              <Send size={15} /> Send a Message
            </motion.button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <a href="https://linkedin.com/in/safvenn" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="https://github.com/safvenn" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                <Github size={15} /> GitHub
              </a>
            </div>
            <motion.button whileHover={{ scale: 1.02 }}
              className="btn btn-outline" style={{ width: '100%', padding: '0.9rem', justifyContent: 'center', borderColor: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}
              onClick={() => setIsResumeOpen(true)}>
              <Download size={15} /> View Full Resume
            </motion.button>

            {/* Education & Languages */}
            <div style={{ marginTop: '1rem', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <GraduationCap size={16} color="#06b6d4" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Education</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                BCA (Final Year) — Kerala, India<br />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>Expected Graduation: 2026</span>
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Globe size={16} color="#06b6d4" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Languages</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>
                English (Professional) • Malayalam (Native) • Hindi (Conversational)
              </p>
            </div>
          </div>
        </div>
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
    const timer = setTimeout(() => setIsLoading(false), 2000);

    const handleScroll = () => {
      const sp = window.scrollY + window.innerHeight / 2;
      const sections = ['about', 'skills', 'projects', 'certifications', 'contact'];
      let cur = 'hero';
      sections.forEach(id => { const el = document.getElementById(id); if (el && sp > el.offsetTop) cur = id; });
      const colors = {
        hero:           { primary: '#3b82f6', accent: '#06b6d4' },
        about:          { primary: '#3b82f6', accent: '#06b6d4' },
        skills:         { primary: '#06b6d4', accent: '#8b5cf6' },
        projects:       { primary: '#3b82f6', accent: '#8b5cf6' },
        certifications: { primary: '#8b5cf6', accent: '#f59e0b' },
        contact:        { primary: '#3b82f6', accent: '#06b6d4' }
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
            <MagneticCursor />
            <Navbar />

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

            <footer style={{ padding: '3.5rem 0', borderTop: '1px solid var(--border)', background: 'rgba(6,8,13,0.5)' }}>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '6px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.65rem', color: '#fff' }}>S</div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.03em' }}>Safvan</span>
                  </div>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.8rem' }}>© 2026 Safvan Sidheeq. All rights reserved.</p>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <a href="https://github.com/safvenn" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-2)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-3)'}>
                    <Github size={14} /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/safvenn" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-2)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-3)'}>
                    <Linkedin size={14} /> LinkedIn
                  </a>
                  <a href="mailto:safvankallayi7@gmail.com" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
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
