import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Moon, Sun, Compass, X, Shuffle, Github, Mail } from 'lucide-react';

const places = [
 {id:'room',symbol:'⌂',name:'My little room',hint:'things I make',title:'A desk full of unfinished things.',text:'I work around data, technology and the systems people depend on. I like pulling apart complicated things until they make a little more sense.',items:['HCP Network Intelligence — finding meaningful connections in healthcare networks','Clarity OS — making university decisions feel less overwhelming','Thirdwheel — a chat app, and a lesson in building things people can trust','A connected cradle — hardware, sensors, and a surprisingly satisfying 20% improvement']},
 {id:'library',symbol:'▤',name:'The library',hint:'things I wonder about',title:'I have a weakness for rabbit holes.',text:'A question rarely stays a question for long. It grows legs, opens tabs, and suddenly it is midnight.',items:['Explainable AI & bias','Network science','History & public policy','How people, institutions and technology shape one another']},
 {id:'garden',symbol:'❋',name:'The garden',hint:'life outside screens',title:'More trees. More unplanned afternoons.',text:'Reading, travelling, volunteering, wandering, watching sport, collecting songs and having conversations that go somewhere unexpected.',items:['Books & Date with an Author','Chai & Chapters','Cricket, football, chess, badminton & racing','Volunteering and event chaos','Roads, mountains, greenery']},
 {id:'night',symbol:'☾',name:'After hours',hint:'the soundtrack',title:'The playlist has no genre discipline.',text:'Haryanvi to Punjabi, Bollywood to pop and hip-hop. Some songs are just little time machines.',items:['Haryanvi & Punjabi','Bollywood','Enrique, Rihanna, Maroon 5','Eminem, One Direction—and whatever comes next']},
 {id:'work',symbol:'↗',name:'A timeline',hint:'where I have been',title:'The work-shaped part of the story.',text:'A few years spent learning how data, teams, healthcare and large systems fit together.',items:['Sanofi · Visier Functional Expert Lead · 2026—','Deloitte Consulting · Associate Analyst · 2024—2026','ProcDNA Analytics · Associate Analyst · 2023—2024','BCA · 2023 · Delhi']}
];
const thoughts=['Somewhere, a book is quietly waiting to change your mind.','Not every detour is wasted time.','Build something small. Let it surprise you.','The world is bigger than your current browser tabs.','Go outside. Your ideas can come with you.','You are allowed to be a beginner more than once.','Make room for the things you haven’t discovered yet.'];
const stars=Array.from({length:34},(_,i)=>({left:(i*37+7)%100,top:(i*53+11)%90,delay:(i%7)*.35,size:i%3===0?3:2}));

export default function App(){
 const [active,setActive]=useState<string|null>(null);
 const [night,setNight]=useState(false);
 const [note,setNote]=useState(thoughts[0]);
 const [wander,setWander]=useState(0);
 const chosen=places.find(place=>place.id===active);
 const explore=()=>{
   const ids=places.map(place=>place.id);
   let next=Math.floor(Math.random()*ids.length);
   if(ids[next]===active) next=(next+1)%ids.length;
   setWander(value=>value+1);
   setActive(ids[next]);
 };
 const shuffleThought=()=>{
   let next=thoughts[Math.floor(Math.random()*thoughts.length)];
   if(next===note) next=thoughts[(thoughts.indexOf(next)+1)%thoughts.length];
   setNote(next);
 };
 return (
  <main className={night?'universe night':'universe'}>
   <header className="un-nav">
    <a href="#home" className="wordmark">tarun <span>somewhere on the internet</span></a>
    <div className="nav-right">
     <span className="location-tag">DELHI · PLANET EARTH</span>
     <button className="moon-toggle" onClick={()=>setNight(value=>!value)} aria-label="Toggle day and night">{night?<Sun/>:<Moon/>}</button>
    </div>
   </header>
   <section className="world" id="home">
    <div className="starfield">{stars.map((star,index)=><i key={index} style={{left:star.left+'%',top:star.top+'%',animationDelay:star.delay+'s',width:star.size,height:star.size}/>)}</div>
    <div className="world-intro">
     <p className="overline">A SMALL PLACE ON THE INTERNET</p>
     <h1>Hello, I'm Tarun.<br/><em>Welcome to my world.</em></h1>
     <p className="intro-text">A collection of work, wonder, half-formed ideas, favourite things and little corners of life. Nothing here is in a hurry.</p>
     <div className="hint"><span className="pulse"/> Try clicking around. There are things to find.</div>
    </div>
    <div className="planetarium" aria-label="Interactive illustrated world">
     <div className="sun-or-moon"/>
     <div className="orbit orbit-a"/>
     <div className="orbit orbit-b"/>
     <div className="planet planet-one"/>
     <div className="planet planet-two"/>
     <div className="world-hill hill-back"/>
     <div className="world-hill hill-mid"/>
     <div className="world-hill hill-front"/>
     <div className="little-house">
      <div className="roof"/>
      <div className="house-body"><div className="window"/><div className="door"/></div>
     </div>
     <div className="tree tree-one"><b/><i/><i/></div>
     <div className="tree tree-two"><b/><i/><i/></div>
     <div className="pathway"/>
     <div className="world-label">somewhere between<br/>curiosity &amp; calm</div>
     {places.map(place=>(
      <button key={place.id} className={'portal portal-'+place.id} onClick={()=>setActive(place.id)}>
       <span className="portal-icon">{place.symbol}</span><span className="portal-name">{place.name}</span><small>{place.hint}</small>
      </button>
     ))}
     <motion.div className="floating-paper" animate={{y:[0,-8,0],rotate:[3,5,3]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}>
      <span>NOTE / {String(wander+1).padStart(2,'0')}</span>
      <p>{note}</p>
      <button onClick={shuffleThought}><Shuffle size={13}/> shuffle thought</button>
     </motion.div>
    </div>
    <div className="world-foot">
     <span>✳ MADE OF MANY CURIOSITIES</span>
     <button onClick={explore}><Compass size={15}/> Take a random path</button>
     <span>SCROLL A LITTLE ↓</span>
    </div>
   </section>
   <section className="what-is-this">
    <p className="section-kicker">A NOTE BEFORE YOU WANDER</p>
    <h2>I'm not one thing.<br/><i>And that's kind of the point.</i></h2>
    <p>Data &amp; technology are part of my days. Books, history, music, sport, travel, people and questions fill the rest. This is less a biography and more a small map of the things that make me curious.</p>
    <div className="little-facts"><span>01 — BCA, 2023</span><span>02 — Delhi, India</span><span>03 — Always becoming</span></div>
   </section>
   <section className="wander-more">
    <p className="section-kicker">IF YOU'RE STILL HERE</p>
    <h2>Choose your own<br/><i>little adventure.</i></h2>
    <div className="destination-row">{places.map(place=><button key={place.id} onClick={()=>setActive(place.id)}><span>{place.symbol}</span>{place.name}<ArrowUpRight size={14}/></button>)}</div>
   </section>
   <footer className="un-footer">
    <div className="footer-spark">✳</div>
    <h2>Anyway, that's me.<br/><i>For now.</i></h2>
    <p>Have a book to recommend, a rabbit hole to share, or just feel like saying hello?</p>
    <a href="mailto:taruntiwari1009@gmail.com" className="hello-link"><Mail size={16}/> Write me a little note <ArrowUpRight size={15}/></a>
    <div className="footer-links">
     <a href="https://github.com/taruntiwari1009-gmail" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a>
     <span>MADE WITH CURIOSITY, IN DELHI</span>
     <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to orbit ↑</button>
    </div>
   </footer>
   <AnimatePresence>
    {chosen&&(
     <motion.div className="portal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}>
      <motion.article className="portal-window" initial={{y:35,scale:.97}} animate={{y:0,scale:1}} exit={{y:20,scale:.97}} onClick={event=>event.stopPropagation()}>
       <button className="window-close" onClick={()=>setActive(null)} aria-label="Close"><X/></button>
       <span className="window-symbol">{chosen.symbol}</span>
       <p className="section-kicker">{chosen.name} / TARUN'S WORLD</p>
       <h2>{chosen.title}</h2>
       <p className="window-text">{chosen.text}</p>
       <ul>{chosen.items.map(item=><li key={item}>{item}</li>)}</ul>
       <button className="window-wander" onClick={explore}><Compass size={15}/> Another path <ArrowUpRight size={14}/></button>
      </motion.article>
     </motion.div>
    )}
   </AnimatePresence>
  </main>
 );
}
