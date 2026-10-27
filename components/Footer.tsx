"use client";
import Link from "next/link";
import { pages, site } from "@/lib/content";
import { Line, Reveal, goTo } from "./ui";

const groups = ["Employers", "Candidates", "Company"] as const;

export default function Footer() {
  return (
    <footer className="footer" data-dark>
      <div className="wrap">
        <div className="footer-cta">
          <Reveal>
            <h2 className="footer-h">Ready when <em>you</em> are.</h2>
          </Reveal>
          <Reveal delay={0.1} className="footer-cta-btns">
            <Link href="/register" className="btn btn-light">Register your profile <span>→</span></Link>
            <Link href="/employers" className="btn btn-line-light">Brief us on a role <span>→</span></Link>
          </Reveal>
        </div>

        <div className="footer-grid">
          <Line className="hl-light" />
          <div className="f-brand">
            <img src="/brand/lockup-light.png" alt="NexAge Global" className="footer-logo" />
            <p className="f-tag">{site.tagline}</p>
            <address>
              {site.location}<br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>
            <ul className="f-social">
              {site.social.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}
            </ul>
          </div>

          {groups.map((g) => (
            <nav key={g} className="f-col" aria-label={g}>
              <h4>{g}</h4>
              <ul>
                {pages.filter((p) => p.group === g).map((p) => (
                  <li key={p.slug}><Link href={`/${p.slug}`}>{p.title}</Link></li>
                ))}
              </ul>
            </nav>
          ))}

          <nav className="f-col" aria-label="Legal">
            <h4>Legal</h4>
            <ul>
              {pages.filter((p) => p.group === "Legal").map((p) => <li key={p.slug}><Link href={`/${p.slug}`}>{p.title}</Link></li>)}
              <li><Link href="/legal#cookies">Cookies</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-giant" aria-hidden>NEXAGE</div>

        <div className="footer-bar">
          <span>© {new Date().getFullYear()} NexAge Global. All rights reserved.</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); goTo("#top"); }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
