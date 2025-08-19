import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Plus, Minus, Globe, Play, Smartphone, Tv2, Download, Users } from "lucide-react";

// ---- Utility Components ----
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const GradientDivider = () => (
  <div className="relative isolate">
    <div className="absolute inset-x-0 -top-3 h-2 bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 blur-[6px] opacity-70" />
    <div className="h-2" />
  </div>
);

const EmailCapture = ({ ctaLabel = "Get Started" }) => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = /.+@.+\..+/.test(email);
    setValid(ok);
    if (ok) alert(`Pretend sign-up for: ${email}`);
  };
  return (
    <form onSubmit={onSubmit} className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      <div className={`flex-1 rounded-xl border bg-black/50 p-2 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-red-500 ${!valid ? "ring-2 ring-red-600" : ""}`}>
        <input
          aria-label="Email address"
          placeholder="Email address"
          className="w-full rounded-lg bg-transparent px-4 py-3 text-white placeholder-white/60 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/40">
        {ctaLabel}
        <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
};

const Poster = ({ title, badge, img, idx }) => (
  <motion.div
    layout
    whileHover={{ y: -6, scale: 1.02 }}
    className="relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-2xl bg-zinc-800 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
  >
    <img src={img} alt={title} className="h-full w-full object-cover" />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    {typeof badge === "number" && (
      <div className="absolute -left-2 -top-2 rounded-2xl bg-black/80 px-3 py-1 text-2xl font-black text-white ring-1 ring-white/20">
        {badge}
      </div>
    )}
    <div className="absolute inset-x-2 bottom-2 flex items-center justify-between">
      <div className="max-w-[70%] truncate text-sm font-semibold text-white drop-shadow">{title}</div>
      <button className="rounded-full bg-white/10 p-2 backdrop-blur ring-1 ring-white/20 transition hover:bg-white/20">
        <Play className="size-4 text-white" />
      </button>
    </div>
  </motion.div>
);

const Row = ({ title }) => {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };
  // placeholder posters (base64 gradients) to keep single-file
  const posters = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      title: ["Baid 2", "Squid Game", "Khanda Murders", "Saare Jahaan Se Acha", "Heist Street", "Arc Light"][i % 6],
      img:
        "data:image/svg+xml;base64," + btoa(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'>\n  <defs>\n    <linearGradient id='g' x1='0' x2='1'>\n      <stop offset='0%' stop-color='hsl(${(i*53)%360},70%,45%)'/>\n      <stop offset='100%' stop-color='hsl(${(i*53+120)%360},70%,35%)'/>\n    </linearGradient>\n  </defs>\n  <rect width='100%' height='100%' fill='url(#g)'/>\n  <g fill='rgba(255,255,255,0.9)' font-family='Inter,system-ui' font-size='38' font-weight='800'>\n    <text x='30' y='90'>Stream</text>\n    <text x='30' y='140'>Poster ${i+1}</text>\n  </g>\n</svg>`),
    })),
  []);
  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="flex gap-2">
          <button onClick={() => scrollBy(-1)} className="rounded-full bg-white/10 p-2 ring-1 ring-white/20 backdrop-blur hover:bg-white/20"><ChevronLeft className="size-5 text-white"/></button>
          <button onClick={() => scrollBy(1)} className="rounded-full bg-white/10 p-2 ring-1 ring-white/20 backdrop-blur hover:bg-white/20"><ChevronRight className="size-5 text-white"/></button>
        </div>
      </div>
      <div ref={ref} className="scrollbar-none flex gap-4 overflow-x-auto pb-4">
        {posters.map((p, i) => (
          <Poster key={i} title={p.title} img={p.img} badge={i < 7 ? i + 1 : undefined} idx={i} />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="rounded-2xl bg-zinc-900/70 p-6 ring-1 ring-white/10 shadow-lg"
  >
    <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-tr from-fuchsia-600/60 via-pink-600/60 to-rose-600/60 p-3 ring-1 ring-white/20">
      <Icon className="size-6 text-white" />
    </div>
    <h4 className="mb-2 text-lg font-bold text-white">{title}</h4>
    <p className="text-sm text-white/70">{desc}</p>
  </motion.div>
);

const QA = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900/70 text-white ring-1 ring-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-5 text-left text-base font-medium hover:bg-white/5"
      >
        <span>{q}</span>
        {open ? <Minus className="size-5" /> : <Plus className="size-5" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 pb-5 text-white/80"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---- MAIN PAGE ----
export default function LandingClone() {
  // background poster wall animation
  const bgStyle = {
    backgroundImage:
      "radial-gradient(90% 60% at 50% 10%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.95) 100%), url('data:image/svg+xml;base64," +
      btoa(`<?xml version='1.0' encoding='UTF-8'?>\n<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>\n  <defs>\n    <linearGradient id='g' x1='0' x2='1'>\n      <stop offset='0' stop-color='#0b0b0b'/><stop offset='1' stop-color='#151515'/>\n    </linearGradient>\n    <pattern id='p' width='200' height='300' patternUnits='userSpaceOnUse'>\n      <rect width='200' height='300' fill='url(#g)'/>\n      <rect x='10' y='10' width='180' height='280' rx='12' fill='rgba(255,255,255,0.06)'/>\n    </pattern>\n  </defs>\n  <rect width='100%' height='100%' fill='url(#p)'/>\n</svg>`) +
      "')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const faqs = [
    {
      q: "What is this site?",
      a: (
        <p>
          A single-file, Netflix-inspired landing page clone for demos and study. No accounts, no billing—just front-end.
        </p>
      ),
    },
    {
      q: "How much does it cost?",
      a: <p>₹149 vibe in copy; this clone is free.</p>,
    },
    {
      q: "Where can I watch?",
      a: <p>Any device with a modern browser. This page is responsive and keyboard-accessible.</p>,
    },
    {
      q: "How do I cancel?",
      a: <p>Close the tab 😄</p>,
    },
    {
      q: "What can I watch?",
      a: <p>Posters are placeholders. Plug in your catalogue or TMDB API to make it real.</p>,
    },
    {
      q: "Is it good for kids?",
      a: <p>That depends on the content you connect later. This is just UI.</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-gradient-to-b from-black/80 to-black/0 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <div className="text-2xl font-black tracking-tight text-red-600">NETFLIX*</div>
            <span className="hidden text-xs text-white/50 sm:block">(educational clone)</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-sm ring-1 ring-white/20 hover:bg-white/10">
              <Globe className="size-4" /> English
            </button>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700">Sign In</button>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <section style={bgStyle} className="relative isolate overflow-hidden pt-28">
        {/* animated shine */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 opacity-40"
          initial={{ background: "radial-gradient(600px 120px at 50% -50px, rgba(255,0,0,0.4), transparent)" }}
          animate={{ background: [
            "radial-gradient(600px 120px at 30% -60px, rgba(255,0,0,0.35), transparent)",
            "radial-gradient(600px 120px at 70% -40px, rgba(255,0,0,0.35), transparent)",
            "radial-gradient(600px 120px at 50% -50px, rgba(255,0,0,0.35), transparent)",
          ]}}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <Container className="relative z-10 flex min-h-[72vh] flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-balance text-4xl font-black sm:text-5xl md:text-6xl"
          >
            Unlimited movies, TV shows and more
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-3 text-lg text-white/80"
          >
            Starts at ₹149. Cancel at any time.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-5 text-white/80"
          >
            Ready to watch? Enter your email to create or restart your membership.
          </motion.p>
          <EmailCapture />

          <GradientDivider />

          <Container className="mt-6">
            <Row title="Trending Now" />
          </Container>
        </Container>
      </section>

      {/* REASONS */}
      <section className="bg-black py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Tv2} title="Enjoy on your TV" desc="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV and more." />
            <FeatureCard icon={Download} title="Download to watch offline" desc="Save your favourites easily and always have something to watch." />
            <FeatureCard icon={Smartphone} title="Watch everywhere" desc="Stream on your phone, tablet, laptop and TV without limits." />
            <FeatureCard icon={Users} title="Create profiles for kids" desc="Send kids on adventures with their favourite characters in a space made just for them." />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-black py-14">
        <Container>
          <h2 className="mb-6 text-3xl font-extrabold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <QA key={i} q={f.q} a={f.a} />
            ))}
          </div>
          <div className="mt-8">
            <p className="text-center text-white/80">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="mx-auto max-w-3xl">
              <EmailCapture />
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-12 text-sm text-white/70">
        <Container>
          <p className="mb-6">Questions? Call 000-800-919-1743</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["FAQ","Help Centre","Account","Media Centre","Investor Relations","Jobs","Ways to Watch","Terms of Use","Privacy","Cookie Preferences","Corporate Information","Contact Us","Speed Test","Legal Notices","Only on *This Clone*"].map((t,i)=> (
              <a key={i} href="#" className="hover:text-white">{t}</a>
            ))}
          </div>

          <div className="mt-8">
            <button className="inline-flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 ring-1 ring-white/20 hover:bg-white/10"><Globe className="size-4"/> English</button>
          </div>
          <p className="mt-6 text-white/50">Netflix India (UI clone for education). All product names, logos, and brands are property of their respective owners.</p>
        </Container>
      </footer>
    </div>
  );
}
