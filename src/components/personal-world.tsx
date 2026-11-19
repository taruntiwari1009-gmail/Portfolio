import { useState } from "react";
import { ArrowDown, ArrowUpRight, Asterisk, Menu, Moon, Play, SkipBack, SkipForward, Sun, X, BookOpen, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { WorldMap } from "@/components/world-map";
import { books, journalEntries, projects } from "@/lib/world-content";
import room from "@/assets/dusk-room.webp.asset.json";
import cover from "@/assets/dusk-cover.webp.asset.json";
import notebook from "@/assets/open-notebook.webp.asset.json";

type Detail = { title: string; subtitle: string; body: string };
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });

export function PersonalWorld() {
  const [night, setNight] = useState(false);
  const [menu, setMenu] = useState(false);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [track, setTrack] = useState(0);
  const [musicNote, setMusicNote] = useState(false);
  const tracks = [{ title: "The Nights", artist: "Avicii" }, { title: "Sunset Lover", artist: "Petit Biscuit" }, { title: "Bloom", artist: "The Paper Kites" }];
  const song = tracks[track];
  return <main className={`personal-world ${night ? "ambient-night" : ""}`}>
    <section className="room-scene" aria-label="Tarun's room at dusk">
      <img className="room-art" src={room.url} alt="A warm wooden desk, books and moon lamp beside a window overlooking the city at sunset" fetchPriority="high" />
      <div className="room-shade" />
      <header className="room-header">
        <Button variant="quiet" className="monogram" aria-label="Back to the room" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span>T<span className="logo-slash">/</span><span className="logo-second">T</span></span></Button>
        <nav aria-label="Main navigation" className={menu ? "room-nav mobile-open" : "room-nav"}>
          {['Journal', 'Projects', 'About'].map(label => <Button key={label} variant="quiet" onClick={() => { scrollTo(label.toLowerCase()); setMenu(false); }}>{label}</Button>)}
        </nav>
        <Button variant="quiet" size="icon" className="ambient-control" onClick={() => setNight(!night)} aria-label={night ? "Switch to dusk lighting" : "Switch to night lighting"} title={night ? "Dusk lighting" : "Night lighting"}>{night ? <Moon /> : <Sun />}</Button>
        <Button variant="quiet" size="icon" className="mobile-menu" onClick={() => setMenu(!menu)} aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu}>{menu ? <X/> : <Menu/>}</Button>
      </header>
      <div className="room-intro">
        <p className="greeting handwritten">Hi, I'm</p>
        <h1>Tarun.</h1>
        <p className="intro-subtitle">A builder, reader, dreamer —<br/>trying to make sense of this beautiful chaos.</p>
        <div className="explore-row"><Button variant="scene" onClick={() => scrollTo('journal')}><Asterisk strokeWidth={1}/><span>Explore my world</span></Button><span className="decorative-line" /></div>
      </div>
      <div className="music-player">
        <img src={cover.url} alt="Dusk sky playlist artwork" />
        <div className="music-info"><span>{song?.title}</span><small>{song?.artist}</small><div className="music-progress"><span/></div></div>
        <div className="music-controls"><Button variant="quiet" size="icon" aria-label="Previous track" onClick={() => {setTrack((track + tracks.length - 1) % tracks.length); setMusicNote(false);}}><SkipBack/></Button><Button variant="quiet" size="icon" aria-label="Play selected track" onClick={() => setMusicNote(!musicNote)}><Play/></Button><Button variant="quiet" size="icon" aria-label="Next track" onClick={() => {setTrack((track + 1) % tracks.length); setMusicNote(false);}}><SkipForward/></Button></div>
        {musicNote && <p className="music-note" role="status">A quiet moment. Audio hasn’t been added yet.</p>}
      </div>
      <Button variant="quiet" className="scroll-hint handwritten" onClick={() => scrollTo('journal')}>Scroll to explore<ArrowDown strokeWidth={1}/></Button>
    </section>

    <section id="journal" className="journal-section">
      <div className="section-heading"><span className="chapter-number">01 / THE JOURNAL</span><h2>Things I think about.</h2><p className="handwritten">a few pages from the inside of my head</p></div>
      <div className="notebook-scene">
        <img src={notebook.url} alt="An open notebook on the same wooden desk, with a pen, coffee and travel photographs" loading="lazy"/>
        <div className="notebook-left"><Feather size={22} strokeWidth={1}/><span className="eyebrow">LOOSE THOUGHTS & LITTLE DISCOVERIES</span><h3>Not everything <br/>needs an answer.</h3><p>Some things just need a page.</p><span className="handwritten">notes to self, mostly.</span></div>
        <div className="notebook-right">{journalEntries.map(entry => <Button key={entry.title} variant="artifact" className="journal-entry" onClick={() => setDetail({title:entry.title,subtitle:`${entry.category} · Sample journal entry`,body:entry.body})}><span className="entry-meta">{entry.date} / {entry.category}</span><span className="entry-title">{entry.title}</span><span className="entry-excerpt">{entry.excerpt}</span><ArrowUpRight size={16}/></Button>)}<small className="sample-note">Sample pages · waiting for my own words</small></div>
      </div>
    </section>

    <section id="projects" className="projects-section section-inner">
      <div className="section-heading"><span className="chapter-number">02 / THE WORKTABLE</span><h2>Things I make.</h2><p className="handwritten">ideas that escaped the notebook</p></div>
      <div className="project-artifacts">{projects.map(project => <Button key={project.title} variant="artifact" className={`project-artifact artifact-${project.number}`} onClick={() => setDetail({title:project.title,subtitle:`${project.status} / ${project.technology}`,body:project.detail})}><span className="artifact-top"><span>FIELD NOTES / {project.number}</span><ArrowUpRight size={23} strokeWidth={1}/></span><span className="project-name">{project.title}</span><span className="project-description">{project.description}</span><span className="project-tech">{project.technology}</span><span className="project-status"><span/>{project.status}</span></Button>)}</div>
      <p className="worktable-note handwritten">a work in progress. like most good things.</p>
    </section>

    <section id="atlas" className="atlas-section section-inner"><div className="section-heading"><span className="chapter-number">03 / SOMEWHERE ELSE</span><h2>The world is a big place.</h2><p className="handwritten">places, possibilities & the spaces in between</p></div><WorldMap/><p className="sample-note">An atlas of sample places — real journeys and memories to come.</p></section>

    <section id="bookshelf" className="bookshelf-section section-inner"><div className="section-heading"><span className="chapter-number">04 / THE BOOKSHELF</span><h2>Other worlds, between covers.</h2><p className="handwritten">some books stay long after the last page</p></div><div className="bookshelf">{books.map(book => <Button key={book.title} variant="artifact" className={`book-spine ${book.className}`} onClick={() => setDetail({title:book.title,subtitle:`${book.author} · Sample reflection / reading not confirmed`,body:book.reflection})}><span className="spine-decoration">✳</span><span className="book-title">{book.title}</span><span className="book-author">{book.author}</span></Button>)}<span className="shelf-end handwritten">always room<br/>for one more.</span></div><p className="sample-note">A sample shelf, inspired by the room. Personal reading notes to be added.</p></section>

    <section id="about" className="about-section"><div className="section-heading"><span className="chapter-number">05 / A NOTE FROM ME</span><h2>A person, not a profession.</h2></div><div className="letter-scene"><img src={notebook.url} alt="An open handwritten letter waiting on the evening desk" loading="lazy"/><div className="letter-content"><p className="handwritten">Hello, stranger.</p><p>I'm Tarun. I like making things, asking questions, and following ideas a little further than I planned.</p><p>Technology, history, philosophy. Books, places, people. The world is too interesting to fit into one job title.</p><p>This is a little corner for all of it.<br/>I'm glad you found your way here.</p><span className="handwritten signature">Tarun.</span></div></div></section>
    <footer className="world-footer"><span className="handwritten">still curious. still becoming.</span><Button variant="quiet" onClick={() => window.scrollTo({top:0,behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"})}>Back to the room <ArrowUpRight size={16}/></Button><small>© {new Date().getFullYear()} Tarun Tiwari</small></footer>
    <Dialog open={detail !== null} onOpenChange={open => {if(!open) setDetail(null);}}><DialogContent className="world-detail"><BookOpen size={25} strokeWidth={1}/><DialogTitle>{detail?.title}</DialogTitle><DialogDescription>{detail?.subtitle}</DialogDescription><div className="detail-prose">{detail?.body.split('\n\n').map((text,i) => <p key={i}>{text}</p>)}</div><span className="handwritten">a page from this little world.</span></DialogContent></Dialog>
  </main>;
}