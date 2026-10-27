"use client";
import { useRef, useState } from "react";
import {
  AnimatePresence, motion, useIsPresent, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { heroWords } from "@/lib/content";
import { EASE, useReady } from "./ui";

const SLICES = 9;
const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

function Letter({ ch, li, total, word, mx }: { ch: string; li: number; total: number; word: string; mx: MotionValue<number> }) {
  const depth = (li - (total - 1) / 2) * 0.55;
  const x = useTransform(mx, (v) => v * depth);
  const [done, setDone] = useState(false);
  const present = useIsPresent();
  return (
    <motion.span className={"sl" + (done && present ? " done" : "")} style={{ x }}>
      <span className="sl-base">{ch}</span>
      {Array.from({ length: SLICES }).map((_, si) => {
        const r = rnd(li * 31 + si * 7 + word.length * 3);
        const dir = r > 0.5 ? 1 : -1;
        const far = 35 + r * 110;
        const top = (si / SLICES) * 100 - 0.35;
        const bot = 100 - ((si + 1) / SLICES) * 100 - 0.35;
        return (
          <motion.span
            key={si}
            className="sl-strip"
            style={{ clipPath: `inset(${top}% -2% ${bot}% -2%)` }}
            initial={{ x: `${dir * far}%`, opacity: 0 }}
            animate={{ x: "0%", opacity: 1, transition: { duration: 1.15, ease: EASE, delay: li * 0.06 + si * 0.028 } }}
            onAnimationComplete={() => { if (si === SLICES - 1) setDone(true); }}
            exit={{ x: `${-dir * far * 0.6}%`, opacity: 0, transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0], delay: si * 0.012 } }}
          >
            {ch}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

function SliceWord({ word, mx }: { word: string; mx: MotionValue<number> }) {
  const letters = [...word];
  return (
    <motion.span className="sw" aria-label={word}>
      {letters.map((ch, i) => <Letter key={i} ch={ch} li={i} total={letters.length} word={word} mx={mx} />)}
    </motion.span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useReady();
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(heroWords.length - 1, Math.floor(v * heroWords.length * 0.999))));

  const vScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.18]);
  const mxRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const cur = heroWords[idx];

  return (
    <section
      id="top" ref={ref} className="hero" data-dark
      onPointerMove={(e) => mxRaw.set((e.clientX / window.innerWidth - 0.5) * 36)}
    >
      <div className="hero-pin">
        <motion.video
          className="hero-video" src="/video/hero.mp4" poster="/video/poster.jpg"
          autoPlay muted loop playsInline preload="auto" style={{ scale: vScale }}
        />
        <div className="hero-shade" />

        <div className="hero-top wrap">
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.2, delay: 0.3 }}
          >
            Recruitment partner · Dubai · London
          </motion.span>
          <motion.span
            className="hero-count"
            initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.2, delay: 0.5 }}
          >
            <b>0{idx + 1}</b> / 0{heroWords.length}
          </motion.span>
        </div>

        <div className="hero-center">
          <h1 className="hero-word" aria-live="polite">
            <AnimatePresence mode="wait">
              {ready && <SliceWord key={cur.word} word={cur.word} mx={mx} />}
            </AnimatePresence>
          </h1>
        </div>

        <div className="hero-bottom wrap">

          <div className="hero-row">
            <div className="hero-copy">
              <AnimatePresence mode="wait">
                {ready && (
                  <motion.div
                    key={cur.word}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                  >
                    <span className="hero-tag">{cur.tag}</span>
                    <p>{cur.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
              transition={{ duration: 1, ease: EASE, delay: 1.2 }}
            >
              <Link href="/employers" className="btn btn-light">I'm hiring <span>→</span></Link>
              <Link href="/register" className="btn btn-line-light">I'm looking for a role <span>→</span></Link>
            </motion.div>
          </div>
          <div className="hero-progress"><motion.i style={{ scaleX: scrollYProgress }} /></div>
        </div>
      </div>
    </section>
  );
}
