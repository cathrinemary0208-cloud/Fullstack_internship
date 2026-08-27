import React, { useState, useMemo } from "react";
import {
  Search, ArrowRight, Star, MapPin, Menu, X, User, LogOut,
  Sparkles, CheckCircle2, Clock, ArrowLeftRight, Mail, Lock, Eye, EyeOff
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const TRADES = [
  { id: 1, offer: "Spanish Conversation", seek: "Home Baking", offerer: "Lucia", location: "Remote", rating: 4.9, swaps: 6, blurb: "Native speaker, casual weekly practice, in exchange for sourdough basics.", tags: ["Language", "Food"] },
  { id: 2, offer: "Python Basics", seek: "Photography", offerer: "Owen", location: "Austin, TX", rating: 4.7, swaps: 3, blurb: "Beginner-friendly coding lessons for portrait photography tips.", tags: ["Tech", "Creative"] },
  { id: 3, offer: "Yoga Sessions", seek: "Resume Editing", offerer: "Sana", location: "Remote", rating: 5.0, swaps: 11, blurb: "Weekly beginner yoga for help polishing a job application.", tags: ["Wellness", "Career"] },
  { id: 4, offer: "Woodworking", seek: "Video Editing", offerer: "Marcus", location: "Portland, OR", rating: 4.8, swaps: 4, blurb: "Basic furniture-building for help editing a YouTube channel.", tags: ["Craft", "Tech"] },
  { id: 5, offer: "Piano", seek: "Public Speaking", offerer: "Ines", location: "Remote", rating: 4.6, swaps: 2, blurb: "Intro piano lessons for coaching on presentations and interviews.", tags: ["Music", "Career"] },
  { id: 6, offer: "Gardening", seek: "Budgeting", offerer: "Priya", location: "Pune, IN", rating: 4.9, swaps: 8, blurb: "Growing vegetables at home for help building a monthly budget.", tags: ["Home", "Finance"] },
  { id: 7, offer: "Guitar Lessons", seek: "Excel & Spreadsheets", offerer: "Maria", location: "Remote", rating: 4.9, swaps: 3, blurb: "Chords to campfire songs in exchange for spreadsheet basics.", tags: ["Music", "Tech"] },
  { id: 8, offer: "Logo Design", seek: "Guitar Lessons", offerer: "Devon", location: "Austin, TX", rating: 4.8, swaps: 5, blurb: "Simple brand marks for a few guitar lessons in return.", tags: ["Creative", "Music"] },
  { id: 9, offer: "Car Maintenance", seek: "Baking Lessons", offerer: "Raj", location: "Pune, IN", rating: 4.7, swaps: 7, blurb: "Oil changes and basics for warm bread and pastry know-how.", tags: ["Home", "Food"] },
];

const CATEGORIES = ["All", "Language", "Food", "Tech", "Creative", "Wellness", "Career", "Craft", "Music", "Home", "Finance"];

const TESTIMONIALS = [
  { quote: "I taught someone conversational French and walked away with a working budget spreadsheet I still use.", who: "Amara, Lagos" },
  { quote: "Traded three guitar lessons for a logo design. Fair, simple, and neither of us spent a cent.", who: "Devon, Austin" },
  { quote: "My neighbor taught me basic car maintenance in exchange for baking lessons. Now we trade every month.", who: "Priya, Pune" },
];

const MY_TICKETS = [
  { id: 101, offer: "Guitar Lessons", seek: "Excel Basics", status: "Open", swaps: 3 },
  { id: 102, offer: "Songwriting Feedback", seek: "Website Copy", status: "Matched", swaps: 1 },
];

const MY_MATCHES = [
  { name: "Owen", offer: "Excel Basics", seek: "Guitar Lessons", stage: "Awaiting reply" },
  { name: "Fatima", offer: "Website Copy", seek: "Songwriting Feedback", stage: "Session scheduled" },
];

const AVATAR_COLORS = ["var(--sage)", "var(--clay)", "var(--mustard)"];

function initials(name) {
  return name.slice(0, 2).toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  SHARED UI                                                          */
/* ------------------------------------------------------------------ */

function Avatar({ name, idx = 0, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: AVATAR_COLORS[idx % AVATAR_COLORS.length],
        border: "2px solid var(--ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Fraunces', serif",
        fontWeight: 700,
        color: "var(--paper)",
        fontSize: size * 0.36,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}

function TicketCard({ trade, idx }) {
  return (
    <div className="cat-ticket">
      <div className="cat-ticket-top">
        <Avatar name={trade.offerer} idx={idx} size={38} />
        <div>
          <div className="cat-ticket-name">{trade.offerer}</div>
          <div className="cat-ticket-loc"><MapPin size={11} strokeWidth={2.5} /> {trade.location}</div>
        </div>
        <div className="cat-ticket-rating"><Star size={13} fill="var(--mustard)" strokeWidth={0} /> {trade.rating}</div>
      </div>
      <div className="swap-line">
        <span className="tag offer">Offers</span>
        <span className="swap-item">{trade.offer}</span>
      </div>
      <div className="swap-line">
        <span className="tag seek">Seeks</span>
        <span className="swap-item">{trade.seek}</span>
      </div>
      <p className="cat-ticket-blurb">{trade.blurb}</p>
      <div className="cat-ticket-foot">
        <div className="chip-row">
          {trade.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <span className="swaps-count">{trade.swaps} swaps completed</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGES                                                               */
/* ------------------------------------------------------------------ */

function HomePage({ go }) {
  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow"><Sparkles size={13} strokeWidth={2.5} /> No money changes hands</div>
          <h1>Trade what you <em>know</em> for what you <em>need</em>.</h1>
          <p>Post a skill you can teach, find someone who can teach you something back, and swap — no fees, no subscriptions, just an even trade.</p>
          <div className="hero-actions">
            <button className="btn" onClick={() => go("post")}>Post a skill</button>
            <button className="btn btn-outline" onClick={() => go("browse")}>Browse trades</button>
          </div>
          <div className="hero-stats">
            <div><strong>2,480</strong><span>skills traded</span></div>
            <div><strong>640</strong><span>active tickets</span></div>
            <div><strong>4.8★</strong><span>avg. swap rating</span></div>
          </div>
        </div>

        <div className="ticket ticket-hero">
          <div className="ticket-row"><span>Ticket #0142</span><span>Open</span></div>
          <h3>Maria offers Guitar Lessons</h3>
          <div className="for">Seeking in return</div>
          <p>Beginner Excel &amp; spreadsheet basics</p>
          <div className="divider"></div>
          <div className="ticket-row"><span>3 swaps completed</span><span>★ 4.9</span></div>
        </div>
      </section>

      <section id="how">
        <div className="section-head">
          <div className="eyebrow">How it works</div>
          <h2>Three steps, no middleman.</h2>
        </div>
        <div className="steps">
          <div className="step">
            <div className="num">01</div>
            <h3>Post a skill</h3>
            <p>Say what you can teach and what you'd like to learn in exchange. Takes two minutes.</p>
          </div>
          <div className="step">
            <div className="num">02</div>
            <h3>Get matched</h3>
            <p>We surface people whose offer matches your ask — and whose ask matches your offer.</p>
          </div>
          <div className="step">
            <div className="num">03</div>
            <h3>Swap sessions</h3>
            <p>Meet online or locally, teach each other, and mark the trade complete when you're done.</p>
          </div>
        </div>
        <button className="link-more" onClick={() => go("how")}>See the full guide <ArrowRight size={14} /></button>
      </section>

      <section id="browse">
        <div className="section-head row">
          <div>
            <div className="eyebrow">Browse trades</div>
            <h2>Open tickets this week.</h2>
          </div>
          <button className="btn btn-outline small" onClick={() => go("browse")}>View all <ArrowRight size={14} /></button>
        </div>
        <div className="categories-grid">
          {TRADES.slice(0, 6).map((t, i) => <TicketCard trade={t} idx={i} key={t.id} />)}
        </div>
      </section>

      <section id="stories">
        <div className="section-head">
          <div className="eyebrow">Stories</div>
          <h2>What people traded.</h2>
        </div>
        <div className="testimonials">
          {TESTIMONIALS.map((t) => (
            <div className="quote" key={t.who}>
              <p>"{t.quote}"</p>
              <div className="who">{t.who}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="cta-band">
          <h2>Got a skill? Someone needs it.</h2>
          <p>Post your first ticket in under two minutes.</p>
          <button className="btn" onClick={() => go("post")}>Post a skill</button>
        </div>
      </section>
    </>
  );
}

function BrowsePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return TRADES.filter((t) => {
      const matchesCat = category === "All" || t.tags.includes(category);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        t.offer.toLowerCase().includes(q) ||
        t.seek.toLowerCase().includes(q) ||
        t.offerer.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="page-top">
      <div className="section-head">
        <div className="eyebrow">Browse trades</div>
        <h2>{filtered.length} open ticket{filtered.length !== 1 ? "s" : ""}</h2>
        <p className="section-sub">Search by skill or filter by category — every listing here is a real two-way trade.</p>
      </div>

      <div className="browse-controls">
        <div className="search-box">
          <Search size={16} strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search skills, e.g. 'photography' or 'baking'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="chip-filter-row">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={"filter-chip" + (category === c ? " active" : "")}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="categories-grid">
          {filtered.map((t, i) => <TicketCard trade={t} idx={i} key={t.id} />)}
        </div>
      ) : (
        <div className="empty-state">
          <ArrowLeftRight size={28} strokeWidth={1.5} />
          <h3>No tickets match yet</h3>
          <p>Try a different search term, or be the first to post this trade.</p>
        </div>
      )}
    </section>
  );
}

function HowItWorksPage({ go }) {
  const details = [
    {
      title: "Post a skill",
      body: "Describe what you can teach in a sentence or two, and what you'd like in return. Be specific — 'intro guitar chords' matches better than 'music stuff'.",
      icon: <Sparkles size={20} strokeWidth={2} />,
    },
    {
      title: "Get matched",
      body: "SkillSwap surfaces people whose ask lines up with your offer, and whose offer lines up with your ask. You'll see their rating and past swaps before you reply.",
      icon: <ArrowLeftRight size={20} strokeWidth={2} />,
    },
    {
      title: "Agree on a time",
      body: "Message back and forth to settle on a format — video call or in person — and a rough number of sessions each way.",
      icon: <Clock size={20} strokeWidth={2} />,
    },
    {
      title: "Swap sessions",
      body: "Teach, learn, and keep it even. Most trades run 2–4 sessions per side, but that's between you and your trade partner.",
      icon: <User size={20} strokeWidth={2} />,
    },
    {
      title: "Mark it complete",
      body: "Close the ticket and leave a rating. This is what future partners see, so an honest, kind review helps everyone trade with confidence.",
      icon: <CheckCircle2 size={20} strokeWidth={2} />,
    },
  ];

  return (
    <section className="page-top">
      <div className="section-head">
        <div className="eyebrow">Guide</div>
        <h2>How a swap actually happens.</h2>
        <p className="section-sub">No payments, no platform fees — just two people agreeing to teach each other.</p>
      </div>

      <div className="guide-list">
        {details.map((d, i) => (
          <div className="guide-row" key={d.title}>
            <div className="guide-num-wrap">
              <div className="guide-icon">{d.icon}</div>
              {i < details.length - 1 && <div className="guide-connector" />}
            </div>
            <div className="guide-body">
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-band" style={{ marginTop: 60 }}>
        <h2>Ready to make your first trade?</h2>
        <p>Post what you know — it takes under two minutes.</p>
        <button className="btn" onClick={() => go("post")}>Post a skill</button>
      </div>
    </section>
  );
}

function PostSkillPage({ go }) {
  const [form, setForm] = useState({ name: "", offer: "", seek: "", location: "", blurb: "" });
  const [posted, setPosted] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setPosted(true);
  };

  if (posted) {
    return (
      <section className="page-top narrow">
        <div className="success-panel">
          <CheckCircle2 size={40} strokeWidth={1.5} color="var(--sage)" />
          <h2>Your ticket is live.</h2>
          <p>We'll notify you when someone's offer matches what you're seeking.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <button className="btn" onClick={() => go("browse")}>Browse other trades</button>
            <button className="btn btn-outline" onClick={() => { setPosted(false); setForm({ name: "", offer: "", seek: "", location: "", blurb: "" }); }}>Post another</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-top">
      <div className="section-head">
        <div className="eyebrow">Post a skill</div>
        <h2>Write your ticket.</h2>
        <p className="section-sub">Fill in the form — your ticket preview builds itself on the right as you go.</p>
      </div>

      <div className="post-grid">
        <form className="post-form" onSubmit={submit}>
          <label>
            Your name
            <input type="text" placeholder="e.g. Jordan" value={form.name} onChange={update("name")} required />
          </label>
          <label>
            What can you teach?
            <input type="text" placeholder="e.g. Beginner watercolor painting" value={form.offer} onChange={update("offer")} required />
          </label>
          <label>
            What would you like in return?
            <input type="text" placeholder="e.g. Help fixing my resume" value={form.seek} onChange={update("seek")} required />
          </label>
          <label>
            Location
            <input type="text" placeholder="Remote, or your city" value={form.location} onChange={update("location")} />
          </label>
          <label>
            A line or two about the trade
            <textarea rows={3} placeholder="Give people context — format, pace, experience level." value={form.blurb} onChange={update("blurb")} />
          </label>
          <button className="btn" type="submit" style={{ width: "100%" }}>Post ticket</button>
        </form>

        <div className="preview-wrap">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Live preview</div>
          <div className="ticket ticket-hero" style={{ transform: "rotate(1.4deg)" }}>
            <div className="ticket-row"><span>Ticket #New</span><span>Draft</span></div>
            <h3>{form.name ? `${form.name} offers ${form.offer || "…"}` : "Your name offers …"}</h3>
            <div className="for">Seeking in return</div>
            <p>{form.seek || "What you'd like to learn"}</p>
            <div className="divider"></div>
            <div className="ticket-row"><span>{form.location || "Location"}</span><span>New trader</span></div>
          </div>
          {form.blurb && <p className="preview-blurb">{form.blurb}</p>}
        </div>
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="page-top">
      <div className="profile-header">
        <Avatar name="You" size={64} idx={1} />
        <div>
          <h2 style={{ marginBottom: 4 }}>Your dashboard</h2>
          <p className="section-sub" style={{ margin: 0 }}>2 open tickets · 1 active match · ★ 4.9 average rating</p>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 44 }}>
        <div className="eyebrow">My tickets</div>
        <h2>What you're offering.</h2>
      </div>
      <div className="my-tickets-grid">
        {MY_TICKETS.map((t) => (
          <div className="cat-ticket" key={t.id}>
            <div className="swap-line">
              <span className="tag offer">Offers</span>
              <span className="swap-item">{t.offer}</span>
            </div>
            <div className="swap-line">
              <span className="tag seek">Seeks</span>
              <span className="swap-item">{t.seek}</span>
            </div>
            <div className="cat-ticket-foot" style={{ marginTop: 16 }}>
              <span className={"status-pill " + (t.status === "Open" ? "open" : "matched")}>{t.status}</span>
              <span className="swaps-count">{t.swaps} swaps completed</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 44 }}>
        <div className="eyebrow">Matches</div>
        <h2>People to trade with.</h2>
      </div>
      <div className="matches-list">
        {MY_MATCHES.map((m, i) => (
          <div className="match-row" key={m.name}>
            <Avatar name={m.name} idx={i} size={44} />
            <div className="match-info">
              <div className="match-name">{m.name}</div>
              <div className="match-swap">{m.offer} <ArrowLeftRight size={12} /> {m.seek}</div>
            </div>
            <span className="match-stage">{m.stage}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LoginPage({ go }) {
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);

  return (
    <section className="page-top narrow">
      <div className="auth-panel">
        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Log in</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Sign up</button>
        </div>

        <h2 style={{ marginBottom: 6 }}>{mode === "login" ? "Welcome back." : "Join SkillSwap."}</h2>
        <p className="section-sub" style={{ marginBottom: 28 }}>
          {mode === "login" ? "Log in to see your tickets and matches." : "No fees, ever — just create a profile and start trading."}
        </p>

        <form onSubmit={(e) => { e.preventDefault(); go("profile"); }}>
          {mode === "signup" && (
            <label>
              Name
              <input type="text" placeholder="e.g. Jordan Lee" required />
            </label>
          )}
          <label>
            Email
            <div className="input-icon-wrap">
              <Mail size={15} />
              <input type="email" placeholder="you@example.com" required />
            </div>
          </label>
          <label>
            Password
            <div className="input-icon-wrap">
              <Lock size={15} />
              <input type={showPw ? "text" : "password"} placeholder="••••••••" required />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </label>
          <button className="btn" type="submit" style={{ width: "100%", marginTop: 8 }}>
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  APP SHELL                                                          */
/* ------------------------------------------------------------------ */

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItem = (id, label) => (
    <a
      href={"#" + id}
      className={page === id ? "nav-active" : ""}
      onClick={(e) => { e.preventDefault(); go(id); }}
    >
      {label}
    </a>
  );

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --paper: #f3ede0;
          --paper-dark: #e8dfc9;
          --ink: #1f2a24;
          --mustard: #d9a441;
          --sage: #5c7a5e;
          --clay: #b5563c;
        }
        .app-root {
          background-color: var(--paper);
          background-image: radial-gradient(circle, rgba(31,42,36,0.08) 1px, transparent 1px);
          background-size: 22px 22px;
          color: var(--ink);
          font-family: 'Space Mono', monospace;
          line-height: 1.6;
          min-height: 100vh;
        }
        .app-root * { box-sizing: border-box; }
        .app-root h1, .app-root h2, .app-root h3, .display { font-family: 'Fraunces', serif; font-weight: 600; letter-spacing: -0.01em; }
        .app-root a { color: inherit; text-decoration: none; }
        .app-root button { font-family: 'Space Mono', monospace; }
        .wrap { max-width: 1100px; margin: 0 auto; padding: 0 28px; }

        nav { display: flex; justify-content: space-between; align-items: center; padding: 22px 0; border-bottom: 2px solid var(--ink); position: relative; }
        .logo { font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.5rem; cursor: pointer; background: none; border: none; padding: 0; color: var(--ink); }
        .logo span { color: var(--clay); }
        .nav-links { display: flex; gap: 30px; align-items: center; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.06em; }
        .nav-links a { padding-bottom: 4px; border-bottom: 2px solid transparent; transition: border-color .15s ease, color .15s ease; }
        .nav-links a:hover { color: var(--clay); }
        .nav-links a.nav-active { border-color: var(--clay); color: var(--clay); }
        .menu-toggle { display: none; background: none; border: none; cursor: pointer; }

        .btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 22px; border: 2px solid var(--ink); border-radius: 3px;
          font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease;
          background: var(--mustard); box-shadow: 3px 3px 0 var(--ink); color: var(--ink);
        }
        .btn:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--ink); }
        .btn-outline { background: transparent; box-shadow: none; }
        .btn-outline:hover { background: var(--ink); color: var(--paper); transform: none; }
        .btn.small { padding: 8px 16px; font-size: 0.75rem; }

        .hero { padding: 80px 0 66px; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: center; }
        .eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--sage); font-weight: 700; margin-bottom: 18px; }
        .hero h1 { font-size: clamp(2.6rem, 5vw, 4rem); line-height: 1.02; margin-bottom: 22px; }
        .hero h1 em { font-style: italic; color: var(--clay); }
        .hero p { font-size: 1rem; max-width: 46ch; margin-bottom: 30px; color: #3a4740; }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-stats { display: flex; gap: 34px; margin-top: 42px; }
        .hero-stats div { display: flex; flex-direction: column; }
        .hero-stats strong { font-family: 'Fraunces', serif; font-size: 1.5rem; }
        .hero-stats span { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sage); }

        .ticket {
          background: var(--paper-dark); border: 2px dashed var(--ink); border-radius: 8px;
          padding: 28px; position: relative; box-shadow: 6px 6px 0 rgba(31,42,36,0.15);
        }
        .ticket-hero { transform: rotate(-2deg); }
        .ticket::before, .ticket::after {
          content: ""; position: absolute; top: 50%; width: 22px; height: 22px;
          background: var(--paper); border: 2px solid var(--ink); border-radius: 50%; transform: translateY(-50%);
        }
        .ticket::before { left: -12px; } .ticket::after { right: -12px; }
        .ticket-row { display: flex; justify-content: space-between; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; color: var(--sage); font-weight: 700; }
        .ticket h3 { font-size: 1.3rem; margin-bottom: 6px; }
        .ticket .for { color: var(--clay); font-weight: 700; margin: 10px 0 4px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .ticket .divider { border-top: 1px dashed var(--ink); margin: 16px 0; }

        section { padding: 64px 0; }
        .page-top { padding-top: 54px; }
        .page-top.narrow { max-width: 480px; margin: 0 auto; }
        .section-head { margin-bottom: 42px; max-width: 60ch; }
        .section-head.row { display: flex; justify-content: space-between; align-items: flex-end; max-width: none; gap: 20px; flex-wrap: wrap; }
        .section-head h2 { font-size: 2.05rem; }
        .section-sub { font-size: 0.92rem; color: #3a4740; margin-top: 10px; }
        .link-more { background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clay); margin-top: 30px; padding: 0; }

        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .step { border: 2px solid var(--ink); border-radius: 6px; padding: 26px; background: var(--paper-dark); }
        .step .num { font-family: 'Fraunces', serif; font-size: 2.6rem; font-weight: 700; color: var(--mustard); -webkit-text-stroke: 1.5px var(--ink); line-height: 1; margin-bottom: 14px; }
        .step h3 { font-size: 1.1rem; margin-bottom: 8px; }
        .step p { font-size: 0.88rem; color: #3a4740; }

        .categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .cat-ticket { background: var(--paper); border: 2px solid var(--ink); border-radius: 6px; padding: 22px; transition: transform 0.15s ease, box-shadow .15s ease; }
        .cat-ticket:hover { transform: translateY(-4px); box-shadow: 4px 6px 0 rgba(31,42,36,0.12); }
        .cat-ticket-top { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .cat-ticket-name { font-weight: 700; font-size: 0.9rem; font-family: 'Fraunces', serif; }
        .cat-ticket-loc { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: var(--sage); }
        .cat-ticket-rating { margin-left: auto; display: flex; align-items: center; gap: 3px; font-size: 0.78rem; font-weight: 700; }
        .swap-line { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .swap-item { font-weight: 700; font-size: 0.88rem; }
        .tag { display: inline-block; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.06em; padding: 3px 9px; border-radius: 20px; font-weight: 700; flex-shrink: 0; }
        .tag.offer { background: var(--sage); color: var(--paper); }
        .tag.seek { background: var(--clay); color: var(--paper); }
        .cat-ticket-blurb { font-size: 0.83rem; color: #3a4740; margin: 12px 0 16px; }
        .cat-ticket-foot { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; border-top: 1px dashed var(--ink); padding-top: 12px; }
        .chip-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .chip { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 8px; border: 1px solid var(--ink); border-radius: 20px; }
        .swaps-count { font-size: 0.7rem; color: var(--sage); font-weight: 700; }

        .testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .quote { border-left: 3px solid var(--mustard); padding-left: 18px; }
        .quote p { font-size: 0.92rem; margin-bottom: 12px; font-style: italic; }
        .quote .who { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sage); font-weight: 700; }

        .cta-band { background: var(--ink); color: var(--paper); border-radius: 8px; padding: 56px; text-align: center; }
        .cta-band h2 { font-size: 2rem; margin-bottom: 14px; }
        .cta-band p { color: #cfd6cf; margin-bottom: 28px; }
        .cta-band .btn { background: var(--mustard); box-shadow: 3px 3px 0 var(--paper); }
        .cta-band .btn:hover { box-shadow: 5px 5px 0 var(--paper); }

        footer { border-top: 2px solid var(--ink); padding: 36px 0; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; }
        .footer-links { display: flex; gap: 22px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Browse page */
        .browse-controls { margin-bottom: 20px; }
        .search-box { display: flex; align-items: center; gap: 10px; border: 2px solid var(--ink); border-radius: 4px; padding: 12px 16px; background: var(--paper-dark); max-width: 460px; }
        .search-box input { border: none; background: none; outline: none; font-family: 'Space Mono', monospace; font-size: 0.88rem; width: 100%; color: var(--ink); }
        .chip-filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
        .filter-chip { border: 2px solid var(--ink); background: transparent; border-radius: 20px; padding: 6px 14px; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; font-weight: 700; transition: background .15s ease, color .15s ease; }
        .filter-chip.active { background: var(--ink); color: var(--paper); }
        .empty-state { text-align: center; padding: 70px 20px; border: 2px dashed var(--ink); border-radius: 8px; color: var(--sage); }
        .empty-state h3 { margin: 14px 0 6px; color: var(--ink); }

        /* How it works */
        .guide-list { max-width: 640px; }
        .guide-row { display: flex; gap: 22px; }
        .guide-num-wrap { display: flex; flex-direction: column; align-items: center; }
        .guide-icon { width: 46px; height: 46px; border-radius: 50%; border: 2px solid var(--ink); background: var(--paper-dark); display: flex; align-items: center; justify-content: center; color: var(--clay); flex-shrink: 0; }
        .guide-connector { width: 2px; flex: 1; background: repeating-linear-gradient(to bottom, var(--ink) 0 6px, transparent 6px 12px); margin: 4px 0; }
        .guide-body { padding-bottom: 34px; }
        .guide-body h3 { font-size: 1.15rem; margin-bottom: 6px; }
        .guide-body p { font-size: 0.9rem; color: #3a4740; max-width: 52ch; }

        /* Post skill */
        .post-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 46px; align-items: start; }
        .post-form { display: flex; flex-direction: column; gap: 18px; }
        .post-form label, .auth-panel label { display: flex; flex-direction: column; gap: 6px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sage); font-weight: 700; }
        .post-form input, .post-form textarea, .auth-panel input {
          font-family: 'Space Mono', monospace; font-size: 0.9rem; padding: 12px 14px; border: 2px solid var(--ink);
          border-radius: 4px; background: var(--paper); color: var(--ink); outline: none; resize: vertical;
        }
        .post-form input:focus, .post-form textarea:focus, .auth-panel input:focus { border-color: var(--clay); }
        .preview-wrap { position: sticky; top: 24px; }
        .preview-blurb { font-size: 0.85rem; color: #3a4740; margin-top: 16px; font-style: italic; }
        .success-panel { text-align: center; border: 2px solid var(--ink); border-radius: 8px; padding: 60px 30px; background: var(--paper-dark); display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .success-panel h2 { margin-top: 4px; }
        .success-panel .hero-actions { margin-top: 14px; }

        /* Profile */
        .profile-header { display: flex; align-items: center; gap: 18px; }
        .my-tickets-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
        .status-pill { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 3px 10px; border-radius: 20px; font-weight: 700; border: 1px solid var(--ink); }
        .status-pill.open { background: var(--sage); color: var(--paper); border-color: var(--sage); }
        .status-pill.matched { background: var(--mustard); color: var(--ink); border-color: var(--mustard); }
        .matches-list { display: flex; flex-direction: column; gap: 14px; }
        .match-row { display: flex; align-items: center; gap: 16px; border: 2px solid var(--ink); border-radius: 6px; padding: 16px 20px; background: var(--paper-dark); }
        .match-info { flex: 1; }
        .match-name { font-family: 'Fraunces', serif; font-weight: 700; }
        .match-swap { font-size: 0.8rem; color: #3a4740; display: flex; align-items: center; gap: 6px; margin-top: 2px; }
        .match-stage { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clay); font-weight: 700; }

        /* Auth */
        .auth-panel { border: 2px solid var(--ink); border-radius: 8px; padding: 40px 34px; background: var(--paper-dark); margin: 20px 0 60px; }
        .auth-tabs { display: flex; gap: 4px; margin-bottom: 26px; border: 2px solid var(--ink); border-radius: 20px; padding: 4px; width: fit-content; }
        .auth-tabs button { border: none; background: none; padding: 7px 18px; border-radius: 16px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; color: var(--ink); }
        .auth-tabs button.active { background: var(--ink); color: var(--paper); }
        .auth-panel form { display: flex; flex-direction: column; gap: 16px; }
        .input-icon-wrap { display: flex; align-items: center; gap: 8px; border: 2px solid var(--ink); border-radius: 4px; padding: 0 14px; background: var(--paper); }
        .input-icon-wrap input { border: none; padding: 12px 0; flex: 1; }
        .input-icon-wrap svg { flex-shrink: 0; color: var(--sage); }
        .pw-toggle { background: none; border: none; cursor: pointer; color: var(--sage); display: flex; }

        @media (prefers-reduced-motion: reduce) { .app-root * { transition: none !important; } }
        :focus-visible { outline: 3px solid var(--clay); outline-offset: 2px; }

        @media (max-width: 860px) {
          .hero { grid-template-columns: 1fr; padding-top: 40px; }
          .nav-links { position: absolute; top: 100%; left: 0; right: 0; background: var(--paper); border-bottom: 2px solid var(--ink); flex-direction: column; align-items: flex-start; padding: 20px 28px; gap: 18px; display: none; }
          .nav-links.open { display: flex; }
          .menu-toggle { display: block; }
          .steps, .categories-grid, .testimonials, .my-tickets-grid { grid-template-columns: 1fr; }
          .post-grid { grid-template-columns: 1fr; }
          .preview-wrap { position: static; }
          .ticket-hero { transform: none; margin-top: 20px; }
          footer { flex-direction: column; gap: 16px; text-align: center; }
          .section-head.row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="wrap">
        <nav>
          <button className="logo" onClick={() => go("home")}>Skill<span>Swap</span></button>
          <div className={"nav-links" + (menuOpen ? " open" : "")}>
            {navItem("how", "How it works")}
            {navItem("browse", "Browse")}
            {navItem("post", "Post a skill")}
            {navItem("profile", "Dashboard")}
            <a href="#login" onClick={(e) => { e.preventDefault(); go("login"); }} className="btn btn-outline small">Log in</a>
            <a href="#login" onClick={(e) => { e.preventDefault(); go("login"); }} className="btn small">Sign up</a>
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {page === "home" && <HomePage go={go} />}
        {page === "browse" && <BrowsePage />}
        {page === "how" && <HowItWorksPage go={go} />}
        {page === "post" && <PostSkillPage go={go} />}
        {page === "profile" && <ProfilePage />}
        {page === "login" && <LoginPage go={go} />}

        <footer>
          <div>© 2026 SkillSwap. Built for trading, not spending.</div>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>About</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Guidelines</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
