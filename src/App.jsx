import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin,
  Download, Menu, X, Code2, BrainCircuit, Database, Wrench,
  ExternalLink, Send, CheckCircle2, Award, GraduationCap, Sparkles,
  Moon, Sun, ChevronRight, Search, SlidersHorizontal, MousePointer2,
  Eye, GitBranch, Star, CalendarDays, Zap, Play, Settings2
} from "lucide-react";
import { profile, skills, projects, education, certificates } from "./data/content";

const navItems = ["Home", "About", "Projects", "Skills", "Certificates", "Contact"];

const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Problem Solver", "CSE Student"];

const projectCategories = {
  "Build AI": "AI/ML",
  "SMARTIQ": "Full Stack",
  "Amazon Clone": "Frontend"
};

function App() {
  const [menu, setMenu] = useState(false);
  const [light, setLight] = useState(false);
  const [cert, setCert] = useState(null);
  const [sent, setSent] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [projectFilter, setProjectFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({x: -100, y: -100});
  const [tilt, setTilt] = useState({x:0,y:0});

  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
  }, [light]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 950);
    const roleTimer = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2600);
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    const onMouse = e => setCursor({x:e.clientX, y:e.clientY});
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("mousemove", onMouse);
    onScroll();
    return () => {
      clearTimeout(timer);
      clearInterval(roleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const filteredProjects = projectFilter === "All"
    ? projects
    : projects.filter(p => projectCategories[p.title] === projectFilter);

  const handleTilt = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 8;
    const y = ((e.clientY - r.top) / r.height - .5) * -8;
    setTilt({x,y});
  };

  const scrollTo = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <>
      <AnimatePresence>
        {loading && <motion.div className="loader" initial={{opacity:1}} exit={{opacity:0}}>
          <div className="loader-logo">AK</div><div className="loader-line"><i/></div>
          <span>Loading portfolio...</span>
        </motion.div>}
      </AnimatePresence>
      <div className="cursor-dot" style={{left:cursor.x,top:cursor.y}} />
      <div className="scroll-progress"><i style={{width:`${progress}%`}} /></div>
    <div className="app">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />

      <header className="header">
        <nav className="nav container">
          <button className="logo" onClick={() => scrollTo("home")} aria-label="Go home">
            <span>AK</span><strong>Abhishek<span>.</span></strong>
          </button>

          <div className={`nav-links ${menu ? "open" : ""}`}>
            {navItems.map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>
            ))}
          </div>

          <div className="nav-right">
            <button className="icon-btn" onClick={() => setLight(!light)} aria-label="Toggle theme">
              {light ? <Moon size={17}/> : <Sun size={17}/>}
            </button>
            <button className="nav-contact" onClick={() => scrollTo("contact")}>
              Contact me <ArrowUpRight size={16}/>
            </button>
            <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
              {menu ? <X/> : <Menu/>}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero container">
          <div className="hero-content">
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="eyebrow">
              <i/> Hi! I'm Abhishek — Based in India
            </motion.div>

            <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
              Full Stack Developer<br/><em>& AI/ML Enthusiast.</em>
            </motion.h1>

            <motion.div className="typing-role" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}}>
              <span>I'm a </span><strong>{roles[roleIndex]}</strong><i/>
            </motion.div>
            <motion.p className="hero-copy" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}>
              I build modern, responsive web applications and turn ideas into
              clean, useful digital experiences.
            </motion.p>

            <motion.div className="hero-actions" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.35}}>
              <button className="primary" onClick={() => scrollTo("projects")}>
                View my work <ArrowUpRight size={18}/>
              </button>
              <button className="outline" onClick={() => scrollTo("contact")}>
                Let's talk <Mail size={17}/>
              </button>
              <button className="watch-btn" onClick={() => scrollTo("about")}><Play size={15}/> Explore portfolio</button>
              <a className="cv-btn" href="/cv.pdf" download="Abhishek-Kumar-CV.pdf">
                Download CV <Download size={17}/>
              </a>
            </motion.div>

            <div className="socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><Mail/></a>
              <a href={`tel:${profile.phone}`} aria-label="Phone"><Phone/></a>
            </div>
          </div>

          <motion.div className="hero-art" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:.8}}
            onMouseMove={handleTilt} onMouseLeave={() => setTilt({x:0,y:0})}
            style={{transform:`perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`}}>
            <div className="orbit orbit-one"><i/><i/><i/><i/></div>
            <div className="orbit orbit-two"><i/><i/><i/></div>
            <div className="orbit orbit-three"><i/><i/></div>
            <div className="energy energy-one"/>
            <div className="energy energy-two"/>
            <div className="ring ring-one"/><div className="ring ring-two"/>
            <div className="profile-frame">
              <img src="/assets/profile.webp" alt="Abhishek Kumar"/>
              <div className="image-glow"/>
            </div>
            <div className="float-card card-top"><Code2/><span><b>Full Stack</b><small>Developer</small></span></div>
            <div className="float-card card-bottom"><BrainCircuit/><span><b>AI & ML</b><small>Enthusiast</small></span></div>
            <div className="spark s1">✦</div><div className="spark s2">✦</div>
          </motion.div>
        </section>

        <section className="quick-stats container">
          <div><Zap/><b>02</b><span>Featured Projects</span></div>
          <div><Code2/><b>08+</b><span>Technologies</span></div>
          <div><Award/><b>02</b><span>NPTEL Certificates</span></div>
          <div><GraduationCap/><b>7.49</b><span>Current CGPA</span></div>
        </section>

        <section id="about" className="section container">
          <div className="section-tag">01 — About me</div>
          <div className="two-col">
            <h2>Building ideas into <em>reality.</em></h2>
            <div className="about-copy">
              <p className="lead">{profile.about}</p>
              <p>I am currently pursuing B.Tech in Computer Science & Engineering at Government Engineering College Khagaria, with a focus on AI & ML.</p>
              <div className="education-mini">
                <GraduationCap/><div><b>B.Tech CSE • AI & ML</b><span>Government Engineering College Khagaria</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section container">
          <div className="section-tag">02 — Selected work</div>
          <div className="section-title-row"><h2>Featured <em>Projects.</em></h2><span>{filteredProjects.length} PROJECTS</span></div>
          <div className="filter-bar">
            <div className="filter-label"><SlidersHorizontal size={15}/> Filter</div>
            {["All","Frontend","Full Stack","AI/ML"].map(f =>
              <button key={f} className={projectFilter === f ? "active" : ""} onClick={() => setProjectFilter(f)}>{f}</button>
            )}
          </div>
          <div className="project-grid">
            {filteredProjects.map((p, i) => (
              <motion.article className="project-card" key={p.title} whileHover={{y:-7}}>
                <div className="project-visual" style={{"--accent":p.accent}}>
                  <img className="project-screenshot" src={p.image} alt={`${p.title} project screenshot`}/>
                  <div className="project-image-overlay"/>
                  <div className="project-image-badge">VIEW PROJECT <ArrowUpRight size={13}/></div>
                  <strong>0{i+1}</strong>
                </div>
                <div className="project-body">
                  <span className="project-tag">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="chips">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                  <div className="project-links">
                    {p.github ? <a href={p.github} target="_blank" rel="noreferrer">GitHub <Github size={15}/></a> : <span className="no-live">GitHub soon</span>}
                    {p.live ? <a href={p.live} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15}/></a> : <span className="no-live">Live demo soon</span>}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="section container">
          <div className="section-tag">03 — Skills</div>
          <div className="two-col skill-heading">
            <h2>My technical <em>toolkit.</em></h2>
            <p>Technologies and tools I use to create functional, responsive and polished applications.</p>
          </div>
          <div className="skill-groups">
            {Object.entries(skills).map(([group, list], idx) => {
              const Icon = [Code2, Sparkles, Wrench, Database][idx];
              return <motion.div className="skill-group" key={group} whileHover={{y:-5}}>
                <div className="skill-icon"><Icon/></div>
                <h3>{group}</h3>
                <div className="skill-list">{list.map(s => <span key={s}>{s}</span>)}</div>
              </motion.div>
            })}
          </div>
        </section>

        <section id="certificates" className="section container">
          <div className="section-tag">04 — Certificates</div>
          <div className="section-title-row"><h2>Learning with <em>proof.</em></h2><span>02 NPTEL</span></div>
          <div className="cert-grid">
            {certificates.map((c) => (
              <motion.button className="cert-card" key={c.title} onClick={() => setCert(c)} whileHover={{y:-6}}>
                <div className="cert-image-wrap"><img src={c.image} alt={c.title}/><span>View certificate <ExternalLink size={14}/></span></div>
                <div className="cert-info">
                  <div><Award size={19}/><small>{c.issuer}</small></div>
                  <h3>{c.title}</h3>
                  <p>{c.period} <b>• {c.score}</b></p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="section-tag">05 — Education</div>
          <h2>My <em>journey.</em></h2>
          <div className="timeline">
            {education.map(e => <div className="timeline-row" key={e.year}>
              <span>{e.year}</span>
              <div><h3>{e.title}</h3><b>{e.place}</b><p>{e.detail}</p></div>
            </div>)}
          </div>
        </section>

        <section className="section container">
          <div className="section-tag">05 — Developer profile</div>
          <div className="github-panel">
            <div className="github-main">
              <div className="github-icon"><Github/></div>
              <div><span>OPEN SOURCE</span><h2>Let's connect on <em>GitHub.</em></h2><p>Explore my repositories, experiments and upcoming projects.</p></div>
            </div>
            <div className="github-stats">
              <div><GitBranch/><b>Public</b><span>Repositories</span></div>
              <div><Star/><b>Projects</b><span>To explore</span></div>
              <div><Eye/><b>Live</b><span>Portfolio</span></div>
            </div>
            <a className="primary github-button" href={profile.github} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={17}/></a>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <div className="section-tag">06 — Contact</div>
              <h2>Let's build<br/><em>something great.</em></h2>
              <p>Have a project idea, internship opportunity or collaboration in mind? Feel free to reach out.</p>
              <div className="contact-details">
                <a href={`mailto:${profile.email}`}><Mail/><span><small>Email</small>{profile.email}</span></a>
                <a href={`tel:${profile.phone}`}><Phone/><span><small>Phone</small>{profile.phone}</span></a>
                <div><MapPin/><span><small>Location</small>{profile.location}</span></div>
              </div>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <label>Name<input name="name" required placeholder="Your name"/></label>
              <label>Email<input name="email" required type="email" placeholder="your@email.com"/></label>
              <label>Message<textarea name="message" required rows="5" placeholder="Tell me about your project..."/></label>
              <button className="primary" type="submit">
                {sent ? <><CheckCircle2 size={18}/> Opening email...</> : <>Send message <Send size={17}/></>}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <button className="logo" onClick={() => scrollTo("home")}><span>AK</span><strong>Abhishek<span>.</span></strong></button>
        <p>Designed & built with passion • © 2026 Abhishek Kumar</p>
        <div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
      </footer>

      <button className="back-top" onClick={() => scrollTo("home")} aria-label="Back to top"><ArrowDown/></button>

      <AnimatePresence>
        {cert && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setCert(null)}>
          <motion.div className="cert-modal" initial={{scale:.9,y:20}} animate={{scale:1,y:0}} exit={{scale:.9,y:20}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setCert(null)} className="modal-close"><X/></button>
            <img src={cert.image} alt={cert.title}/>
            <div className="modal-bottom"><div><h3>{cert.title}</h3><p>{cert.issuer} • {cert.period} • {cert.score}</p></div><a href={cert.image} download><Download size={17}/> Save</a></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
    </>
  );
}

export default App;