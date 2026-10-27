"use client";
import { Fragment, createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue, type Variants } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);

export function Reveal({
  children, delay = 0, y = 28, className, as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "p" | "span" }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Hairline that draws itself in. */
export function Line({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.i
      className={"hl " + className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

/** Masked word-by-word headline reveal. Wrap a word in *asterisks* for italic emphasis. */
export function SplitText({
  text, className, delay = 0, as: Tag = "h2", stagger = 0.06,
}: { text: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p"; stagger?: number }) {
  const words = text.split(" ");
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const word: Variants = {
    hidden: { y: "108%" },
    show: { y: "0%", transition: { duration: 1.1, ease: EASE } },
  };
  const M = motion[Tag] as typeof motion.h2;
  return (
    <M
      className={className} variants={container} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }} aria-label={text.replace(/\*/g, "")}
    >
      {words.map((w, i) => {
        const em = w.startsWith("*") && w.endsWith("*");
        const clean = em ? w.slice(1, -1) : w;
        return (
          <Fragment key={i}>
            <span className="mask" aria-hidden>
              <motion.span className={"mask-in" + (em ? " em" : "")} variants={word}>{clean}</motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </M>
  );
}

export function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="label">
      <span>({n})</span>
      <span>{children}</span>
    </div>
  );
}

export function goTo(href: string) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(href, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4), offset: href === "#top" ? 0 : -70 });
  else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

function ScrubWord({ w, p, r }: { w: string; p: MotionValue<number>; r: [number, number] }) {
  const o = useTransform(p, r, [0.14, 1]);
  return <motion.span style={{ opacity: o }}>{w}{" "}</motion.span>;
}
/** Paragraph whose words light up one by one as you scroll. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => <ScrubWord key={i} w={w} p={scrollYProgress} r={[i / words.length, Math.min((i + 2) / words.length, 1)]} />)}
    </p>
  );
}
