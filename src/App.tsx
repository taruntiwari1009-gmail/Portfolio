import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, BookOpen, Github, Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Fade = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-35px' }} transition={{ duration: .5, delay }}>
    {children}
  </motion.div>
);

const roles = [
  { dates: 'MAR 2026 — NOW', company: 'Sanofi', role: 'Visier Functional Expert Lead', note: 'Workforce intelligence, Visier security, Workday integrations, access governance, implementation changes and go-live support.' },
  { dates: 'FEB 2024 — JAN 2026', company: 'Deloitte Consulting India', role: 'Associate Analyst', note: 'Consulting and analytics work across enterprise data, reporting, transformation and pharma-related workflows.' },
  { dates: 'JUL 2023 — FEB 2024', company: 'ProcDNA Analytics', role: 'Associate Analyst', note: 'Pharma analytics—and an HCP/KOL network trigger concept built around existing relationships and network centrality.' },
];

const projects = [
  { no: '01', title: 'HCP Network Intelligence', kind: 'NETWORK SCIENCE / HEALTHCARE', story: 'What if a representative’s existing relationships could help them discover new connections? A graph-based approach to pharma field engagement: using existing HCP and KOL relationships, network centrality and connection patterns to surface possible introductions and new outreach paths.', tags: 'Graph thinking · Pharma · Network centrality' },
  { no: '02', title: 'A smarter cradle', kind: 'HARDWARE / IOT', story: 'A hardware prototype combining Raspberry Pi, ESP32, sensors, MQTT and a database. It explored connected monitoring and improved storage efficiency by around 20%.', tags: 'Raspberry Pi · ESP32 · MQTT · Sensors' },
  { no: '03', title: 'Clarity OS', kind: 'PRODUCT EXPERIMENT', story: 'A student decision-support product for university and course discovery. I brought together Supabase, search, web extraction and LLM-based synthesis to turn scattered information into a more useful comparison workflow.', tags: 'Supabase · APIs · AI research' },
  { no: '04', title: 'Thirdwheel', kind: 'BUILDING IN PUBLIC / WEB', story: 'A college chat-app project that grew into a serious product experiment: redesigning the interface, working with Firebase, improving messaging reliability and thinking through privacy, moderation and account safety.', tags: 'React · Firebase · Product design' },
];

const interests = [
  { label: 'BOOKS & PEOPLE', title: 'A good book can start a long conversation.', text: 'Reading, authors, the Date with an Author podcast idea, and Chai & Chapters Club—ways of making books feel social.' },
  { label: 'HISTORY & SOCIETY', title: 'The world didn’t begin with technology.', text: 'History, institutions, public policy and the forces that shape how people live together.' },
  { label: 'SPORTS', title: 'I have a hard time picking just one.', text: 'Cricket, football, chess, badminton, racing and running. Spectator, participant, beginner—depends on the day.' },
  { label: 'OUTSIDE', title: 'Give me a little greenery.', text: 'Travel, new cities, mountains, roads, solo itineraries and anywhere that feels a bit more alive than a screen.' },
  { label: 'VOLUNTEERING', title: 'Being part of things, not just passing by.', text: 'PetFed, AI events, sporting events and community gatherings—helping behind the scenes and meeting people.' },
  { label: 'MUSIC', title: 'A playlist with no single genre.', text: 'Haryanvi, Punjabi, Bollywood, pop, hip-hop, old favourites and songs that bring back a particular day.' },
];

const notes = ['Explainable AI & XAI', 'Network science & graph systems', 'Bias, responsible AI & governance', 'Technology, people & society'];

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <main id="home">
      <header className="journal-nav">
        <a href="#home" className="wordmark">tarun<span>’s little corner</span></a>
        <nav className={open ? 'links show' : 'links'}>
          <a href="#story" onClick={() => setOpen(false)}>Story</a>
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#capabilities" onClick={() => setOpen(false)}>What I do</a>
          <a href="#notes" onClick={() => setOpen(false)}>Notes</a>
          <a href="#life" onClick={() => setOpen(false)}>Life</a>
        </nav>
        <a className="hello-link" href="mailto:taruntiwari1009@gmail.com">Say hello <ArrowUpRight size={15}/></a>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </header>

      <section className="opening">
        <div className="opening-copy">
          <p className="eyebrow"><span className="dot"/> NEW DELHI, INDIA &nbsp;·&nbsp; 28°38′N</p>
          <h1>Hello, I’m Tarun.<br/><em>Still figuring<br/>things out.</em></h1>
          <p className="intro">I’m an analyst by profession, a curious generalist by nature. I work across data, technology and problem-solving—and outside the laptop, I’m usually reading, following a sport, planning a trip or chasing some new question.</p>
          <a className="down-link" href="#story">A little about me <ArrowDown size={15}/></a>
          <div className="hand-note">a work in progress, like most of us ↗</div>
        </div>
        <div className="opening-art" aria-label="Decorative journal collage">
          <div className="paper-photo"><div className="sun-shape"/><div className="hill hill-one"/><div className="hill hill-two"/><div className="tiny-tree tree-one"/><div className="tiny-tree tree-two"/></div>
          <div className="photo-caption">somewhere with more trees<br/>than notifications</div>
          <div className="booklet"><span>FIELD NOTES</span><b>Ideas, places<br/>and other<br/>things worth<br/>remembering.</b><small>VOL. 01 / 2026</small></div>
          <div className="sticker">curiosity<br/>club ✳</div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="section-label"><span>01</span> THE PERSON, NOT THE JOB TITLE</div>
        <div className="story-layout">
          <h2>Work is part<br/>of my story.<br/><i>Not all of it.</i></h2>
          <div className="story-body">
            <p>I studied computer applications, learning the fundamentals of programming, databases, systems and AI. That took me into analytics, consulting and data work—often around healthcare, information and the systems that quietly keep organisations moving.</p>
            <p>I can work with messy data, build and maintain data workflows, investigate problems using SQL and Python, make analysis understandable through dashboards, and navigate the platforms that connect business systems. I enjoy understanding how the pieces fit—not just finishing the ticket.

I’ve worked with healthcare and pharma data, built network-based ideas for discovering relationships between healthcare professionals, supported enterprise integrations and security models, and explored products of my own. I’m still expanding my depth, but I’m comfortable learning a new system and getting my hands dirty.</p>
            <p>That curiosity wanders. It also means my interests refuse to stay tidy: AI and network science one week, ancient history or public policy the next, then a side project that starts with an innocent question and gets out of hand.</p>
            <div className="signature-line">— a short version of a long story</div>
          </div>
        </div>
        <div className="small-facts">
          <div><span>STUDIED</span><b>Computer Applications</b><small>GGSIPU · 2023</small></div>
          <div><span>USUALLY THINKING ABOUT</span><b>Data, people & systems</b><small>And how they affect one another</small></div>
          <div><span>LOOKING AHEAD</span><b>Research & deeper questions</b><small>One step at a time</small></div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-label"><span>02</span> WORK & THE THINGS I MAKE</div>
        <div className="work-heading"><h2>A few things<br/>from the workbench.</h2><p>Projects, experiments, problems solved, problems that taught me something. Not a catalogue—more like notes from along the way.</p></div>
        <div className="project-list">
          {projects.map((p, i) => <Fade delay={i * .05} key={p.no}><article className="project-row"><span className="project-no">{p.no}</span><div className="project-main"><span className="project-kind">{p.kind}</span><h3>{p.title}</h3><p>{p.story}</p><span className="project-tags">{p.tags}</span></div><span className="project-arrow"><ArrowUpRight size={18}/></span></article></Fade>)}
        </div>
      </section>

      <section className="capabilities-section" id="capabilities">
        <div className="section-label"><span>03</span> WHAT I BRING TO THE TABLE</div>
        <div className="capability-intro"><h2>Things I know how to do.<br/><em>Things I’m still learning.</em></h2><p>Not a keyword dump. These are the tools, approaches and problem spaces I’ve actually spent time with—professionally, academically or by building things myself.</p></div>
        <div className="capability-grid">
          <article className="capability capability-data"><span>01 / DATA & ANALYTICS</span><h3>Make sense<br/>of the data.</h3><p>Explore, clean, transform, query and analyse data. Find patterns and turn them into something people can make decisions with.</p><div className="capability-tools">Python · Pandas · NumPy · SQL · Excel · Power BI · DAX · Tableau</div></article>
          <article className="capability capability-engineering"><span>02 / DATA ENGINEERING</span><h3>Make the pipeline<br/>work end-to-end.</h3><p>ETL workflows, data integrations, troubleshooting, automation and working across source systems, warehouses and downstream consumers.</p><div className="capability-tools">Snowflake · Azure · ADF · Databricks · IICS · AWS S3 · Git</div></article>
          <article className="capability capability-ai"><span>03 / AI & MACHINE LEARNING</span><h3>Experiment with<br/>intelligence.</h3><p>Feature engineering, model evaluation, regression, classification, clustering, forecasting, NLP—and understanding model behaviour rather than treating it as magic.</p><div className="capability-tools">Scikit-learn · SHAP · NLP · XAI · Forecasting</div></article>
          <article className="capability capability-product"><span>04 / PRODUCT & BUILDING</span><h3>Take an idea<br/>past the sketch.</h3><p>Prototype, shape a user flow, work with APIs and databases, iterate on interfaces and connect a technical idea to a real user problem.</p><div className="capability-tools">React · TypeScript · Supabase · Firebase · REST APIs</div></article>
        </div>
        <div className="capability-footnote">My strongest work lives at the intersection of data, systems, people and the questions worth asking.</div>
      </section>
      <section className="career-section" id="resume">
        <div className="section-label"><span>04</span> THE PROFESSIONAL CHAPTER</div>
        <div className="career-heading"><h2>Places I’ve<br/>learned things.</h2><p>Three roles so far, each in a different chapter. This is the resume part—without making you read it like a resume.</p></div>
        <div className="career-list">{roles.map((r, i) => <Fade delay={i * .04} key={r.company}><article className="career-row"><span className="career-date">{r.dates}</span><div><h3>{r.company}</h3><b>{r.role}</b><p>{r.note}</p></div><span className="career-index">0{i + 1}</span></article></Fade>)}</div>
        <div className="resume-strip"><span>THE PRACTICAL DETAILS</span><p>Python · SQL · Data pipelines · Analytics · Snowflake · Visier · Azure · Databricks · Power BI</p><a href="mailto:taruntiwari1009@gmail.com?subject=Request%20for%20CV">Ask me for my CV <ArrowUpRight size={14}/></a></div>
      </section>

      <section className="research-section" id="notes">
        <div className="section-label"><span>05</span> THINGS I KEEP WONDERING ABOUT</div>
        <div className="research-layout"><div><h2>The rabbit holes<br/>are part of it.</h2><p>Curiosity doesn't stay in one lane. These are the questions I keep coming back to, reading about, and would love to explore more seriously.</p><div className="note-doodle">why though?</div></div><div className="notes-list">{notes.map((n,i)=><div key={n}><span>0{i+1}</span><b>{n}</b><Sparkles size={14}/></div>)}</div></div>
        <div className="reading-card"><BookOpen size={18}/><span>On the reading pile: AI, networks, history, behaviour, society.</span><span className="reading-aside">the pile is never getting smaller</span></div>
      </section>

      <section className="life-section" id="life">
        <div className="section-label"><span>06</span> OUTSIDE THE TAB</div>
        <div className="life-heading"><h2>The other tabs<br/>in my brain.</h2><p>Not side quests, really. Just life. Things I care about that don't need to become productive.</p></div>
        <div className="life-grid">{interests.map((it,i)=><article className={'life-item life-'+i} key={it.label}><span>{it.label}</span><h3>{it.title}</h3><p>{it.text}</p><small>✳</small></article>)}</div>
        <div className="life-bottom-note">If there’s a good book, a green place, a game, or a new road—I’m probably interested.</div>
      </section>

      <footer className="journal-footer" id="contact">
        <div className="footer-kicker">THAT’S ME, FOR NOW.</div><h2>Still learning.<br/><em>Still becoming.</em></h2>
        <p>Have a thought, a book recommendation, an interesting opportunity, or just want to say hello?</p><a className="email" href="mailto:taruntiwari1009@gmail.com">taruntiwari1009@gmail.com <ArrowUpRight/></a>
        <div className="footer-links"><a href="https://github.com/taruntiwari1009-gmail" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href="#resume">Resume / experience</a><a href="#home">Back to the top ↑</a></div>
        <small className="footer-credit">MADE IN DELHI, WITH CURIOSITY & A LITTLE TOO MANY OPEN TABS.</small>
      </footer>
    </main>
  );
}
