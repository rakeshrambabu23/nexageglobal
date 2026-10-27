# NexAge Global — website

Next.js (App Router) + React 19 + TypeScript, `motion` for animation, Lenis smooth scroll, three.js globe.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure (home + 13 pages)

| Route | Group |
|---|---|
| `/` | Home (pinned sliced-name hero, intro, band, paths, sectors, process, charter, regions, FAQ, advisory, contact) |
| `/about` | Company |
| `/sectors`, `/hospitality-advisory`, `/insights`, `/contact` | Company |
| `/employers`, `/executive-search`, `/retained-recruitment`, `/volume-hiring` | Employers |
| `/candidates`, `/register`, `/faqs` | Candidates |
| `/legal` | Legal (draft placeholder) |

- `lib/content.ts` — all home copy, the nav tree and the footer sitemap (`pages`).
- `lib/pages.ts` — each inner page as a list of blocks (`text`, `cards`, `steps`, `cta`, `prose`, plus reusable home sections). Add a page by adding an entry here and to `content.pages`.
- `components/PageView.tsx` renders any page; `components/Footer.tsx` and `components/Nav.tsx` are global (in `app/layout.tsx`).

## Replace before launch

- Email, address and social links (`site` in `lib/content.ts`) are placeholders.
- Items marked CONFIRM (charter / trust claims, FAQ answers) must be verified by NexAge.
- `/legal` is draft text — needs review by legal counsel.
- Insights are topic placeholders; the contact/register form API only logs submissions — connect email/CRM.
- Art (`public/art/*.jpg`) and hero video (`public/video/hero.mp4`) are generated abstract placeholders. Swap for real hospitality photography/footage using the same filenames.
"# nexageglobal" 
