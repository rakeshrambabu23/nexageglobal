// All editable copy lives here.
// Items marked CONFIRM are commitments / facts the agency must verify before launch.

export const site = {
  name: "NexAge Global",
  tagline: "Talent Partners • Hospitality Advisory",
  email: "hello@nexageglobal.com", // PLACEHOLDER
  location: "Dubai, United Arab Emirates", // PLACEHOLDER (confirm address)
  social: [{ label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" }, { label: "X", href: "#" }], // PLACEHOLDER links
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string; d?: string }[] };
export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Employers", href: "/employers",
    children: [
      { label: "For employers", href: "/employers", d: "How we partner with hiring teams" },
      { label: "Executive search", href: "/executive-search", d: "Senior and C-suite leaders" },
      { label: "Retained recruitment", href: "/retained-recruitment", d: "Dedicated, business-critical hires" },
      { label: "Volume hiring", href: "/volume-hiring", d: "Pre-opening and scale-up teams" },
    ],
  },
  {
    label: "Candidates", href: "/candidates",
    children: [
      { label: "For candidates", href: "/candidates", d: "What to expect from us" },
      { label: "Register your profile", href: "/register", d: "Free and confidential" },
      { label: "Candidate FAQs", href: "/faqs", d: "Your questions, answered" },
    ],
  },
  { label: "Sectors", href: "/sectors" },
  { label: "Advisory", href: "/hospitality-advisory" },
  { label: "Insights", href: "/insights" },
];

/** Words shown by the pinned hero (scroll changes the word). */
export const heroWords = [
  { word: "NEXAGE", tag: "Global recruitment partner", text: "Executive, retained and volume hiring for hospitality and beyond — across the GCC, the UK and Europe." },
  { word: "TALENT", tag: "For employers", text: "Leaders and teams who raise the standard, found discreetly and presented with a clear recommendation." },
  { word: "TRUST", tag: "For candidates", text: "Free to register. Confidential by default. Never shared without your consent." },
  { word: "CAREERS", tag: "Your next move", text: "A personal consultant, honest feedback and support all the way to your first day." },
];

export const intro =
  "We are a recruitment partner for the hospitality and executive world — placing people, not CVs, across the Gulf, the UK and Europe.";

export const facts = [
  { k: "Based in", v: "Dubai, UAE" },
  { k: "Corridors", v: "GCC · United Kingdom · Europe" },
  { k: "Mandates", v: "Executive search, retained and volume recruitment" },
];

export const paths = {
  employers: {
    id: "employers",
    label: "For employers",
    title: "Hire people who raise the standard.",
    items: [
      { t: "Executive Search", href: "/executive-search", d: "Senior and C-suite leaders, approached with complete discretion." },
      { t: "Retained Recruitment", href: "/retained-recruitment", d: "A dedicated partnership for business-critical hires." },
      { t: "Volume Hiring", href: "/volume-hiring", d: "Pre-opening and scale-up teams, mobilised at pace." },
      { t: "UK Corridor Sourcing", href: "/employers", d: "A structured pipeline from the UK and Europe to the Gulf." },
    ],
    cta: "Brief us on a role", ctaHref: "/employers",
  },
  candidates: {
    id: "candidates",
    label: "For candidates",
    title: "Find the role you'll be proud of.",
    items: [
      { t: "Register once", href: "/register", d: "One confidential profile for roles across the GCC and Europe." },
      { t: "1-Click applications", href: "/register", d: "Apply in seconds. Your details stay in your control." },
      { t: "Executive Talent Concierge", href: "/candidates", d: "Personal guidance for senior professionals — positioning, negotiation, relocation." },
    ],
    cta: "Register your profile", ctaHref: "/register",
  },
};

export const sectors = [
  { name: "Hotels & Resorts", roles: ["General Manager", "Director of Operations", "Rooms Division Manager", "Front Office & Guest Relations", "Housekeeping Leadership"] },
  { name: "Restaurants & Fine Dining", roles: ["Executive Chef", "Restaurant General Manager", "F&B Director", "Head Sommelier", "Pastry & Culinary Leadership"] },
  { name: "Cloud Kitchens & Delivery", roles: ["Operations Head", "Kitchen Manager", "Supply Chain Lead", "Brand & Menu Manager"] },
  { name: "Pre-opening & Volume", roles: ["Pre-Opening Team Lead", "Department Heads", "Service Teams", "Culinary Brigades"] },
  { name: "Luxury & Lifestyle", roles: ["Club & Venue Manager", "Events Director", "Guest Experience Lead", "Wellness & Spa Director"] },
  { name: "Corporate & Executive", roles: ["Chief Operating Officer", "Commercial Director", "HR Director", "Finance Director"] },
];

export const steps = [
  { t: "A conversation", d: "We start by listening — your experience, your ambitions, what you will and won't consider." },
  { t: "Positioning", d: "We sharpen your profile and agree where, and to whom, it should be introduced." },
  { t: "Introductions", d: "Only with your approval, we present you to employers we know and trust, and prepare you for each meeting." },
  { t: "Offer & negotiation", d: "We handle the conversation on package, title and start date, so you can focus on the decision." },
  { t: "Relocation & aftercare", d: "Practical guidance on contracts, visas and moving — and a check-in once you've started." },
];

// CONFIRM: each commitment must be true of the agency's real practice.
export const charter = [
  { t: "Free for candidates", d: "You never pay us a fee. Our clients do." },
  { t: "Your consent, always", d: "Your profile is never shared with an employer without your approval." },
  { t: "Fully confidential", d: "We never contact your current employer without your permission." },
  { t: "Honest feedback", d: "Clear updates at each stage — and if a role isn't right for you, we'll say so." },
  { t: "Verified mandates", d: "We only represent roles with a confirmed brief from the employer." },
  { t: "Mobility support", d: "Guidance on contracts, visas and relocation across the GCC, UK and Europe." },
];

export const regions = [
  { r: "United Arab Emirates", c: "Dubai · Abu Dhabi" },
  { r: "Saudi Arabia", c: "Riyadh · Jeddah" },
  { r: "Qatar & Oman", c: "Doha · Muscat" },
  { r: "United Kingdom", c: "London · Manchester" },
  { r: "Europe", c: "Paris · Istanbul" },
];

export const advisory = [
  { t: "Hospitality Consulting", items: ["Hotel & resort feasibility", "F&B concepts", "Menu engineering", "SOP development"] },
  { t: "Spatial & Digital", items: ["Interior architecture", "Cloud kitchens", "Web systems", "Branding"] },
];

export const faqs = [
  { q: "Do I pay anything to register?", a: "No. Registering and working with NexAge Global is free for candidates. Our fees are paid by employers." },
  { q: "Will my current employer find out?", a: "No. Your profile is confidential. We never approach your employer, and never introduce you to anyone, without your explicit permission." },
  { q: "What happens to my CV and personal data?", a: "It is stored securely and used only for the opportunities you have agreed to. You can ask us to update or delete it at any time." },
  { q: "How quickly will I hear back?", a: "A consultant reviews every profile personally and we keep you updated at each stage — including when there is nothing new to report." },
  { q: "Do you help with relocation and visas?", a: "Yes. We guide you through contracts, visa requirements and relocation, and coordinate with the employer on what support is offered." },
  { q: "How does retained search work for employers?", a: "We agree a brief, then run a dedicated, confidential search with regular reporting, a curated shortlist and support through to offer and onboarding." },
];

export const cities = [
  { name: "Dubai", lat: 25.2, lon: 55.3, hub: true },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Riyadh", lat: 24.7, lon: 46.7 },
  { name: "Doha", lat: 25.3, lon: 51.5 },
  { name: "Paris", lat: 48.85, lon: 2.35 },
  { name: "Manchester", lat: 53.48, lon: -2.24 },
  { name: "Istanbul", lat: 41.0, lon: 28.97 },
  { name: "Muscat", lat: 23.6, lon: 58.4 },
];

/** The 14-page site map (home + 13). Footer is built from this. Pages without a build yet render a placeholder at /[slug]. */
export const pages = [
  { slug: "about", title: "About us", group: "Company" },
  { slug: "employers", title: "For employers", group: "Employers" },
  { slug: "executive-search", title: "Executive search", group: "Employers" },
  { slug: "retained-recruitment", title: "Retained recruitment", group: "Employers" },
  { slug: "volume-hiring", title: "Volume hiring", group: "Employers" },
  { slug: "candidates", title: "For candidates", group: "Candidates" },
  { slug: "register", title: "Register your profile", group: "Candidates" },
  { slug: "faqs", title: "Candidate FAQs", group: "Candidates" },
  { slug: "sectors", title: "Sectors we recruit", group: "Company" },
  { slug: "hospitality-advisory", title: "Hospitality advisory", group: "Company" },
  { slug: "insights", title: "Insights", group: "Company" },
  { slug: "contact", title: "Contact", group: "Company" },
  { slug: "legal", title: "Privacy & terms", group: "Legal" },
];

export const employerSteps = [
  { t: "Brief", d: "We take the time to understand the role, the team, the culture and the person who will thrive." },
  { t: "Search", d: "Targeted market mapping and discreet outreach across our GCC, UK and European networks." },
  { t: "Shortlist", d: "Rigorous assessment and a curated shortlist of candidates who are genuinely ready to move." },
  { t: "Placement", d: "Offer management, negotiation and mobility support handled end to end." },
  { t: "Aftercare", d: "Onboarding check-ins that protect your investment long after day one." },
];
