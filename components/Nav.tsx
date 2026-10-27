"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav } from "@/lib/content";
import { EASE, useReady } from "./ui";

export default function Nav() {
  const { scrollY } = useScroll();
  const [onDark, setOnDark] = useState(true);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState<string | null>(null);
  const ready = useReady();
  const pathname = usePathname();

  const measure = () => {
    const hero = document.getElementById("top");
    const y = window.scrollY;
    let dark = hero ? y < hero.offsetHeight - 80 : false;
    document.querySelectorAll<HTMLElement>("[data-dark]").forEach((d) => {
      const r = d.getBoundingClientRect();
      if (r.top <= 40 && r.bottom >= 40) dark = true;
    });
    setOnDark(dark);
  };
  useMotionValueEvent(scrollY, "change", measure);
  useEffect(() => { setOpen(false); setDd(null); const t = setTimeout(measure, 80); return () => clearTimeout(t); /* eslint-disable-next-line */ }, [pathname]);

  const dark = onDark || open;
  const active = (href: string, kids?: { href: string }[]) => pathname === href || !!kids?.some((k) => k.href === pathname);

  return (
    <>
      <motion.header
        className={"nav " + (dark ? "on-dark" : "on-light")}
        initial={{ y: -90 }} animate={{ y: ready ? 0 : -90 }} transition={{ duration: 0.8, ease: EASE }}
        onMouseLeave={() => setDd(null)}
      >
        <Link href="/" className="nav-logo" aria-label="NexAge Global home">
          <img src={dark ? "/brand/emblem-light.png" : "/brand/emblem.png"} alt="" className="nav-emblem" />
          <img src={dark ? "/brand/wordmark-light.png" : "/brand/wordmark.png"} alt="NexAge Global" className="nav-word" />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((l) => (
            <div key={l.label} className={"nl" + (dd === l.label ? " open" : "")} onMouseEnter={() => setDd(l.children ? l.label : null)}>
              <Link href={l.href} aria-current={active(l.href, l.children) ? "page" : undefined} className={active(l.href, l.children) ? "cur" : ""}>
                {l.label}{l.children && <i />}
              </Link>
              {l.children && (
                <div className="dd" role="menu">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} role="menuitem"><b>{c.label}</b><span>{c.d}</span></Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="nav-cta">
          <Link href="/contact" className="nav-btn">Contact</Link>
        </div>
        <button className={"burger" + (open ? " open" : "")} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <i /><i />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <div className="drawer-in">
              {nav.map((l, i) => (
                <motion.div key={l.label} className="dr-g" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.7, ease: EASE }}>
                  <Link href={l.href} className="dr-main">{l.label}</Link>
                  {l.children && <div className="dr-sub">{l.children.slice(l.children[0].href === l.href ? 1 : 0).map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}</div>}
                </motion.div>
              ))}
              <motion.div className="dr-g" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease: EASE }}>
                <Link href="/contact" className="dr-main">Contact</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
