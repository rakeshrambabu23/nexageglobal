"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { pageDefs, type Block, type PageDef } from "@/lib/pages";
import { Advisory, Charter, Contact, Faq, ProcessBlock, Regions, Sectors } from "./Sections";
import { Label, Line, Reveal, SplitText } from "./ui";

function PageHero({ p }: { p: PageDef }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  return (
    <section id="top" ref={ref} className="phero" data-dark>
      <motion.img src="/art/page-hero.jpg" alt="" className="phero-img" style={{ y }} />
      <div className="phero-shade" />
      <div className="wrap phero-in">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          {p.group !== "Legal" && <><span>{p.group}</span><span>/</span></>}
          <b>{p.title}</b>
        </nav>
        <SplitText as="h1" className="phero-h" text={p.heading} delay={0.15} />
        <Reveal delay={0.3}><p className="phero-p">{p.intro}</p></Reveal>
      </div>
    </section>
  );
}

function TextBlock({ b }: { b: Extract<Block, { type: "text" }> }) {
  return (
    <section className="sec">
      <div className="wrap split">
        <Label n="—">{b.label}</Label>
        <div>
          <SplitText className="h-lg" text={b.title} />
          <div className="tb-body">
            {b.body.map((t, i) => <Reveal key={i} as="p" delay={0.1 + i * 0.1}>{t}</Reveal>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardsBlock({ b, tint }: { b: Extract<Block, { type: "cards" }>; tint: boolean }) {
  return (
    <section className={"sec" + (tint ? " tint" : "")}>
      <div className="wrap">
        <div className="split head">
          <Label n="—">{b.label}</Label>
          <SplitText className="h-xl" text={b.title} />
        </div>
        <div className={"fcards n" + b.items.length}>
          {b.items.map((it, i) => {
            const inner = (
              <>
                {b.art && <span className="fc-img"><img src={`/art/sector-${(i % 6) + 1}.jpg`} alt="" /></span>}
                <span className="fc-n">0{i + 1}</span>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
                {it.href && <span className="fc-a">Learn more →</span>}
              </>
            );
            return (
              <Reveal key={it.t} delay={(i % 3) * 0.08} y={32}>
                {it.href ? <Link href={it.href} className="fcard">{inner}</Link> : <div className="fcard">{inner}</div>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ b }: { b: Extract<Block, { type: "cta" }> }) {
  return (
    <section className="sec ctaband">
      <div className="wrap">
        <Line />
        <div className="cta-in">
          <SplitText className="h-xl" text={b.title} />
          <div>
            <Reveal><p>{b.text}</p></Reveal>
            <Reveal delay={0.1}><Link href={b.href} className="btn btn-ink">{b.button} <span>→</span></Link></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Prose({ b }: { b: Extract<Block, { type: "prose" }> }) {
  return (
    <section className="sec">
      <div className="wrap split">
        <Label n="—">Legal</Label>
        <div className="prose">
          {b.sections.map((s) => (
            <Reveal key={s.h} className="prose-s">
              <h3 id={s.h.toLowerCase()}>{s.h}</h3>
              {s.p.map((t, i) => <p key={i}>{t}</p>)}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderBlock(b: Block, i: number) {
  const tint = i % 2 === 1;
  switch (b.type) {
    case "text": return <TextBlock key={i} b={b} />;
    case "cards": return <CardsBlock key={i} b={b} tint={tint} />;
    case "steps": return <ProcessBlock key={i} label={b.label} title={b.title} lede={b.lede} which={b.which} n="—" />;
    case "cta": return <CtaBand key={i} b={b} />;
    case "prose": return <Prose key={i} b={b} />;
    case "sectors": return <Sectors key={i} />;
    case "charter": return <Charter key={i} />;
    case "regions": return <Regions key={i} />;
    case "faq": return <Faq key={i} />;
    case "advisory": return <Advisory key={i} />;
    case "contact": return <Contact key={i} label="Get in touch" heading="Let's talk about your *next* move." />;
    case "register": return <Contact key={i} register label="Registration" heading="Tell us about *you.*" />;
  }
}

export default function PageView({ slug }: { slug: string }) {
  const p = pageDefs.find((x) => x.slug === slug)!;
  return (
    <main>
      <PageHero p={p} />
      {p.blocks.map(renderBlock)}
    </main>
  );
}
