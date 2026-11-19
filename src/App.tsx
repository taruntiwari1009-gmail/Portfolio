import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Sun, Moon, Play, Pause, SkipBack, SkipForward, Repeat, Volume2, Feather, Compass, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const journal = [
  { tag: '01 / Observation', title: 'The art of paying attention', text: 'Maybe wonder isn’t something we find. Maybe it’s something we practice.' },
  { tag: '02 / Thought', title: 'Making room for unfinished things', text: 'A small defence of experiments, loose ends, and not knowing yet.' },
  { tag: '03 / Question', title: 'A question for the road', text: 'What do we learn about ourselves in places where nobody knows our name?' },
];
const projects = [
  { name: 'Clarity OS', color: 'sand', desc: 'A quieter space for thoughts, plans, and the things that matter.', detail: 'A student-facing exploration to help make university and course decisions feel less overwhelming.', tech: 'Supabase · Serper · Firecrawl · OpenRouter', state: 'An evolving experiment' },
  { name: 'Thirdwheel', color: 'olive', desc: 'An idea about connection, conversations, and finding your people.', detail: 'A messaging product in progress, with attention to privacy, safety, reliability and the small details of being together online.', tech: 'React · Firebase · Product design', state: 'Work in progress' },
  { name: 'This little world', color: 'wine', desc: 'A room on the internet. A few things that make me, me.', detail: 'This personal website is a little home for ideas, projects, places and everything that does not fit neatly into a job title.', tech: 'React · TypeScript · CSS', state: 'Always changing' },
  { name: 'The unfinished drawer', color: 'sand', desc: 'Small experiments. Curious detours. Things that might become something.', detail: 'An open drawer for prototypes, notes, half-formed ideas and learning by making.', tech: 'Experiments & prototypes', state: 'Always in progress' },
];
const books = [
  { title: 'Sapiens', author: 'Yuval Noah Harari', color: 'sand' },
  { title: 'Clean Code', author: 'Robert C. Martin', color: 'olive' },
  { title: 'Dune', author: 'Frank Herbert', color: 'wine' },
  { title: 'The Alchemist', author: 'Paulo Coelho', color: 'gold' },
  { title: 'Meditations', author: 'Marcus Aurelius', color: 'plum' },
];
export default function App() {
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [activeProject, setActiveProject] = useState<typeof projects[number] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [travelTab, setTravelTab] = useState<'All places'|'Visited'|'Someday'>('All places');
  return <main className={theme === 'dark' ? 'room dark' : 'room light'}>
    <header className="room-header">
      <a className="monogram" href="#home" aria-label="Back home">T<span>/</span>T</a>
      <nav><a href="#journal">Journal</a><a href="#projects">Projects</a><a href="#letter">About</a></nav>
      <button className="theme-button" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? <Sun/> : <Moon/>}</button>
    </header>
    <section className="room-hero" id="home">
      <div className="scene-caption">A warm wooden desk, books and moon lamp beside a window overlooking the city at sunset</div>
      <div className="hero-content">
        <span className="handwritten hello">Hi, I'm</span>
        <h1>Tarun.</h1>
        <p className="hero-line">A builder, reader, dreamer —<br/>trying to make sense of this beautiful chaos.</p>
        <a className="wander-link" href="#journal"><span>✳</span> Explore my world</a>
      </div>
      <div className="music-player">
        <div className="track-head"><div className="album-art">♫</div><div><strong>Golden Hour</strong><small>Warm pads & guitar · Original ambience</small></div><span className="chevron">⌄</span></div>
        <div className="track-progress"><span>0:00</span><div className="progress-bar"><i/></div><span>0:00</span></div>
        <div className="player-controls"><button aria-label="Previous track"><SkipBack/></button><button className="play-button" onClick={()=>setPlaying(p=>!p)} aria-label={playing?'Pause':'Play'}>{playing?<Pause/>:<Play/>}</button><button aria-label="Next track"><SkipForward/></button><button aria-label="Repeat"><Repeat/></button><span className="controls-spacer"/><Volume2/><div className="volume-bar"><i/></div></div>
        <p>{playing ? 'Soundtrack controls are a visual placeholder.' : 'Paused · ready when you are'}</p>
      </div>
      <a href="#journal" className="scroll-hint handwritten">Scroll to explore <ArrowDown/></a>
    </section>
    <section className="journal-section" id="journal">
      <div className="section-kicker">01 / THE JOURNAL</div><h2>Things I think about.</h2><p className="handwritten section-subtitle">a few pages from the inside of my head</p>
      <div className="journal-photo-placeholder" aria-label="Notebook vignette"><div className="photo-label">NOTES FROM THE IN-BETWEEN</div><span className="scribble">✳</span><div className="notebook-lines"/></div>
      <div className="journal-layout"><div className="journal-intro"><Feather/><span>LOOSE THOUGHTS & LITTLE DISCOVERIES</span><h3>Not everything<br/>needs an answer.</h3><p>Some things just need a page.</p><i className="handwritten">notes to self, mostly.</i></div><div className="journal-list">{journal.map(j=><a href="#letter" className="journal-entry" key={j.tag}><span>{j.tag}</span><h3>{j.title}</h3><p>{j.text}</p><ArrowUpRight/></a>)}</div></div><div className="journal-footnote">Sample pages · waiting for my own words</div>
    </section>
    <section className="projects-section" id="projects"><div className="section-kicker">02 / THE WORKTABLE</div><h2>Things I make.</h2><p className="handwritten section-subtitle">ideas that escaped the notebook</p>
      <div className="paper-grid">{projects.map((p,i)=><button className={'paper '+p.color} key={p.name} onClick={()=>setActiveProject(p)}><span className="paper-label">FIELD NOTES / 0{i+1}</span><ArrowUpRight className="paper-arrow"/><h3>{p.name}</h3><p>{p.desc}</p><small>{p.tech}</small><span className="paper-state">• {p.state}</span></button>)}</div>
      <p className="handwritten projects-signoff">a work in progress, like most good things.</p>
    </section>
    <section className="travel-section" id="travel"><div className="section-kicker">03 / SOMEWHERE ELSE</div><h2>The world is a big place.</h2><p className="handwritten section-subtitle">places, possibilities & the spaces in between</p>
      <div className="travel-layout"><div className="map-panel"><span className="map-title">THE WORLD STILL UNFOLDING</span><svg viewBox="0 0 850 420" role="img" aria-label="Abstract map of the world"><g className="land"><path d="M90 90 L145 55 195 70 235 58 268 85 250 112 220 130 205 162 170 160 140 185 112 150 80 140Z"/><path d="M210 180 L250 195 270 235 250 270 235 325 205 350 185 320 180 270 160 220Z"/><path d="M360 70 L410 50 455 65 475 95 510 105 535 90 580 115 600 145 560 160 525 150 490 175 470 210 440 205 420 165 395 150 365 120Z"/><path d="M445 200 L480 220 490 255 475 295 455 330 430 305 420 265 410 230Z"/><path d="M565 170 L620 150 675 165 710 200 690 235 655 245 625 220 590 210Z"/><path d="M700 285 L735 270 765 295 745 330 710 325Z"/></g><path className="route" d="M220 112 Q385 30 465 125 T600 185"/><g className="map-pins"><circle cx="220" cy="112" r="7"/><circle cx="465" cy="125" r="7"/><circle cx="600" cy="185" r="7"/></g></svg><p className="handwritten map-caption">somewhere between here & someday</p></div>
      <div className="travel-copy"><div className="travel-tabs">{(['All places','Visited','Someday'] as const).map(t=><button className={travelTab===t?'active':''} onClick={()=>setTravelTab(t)} key={t}>{t}</button>)}</div><Compass/><small>A POSSIBLE SOMEDAY · SAMPLE</small><h3>{travelTab==='Visited'?'Delhi':travelTab==='Someday'?'Kyoto':'Kyoto'}</h3><p>{travelTab==='Visited'?'Familiar streets, small discoveries, and places worth returning to.':'Quiet gardens, old bookshops, and a long walk without a plan.'}</p><em className="handwritten">a little pin, a whole possibility.</em></div></div><div className="travel-footnote">An atlas of sample places — real journeys and memories to come.</div>
    </section>
    <section className="books-section" id="books"><div className="section-kicker">04 / THE BOOKSHELF</div><h2>Other worlds, between covers.</h2><p className="handwritten section-subtitle">some books stay long after the last page</p><div className="shelf-wrap"><div className="book-shelf">{books.map(b=><div className={'book '+b.color} key={b.title}><span className="book-star">✳</span><strong>{b.title}</strong><small>{b.author}</small></div>)}<div className="shelf-note handwritten">always room<br/>for one more.</div></div><div className="shelf-ledge"/></div><div className="books-footnote">A sample shelf, inspired by the room. Personal reading notes to be added.</div></section>
    <section className="letter-section" id="letter"><div className="section-kicker">05 / A NOTE FROM ME</div><h2>A person, not a profession.</h2><div className="letter-photo-placeholder">AN OPEN LETTER, LEFT ON THE DESK</div><div className="letter-body"><div><p className="handwritten letter-hello">Hello, stranger.</p><p>I'm Tarun. I like making things, asking questions, and following ideas a little further than I planned.</p><p>Technology, history, philosophy. Books, places, people. The world is too interesting to fit into one job title.</p></div><div><p>This is a little corner for all of it.</p><p>I'm glad you found your way here.</p><p className="handwritten signature">Tarun.</p></div></div></section>
    <footer className="room-footer"><span className="handwritten">still curious. still becoming.</span><a href="#home">Back to the room <ArrowUpRight/></a><small>© 2026 Tarun Tiwari</small></footer>
    <AnimatePresence>{activeProject&&<motion.div className="project-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActiveProject(null)}><motion.div className={'project-detail '+activeProject.color} initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} onClick={e=>e.stopPropagation()}><button className="detail-close" onClick={()=>setActiveProject(null)}><X/></button><span className="paper-label">FIELD NOTE</span><h3>{activeProject.name}</h3><p>{activeProject.detail}</p><small>{activeProject.tech}</small><span className="paper-state">• {activeProject.state}</span></motion.div></motion.div>}</AnimatePresence>
  </main>;
}
