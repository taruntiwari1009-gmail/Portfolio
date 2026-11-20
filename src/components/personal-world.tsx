import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  BookOpen,
  Briefcase,
  Feather,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { AmbientPlayer } from "@/components/ambient-player";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { WorldMap } from "@/components/world-map";
import { books, career, journalEntries, projects } from "@/lib/world-content";
import room from "@/assets/dusk-room.webp.asset.json";
import notebook from "@/assets/open-notebook.webp.asset.json";

type Detail = { title: string; subtitle: string; body: string };

const scrollTo = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });

// Nav links with their anchor IDs
const NAV_LINKS = [
  { label: "Journal", id: "journal" },
  { label: "Built", id: "projects" },
  { label: "Atlas", id: "atlas" },
  { label: "Bookshelf", id: "bookshelf" },
  { label: "About", id: "about" },
];

// Project accent colours keyed by number
const PROJECT_ACCENTS: Record<string, string> = {
  "01": "artifact-01",
  "02": "artifact-02",
  "03": "artifact-03",
  "04": "artifact-04",
  "05": "artifact-05",
};

export function PersonalWorld() {
  const [night, setNight] = useState(false);
  const [menu, setMenu] = useState(false);
  const [detail, setDetail] = useState<Detail | null>(null);

  return (
    <main className={`personal-world ${night ? "ambient-night" : ""}`}>
      {/* ── ROOM SCENE ───────────────────────────────────────────────────── */}
      <section className="room-scene" aria-label="Tarun's room at dusk">
        <img
          className="room-art"
          src={room.url}
          alt="A warm wooden desk, books and moon lamp beside a window overlooking the city at sunset"
          fetchPriority="high"
        />
        <div className="room-shade" />

        <header className="room-header">
          <Button
            variant="quiet"
            className="monogram"
            aria-label="Back to the top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <span>
              T<span className="logo-slash">/</span>
              <span className="logo-second">T</span>
            </span>
          </Button>

          <nav aria-label="Main navigation" className={menu ? "room-nav mobile-open" : "room-nav"}>
            {NAV_LINKS.map(({ label, id }) => (
              <Button
                key={id}
                variant="quiet"
                onClick={() => {
                  scrollTo(id);
                  setMenu(false);
                }}
              >
                {label}
              </Button>
            ))}
          </nav>

          <Button
            variant="quiet"
            size="icon"
            className="ambient-control"
            onClick={() => setNight(!night)}
            aria-label={night ? "Switch to dusk lighting" : "Switch to night lighting"}
            title={night ? "Dusk lighting" : "Night lighting"}
          >
            {night ? <Moon /> : <Sun />}
          </Button>

          <Button
            variant="quiet"
            size="icon"
            className="mobile-menu"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </header>

        <div className="room-intro">
          <p className="greeting handwritten">Hi, I'm</p>
          <h1>Tarun.</h1>
          <p className="intro-subtitle">
            A builder, reader, dreamer —<br />
            trying to make sense of this beautiful chaos.
          </p>
          <div className="explore-row">
            <Button variant="scene" onClick={() => scrollTo("journal")}>
              <Asterisk strokeWidth={1} />
              <span>Explore my world</span>
            </Button>
            <span className="decorative-line" />
          </div>
        </div>

        <AmbientPlayer />

        <Button
          variant="quiet"
          className="scroll-hint handwritten"
          onClick={() => scrollTo("journal")}
        >
          Scroll to explore
          <ArrowDown strokeWidth={1} />
        </Button>
      </section>

      {/* ── JOURNAL ──────────────────────────────────────────────────────── */}
      <section id="journal" className="journal-section">
        <div className="section-heading">
          <span className="chapter-number">01 / THE JOURNAL</span>
          <h2>Things I think about.</h2>
          <p className="handwritten">a few pages from the inside of my head</p>
        </div>
        <div className="notebook-scene">
          <img
            src={notebook.url}
            alt="An open notebook on the same wooden desk, with a pen, coffee and travel photographs"
            loading="lazy"
          />
          <div className="notebook-left">
            <Feather size={22} strokeWidth={1} />
            <span className="eyebrow">LOOSE THOUGHTS &amp; LITTLE DISCOVERIES</span>
            <h3>
              Not everything <br />
              needs an answer.
            </h3>
            <p>Some things just need a page.</p>
            <span className="handwritten">notes to self, mostly.</span>
          </div>
          <div className="notebook-right">
            {journalEntries.map((entry) => (
              <Button
                key={entry.title}
                variant="artifact"
                className="journal-entry"
                onClick={() =>
                  setDetail({
                    title: entry.title,
                    subtitle: `${entry.category} · Sample entry`,
                    body: entry.body,
                  })
                }
              >
                <span className="entry-meta">
                  {entry.date} / {entry.category}
                </span>
                <span className="entry-title">{entry.title}</span>
                <span className="entry-excerpt">{entry.excerpt}</span>
                <ArrowUpRight size={16} />
              </Button>
            ))}
            <small className="sample-note">Sample pages · waiting for my own words</small>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="projects-section section-inner">
        <div className="section-heading">
          <span className="chapter-number">02 / THE WORKTABLE</span>
          <h2>Things I make.</h2>
          <p className="handwritten">ideas that escaped the notebook</p>
        </div>
        <div className="project-artifacts">
          {projects.map((project) => (
            <Button
              key={project.title}
              variant="artifact"
              className={`project-artifact ${PROJECT_ACCENTS[project.number] ?? ""}`}
              onClick={() =>
                setDetail({
                  title: project.title,
                  subtitle: `${project.status} · ${project.technology}`,
                  body: project.detail,
                })
              }
            >
              <span className="artifact-top">
                <span>FIELD NOTES / {project.number}</span>
                <ArrowUpRight size={23} strokeWidth={1} />
              </span>
              <span className="project-name">{project.title}</span>
              <span className="project-description">{project.description}</span>
              <span className="project-tech">{project.technology}</span>
              <span className="project-status">
                <span />
                {project.status}
              </span>
            </Button>
          ))}
        </div>
        <p className="worktable-note handwritten">a work in progress. like most good things.</p>
      </section>

      {/* ── ATLAS ────────────────────────────────────────────────────────── */}
      <section id="atlas" className="atlas-section section-inner">
        <div className="section-heading">
          <span className="chapter-number">03 / SOMEWHERE ELSE</span>
          <h2>The world is a big place.</h2>
          <p className="handwritten">places, possibilities &amp; the spaces in between</p>
        </div>
        <WorldMap />
        <p className="sample-note">
          An atlas of possibilities — real journeys and memories to be added.
        </p>
      </section>

      {/* ── BOOKSHELF ────────────────────────────────────────────────────── */}
      <section id="bookshelf" className="bookshelf-section section-inner">
        <div className="section-heading">
          <span className="chapter-number">04 / THE BOOKSHELF</span>
          <h2>Other worlds, between covers.</h2>
          <p className="handwritten">some books stay long after the last page</p>
        </div>
        <div className="bookshelf">
          {books.map((book) => (
            <Button
              key={book.title}
              variant="artifact"
              className={`book-spine ${book.className}`}
              onClick={() =>
                setDetail({
                  title: book.title,
                  subtitle: book.author,
                  body: book.reflection,
                })
              }
            >
              <span className="spine-decoration">✳</span>
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
            </Button>
          ))}
          <span className="shelf-end handwritten">
            always room
            <br />
            for one more.
          </span>
        </div>
        <p className="sample-note">Personal reading notes · statuses to be updated over time.</p>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="about-section">
        <div className="section-heading">
          <span className="chapter-number">05 / A NOTE FROM ME</span>
          <h2>A person, not a profession.</h2>
        </div>

        {/* Letter */}
        <div className="letter-scene">
          <img
            src={notebook.url}
            alt="An open handwritten letter waiting on the evening desk"
            loading="lazy"
          />
          <div className="letter-content">
            <p className="handwritten">Hello, stranger.</p>
            <p>
              I'm Tarun. I work with data and technology — analytics, integrations, pipelines,
              enterprise systems, and the occasional interesting problem that doesn't quite fit into
              a category.
            </p>
            <p>
              But I'm also someone who reads, asks too many questions, follows ideas further than
              planned, and believes the world is too interesting to fit into one job title.
            </p>
            <p>
              Technology, history, books, music, travel, AI, research — this site is a little
              corner for all of it. Still being built. Still being figured out.
            </p>
            <p>
              I'm glad you found your way here.
              <br />
              Have a look around.
            </p>
            <span className="handwritten signature">Tarun.</span>
          </div>
        </div>

        {/* Career timeline */}
        <div className="career-section section-inner">
          <div className="career-heading">
            <Briefcase size={18} strokeWidth={1} />
            <span className="eyebrow">PROFESSIONAL JOURNEY</span>
          </div>
          <div className="career-timeline">
            {career.map((item, i) => (
              <div key={i} className="career-item">
                <div className="career-marker" />
                <div className="career-body">
                  <span className="career-period">{item.period}</span>
                  <h3 className="career-role">{item.role}</h3>
                  <span className="career-company">{item.company}</span>
                  <p className="career-summary">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="skills-cloud">
            <span className="eyebrow">TECHNOLOGIES &amp; TOOLS</span>
            <div className="skills-row">
              {[
                "Python",
                "SQL",
                "T-SQL",
                "PL/SQL",
                "Pandas",
                "Scikit-learn",
                "Power BI",
                "Tableau",
                "DAX",
                "Snowflake",
                "Azure",
                "Azure Data Factory",
                "Azure Synapse",
                "Databricks",
                "Visier",
                "ETL",
                "Machine Learning",
                "Git",
              ].map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="world-footer">
        <span className="handwritten">still curious. still becoming.</span>
        <Button
          variant="quiet"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          Back to the room <ArrowUpRight size={16} />
        </Button>
        <small>© {new Date().getFullYear()} Tarun Tiwari</small>
      </footer>

      {/* ── DETAIL MODAL ─────────────────────────────────────────────────── */}
      <Dialog open={detail !== null} onOpenChange={(open) => { if (!open) setDetail(null); }}>
        <DialogContent className="world-detail">
          <BookOpen size={25} strokeWidth={1} />
          <DialogTitle>{detail?.title}</DialogTitle>
          <DialogDescription>{detail?.subtitle}</DialogDescription>
          <div className="detail-prose">
            {detail?.body.split("\n\n").map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
          <span className="handwritten">a page from this little world.</span>
        </DialogContent>
      </Dialog>
    </main>
  );
}
