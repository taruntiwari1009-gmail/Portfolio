import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, BookOpen, Compass, Github, Leaf, Menu, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Fade = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
);

const projects = [
  { title: 'HCP Network Intelligence', tag: 'NETWORKS / PHARMA', mark: '↗', tone: 'lavender', aside: 'People are connected. Data can show us how.', story: 'Could existing relationships help someone discover a new healthcare professional to reach? I explored network centrality and connection patterns to surface possible introductions in pharma field engagement.', details: 'The interesting part wasn’t just finding a node. It was understanding how influence and proximity move through a network—and what a connection might mean in the real world.', tools: 'Graph thinking · Pharma · Network centrality' },
  { title: 'A smarter cradle', tag: 'HARDWARE / IOT', mark: '⌁', tone: 'sage', aside: 'A small hardware experiment with a big wiring diagram.', story: 'Raspberry Pi, ESP32, sensors, MQTT and a database came together in a connected cradle prototype. It explored monitoring and improved storage efficiency by around 20%.', details: 'A reminder that software doesn’t always live on a screen. Sometimes it is wires, sensors, physical constraints, debugging, and making the pieces talk to each other.', tools: 'Raspberry Pi · ESP32 · MQTT · Sensors' },
  { title: 'Clarity OS', tag: 'EDUCATION / AI', mark: '✳', tone: 'rose', aside: 'Choosing a university is a research project of its own.', story: 'A student-facing experiment to make university and course discovery less scattered. Supabase, search, web extraction and LLM synthesis help turn lots of information into a clearer comparison.', details: 'The goal: make a complicated decision feel more navigable. Gather information, compare the things that matter, and give students a better starting point than a dozen browser tabs.', tools: 'Supabase · Search APIs · AI synthesis' },
  { title: 'Thirdwheel', tag: 'PRODUCT / IN PROGRESS', mark: '◌', tone: 'blue', aside: 'A college project that refused to stay just a college project.', story: 'A chat app that became an excuse to get deeper into product thinking: redesigning the interface, Firebase, message reliability, privacy, moderation and account safety.', details: 'Still evolving. A playground for learning that a good product is not just a pretty screen—it is reliability, edge cases, trust, accessibility and all the details users should never have to think about.', tools: 'React · Firebase · Product design' },
];

const thoughtList = [
  'A good question can be more useful than a quick answer.',
  'Somewhere, a book is quietly waiting to change your mind.',
  'Make room for the things you haven’t discovered yet.',
  'Not every detour is wasted time.',
  'Build something small. Let it surprise you.',
  'The world is bigger than your current browser tabs.',
  'Go outside. Your ideas can come with you.',
  'You are allowed to be a beginner more than once.'
];
const places = ['A quiet road lined with trees','Somewhere near the mountains','A city I haven’t learned the streets of yet','A little bookstore with no plan','A train window, going somewhere'];
const books = ['History, with all its messy footnotes','A novel someone pressed into my hands','A book about how systems and people work','Something I know nothing about yet'];
const interests = [
  { label: 'BOOKS & CONVERSATIONS', title: 'Always one more chapter.', text: 'Reading, author conversations, Date with an Author, and the little book community idea called Chai & Chapters.', symbol: '✳', color: 'note-lav' },
  { label: 'HISTORY / SOCIETY', title: 'The past is not past.', text: 'History, public policy, institutions and why people—and societies—do the things they do.', symbol: '↗', color: 'note-cream' },
  { label: 'SPORT', title: 'No favourite. Depends who is playing.', text: 'Cricket, football, chess, badminton, racing and running. I can be both very invested and very bad at it.', symbol: '⌁', color: 'note-green' },
  { label: 'TRAVEL / OUTSIDE', title: 'More trees, fewer notifications.', text: 'New places, solo itineraries, mountains, roads, wandering without a plan and getting some greenery in.', symbol: '◌', color: 'note-pink' },
  { label: 'VOLUNTEERING', title: 'Show up and be useful.', text: 'PetFed, AI and sports events, community gatherings, backstage chaos and conversations with strangers.', symbol: '✳', color: 'note-blue' },
  { label: 'MUSIC', title: 'The playlist makes no sense.', text: 'Haryanvi, Punjabi, Bollywood, pop, hip-hop. Some songs are just attached to a memory.', symbol: '♫', color: 'note-lav' },
];
const rabbitHoles = ['Explainable AI, and how to make models less of a black box','Network science and the shape of relationships','Bias, responsibility, governance and who gets affected','Technology, people, history and the things in between'];
const roles = [
  { dates: 'MAR 2026 — NOW', company: 'Sanofi', role: 'Visier Functional Expert Lead', note: 'Workforce data, Visier security, Workday integrations, access governance, implementation changes and go-live support.' },
  { dates: 'FEB 2024 — JAN 2026', company: 'Deloitte Consulting India', role: 'Associate Analyst', note: 'Enterprise data, reporting, transformation and pharma-related workflows. Learning by untangling how things connect.' },
  { dates: 'JUL 2023 — FEB 2024', company: 'ProcDNA Analytics', role: 'Associate Analyst', note: 'Pharma analytics, and an idea for helping medical representatives find new connections through HCP/KOL relationship networks.' },
];
function pickDifferent(current: number, length: number) { let next = Math.floor(Math.random() * length); if (length > 1 && next === current) next = (next + 1) % length; return next; }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [thought, setThought] = useState(-1);
  const [place, setPlace] = useState(-1);
  const [book, setBook] = useState(-1);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [planeMoved, setPlaneMoved] = useState(false);
  const [exploreCount, setExploreCount] = useState(0);
  const jumpToRandom = () => {
    const ids = ['projects', 'curiosities', 'little-life', 'work'];
    const target = ids[pickDifferent(exploreCount % ids.length, ids.length)];
    setExploreCount(c => c + 1);
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return <main id="top" className="internet-home">
    <header className="site-nav">
      <a className="site-mark" href="#top">tarun <span>on the internet</span></a>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {[['Projects','#projects'],['Curiosity','#curiosities'],['Work','#work'],['Life','#little-life']].map(([label,href])=><a key={label} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="nav-contact" href="mailto:taruntiwari1009@gmail.com">Say hello <ArrowUpRight size={15}/></a>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section className="opening-scene">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot"/> A PERSONAL INTERNET / DELHI, INDIA</div>
        <h1>I have a lot of<br/><em>tabs open.</em></h1>
        <p className="hero-lede">Some are about technology. Some are books, ideas, places, people. A few are just there because I got curious and forgot what I was looking for.</p>
        <a className="scroll-invite" href="#first-note">Come wander <ArrowDown size={16}/></a>
        <span className="hero-side-note">currently becoming<br/>someone, somewhere ↗</span>
      </div>
      <div className="hero-art" aria-label="A little illustrated landscape">
        <div className="landscape"><div className="sun"/><div className="cloud cloud-one"/><div className="cloud cloud-two"/><div className="ridge ridge-back"/><div className="ridge ridge-front"/><div className="meadow"/><div className="flower flower-one"/><div className="flower flower-two"/><div className="flower flower-three"/></div></div>
        <motion.button className="floating-note" whileHover={{ rotate: 0, scale: 1.04 }} initial={{rotate:4}} onClick={()=>setThought(pickDifferent(thought,thoughtList.length)} aria-label="Reveal a thought">
          <span>NOTE TO SELF / RANDOM</span><p>{thought === -1 ? <>Keep asking.<br/>Keep making.<br/>Go outside<br/>once in a while.</> : thoughtList[thought]}</p><small>— T ✳</small>
        </motion.button>
        <motion.button className="curious-sticker" animate={{rotate:[7,11,7]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} onClick={()=>setPlaneMoved(v=>!v)}>curious<br/>by default ✳</motion.button>
        <motion.div className="paper-plane" animate={{x:planeMoved?[70,-12,0]:[0,12,0],y:planeMoved?[-20,10,0]:[0,-6,0],rotate:planeMoved?[15,-5,0]:[0,4,0]}} transition={{duration:1.5}} onClick={()=>setPlaneMoved(v=>!v)} role="button" tabIndex={0} aria-label="Move the paper plane">✈</motion.div>
        <p className="art-caption">a place with a little more green, please</p>
      </div>
      <div className="hero-bottomline"><span>TECHNOLOGY, THOUGHTS & EVERYTHING ELSE</span><span>SCROLL AT YOUR OWN PACE ↓</span></div>
    </section>

    <section className="first-note" id="first-note">
      <div className="margin-label">A SMALL INTRODUCTION</div>
      <div className="intro-composition">
        <h2>Work is one thing.<br/>The rest is <i>also me.</i></h2>
        <div className="intro-prose"><p>I work with data and technology. I've wandered through analytics, consulting and enterprise systems—often around healthcare, and the complicated things happening behind the scenes.</p><p>I like figuring out how things connect. Give me messy data, an unfamiliar platform, a workflow that isn't working or a question without an obvious answer. I'll probably start poking at it.</p><p>Outside work, my interests don't sit in one category. Books and history, AI and networks, sports, public policy, travel, music, volunteering. Some of it might become a project. Most of it is simply because I like it.</p><span className="scribble-note">not a niche. just a person<br/>with many interests. ↗</span></div>
      </div>
      <div className="little-facts"><span><b>01</b> BCA · 2023</span><span><b>02</b> Delhi, India</span><span><b>03</b> Still learning, always</span></div>
    </section>

    <section className="project-world" id="projects">
      <div className="section-top"><div><span className="margin-label">01 / THINGS MADE, OR MAKING</span><h2>Ideas tend to<br/><i>get out of hand.</i></h2></div><p>Some work, some experiments, some ideas that began with “what if?” and kept going.</p></div>
      <div className="project-list">{projects.map((p,i)=><article className={'project-piece tone-'+p.tone} key={p.title}>
        <div className="project-visual" aria-hidden="true"><span className="project-glyph">{p.mark}</span><span className="project-stamp">EXPERIMENT / 0{i+1}</span>{i===0&&<div className="mini-network"><i/><i/><i/><i/><i/><i/></div>}{i===1&&<div className="hardware-shape"><span/><b>ESP</b></div>}{i===2&&<div className="search-scribble">find<br/>your<br/>way ↗</div>}{i===3&&<div className="chat-scribble"><span>hey!</span><b>...</b></div>}</div>
        <div className="project-copy"><span className="project-category">{p.tag}</span><h3>{p.title}</h3><p className="project-aside">{p.aside}</p><p className="project-description">{p.story}</p><span className="project-tools">{p.tools}</span><button className="project-more" aria-expanded={openProject===i} onClick={()=>setOpenProject(openProject===i?null:i)}>{openProject===i?'Close the note':'A little more about it'} {openProject===i?<ArrowLeft size={14}/>:<ArrowUpRight size={14}/>}</button><AnimatePresence>{openProject===i&&<motion.div className="project-extra" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><p>{p.details}</p></motion.div>}</AnimatePresence></div>
      </article>)}</div>
      <p className="project-closing">There are more ideas in the notebook. These made it out into the world. <span>For now.</span></p>
    </section>

    <section className="work-thread" id="work">
      <div className="work-heading"><div><span className="margin-label">02 / THE DAY JOB</span><h2>Work, and what<br/>it <i>taught me.</i></h2></div><p>Analytics, consulting, data systems, pharma, people and the occasional production problem.</p></div>
      <div className="work-list">{roles.map((r,i)=><motion.article key={r.company} className="work-entry" initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.55,delay:i*.08}}><span className="work-date">{r.dates}</span><div><h3>{r.company}</h3><b>{r.role}</b><p>{r.note}</p></div><span className="work-index">0{i+1}</span></motion.article>)}</div>
      <div className="tool-note"><span>TOOLS I GET TO WORK WITH</span><p>Python, SQL, pandas, Power BI, Tableau, Snowflake, Azure, Databricks, Visier, IICS, AWS, React, TypeScript, Supabase, Firebase, APIs, ML, NLP, forecasting, graph methods.</p><small>Some I use at work. Some I’m learning. Some I built with at 2am and a stubborn amount of optimism.</small><a href="mailto:taruntiwari1009@gmail.com?subject=Request%20for%20CV">CV available on request ↗</a></div>
    </section>

    <section className="curiosity-garden" id="curiosities">
      <div className="curiosity-layout"><div className="curiosity-intro"><span className="margin-label">03 / THINGS I KEEP THINKING ABOUT</span><h2>One question<br/>leads to <i>another.</i></h2><p>Some interests stick around long enough to become research directions. I'm especially drawn to explainable AI, bias and network science—how systems behave, how we understand them, and who they work for.</p><div className="garden-doodle">follow the<br/>question ✳</div></div><div className="curiosity-list">{rabbitHoles.map((q,i)=><a key={q} href="mailto:taruntiwari1009@gmail.com?subject=Let's%20talk%20about%20curiosity" className="curiosity-item"><span>{['✳','↗','⌁','◌'][i]}</span><p>{q}</p><ArrowUpRight size={16}/></a>)}</div></div>
      <div className="book-note"><BookOpen size={17}/><span>Reading pile: AI, networks, history, behaviour and society.</span><i>It keeps growing.</i></div>
    </section>

    <section className="life-collage" id="little-life">
      <div className="life-heading"><div><span className="margin-label">04 / WHEN I CLOSE THE LAPTOP</span><h2>Other things<br/>that make me, <i>me.</i></h2></div><p>Not hobbies for a bio. Just things I enjoy, and would happily lose an afternoon to.</p></div>
      <div className="interest-wall">{interests.map((item,i)=><motion.article key={item.label} className={'interest-note '+item.color} whileHover={{y:-5,rotate:i%2===0?1:-1}}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><small>{item.symbol}</small></motion.article>)}</div>
      <p className="life-last">Recommend me a book, take me somewhere green, or tell me about a weird rabbit hole. I'm in.</p>
    </section>

    <section className="playground" id="play">
      <span className="margin-label">05 / A TINY PLAYGROUND</span><h2>Go on. Pick<br/><i>something random.</i></h2><p>For absolutely no productive reason.</p>
      <div className="play-actions"><button onClick={()=>setThought(pickDifferent(thought,thoughtList.length))}><Sparkles/> A thought</button><button onClick={()=>setPlace(pickDifferent(place,places.length))}><Compass/> A place</button><button onClick={()=>setBook(pickDifferent(book,books.length))}><BookOpen/> A book</button><button onClick={jumpToRandom}><ArrowRight/> Wander</button></div>
      <div className="random-reveal" aria-live="polite"><AnimatePresence mode="wait">{thought>=0&&<motion.p key={'t'+thought} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><span>THOUGHT //</span>{thoughtList[thought]}</motion.p>}{place>=0&&<motion.p key={'p'+place} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><span>GO SOMEWHERE //</span>{places[place]}</motion.p>}{book>=0&&<motion.p key={'b'+book} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><span>READ SOMETHING //</span>{books[book]}</motion.p>}</AnimatePresence></div>
</section>

    <footer className="closing-scene">
      <div className="footer-sky"><div className="footer-sun"/><div className="footer-hill hill-a"/><div className="footer-hill hill-b"/><div className="footer-hill hill-c"/></div>
      <div className="closing-copy"><span className="margin-label">THAT'S ENOUGH INTERNET FOR TODAY</span><h2>Still <i>becoming.</i></h2><p>I haven't figured out exactly where I'm going. I just know I want to build interesting things, ask better questions, see more of the world and keep a few doors open.</p><a className="email-link" href="mailto:taruntiwari1009@gmail.com">Say hello, if you like <ArrowUpRight/></a></div>
      <div className="footer-bottom"><a href="https://github.com/taruntiwari1009-gmail" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to the beginning ↑</button><span>MADE WITH CURIOSITY · DELHI, INDIA</span></div>
    </footer>
  </main>;
}
