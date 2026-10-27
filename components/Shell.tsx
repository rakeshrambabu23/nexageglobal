"use client";
import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ReadyContext, EASE } from "./ui";

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}

function Preloader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    const t = setTimeout(() => {
      document.documentElement.classList.remove("is-loading");
      setGone(true);
      onDone();
    }, 1700);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="preloader" exit={{ y: "-100%" }} transition={{ duration: 1, ease: EASE }}>
          <motion.img
            src="/brand/emblem-light.png" alt="NexAge Global" className="preloader-logo"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE }}
          />
          <div className="preloader-bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showLoader] = useState(pathname === "/");
  const [ready, setReady] = useState(!showLoader);
  useEffect(() => {
    (window as unknown as { __lenis?: Lenis }).__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);
  return (
    <MotionConfig reducedMotion="user">
      <ReadyContext.Provider value={ready}>
        <SmoothScroll />
        {showLoader && <Preloader onDone={() => setReady(true)} />}
        {children}
      </ReadyContext.Provider>
    </MotionConfig>
  );
}
