import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Aperture, Camera, Check,
  Clapperboard, Code2, Command, Film, Layers3, Menu, Palette, Pencil,
  Plus, Send, Sparkles, Video, X, XCircle
} from "lucide-react";
import { projectsApi } from "./api.js";

const X_PROFILE_URL = import.meta.env.VITE_X_PROFILE_URL || "https://x.com/samucreatives";
const CONTACT_EMAIL = "sammuelssoneliseo@gmail.com";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function BrandMark() {
  return <Link className="brand-mark" to="/" aria-label="Samu Creatives home"><span className="brand-orbit"><Aperture size={17} /></span><span>SAMU<span className="brand-accent">.</span></span></Link>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="nav-shell glass-panel">
        <BrandMark />
        <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          <a href="/#work" onClick={close}>Work</a>
          <a href="/#services" onClick={close}>Services</a>
          <a href="/#about" onClick={close}>About</a>
          <a href="/#contact" onClick={close}>Contact</a>
          <a className="nav-x-link" href={X_PROFILE_URL} target="_blank" rel="noreferrer" onClick={close}><span className="x-mark">𝕏</span> X / Twitter <ArrowUpRight size={13} /></a>
        </nav>
        <a className="button button-small button-orange nav-cta" href="/#contact">Let's talk <ArrowUpRight size={15} /></a>
      </div>
    </header>
  );
}

const software = [
  { name: "Photoshop", short: "Ps", color: "ps", note: "Image craft" },
  { name: "Premiere Pro", short: "Pr", color: "pr", note: "Video editing" },
  { name: "After Effects", short: "Ae", color: "ae", note: "Motion design" },
  { name: "Illustrator", short: "Ai", color: "ai", note: "Graphic design" },
  { name: "Lightroom", short: "Lr", color: "lr", note: "Color stories" },
  { name: "CapCut", short: "", color: "capcut", note: "Short-form edits" }
];

function SoftwareGlyph({ app, compact = false }) {
  return <div className={`software-glyph ${app.color} ${compact ? "compact" : ""}`} title={app.name}>
    {app.color === "capcut" ? <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M12 17h12l24 26H36L12 17Z" /><path d="M48 17H36L12 43h12l24-26Z" /></svg> : <span>{app.short}</span>}
  </div>;
}

function HeroVisual() {
  return (
    <div className="hero-visual-wrap">
      <div className="hero-glow" />
      <div className="hero-visual glass-panel">
        <div className="visual-topline"><span className="micro-label">THE CREATIVE DESK</span><span className="live-indicator"><i /> AVAILABLE FOR PROJECTS</span></div>
        <div className="visual-art">
          <div className="art-ring ring-one" /><div className="art-ring ring-two" />
          <div className="art-core"><Aperture size={74} strokeWidth={1.15} /><span>SC</span></div>
          <div className="art-orbit-dot dot-one" /><div className="art-orbit-dot dot-two" />
          <span className="art-caption caption-left">VISUAL<br />STORYTELLING</span>
          <span className="art-caption caption-right">IDEA → IMPACT</span>
        </div>
        <div className="visual-footer"><div><span className="micro-label">INDEPENDENT CREATIVE</span><h3>Samu Creatives</h3></div><div className="visual-footer-mark"><ArrowUpRight size={20} /></div></div>
      </div>
      <div className="float-chip chip-camera glass-panel"><Camera size={16} /><span>FRAME THE FEELING</span></div>
      <div className="float-chip chip-edit glass-panel"><Clapperboard size={16} /><span>MAKE IT MOVE</span></div>
      <div className="software-cloud">
        <div className="cloud-icon cloud-ps"><SoftwareGlyph app={software[0]} /></div>
        <div className="cloud-icon cloud-pr"><SoftwareGlyph app={software[1]} /></div>
        <div className="cloud-icon cloud-ae"><SoftwareGlyph app={software[2]} /></div>
        <div className="cloud-icon cloud-cap"><SoftwareGlyph app={software[5]} /></div>
      </div>
    </div>
  );
}

function SectionEyebrow({ number, children }) {
  return <div className="section-eyebrow"><span>{number}</span><i />{children}</div>;
}

function ProjectArtwork({ project, index = 0 }) {
  const theme = project.coverTheme || ["orange", "blue", "violet", "teal"][index % 4];
  return (
    <div className={`project-artwork theme-${theme}`}>
      <div className="art-grid-lines" />
      <div className="artwork-orb" />
      <div className="artwork-frame">
        <span className="artwork-overline">SAMU / CREATIVE WORK</span>
        <strong>{project.title.split("—")[0].split("–")[0].trim()}</strong>
        <span className="artwork-bottom">{String(project.year || 2026)} <i /> VISUAL STUDY</span>
      </div>
      <span className="artwork-index">0{index + 1}</span>
      <span className="artwork-symbol">✳</span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <ProjectArtwork project={project} index={index} />
      <div className="project-card-meta"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div><span className="project-year">{project.year}</span></div>
      <p>{project.description}</p>
    </article>
  );
}

function ProjectsSection({ projects, loading, error }) {
  return (
    <section id="work" className="section work-section">
      <div className="section-heading-row"><div><SectionEyebrow number="01">SELECTED WORK</SectionEyebrow><h2>Made to <span className="text-gradient">make a mark.</span></h2></div><Link to="/studio" className="text-link">Manage projects <ArrowUpRight size={16} /></Link></div>
      {loading ? <div className="project-grid">{[1, 2, 3].map((item) => <div className="project-skeleton" key={item}><div /><span /><i /></div>)}</div> : error ? <div className="inline-state"><XCircle size={18} /> {error}</div> : projects.length ? <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div> : <div className="empty-projects glass-panel"><Layers3 size={28} /><h3>Your next great project goes here.</h3><p>Add your first portfolio piece in the Studio workspace.</p><Link to="/studio" className="button button-orange">Open Studio <ArrowRight size={16} /></Link></div>}
    </section>
  );
}

const services = [
  { icon: <Video />, id: "01", title: "Video editing & post", desc: "Story-led edits, clean pacing, color work, sound polish, and platform-ready exports." },
  { icon: <Film />, id: "02", title: "Filmmaking", desc: "Visual direction and thoughtful production that turn a good idea into a memorable frame." },
  { icon: <Palette />, id: "03", title: "Graphic design", desc: "Campaign graphics, identity assets, thumbnails, and digital visuals with a clear point of view." },
  { icon: <Command />, id: "04", title: "Virtual assistance", desc: "Creative admin, content organization, scheduling, and behind-the-scenes support." }
];

function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading-row"><div><SectionEyebrow number="02">WHAT I DO</SectionEyebrow><h2>One creative partner.<br /><span className="text-gradient">A whole toolkit.</span></h2></div><p className="section-intro">From the first rough idea to the final upload, I help make the creative process feel clear, considered, and collaborative.</p></div>
      <div className="services-grid">{services.map((service) => <article className="service-card glass-panel" key={service.id}><div className="service-card-top"><span className="service-icon">{service.icon}</span><span className="service-id">/{service.id}</span></div><h3>{service.title}</h3><p>{service.desc}</p><ArrowUpRight className="service-arrow" size={18} /></article>)}</div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="about-copy"><SectionEyebrow number="03">A LITTLE ABOUT ME</SectionEyebrow><div className="about-profile"><img className="about-portrait" src="/samu-portrait.jpg" alt="Portrait of Sammuelsson R. Eliseo" /><div className="profile-details"><h3>Sammuelsson R. Eliseo</h3><dl><div><dt>AGE</dt><dd>23 years old</dd></div><div><dt>DEGREE</dt><dd>Bachelor of Science in Information Technology</dd></div><div><dt>SCHOOL</dt><dd>Laguna State Polytechnic University - Siniloan Campus</dd></div></dl></div></div><h2>Creative by nature.<br /><span className="text-gradient">Intentional by design.</span></h2><p>I'm Samu — a freelance video editor, filmmaker, graphic designer, and virtual assistant. I move between visuals and the details behind them, bringing ideas to life while keeping the process organized.</p><p>I believe good creative work should do more than look good. It should communicate clearly, create a feeling, and give people something worth remembering.</p><a className="button button-glass" href={X_PROFILE_URL} target="_blank" rel="noreferrer"><span className="x-mark">𝕏</span> Follow my creative stream <ArrowUpRight size={15} /></a></div>
      <div className="toolkit-card glass-panel"><div className="toolkit-heading"><span className="micro-label">TOOLS OF THE TRADE</span><Sparkles size={18} /></div><h3>My creative stack<span className="brand-accent">.</span></h3><p>Different tools, one goal: make the idea work.</p><div className="software-grid">{software.map((app) => <div className="software-item" key={app.name}><SoftwareGlyph app={app} /><span>{app.name}</span><small>{app.note}</small></div>)}</div></div>
    </section>
  );
}

function XStreamSection() {
  return (
    <section className="section x-section">
      <div className="x-card glass-panel"><div className="x-card-orbit" /><div className="x-card-top"><span className="micro-label">THE OPEN TAB</span><span className="x-brand-large">𝕏</span></div><div className="x-card-content"><span className="x-kicker">THOUGHTS · PROCESS · WIP</span><h2>Follow the work<br />between the frames.</h2><p>My main social stream lives on X. Catch the behind-the-scenes, creative notes, works in progress, and things I'm learning along the way.</p><a className="button button-orange" href={X_PROFILE_URL} target="_blank" rel="noreferrer">Find me on X <ArrowUpRight size={16} /></a></div><div className="x-card-watermark">POST / CREATE / REPEAT</div></div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div><SectionEyebrow number="04">HAVE A PROJECT IN MIND?</SectionEyebrow><h2>Let's make<br /><span className="text-gradient">something matter.</span></h2><p className="contact-sub">Have a story to tell, a brand to build, or a creative task to hand off? Let's start with a conversation.</p><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL} <ArrowUpRight size={18} /></a><span className="contact-note">Your contact details are set and ready to use.</span></div>
      <div className="contact-side glass-panel"><span className="contact-side-icon"><Send size={21} /></span><span className="micro-label">YOUR NEXT IDEA STARTS HERE</span><h3>Open for select collaborations.</h3><p>Tell me a little about what you're building and I'll be in touch.</p><a href={X_PROFILE_URL} target="_blank" rel="noreferrer" className="button button-glass">Connect on X <ArrowUpRight size={15} /></a><div className="contact-availability"><i /> OPEN TO PROJECTS <span>·</span> REMOTE / WORLDWIDE</div></div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer"><BrandMark /><span>© {new Date().getFullYear()} SAMU CREATIVES. MADE WITH INTENTION.</span><div><a href={X_PROFILE_URL} target="_blank" rel="noreferrer">X / TWITTER <ArrowUpRight size={12} /></a><Link to="/studio">STUDIO <ArrowUpRight size={12} /></Link></div></footer>;
}

function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    projectsApi.list().then(setProjects).catch((err) => setError(`${err.message} — start the API and run the database setup.`)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="hero-section">
          <div className="hero-copy"><div className="availability-pill glass-panel"><i /> FREELANCE CREATIVE <span>·</span> AVAILABLE FOR SELECT PROJECTS</div><h1>Stories in<br />every <span className="text-gradient">frame.</span></h1><p className="hero-subtitle">I turn ideas into visuals that move people — through video, film, design, and the creative support that makes it all happen.</p><div className="hero-actions"><a href="#work" className="button button-orange">Explore my work <ArrowRight size={16} /></a><a href="#contact" className="button button-quiet">Start a project <ArrowUpRight size={16} /></a></div><div className="hero-footnote"><span className="scroll-cue"><ArrowDown size={14} /></span><span>SCROLL TO EXPLORE</span><span className="hero-footnote-line" /></div></div>
          <HeroVisual />
        </section>
        <div className="marquee-strip"><div className="marquee-track">{[0,1,2,3].map((item) => <span key={item}>VIDEO EDITING <b>✳</b> FILMMAKING <b>✳</b> GRAPHIC DESIGN <b>✳</b> VIRTUAL ASSISTANCE <b>✳</b></span>)}</div></div>
        <ProjectsSection projects={projects} loading={loading} error={error} />
        <ServicesSection />
        <AboutSection />
        <XStreamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

const emptyForm = { title: "", category: "VIDEO EDITING / FILMMAKING", description: "", year: new Date().getFullYear(), coverTheme: "blue", featured: false };

function ProjectForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || emptyForm);
  const [formError, setFormError] = useState("");
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault();
    setFormError("");
    try { await onSave({ ...form, year: Number(form.year) }); }
    catch (error) { setFormError(error.message); }
  };
  return (
    <form className="project-form" onSubmit={submit}>
      <label>Project title<input required minLength="2" maxLength="90" value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g. The Afterglow Film" /></label>
      <label>Category<input required value={form.category} onChange={(event) => update("category", event.target.value)} placeholder="VIDEO EDITING / FILMMAKING" /></label>
      <label className="form-full">Description<textarea required minLength="10" maxLength="500" rows="4" value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="What was the idea, approach, or outcome?" /></label>
      <div className="form-two-col"><label>Year<input type="number" min="2000" max="2100" required value={form.year} onChange={(event) => update("year", event.target.value)} /></label><label>Cover color<select value={form.coverTheme} onChange={(event) => update("coverTheme", event.target.value)}><option value="blue">Electric blue</option><option value="orange">Samu orange</option><option value="violet">Violet</option><option value="teal">Teal</option><option value="mono">Monochrome</option></select></label></div>
      <label className="featured-toggle"><input type="checkbox" checked={form.featured} onChange={(event) => update("featured", event.target.checked)} /><span>Feature this project on the homepage</span></label>
      {formError && <div className="form-error">{formError}</div>}
      <div className="form-actions"><button className="button button-quiet" type="button" onClick={onCancel}>Cancel</button><button className="button button-orange" type="submit" disabled={saving}>{saving ? "Saving…" : "Save project"} <Check size={15} /></button></div>
    </form>
  );
}

function StudioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [health, setHealth] = useState(null);

  const load = async () => {
    setError("");
    try {
      const [items, status] = await Promise.all([projectsApi.list(), projectsApi.health()]);
      setProjects(items);
      setHealth(status);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (project) => { setEditing(project); setModalOpen(true); };
  const closeModal = () => { if (!saving) setModalOpen(false); };
  const saveProject = async (data) => {
    setSaving(true);
    try {
      if (editing) await projectsApi.update(editing.id, data);
      else await projectsApi.create(data);
      setModalOpen(false);
      setToast(editing ? "Project updated successfully." : "Project added to your portfolio.");
      await load();
    } finally { setSaving(false); }
  };
  const deleteProject = async (project) => {
    const confirmed = window.confirm(`Delete “${project.title}”? This cannot be undone.`);
    if (!confirmed) return;
    try {
      await projectsApi.remove(project.id);
      setToast("Project deleted.");
      await load();
    } catch (err) { setError(err.message); }
  };
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="studio-page">
      <div className="studio-topbar"><BrandMark /><Link to="/" className="button button-glass"><ArrowUpRight size={15} /> View portfolio</Link></div>
      <main className="studio-main">
        <div className="studio-heading"><div><div className="section-eyebrow"><span>SC / STUDIO</span><i /> PROJECT MANAGEMENT</div><h1>Your creative<br /><span className="text-gradient">control room.</span></h1><p>Manage the work that appears on your Samu Creatives portfolio. Changes are saved to your local SQLite database through Prisma.</p></div><button className="button button-orange" onClick={openCreate}><Plus size={16} /> Add project</button></div>
        <div className="studio-stats"><div className="glass-panel stat-card"><span className="micro-label">TOTAL PROJECTS</span><strong>{projects.length.toString().padStart(2, "0")}</strong><span>Portfolio records</span></div><div className="glass-panel stat-card"><span className="micro-label">FEATURED</span><strong>{projects.filter((item) => item.featured).length.toString().padStart(2, "0")}</strong><span>Homepage highlights</span></div><div className="glass-panel stat-card"><span className="micro-label">DATABASE</span><strong className="stat-status"><i /> {health?.database === "connected" ? "LIVE" : "—"}</strong><span>{health?.database === "connected" ? "SQLite connection active" : "Checking connection"}</span></div></div>
        <div className="studio-list-header"><div><span className="micro-label">YOUR CONTENT</span><h2>Portfolio projects <span>({projects.length})</span></h2></div><span className="studio-list-hint"><Code2 size={14} /> Prisma ORM · SQLite</span></div>
        {error && <div className="studio-error"><XCircle size={18} /> {error} <button onClick={load}>Retry</button></div>}
        {loading ? <div className="studio-loading glass-panel">Loading your projects…</div> : projects.length ? <div className="studio-project-list">{projects.map((project, index) => <article className="studio-project-row glass-panel" key={project.id}><ProjectArtwork project={project} index={index} /><div className="studio-project-info"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="studio-project-tags"><span>{project.year}</span>{project.featured && <span className="featured-tag"><Sparkles size={11} /> Featured</span>}<span className="id-tag">ID / {project.id}</span></div></div><div className="studio-project-actions"><button className="icon-button" onClick={() => openEdit(project)} aria-label={`Edit ${project.title}`}><Pencil size={16} /></button><button className="icon-button danger" onClick={() => deleteProject(project)} aria-label={`Delete ${project.title}`}><XCircle size={16} /></button></div></article>)}</div> : <div className="empty-projects glass-panel"><Layers3 size={28} /><h3>No projects yet.</h3><p>Create your first project to populate the portfolio.</p><button className="button button-orange" onClick={openCreate}><Plus size={16} /> Add your first project</button></div>}
        <div className="crud-note glass-panel"><div className="crud-note-icon"><Code2 size={18} /></div><div><strong>CRUD operations are connected</strong><p>Create, read, update, and delete actions call the Express API. The API uses Prisma Client to write to <code>server/prisma/dev.db</code>, so project records persist between sessions.</p></div></div>
      </main>
      <footer className="studio-footer"><span>SAMU CREATIVES / STUDIO</span><Link to="/">BACK TO PORTFOLIO <ArrowUpRight size={12} /></Link></footer>
      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}><div className="project-modal glass-panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><div className="modal-heading"><div><span className="micro-label">{editing ? "EDIT RECORD" : "NEW RECORD"}</span><h2 id="project-modal-title">{editing ? "Refine this project." : "Add to the story."}</h2></div><button className="icon-button" onClick={closeModal} aria-label="Close form"><X size={18} /></button></div><ProjectForm key={editing?.id || "new"} initial={editing || emptyForm} onSave={saveProject} onCancel={closeModal} saving={saving} /></div></div>}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

export default function App() {
  return <><ScrollToTop /><Routes><Route path="/" element={<PortfolioPage />} /><Route path="/studio" element={<StudioPage />} /><Route path="*" element={<PortfolioPage />} /></Routes></>;
}
