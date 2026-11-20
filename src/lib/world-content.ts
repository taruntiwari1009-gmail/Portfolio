// ─── Journal entries ──────────────────────────────────────────────────────────
// These are placeholder entries. Replace with real writing when ready.
export const journalEntries = [
  {
    title: "The art of paying attention",
    category: "Observation",
    date: "01",
    excerpt: "Maybe wonder isn't something we find. Maybe it's something we practice.",
    body: "A cup cooling on a desk. Light moving slowly across a wall. A conversation that takes an unexpected turn. The ordinary world has a way of becoming extraordinary when we stop rushing past it.\n\nI've been trying to slow down lately — not in a productivity-guru way, but in the way you slow down when you realise the moment you're half-ignoring is actually interesting.\n\nWhat would change if we paid a little more attention?",
    sample: true,
  },
  {
    title: "Making room for unfinished things",
    category: "Thought",
    date: "02",
    excerpt: "A small defense of experiments, loose ends, and not knowing yet.",
    body: "Not every idea needs to become a product. Some are simply doors — useful because they open into another question, not because they close into an answer.\n\nI have a lot of unfinished things. Projects at fifty percent. Notes that go nowhere. Books I started and set down. For a while, that felt like failure. Now it mostly feels like evidence that I'm curious about more than I can hold at once.\n\nPerhaps an unfinished notebook is not evidence of failure. Perhaps it is evidence of curiosity.",
    sample: true,
  },
  {
    title: "A question for the road",
    category: "Question",
    date: "03",
    excerpt: "What do we learn about ourselves in places where nobody knows our name?",
    body: "There is something interesting about being a stranger. Without familiar routines, without the weight of expectations, even small things become discoveries.\n\nA different city. A different language. Food you don't recognise. The slight vertigo of not knowing where anything is yet.\n\nI keep thinking there's something worth writing here. This page is waiting for a real story from the road.",
    sample: true,
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    title: "Thirdwheel",
    number: "01",
    description: "A web chat app, rebuilt from the ground up with better design, reliability, and care.",
    technology: "Firebase · React · Auth · Messaging",
    status: "In development",
    detail:
      "Thirdwheel started as a simple chat application and evolved into something more considered — a space for real conversations.\n\nThe project has involved a full UI/UX redesign, iterative improvements to the messaging experience, authentication, account settings, privacy controls, moderation, and reliability. Each pull request has been a small commitment to making it better rather than just different.\n\nWhat I find interesting about this project isn't the technology — it's the process. Building something, seeing it fall short, understanding why, and improving it. That's what Thirdwheel represents to me.",
  },
  {
    title: "Clarity OS",
    number: "02",
    description: "Helping students find the right university without drowning in information.",
    technology: "Supabase · OpenRouter · Serper · Firecrawl",
    status: "Exploration",
    detail:
      "Choosing a university should not feel like navigating a maze.\n\nClarity OS is an exploration into making educational decisions clearer — surfacing relevant universities, courses, and opportunities in a way that's actually useful. The project has involved data gathering, AI-assisted workflows, search, information extraction, and decision support.\n\nThis is still a concept and a problem I'm thinking through. No invented users, no metrics, no announcements. Just a question worth exploring: how might better information change the choices people make about their education?",
  },
  {
    title: "Network Triggers",
    number: "03",
    description: "Using existing relationships to find new ones — a graph approach to healthcare outreach.",
    technology: "Network Science · Graph Theory · Analytics",
    status: "Research exploration",
    detail:
      "In pharmaceutical and healthcare environments, knowing who talks to whom matters.\n\nThis project explored how existing relationships between medical representatives and healthcare professionals — mapped as a network — could surface new outreach opportunities. By looking at centrality, connectivity, and the structure of professional relationships, it becomes possible to identify people who might be receptive simply because someone they trust already is.\n\nThe ideas here connect directly to my interest in network science and the application of mathematical concepts to real-world problems. The territory is richer than it first appears.",
  },
  {
    title: "Smart Cradle",
    number: "04",
    description: "A connected, sensor-driven cradle — hardware meets software in a tangible way.",
    technology: "Raspberry Pi · ESP32 · MQTT · Sensors",
    status: "Built",
    detail:
      "Sometimes the most interesting projects are the ones you can hold.\n\nThe smart cradle brought together a Raspberry Pi, an ESP32, various sensors, MQTT for messaging, and a database layer into a single connected system. The goal was to automate and monitor a physical device using a network of components that could communicate with each other.\n\nIt was a reminder that hardware is unforgiving in ways that software often isn't. When something breaks, it stays broken until you go and physically fix it. That accountability is clarifying.",
  },
  {
    title: "ETL & Pipeline Automation",
    number: "05",
    description: "Turning slow manual data workflows into reliable, automated pipelines.",
    technology: "Azure Data Factory · Azure Synapse · SQL · Cloud",
    status: "Delivered",
    detail:
      "Some of the most valuable work is the work you can't see once it's running.\n\nThis project involved automating data workflows that were previously manual, error-prone, and slow. Using cloud-based integration technologies, the goal was to make data move reliably from one place to another without someone having to do it by hand each time.\n\nThe work touched ETL pipelines, cloud platforms, SQL transformations, scheduling, and the particular satisfaction of watching a process run on its own for the first time. No client details or internal architecture shared — just the shape of the problem and the approach.",
  },
];

// ─── Atlas places ─────────────────────────────────────────────────────────────
// These are placeholder/sample places. Update with real visited locations and
// wishes when ready. Do NOT mark sample places as visited.
export const places = [
  {
    name: "India",
    coordinates: [78.9629, 20.5937] as [number, number],
    kind: "home",
    note: "Home. Where most of the story so far has happened.",
    label: "Home base",
  },
  {
    name: "Himalayas",
    coordinates: [80.0, 30.5] as [number, number],
    kind: "dream",
    note: "Wide peaks, cold air, and the kind of quiet you can only find at altitude.",
    label: "On the list",
  },
  {
    name: "Kyoto",
    coordinates: [135.77, 35.01] as [number, number],
    kind: "dream",
    note: "Quiet gardens, old bookshops, and a long walk without a plan.",
    label: "A possible someday",
  },
  {
    name: "Florence",
    coordinates: [11.25, 43.77] as [number, number],
    kind: "dream",
    note: "Art, architecture, and the kind of streets that invite you to get lost.",
    label: "A possible someday",
  },
  {
    name: "Iceland",
    coordinates: [-19, 64.9] as [number, number],
    kind: "dream",
    note: "Wide open landscapes. A sky worth staying up for.",
    label: "A possible someday",
  },
];

// ─── Bookshelf ────────────────────────────────────────────────────────────────
// Only books with plausible reading interest are listed here. Status and notes
// are placeholders — Tarun should update these with real reading history.
export const books = [
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    className: "book-paper",
    reflection:
      "One of those books that makes you stop and think about the stories we've collectively agreed to believe — money, nations, religion. Harari writes about humanity as if he's describing an alien species, and somehow that makes it feel more honest.",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    className: "book-forest",
    reflection:
      "A book about more than code. It's about the discipline of saying what you mean, clearly and without waste. Some of the specific advice has aged, but the underlying principle — that writing software is a craft — stays with you.",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    className: "book-wine",
    reflection:
      "Dense, slow, and completely worth it. Herbert builds a world that has ecology, politics, religion, and prophecy all tangled together. The desert is never just a desert.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    className: "book-gold",
    reflection:
      "Short and simple in the best way. It doesn't try to be more than it is. Sometimes a story about following a question is exactly what you need.",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    className: "book-plum",
    reflection:
      "A journal not meant for publication — which is exactly why it feels so honest. The emperor telling himself to be better, to focus, to stop caring what people think. Very human for a very long time ago.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    className: "book-teal",
    reflection:
      "Useful and provocative in equal measure. The idea that competition is for losers, and that the goal is to build something truly new, is worth sitting with even if you disagree with other parts of it.",
  },
];

// ─── Professional journey ─────────────────────────────────────────────────────
export const career = [
  {
    company: "Sanofi",
    role: "Visier Functional Expert Lead",
    period: "Mar 2026 – Present",
    summary:
      "Working on Visier implementation, security model design, Workday integrations, system optimisation, go-live support, and hypercare for a global pharmaceutical organisation.",
  },
  {
    company: "Deloitte Consulting India",
    role: "Associate Analyst",
    period: "Feb 2024 – Jan 2026",
    summary:
      "Worked across analytics, data, and enterprise systems in a consulting environment — solving a variety of technical and operational problems across different clients and domains.",
  },
  {
    company: "ProcDNA Analytics",
    role: "Associate Analyst",
    period: "Jul 2023 – Feb 2024",
    summary:
      "Early professional experience in analytics, data, and reporting in a specialised analytics organisation.",
  },
];