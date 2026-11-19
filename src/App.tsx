import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, BookOpen, Github, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Fade = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: .55, delay }}>
    {children}
  </motion.div>
);

const roles = [
  { dates: '2026 — NOW', company: 'Sanofi', role: 'Visier Functional Expert Lead', note: 'Working around workforce data, Visier security, Workday integrations, access governance, implementation changes and go-live support.' },
  { dates: '2024 — 2026', company: 'Deloitte Consulting India', role: 'Associate Analyst', note: 'Enterprise data, reporting, transformation and pharma-related workflows. A lot of learning by untangling how things connect.' },
  { dates: '2023 — 2024', company: 'ProcDNA Analytics', role: 'Associate Analyst', note: 'Pharma analytics, and an idea for helping medical representatives find new connections through HCP/KOL relationship networks.' },
];

const projects = [
  { title: 'HCP Network Intelligence', mood: 'project-lavender', aside: 'A graph, and a different way to find a way in.', story: 'Could existing relationships help someone discover a new healthcare professional to reach? I explored network centrality and connection patterns to surface possible introductions in pharma field engagement.', tools: 'Graph thinking · Pharma · Network centrality' },
  { title: 'A smarter cradle', mood: 'project-green', aside: 'A small hardware experiment with a big wiring diagram.', story: 'Raspberry Pi, ESP32, sensors, MQTT and a database came together in a connected cradle prototype. It explored monitoring and improved storage efficiency by around 20%.', tools: 'Raspberry Pi · ESP32 · MQTT · Sensors' },
  { title: 'Clarity OS', mood: 'project-pink', aside: 'Because choosing a university is a research project of its own.', story: 'A student-facing experiment to make university and course discovery less scattered. Supabase, search, web extraction and LLM synthesis help turn lots of information into a clearer comparison.', tools: 'Supabase · Search APIs · AI synthesis' },
  { title: 'Thirdwheel', mood: 'project-cream', aside: 'A college project that refused to stay just a college project.', story: 'A chat app that became an excuse to get deeper into product thinking: redesigning the interface, Firebase, message reliability, privacy, moderation and account safety.', tools: 'React · Firebase · Product design' },
];

const interests = [
  { label: 'BOOKS', title: 'Always one more chapter.', text: 'Reading, author conversations, Date with an Author, and the little book community idea called Chai & Chapters.' },
  { label: 'HISTORY / SOCIETY', title: 'The past is not past.', text: 'History, public policy, institutions and why people—and societies—do the things they do.' },
  { label: 'SPORT', title: 'No favourite. Depends who is playing.', text: 'Cricket, football, chess, badminton, racing and running. I can be both very invested and very bad at it.' },
  { label: 'TRAVEL / OUTSIDE', title: 'More trees, fewer notifications.', text: 'New places, solo itineraries, mountains, roads, wandering without a plan and getting some greenery in.' },
  { label: 'VOLUNTEERING', title: 'Show up and be useful.', text: 'PetFed, AI and sports events, community gatherings, backstage chaos and conversations with strangers.' },
  { label: 'MUSIC', title: 'The playlist makes no sense.', text: 'Haryanvi, Punjabi, Bollywood, pop, hip-hop. Some songs are just attached to a memory.' },
];

const curiosities = ['Explainable AI, and how to make models less of a black box', 'Network science and the shape of relationships', 'Bias, responsibility, governance and who gets affected', 'Technology, people, history and the things in between'];

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <main id="home" className="personal-home">
      <header className="personal-nav">
        <a href="#home" className="wordmark">tarun <span>on the internet</span></a>
        <nav className={open ? 'links show' : 'links'}>
          <a href="#me" onClick={() => setOpen(false)}>Me</a>
          <a href="#making" onClick={() => setOpen(false)}>Things I’ve made</a>
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#rabbit-holes" onClick={() => setOpen(false)}>Curiosity</a>
          <a href="#else" onClick={() => setOpen(false)}>Elsewhere</a>
        </nav>
        <a className="hello-link" href="mailto:taruntiwari1009@gmail.com">Say hi <ArrowUpRight size={15}/></a>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </header>

      <section className="personal-hero">
        <div className="hero-main">
          <p className="hero-location">DELHI, INDIA · CURRENTLY FIGURING IT OUT</p>
          <h1>Hi, I’m Tarun.<br/><span>My brain has<br/>a lot of tabs open.</span></h1>
          <p className="hero-desc">I work with data and technology. I read, overthink, build little things, get distracted by history, and occasionally plan a trip before I’ve finished the last one.</p>
          <a className="hero-scroll" href="#me">A little scroll, if you like <ArrowDown size={15}/></a>
        </div>
        <div className="hero-collage" aria-label="An illustrated landscape with a handwritten note">
          <div className="hero-sky"><div className="hero-sun"/><div className="hero-cloud cloud-a"/><div className="hero-cloud cloud-b"/><div className="hero-mountain mountain-a"/><div className="hero-mountain mountain-b"/><div className="hero-foreground"/></div>
          <div className="hero-paper"><small>NOTE TO SELF / 001</small><p>Keep asking.<br/>Keep making.<br/>Go outside<br/>once in a while.</p><span>— T</span></div>
          <span className="hero-sticker">curious<br/>by default ✳</span>
          <p className="hero-photo-note">A place with a little more green, please.</p>
        </div>
      </section>

      <section className="about-me" id="me">
        <div className="about-heading"><span>ABOUT, IN A FEW PARAGRAPHS</span><h2>Work is one thing.<br/>The rest is <i>also me.</i></h2></div>
        <div className="about-text">
          <p>I studied computer applications, which got me into programming, databases, systems and AI. Since then, I've wandered through analytics, consulting and enterprise data—often around healthcare, and the complicated systems behind the scenes.</p>
          <p>I like figuring out how things connect. Give me messy data, an unfamiliar platform, a workflow that isn't working or a question that doesn't have an obvious answer. I'll probably start poking at it. SQL and Python are familiar tools; so are dashboards, pipelines, integrations and a lot of googling the bit I don't know yet.</p>
          <p>Outside work, my interests don't really sit in one category. Books and history, AI and networks, sports, public policy, travel, music, volunteering. Some of it might become a project. Most of it is just because I like it.</p>
          <div className="handwritten-about">Not a niche. Just a person with many interests. ↗</div>
        </div>
      </section>

      <section className="making-section" id="making">
        <div className="making-top"><span>THE THINGS I’VE BEEN MAKING / THINKING ABOUT</span><h2>Little projects.<br/><i>Big rabbit holes.</i></h2><p>Some work, some experiments, some ideas that got a little out of hand.</p></div>
        <div className="making-grid">{projects.map((p, i) => <Fade delay={i * .06} key={p.title}><article className={'making-card '+p.mood}><div className="project-art"><span className="art-mark">{['↗','⌁','✳','◌'][i]}</span><span className="art-number">SIDE PROJECT / 0{i+1}</span></div><div className="making-copy"><span className="project-aside">{p.aside}</span><h3>{p.title}</h3><p>{p.story}</p><small>{p.tools}</small></div></article></Fade>)}</div>
      <div className="skills-in-sentence"><span>THINGS I GET TO WORK WITH</span><p>Python, SQL, pandas, Power BI, Tableau, Snowflake, Azure, Databricks, Visier, IICS, AWS, React, TypeScript, Supabase, Firebase, APIs, ML, NLP, forecasting, graph methods.</p><p className="skills-aside">Some I use at work. Some I’m learning. Some I built with at 2am and a stubborn amount of optimism.</p></div>
      </section>

      <section className="work-life" id="work">
        <div className="work-life-intro"><span>THE PAYING JOBS (AND WHAT THEY TAUGHT ME)</span><h2>A few chapters<br/>of the working life.</h2></div>
        <div className="work-life-list">{roles.map((r,i)=><Fade delay={i*.04} key={r.company}><article><time>{r.dates}</time><div><h3>{r.company}</h3><b>{r.role}</b><p>{r.note}</p></div></article></Fade>)}</div>
        <div className="work-life-foot"><span>THE TOOLBOX, SO FAR</span><p>Data analysis · ETL & pipelines · SQL · Python · BI · Cloud data platforms · Integrations · ML foundations · Product experiments</p><a href="mailto:taruntiwari1009@gmail.com?subject=Request%20for%20CV">CV available on request ↗</a></div>
      </section>

      <section className="rabbit-hole" id="rabbit-holes">
        <div className="rabbit-copy"><span>THINGS I CAN’T STOP READING ABOUT</span><h2>One question<br/>leads to <i>another.</i></h2><p>Some interests have stuck around long enough to become research directions. I'm especially drawn to explainable AI, bias and network science—how systems behave, how we understand them, and who they work for.</p><div className="scribble">the rabbit hole<br/>is the point</div></div>
        <div className="rabbit-list">{curiosities.map((c,i)=><div key={c}><span>{['✳','↗','⌁','◌'][i]}</span><p>{c}</p></div>)}</div>
        <div className="research-note"><BookOpen size={17}/><span>Current reading pile: AI, networks, history, behaviour and society.</span><i>It keeps growing.</i></div>
      </section>

      <section className="else-section" id="else">
        <div className="else-heading"><span>WHEN I CLOSE THE LAPTOP</span><h2>Other things<br/>that make me, <i>me.</i></h2><p>Not hobbies for a bio. Just things I enjoy, and would happily lose an afternoon to.</p></div>
        <div className="else-grid">{interests.map((it,i)=><article className={'else-card else-'+i} key={it.label}><span>{it.label}</span><h3>{it.title}</h3><p>{it.text}</p><small>{['✳','↗','⌁','◌','✳','↗'][i]}</small></article>)}</div>
        <p className="else-last">Recommend me a book, take me somewhere green, or tell me about a weird rabbit hole. I’m in.</p>
      </section>

      <footer className="personal-footer">
        <span>THAT’S ENOUGH INTERNET FOR TODAY.</span><h2>See you<br/><i>around.</i></h2><p>Want to talk about work, a project, books, or absolutely anything interesting?</p><a className="footer-email" href="mailto:taruntiwari1009@gmail.com">taruntiwari1009@gmail.com <ArrowUpRight/></a>
        <div className="personal-footer-bottom"><a href="https://github.com/taruntiwari1009-gmail" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a><a href="#home">Back up ↑</a><small>BUILT WITH CURIOSITY IN DELHI.</small></div>
      </footer>
    </main>
  );
}