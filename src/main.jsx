import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import './portfolio.css';
import {
  personal,
  backgrounds,
  journeyYears,
  experience,
  skillGroups,
  projects,
  certificateEntries
} from './data/content';
import HeroStage from './hero/HeroStage';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Journey', href: '#chrono' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
];

const yearLayout = [
  { left: '18%', top: '42%', width: 168, tilt: '7deg', tagLeft: '16%', tagTop: '22%', tagSize: 42 },
  { left: '30%', top: '50%', width: 186, tilt: '5.5deg', tagLeft: '28%', tagTop: '32%', tagSize: 46 },
  { left: '43%', top: '56%', width: 204, tilt: '4deg', tagLeft: '42%', tagTop: '38%', tagSize: 52 },
  { left: '56%', top: '61%', width: 222, tilt: '2.6deg', tagLeft: '55%', tagTop: '42%', tagSize: 56 },
  { left: '70%', top: '64%', width: 238, tilt: '1.2deg', tagLeft: '68%', tagTop: '44%', tagSize: 62 },
  { left: '84%', top: '66%', width: 268, tilt: '0deg', tagLeft: '82%', tagTop: '45%', tagSize: 72 }
];

function App() {
  const [booting, setBooting] = useState(true);
  const [bootPct, setBootPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroAway, setHeroAway] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [yearFocus, setYearFocus] = useState(5);
  const [activeProject, setActiveProject] = useState(null);
  const [certPage, setCertPage] = useState(0);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const letters = personal.wordmark.split('');
  const certPageSize = 6;
  const certPages = Math.ceil(certificateEntries.length / certPageSize);
  const visibleCerts = certificateEntries.slice(certPage * certPageSize, certPage * certPageSize + certPageSize);

  useEffect(() => {
    const imageUrls = [
      ...Object.values(backgrounds),
      ...journeyYears.map((year) => year.image),
      ...projects.map((project) => project.image)
    ].filter((url) => !url.endsWith('.mp4'));
    const certificateUrls = certificateEntries.map((certificate) => `./media/certificates/${encodeURIComponent(certificate.file)}`);
    const warmImages = () => imageUrls.forEach((url) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = url;
    });
    const warmCertificates = () => certificateUrls.forEach((url) => {
      fetch(url, { cache: 'force-cache' }).catch(() => {});
    });
    const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 120));
    const imageTask = idle(warmImages);
    const certificateTask = window.setTimeout(warmCertificates, 350);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(imageTask);
      window.clearTimeout(certificateTask);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame += 1;
      setBootPct((prev) => {
        const next = Math.min(100, prev + (prev < 70 ? 2.4 : 1.1));
        return next;
      });
      if (frame < 90) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const done = setTimeout(() => {
      setBootPct(100);
      setBooting(false);
      setTimeout(() => setReady(true), 80);
    }, 2200);
    return () => clearTimeout(done);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeroAway(window.scrollY > window.innerHeight * 0.86);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'chrono', 'skills', 'experience', 'projects', 'certifications', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id === 'home-marker' ? 'home' : visible.target.id);
      },
      { threshold: [0.18, 0.4, 0.65], rootMargin: '-20% 0px -40% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id === 'home' ? 'home-marker' : id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!ready) return undefined;
    const cards = document.querySelectorAll('.skill-card, .journey__milestone, .experience__card-layer, .cert-room__frame');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [ready, certPage]);

  useEffect(() => {
    document.body.style.overflow = activeProject || activeCertificate !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject, activeCertificate]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
        setActiveCertificate(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const htmlState = [
    ready ? 'is-header is-welcome is-arrows is-dots is-artist is-legend' : '',
    menuOpen ? 'is-menu' : ''
  ].join(' ');

  const displayedCertificate = useMemo(() => {
    if (activeCertificate === null) return null;
    return certificateEntries[activeCertificate];
  }, [activeCertificate]);

  return (
    <div className={htmlState}>
      <h1 className="sr-only">{personal.wordmark} — Engineer, Builder, Storyteller. Welcome to my world.</h1>

      <div className={`boot ${booting ? '' : 'is-done'}`} role="status" aria-live="polite">
        <i className="boot__bar-edge boot__bar-edge--top" />
        <i className="boot__bar-edge boot__bar-edge--bottom" />
        <div className="boot__frame" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="boot__meta boot__meta--tl">{personal.name}<span>Portfolio · 2026</span></p>
        <p className="boot__meta boot__meta--tr">Reel 01<span>Cinematic cut</span></p>
        <div className="boot__center">
          <p className="boot__eyebrow">••• A film by •••</p>
          <p className="boot__word">
            {letters.map((letter, i) => (
              <span key={`${letter}-${i}`} style={{ '--i': i }}>{letter}</span>
            ))}
          </p>
          <p className="boot__line"><span>Welcome to my world</span></p>
        </div>
        <div className="boot__count" aria-hidden="true"><b>{String(Math.round(bootPct)).padStart(2, '0')}</b><small>%</small></div>
        <p className="boot__meta boot__meta--bl">Loading<span>Welcome to my world</span></p>
        <div className="boot__bar"><i style={{ width: `${bootPct}%` }} /></div>
      </div>

      <header className="hdr" id="hdr">
        <svg className="hdr__rule" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1920 92" style={{ '--len': 1920 }}>
          <polyline fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" points="0,88.5 1920,88.5" />
        </svg>
        <p className="hdr__roles">
          <span>Developer</span>
          <span>Designer</span>
          <span>Engineer</span>
        </p>
        <nav className="hdr__nav" aria-label="Primary">
          <ul>
            {navItems.map((item, i) => {
              const id = item.href.slice(1);
              const active = activeSection === id || (id === 'home' && activeSection === 'home');
              return (
                <li key={item.href} style={{ '--i': i }}>
                  <a href={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'location' : undefined}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hdr__meta">
          <span className="hdr__pips" aria-hidden="true"><i /><i /><i /></span>
        </div>
        <button className="hdr__burger" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
          <span className="sr-only">Menu</span>
        </button>
      </header>

      <nav className="menu" aria-label="Primary, expanded" hidden={!menuOpen}>
        <ul>
          {navItems.map((item, i) => (
            <li key={item.href}>
              <a href={item.href} style={{ '--i': i }} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="menu__tag">••• Welcome to my world •••</p>
      </nav>

      <div className={`stage-wrap ${heroAway ? 'is-away' : ''}`} id="home">
        <HeroStage
          wordText={personal.wordmark}
          imageSrc="/media/myimage.png"
          active={!heroAway}
        />
        <div className="furniture" aria-hidden="true">
          <p className="welcome">
            <b className="welcome__dots">•••</b>
            <span className="welcome__text">Welcome to <em>my</em> world</span>
            <b className="welcome__dots">•••</b>
          </p>
          <p className="chip chip--artist">Engineer</p>
          <p className="chip chip--legend">Storyteller</p>
          <div className="arrows arrows--l">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }} />)}</div>
          <div className="arrows arrows--r">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }} />)}</div>
          <div className="grid-dots grid-dots--br">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
        </div>
      </div>

      <main className="flow">
        <div className="hero-spacer" id="home-marker" aria-hidden="true" />

        <section className="chrono" id="chrono" aria-labelledby="chronoTitle">
          <div className="chrono__pin">
            <h2 className="chrono__title" id="chronoTitle">
              <span>A</span><span>Journey</span><span>Through</span><span>Time</span>
            </h2>
            <p className="chrono__rail">
              <i />
              <span>Ideas</span><span>Experiences</span><span>People</span>
              <span>Projects</span><span>Me</span>
              <i />
            </p>
            <p className="chrono__hint">Move<br />to travel<br />through time<i /></p>
            <p className="chrono__note chrono__note--bl">Same<br />curiosity<br />a brighter<br />tomorrow</p>
            <p className="chrono__note chrono__note--br">Still<br />designing<br />what&apos;s<br />next<i /></p>
            <div className="chrono__deck">
              {journeyYears.map((year, index) => {
                const layout = yearLayout[index];
                return (
                  <React.Fragment key={year.year}>
                    <button
                      type="button"
                      className={`yr-tag ${yearFocus === index ? 'is-active' : ''}`}
                      style={{ left: layout.tagLeft, top: layout.tagTop, fontSize: layout.tagSize }}
                      onMouseEnter={() => setYearFocus(index)}
                      onFocus={() => setYearFocus(index)}
                    >
                      {year.year}
                    </button>
                    <button
                      type="button"
                      className={`yr ${yearFocus === index ? 'is-active' : ''}`}
                      style={{ left: layout.left, top: layout.top, width: layout.width, '--tilt': layout.tilt, '--depth': index }}
                      onMouseEnter={() => setYearFocus(index)}
                      onFocus={() => setYearFocus(index)}
                      aria-label={`${year.year} — ${year.key}`}
                    >
                      <span className="yr__frame">
                        <img className="yr__img" src={year.image} alt="" loading="eager" decoding="async" />
                        <span className="yr__body">
                          <span className="yr__year">{year.year}</span>
                          <span className="yr__key">{year.key}</span>
                          <span className="yr__lines">{year.lines.map((line) => <i key={line}>{line}</i>)}</span>
                        </span>
                      </span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        <section className="skills-scene" id="skills" aria-labelledby="skillsTitle">
          <div className="skills-composition">
            <div className="skills-photo">
              <img className="skills-scene-portrait" src={backgrounds.skills} alt={`${personal.name} portrait`} />
              <div className="skills-portrait-caption">
                <p>Good ideas build great things.</p>
                <span>Discipline · Creativity · Consistency</span>
              </div>
            </div>
            <div className="skills-scene__content">
              <header className="skills-heading">
                <h2 id="skillsTitle">Skills</h2>
                <p className="skills-scene__subtitle">Tools that shape my vision</p>
              </header>
              <div className="skills-grid">
                {skillGroups.map((group, order) => (
                  <article className="skill-card" style={{ '--order': order }} key={group.title}>
                    <header>
                      <span className="skill-number">{group.number}</span>
                      <h3>{group.title}</h3>
                      <i />
                      <p>{group.tagline}</p>
                    </header>
                    <ul style={{ '--items': group.items.length }}>
                      {group.items.map((item) => (
                        <li key={item.name}>
                          <div className="skill-symbol" style={{ color: item.color }}><b>{item.mark}</b></div>
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <p className="skills-scene__script">Same curiosity. A brighter tomorrow.</p>
            <nav className="skills-navigation"><a href="#experience">Explore experience ↗</a></nav>
          </div>
        </section>

        <section className="journey" id="experience" aria-labelledby="journeyTitle">
          <img className="journey__scene" src={backgrounds.journey} alt="" />
          <div className="journey__intro">
            <h2 id="journeyTitle">Experience<br /><span>builds<br />perspective</span></h2>
            <span className="journey__rule" />
            <p className="journey__description">
              Every project, collaboration, and challenge has shaped the person I am today.
              Grateful for the journey, excited for what&apos;s next.
            </p>
            <span className="journey__rule" />
            <p className="journey__signature">{personal.name.split(' ')[0]}</p>
            <p className="journey__micro">Still learning<br />Still building<br />Still evolving</p>
          </div>
          <p className="journey__wall">Same<br />curiosity<br />a brighter<br />tomorrow</p>
          <p className="journey__bench">Experience<br />shapes<br />better<br />ideas</p>
          <p className="journey__corner journey__micro">Ideas<br />into<br />impact</p>
          <p className="journey__topics journey__micro">People<br />Projects<br />Learning<br />Growth</p>
          <div className="journey__history">
            <blockquote>Not just experience<br />but lessons for a better me.</blockquote>
            <ol className="journey__timeline">
              {experience.map((item, index) => (
                <li className={`journey__milestone ${index % 2 === 0 ? 'is-from-left' : 'is-from-right'}`} key={`${item.year}-${item.company}`} style={{ '--card-index': index }}>
                  <div className="journey__date">{item.year}</div>
                  <span className="journey__node" />
                  <article className="journey__card">
                    <div />
                    <div className="journey__copy">
                      <h3>{item.role}</h3>
                      <p className="journey__company">{item.company}</p>
                      <p>{item.description}</p>
                    </div>
                    <p className="journey__card-note">{item.technologies.join(' / ')}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
          <a className="journey__next" href="#projects"><span>→</span> Next projects</a>
        </section>

        <section className="experience is-layered" id="projects" aria-labelledby="experienceTitle">
          <header className="experience__heading">
            <h2 id="experienceTitle">Projects</h2>
            <span />
          </header>
          <p className="experience__note experience__note--left">Ideas<br />Interfaces<br />Experiences<br /><strong>Real impact</strong></p>
          <p className="experience__note experience__note--right">Scroll<br />Explore<br />Interact</p>
          <div className="experience__viewport">
            <div className="experience__world">
              <img className="experience__art" src={backgrounds.projects} alt="" />
              <div className="experience__screens">
                {projects.map((project) => (
                  <div
                    className="experience__card-layer"
                    key={project.id}
                    style={{ left: project.pos.left, top: project.pos.top, width: project.pos.width, height: project.pos.height, '--entry-turn': project.pos.turn, '--project-index': project.id }}
                  >
                    <button
                      type="button"
                      className="experience__screen experience__screen--project"
                      style={{ '--screen-accent': project.accent }}
                      onClick={() => setActiveProject(project)}
                    >
                      <img src={project.image} alt="" className="experience__project-image" loading="eager" decoding="async" />
                      <span className="experience__project-index">{String(project.id).padStart(2, '0')}</span>
                      <span className="experience__project-category">{project.category}</span>
                      <span className="experience__project-label">{project.name}</span>
                      <span className="experience__project-action">View project ↗</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="experience__note experience__note--bottom-left">Real<br />projects<br />real<br />stories</p>
          <p className="experience__note experience__note--bottom-right">Designing<br />a brighter<br />tomorrow</p>
        </section>

        <section className="cert-room" id="certifications">
          <img className="cert-room__backdrop" src={backgrounds.certifications} alt="" />
          <div className="cert-room__intro">
            <h2>Learning<br />Creating<br />Achieving<br /><em>More.</em></h2>
            <p className="cert-room__statement">Certificates are milestones.<br />The real achievement is<br />the person I am becoming.</p>
            <p className="cert-room__ritual">Learn<br />Practice<br />Build<br />Achieve<br />Repeat</p>
          </div>
          <p className="cert-room__script cert-room__script--top">Milestones on the way<br /><span>to a bigger me.</span></p>
          <div className="cert-room__wall">
            <header className="cert-room__wall-heading">
              <h3>Certifications</h3>
              <span>{String(certPage * certPageSize + 1).padStart(2, '0')} — {String(Math.min((certPage + 1) * certPageSize, certificateEntries.length)).padStart(2, '0')} / {String(certificateEntries.length).padStart(2, '0')}</span>
            </header>
            <div className="cert-room__grid">
              {visibleCerts.map((cert, i) => {
                const index = certPage * certPageSize + i;
                return (
                  <button className="cert-room__frame" type="button" key={cert.file} style={{ '--cert-index': i }} onClick={() => setActiveCertificate(index)}>
                    <iframe
                      className="cert-preview"
                      title={`${cert.title} preview`}
                      src={`./media/certificates/${encodeURIComponent(cert.file)}#toolbar=0&navpanes=0&scrollbar=0`}
                      tabIndex="-1"
                      loading="eager"
                    />
                    <span>{cert.title} <b>↗</b></span>
                  </button>
                );
              })}
            </div>
            <div className="cert-room__browse">
              <span>Select a frame to view</span>
              <div>
                <button type="button" disabled={certPage === 0} onClick={() => setCertPage((page) => Math.max(0, page - 1))} aria-label="Previous six certificates">←</button>
                <button type="button" disabled={certPage >= certPages - 1} onClick={() => setCertPage((page) => Math.min(certPages - 1, page + 1))} aria-label="Next six certificates">→</button>
              </div>
            </div>
            <p className="cert-room__milestone-title">The skills behind the story</p>
            <div className="cert-room__milestones">
              <article><span>⌘</span><h4>Build & create</h4><p>Full stack development Software engineering</p></article>
              <article><span>☁</span><h4>Think in systems</h4><p>Cloud architecture System design</p></article>
              <article><span>✧</span><h4>Explore the data</h4><p>Python · Data science Machine learning</p></article>
              <article><span>✺</span><h4>Stay curious</h4><p>Prompt engineering Learning by doing</p></article>
            </div>
            <p className="cert-room__script cert-room__script--bottom">Not the end.<br />Just the beginning…</p>
          </div>
          <p className="cert-room__footer">Same curiosity. A brighter tomorrow.<i /></p>
        </section>

        <section className="contact" id="contact">
          <div className="contact__portrait">
            <img src={backgrounds.contact} alt="" />
          </div>
          <div className="contact__content">
            <h2>Let&apos;s<br /><span>connect.</span></h2>
            <p className="contact__intro">Good ideas start with<br />a simple conversation.</p>
            <div className="contact__cards">
              <a className="contact__card" href={`mailto:${personal.email}`}>
                <strong>Email</strong>
                <span>{personal.email}</span>
                <i>↗</i>
              </a>
              <a className="contact__card" href={personal.linkedin} target="_blank" rel="noreferrer">
                <strong>LinkedIn</strong>
                <span>Let&apos;s connect</span>
                <i>↗</i>
              </a>
              <a className="contact__card" href={personal.github} target="_blank" rel="noreferrer">
                <strong>GitHub</strong>
                <span>Explore my work</span>
                <i>↗</i>
              </a>
            </div>
            <div className="contact__rail">
              <span />
              <p>Ideas / Collaborations / Opportunities</p>
              <span />
              <a href="#home" className="contact__circle" aria-label="Back to top">↗</a>
            </div>
            <div className="contact__closing">
              <blockquote>
                <b>“</b>
                <p>Let&apos;s create<br />something meaningful.</p>
                <b>”</b>
              </blockquote>
              <p className="contact__motto">Same curiosity.<br />A brighter<br />tomorrow.</p>
            </div>
          </div>
          <p className="contact__location">{personal.location} <span /></p>
        </section>
      </main>

      <AnimatePresence>
        {activeProject && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)}>
            <motion.article className="project-modal" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" onClick={() => setActiveProject(null)}>×</button>
              <p className="experience__eyebrow">{activeProject.category}</p>
              <h3>{activeProject.name}</h3>
              <p>{activeProject.description}</p>
              <h4>Problem</h4>
              <p>{activeProject.problem}</p>
              <h4>Solution</h4>
              <p>{activeProject.solution}</p>
              <div className="stack-row">{activeProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <ul>{activeProject.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a href={activeProject.repo} target="_blank" rel="noreferrer">GitHub ↗</a>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {displayedCertificate && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveCertificate(null)}>
            <motion.div className="certificate-modal" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" onClick={() => setActiveCertificate(null)}>×</button>
              <div className="certificate-frame-view">
                <iframe title={displayedCertificate.title} src={`./media/certificates/${encodeURIComponent(displayedCertificate.file)}`} />
              </div>
              <h3>{displayedCertificate.title}</h3>
              <p>{displayedCertificate.issuer} · {displayedCertificate.date}</p>
              <a href={`./media/certificates/${encodeURIComponent(displayedCertificate.file)}`} target="_blank" rel="noreferrer">Open original certificate</a>
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
