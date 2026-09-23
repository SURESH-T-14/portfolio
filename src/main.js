import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './portfolio.css';
import { personal, journeyStages, experience, skills, projects, certificateEntries } from './data/content';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Journey', href: '#journey' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const appRef = useRef(null);
  const heroVideoRef = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      requestAnimationFrame(() => {
        if (loadingRef.current) {
          gsap.to(loadingRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => loadingRef.current?.remove()
          });
        }
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActive = (id) => {
      setActiveSection(id);
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.target.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '-25% 0px -35% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!appRef.current) return;

    gsap.fromTo(
      '.hero-copy > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
    );

    gsap.to('.hero-video', {
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%'
          }
        }
      );
    });

    gsap.utils.toArray('.timeline-card').forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          }
        }
      );
    });

    gsap.utils.toArray('.project-tile').forEach((tile, index) => {
      gsap.fromTo(
        tile,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.08,
          scrollTrigger: {
            trigger: tile,
            start: 'top 85%'
          }
        }
      );
    });

    gsap.utils.toArray('.skill-group').forEach((group, index) => {
      gsap.fromTo(
        group,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: group,
            start: 'top 85%'
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  const handleVideoToggle = () => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !heroVideoRef.current.muted;
    setSoundOn(!heroVideoRef.current.muted);
    if (!heroVideoRef.current.muted) heroVideoRef.current.play();
  };

  useEffect(() => {
    const closeOnEsc = (event) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
        setActiveCertificate(null);
      }
    };
    window.addEventListener('keydown', closeOnEsc);
    return () => window.removeEventListener('keydown', closeOnEsc);
  }, []);

  useEffect(() => {
    if (activeProject || activeCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject, activeCertificate]);

  const displayedCertificate = useMemo(() => {
    if (!activeCertificate) return null;
    const certificate = certificateEntries[activeCertificate];
    return certificate ? `./media/certificates/${certificate.file}` : '';
  }, [activeCertificate]);

  return (
    <div ref={appRef} className="portfolio-shell">
      <div ref={loadingRef} className={`loading-screen ${isLoaded ? 'view-done' : ''}`} aria-live="polite">
        <div className="loading-inner">
          <div className="loading-name">{personal.name}</div>
          <div className="loading-line" />
          <div className="loading-text">Loading experience...</div>
        </div>
      </div>

      <header className="site-header">
        <a href="#home" className="brand" aria-label="Go to home section">
          {personal.name.split(' ')[0]}<span>T</span>
        </a>
        <div className="header-role">AI-ENHANCED ENGINEER / FULL STACK</div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <button className="menu-button" onClick={() => setMenuOpen((prev) => !prev)} aria-expanded={menuOpen} aria-label="Toggle navigation menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section className="hero" id="home">
          <video ref={heroVideoRef} className="hero-video" src="/media/hero.mp4" autoPlay muted loop playsInline poster="/media/scene-1.png" />
          <div className="hero-overlay" />
          <div className="hero-noise" />

          <div className="hero-copy reveal">
            <p className="eyebrow">{personal.location} / 2026</p>
            <h1>
              {personal.name}
              <span>builds</span>
            </h1>
            <div className="hero-meta">
              <span>{personal.title}</span>
              <span>{personal.roleLine}</span>
              <span>{personal.tagline}</span>
            </div>
            <p className="hero-intro">{personal.headline}</p>
          </div>

          <div className="hero-side left">Scroll to explore ↓</div>
          <div className="hero-side right">01 / 06</div>

          <div className="hero-footer">
            <span>Curiosity, systems, impact.</span>
            <button className="sound-toggle" type="button" onClick={handleVideoToggle}>
              {soundOn ? 'Sound on' : 'Sound off'}
            </button>
          </div>
        </section>

        <section className="journey section-dark" id="journey">
          <div className="section-head reveal">
            <p className="eyebrow">01 / Journey</p>
            <p className="section-meta">Learning • Building • Shipping</p>
          </div>
          <div className="journey-layout">
            <div className="journey-intro reveal">
              <h2>
                A story of <span>craft</span>
              </h2>
              <p>
                From fundamentals to intelligent products, each phase of the journey strengthened the ability to build useful systems that feel thoughtful and real.
              </p>
            </div>
            <div className="timeline">
              {journeyStages.map((stage) => (
                <article key={stage.id} className="timeline-card">
                  <div className="timeline-index">{stage.id}</div>
                  <div className="timeline-line" />
                  <div className="timeline-body">
                    <div className="timeline-date">{stage.date}</div>
                    <h3>{stage.title}</h3>
                    <p>{stage.summary}</p>
                    <small>{stage.details}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience section-paper" id="experience">
          <div className="section-head reveal">
            <p className="eyebrow">02 / Experience</p>
            <p className="section-meta">Work that shapes the craft</p>
          </div>
          <div className="experience-grid">
            {experience.map((item) => (
              <article key={`${item.year}-${item.role}`} className="experience-card reveal">
                <div className="experience-year">{item.year}</div>
                <div className="experience-content">
                  <div className="role-line">{item.role}</div>
                  <div className="company-line">{item.company}</div>
                  <p>{item.description}</p>
                  <ul>
                    {item.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section-dark" id="skills">
          <div className="section-head reveal">
            <p className="eyebrow">03 / Skills</p>
            <p className="section-meta">Tools built around curiosity</p>
          </div>
          <div className="skills-intro reveal">
            <h2>
              Built for <span>systems</span> and <span>story</span>
            </h2>
            <p>From backend logic to AI applications and polished product experiences, the stack stays practical and creative.</p>
          </div>
          <div className="skills-grid">
            {Object.entries(skills).map(([groupName, items]) => (
              <div key={groupName} className="skill-group">
                <div className="skill-group-name">{groupName.toUpperCase()}</div>
                <div className="skill-list">
                  {items.map((skill) => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="projects section-dark" id="projects">
          <div className="section-head reveal">
            <p className="eyebrow">04 / Projects</p>
            <p className="section-meta">Ideas, interfaces, and real impact</p>
          </div>
          <div className="projects-header reveal">
            <h2>
              Projects that <span>move</span> people
            </h2>
            <p>Selected work across AI, accessibility, finance, cloud, and product thinking.</p>
          </div>

          <div className="project-grid" aria-label="Project showcase">
            {projects.map((project) => (
              <button key={project.id} className={`project-tile ${project.accent}`} type="button" onClick={() => setActiveProject(project)}>
                <div className="project-media" style={{ backgroundImage: `url(${project.image})` }} />
                <div className="project-meta">
                  <span>{String(project.id).padStart(2, '0')}</span>
                  <span>{project.year}</span>
                </div>
                <p className="project-category">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-link">View project</div>
              </button>
            ))}
          </div>
        </section>

        <section className="certifications section-paper" id="certifications">
          <div className="section-head reveal">
            <p className="eyebrow">05 / Certifications</p>
            <p className="section-meta">Proof of practice and learning</p>
          </div>
          <div className="cert-header reveal">
            <h2>
              Always <span>learning</span>
            </h2>
            <a href={personal.resume} target="_blank" rel="noreferrer">Open resume ↗</a>
          </div>
          <div className="cert-gallery" aria-label="Certificate gallery">
            {certificateEntries.map((certificate, index) => (
              <button key={certificate.file} className="certificate-card" onClick={() => setActiveCertificate(index)} type="button">
                <span className="cert-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="cert-body">
                  <strong>{certificate.title}</strong>
                  <small>{certificate.issuer}</small>
                </div>
                <span className="cert-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="contact section-dark" id="contact">
          <div className="contact-visual reveal" style={{ backgroundImage: 'url(/media/scene-5.png)' }} />
          <div className="contact-panel reveal">
            <p className="eyebrow">06 / Contact</p>
            <h2>
              Let’s <span>connect</span>
            </h2>
            <p className="contact-copy">Good ideas start with a simple conversation.</p>
            <div className="contact-links">
              <a href={`mailto:${personal.email}`}>Email <span>{personal.email}</span></a>
              <a href={personal.github} target="_blank" rel="noreferrer">GitHub <span>github.com/SURESH-T-14</span></a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>linkedin.com/in/suresh-t</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>© 2026 {personal.name}</div>
        <div>Built with React</div>
        <div className="footer-links">
          <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${personal.email}`}>Email</a>
        </div>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)}>
            <motion.article className="project-modal" initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 24 }} transition={{ duration: 0.3, ease: 'easeOut' }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close project detail">×</button>
              <div className="modal-media" style={{ backgroundImage: `url(${activeProject.image})` }} />
              <div className="modal-body">
                <p className="eyebrow">{activeProject.category}</p>
                <h3>{activeProject.name}</h3>
                <div className="modal-meta">
                  <span>{activeProject.year}</span>
                  <span>{activeProject.category}</span>
                </div>
                <p>{activeProject.description}</p>
                <div className="modal-grid">
                  <div>
                    <h4>Problem</h4>
                    <p>{activeProject.problem}</p>
                  </div>
                  <div>
                    <h4>Solution</h4>
                    <p>{activeProject.solution}</p>
                  </div>
                </div>
                <div className="stack-row">
                  {activeProject.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <ul className="feature-list">
                  {activeProject.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="modal-actions">
                  <a href={activeProject.repo} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCertificate !== null && displayedCertificate && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveCertificate(null)}>
            <motion.div className="certificate-modal" initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 18 }} transition={{ duration: 0.25 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" onClick={() => setActiveCertificate(null)} aria-label="Close certificate detail">×</button>
              <div className="certificate-frame-view">
                <iframe title={certificateEntries[activeCertificate].title} src={displayedCertificate} />
              </div>
              <div className="certificate-details">
                <p className="eyebrow">Certificate</p>
                <h3>{certificateEntries[activeCertificate].title}</h3>
                <div className="modal-meta">
                  <span>{certificateEntries[activeCertificate].issuer}</span>
                  <span>{certificateEntries[activeCertificate].date}</span>
                </div>
                <a href={displayedCertificate} target="_blank" rel="noreferrer">Open original certificate</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
