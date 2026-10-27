"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import {
  advisory, charter, employerSteps, facts, faqs, intro, paths, regions, sectors, site, steps,
} from "@/lib/content";
import { EASE, Label, Line, Reveal, ScrubText, SplitText, goTo } from "./ui";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

/* ───────── 01 Who we are ───────── */
export function Intro() {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <div className="split">
          <Label n="01">Who we are</Label>
          <ScrubText className="statement" text={intro} />
        </div>
        <div className="facts">
          {facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.1} className="fact">
              <Line />
              <span className="k">{f.k}</span>
              <span className="v">{f.v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Image band ───────── */
export function Band() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0.05, 0.4], ["inset(14% 10% 14% 10%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1.08, 1.0]);
  return (
    <section ref={ref} className="band" aria-label="Corridors">
      <motion.div className="band-in" style={{ clipPath: clip }}>
        <motion.img src="/art/band.jpg" alt="" style={{ scale }} />
        <div className="band-shade" />
        <div className="band-cap wrap">
          <span>Dubai · London · Riyadh · Doha</span>
          <p>Hospitality talent, placed with care across the Gulf, the UK and Europe.</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────── 02 Two ways in ───────── */
function PathCol({ p, img }: { p: typeof paths.candidates; img: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div className="path" id={p.id}>
      <Reveal y={30}>
        <div ref={ref} className="path-img">
          <motion.img src={img} alt="" style={{ y }} />
          <span>{p.label}</span>
        </div>
      </Reveal>
      <SplitText as="h3" className="path-title" text={p.title} stagger={0.05} />
      <ul>
        {p.items.map((it, i) => (
          <Reveal as="li" key={it.t} delay={i * 0.07} y={16}>
            <Link href={it.href} className="path-item">
              <span className="pi-n">0{i + 1}</span>
              <span className="pi-b"><b>{it.t}</b><span>{it.d}</span></span>
              <span className="pi-a">→</span>
            </Link>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.2}>
        <Link href={p.ctaHref} className="btn btn-ink">{p.cta} <span>→</span></Link>
      </Reveal>
    </div>
  );
}
export function Paths() {
  return (
    <section className="sec tint">
      <div className="wrap">
        <div className="split head">
          <Label n="02">Two ways in</Label>
          <SplitText className="h-xl" text="One partner for *both* sides of every hire." />
        </div>
        <div className="paths">
          <PathCol p={paths.candidates} img="/art/path-candidates.jpg" />
          <PathCol p={paths.employers} img="/art/path-employers.jpg" />
        </div>
      </div>
    </section>
  );
}

/* ───────── 03 Sectors (image cards) ───────── */
function SectorCard({ i, name, roles: rl }: { i: number; name: string; roles: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <Reveal delay={(i % 3) * 0.1} y={40}>
      <div ref={ref} className="card" tabIndex={0}>
        <motion.img src={`/art/sector-${i + 1}.jpg`} alt="" className="card-img" style={{ y }} />
        <div className="card-body">
          <span className="card-n">0{i + 1}</span>
          <h3 className="card-t">{name}</h3>
          <ul className="card-roles">{rl.slice(0, 4).map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      </div>
    </Reveal>
  );
}
export function Sectors() {
  return (
    <section className="sec" id="sectors">
      <div className="wrap">
        <div className="split head">
          <Label n="03">Where we recruit</Label>
          <SplitText className="h-xl" text="Specialists in the *people* behind great hospitality." />
        </div>
        <div className="cards">
          {sectors.map((s, i) => <SectorCard key={s.name} i={i} name={s.name} roles={s.roles} />)}
        </div>
      </div>
    </section>
  );
}

/* ───────── 04 Process (dark) ───────── */
function Step({ i, t, d }: { i: number; t: string; d: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 30%"] });
  const o = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0.2, 1, 1, 0.2]);
  const x = useTransform(scrollYProgress, [0, 0.3], [24, 0]);
  return (
    <motion.li ref={ref} className="step" style={{ opacity: o, x }}>
      <span className="step-n">0{i + 1}</span>
      <div><h3>{t}</h3><p>{d}</p></div>
    </motion.li>
  );
}
export function ProcessBlock({ label, title, lede, which = "candidate", n = "04" }: { label: string; title: string; lede: string; which?: "candidate" | "employer"; n?: string }) {
  const list = which === "employer" ? employerSteps : steps;
  return (
    <section className="sec dark-sec" id="process" data-dark>
      <div className="wrap process">
        <div className="process-l">
          <Label n={n}>{label}</Label>
          <SplitText className="h-xl" text={title} />
          <Reveal delay={0.2}><p className="lede-d">{lede}</p></Reveal>
        </div>
        <ol className="process-r">
          {list.map((s, i) => <Step key={s.t} i={i} t={s.t} d={s.d} />)}
        </ol>
      </div>
    </section>
  );
}
export function Process() {
  return <ProcessBlock label="The candidate journey" title="From first conversation to *first* *day.*" lede="You are never left wondering where you stand. A named consultant is with you at every step." />;
}

/* ───────── 05 Candidate charter ───────── */
export function Charter() {
  return (
    <section className="sec" id="charter">
      <div className="wrap">
        <div className="split head">
          <Label n="05">Our promise</Label>
          <SplitText className="h-xl" text="What you can always *expect* from us." />
        </div>
        <div className="charter">
          {charter.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.08} className="promise">
              <Line />
              <span className="pr-n">0{i + 1}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="charter-cta">
          <Link href="/register" className="btn btn-ink">Register your profile <span>→</span></Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 06 Regions + globe ───────── */
export function Regions() {
  return (
    <section className="sec tint" id="regions">
      <div className="wrap regions">
        <div>
          <Label n="06">Corridors</Label>
          <SplitText className="h-xl" text="Dubai at the centre. The world within reach." />
          <ul className="region-list">
            {regions.map((r, i) => (
              <Reveal as="li" key={r.r} delay={i * 0.06} y={12}>
                <Line />
                <span className="rg-r">{r.r}</span>
                <span className="rg-c">{r.c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="regions-globe" y={0}>
          <Globe light className="globe-canvas" />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 08 FAQ ───────── */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sec tint" id="faq">
      <div className="wrap">
        <div className="split head">
          <Label n="07">Questions</Label>
          <SplitText className="h-xl" text="Things candidates *ask* us." />
        </div>
        <div className="split">
          <span />
          <ul className="faq">
            {faqs.map((f, i) => (
              <li key={f.q} className={open === i ? "open" : ""}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  <span>{f.q}</span><i />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }} style={{ overflow: "hidden" }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────── 09 Advisory ───────── */
export function Advisory() {
  return (
    <section className="sec" id="advisory">
      <div className="wrap">
        <div className="split head">
          <Label n="08">Also from NexAge</Label>
          <SplitText className="h-lg" text="Beyond recruitment: advisory for hospitality ventures." />
        </div>
        <div className="adv">
          {advisory.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.1} className="adv-col">
              <Line />
              <h3>{a.t}</h3>
              <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Contact + Footer (dark) ───────── */
export function Contact({ initial = "seek", heading = "Let's talk about your *next* move.", label = "Get in touch", register = false }: { initial?: "seek" | "hire"; heading?: string; label?: string; register?: boolean }) {
  const [mode, setMode] = useState<"seek" | "hire">(initial);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, mode }),
      });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  };
  return (
    <section className="sec dark-sec contact" id="contact" data-dark>
      <div className="wrap contact-grid">
        <div>
          <Label n="09">{label}</Label>
          <SplitText className="h-xl" text={heading} />
          <Reveal delay={0.2}>
            <p className="lede-d">Tell us a little about yourself or the role. A senior consultant will reply personally, in confidence.</p>
            <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="loc">{site.location}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="form">
          <div className="seg" role="tablist">
            {([["seek", "I'm looking for a role"], ["hire", "I'm hiring"]] as const).map(([k, l]) => (
              <button key={k} type="button" role="tab" aria-selected={mode === k} className={mode === k ? "on" : ""} onClick={() => setMode(k)}>{l}</button>
            ))}
          </div>
          {state === "done" ? (
            <div className="form-ok">
              <h3>Thank you.</h3>
              <p>Your message has reached our team. We'll be in touch shortly — and nothing is shared without your consent.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label className="field"><input name="name" required placeholder=" " /><span>Full name</span></label>
              <label className="field"><input name="email" type="email" required placeholder=" " /><span>Email</span></label>
              {register && <label className="field"><input name="phone" placeholder=" " /><span>Phone / WhatsApp</span></label>}
              <label className="field"><input name="company" placeholder=" " /><span>{mode === "hire" ? "Company" : "Current role"}</span></label>
              {register && (
                <label className="field select"><select name="sector" defaultValue="">
                  <option value="" disabled>Preferred sector</option>
                  {sectors.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
                </select></label>
              )}
              <label className="field"><textarea name="message" rows={3} required placeholder=" " /><span>{mode === "hire" ? "Who are you looking to hire?" : "What's your next move?"}</span></label>
              <button className="btn btn-light" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"} <span>→</span></button>
              {state === "error" && <p className="err">Something went wrong. Please email us directly.</p>}
              <p className="fine">Registering is free. We never share your details without your consent.</p>
            </form>
          )}
        </Reveal>
      </div>

    </section>
  );
}
