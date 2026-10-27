// Content + structure of the 13 inner pages (home is app/page.tsx). Draft copy — edit freely.
export type Item = { t: string; d: string; href?: string };
export type Block =
  | { type: "text"; label: string; title: string; body: string[] }
  | { type: "cards"; label: string; title: string; items: Item[]; art?: boolean }
  | { type: "steps"; label: string; title: string; lede: string; which: "employer" | "candidate" }
  | { type: "cta"; title: string; text: string; button: string; href: string }
  | { type: "prose"; sections: { h: string; p: string[] }[] }
  | { type: "sectors" | "charter" | "regions" | "faq" | "advisory" | "contact" | "register" };

export type PageDef = {
  slug: string; group: string; title: string; heading: string; intro: string; blocks: Block[];
};

const cta = (title: string, text: string, button: string, href: string): Block => ({ type: "cta", title, text, button, href });

export const pageDefs: PageDef[] = [
  {
    slug: "about", group: "Company", title: "About us",
    heading: "A recruitment partner built on trust.",
    intro: "NexAge Global is a Dubai-based recruitment and hospitality advisory firm, connecting exceptional people with employers across the GCC, the United Kingdom and Europe.",
    blocks: [
      { type: "text", label: "Who we are", title: "People first. Always.", body: [
        "We were built around a simple idea: great hiring is a relationship, not a transaction. Every search starts with listening, and every introduction is made with care.",
        "Our identity draws on the refined, welcoming heritage of high-tier international hospitality and the precision of global executive recruitment. That is the standard we hold ourselves to — for employers and candidates alike.",
      ] },
      { type: "cards", label: "What guides us", title: "Three principles behind every placement.", items: [
        { t: "Discretion", d: "Confidential searches, curated shortlists and careful communication at every step." },
        { t: "Hospitality standards", d: "Warm, attentive and precise — the way the best hospitality teams work." },
        { t: "Accountability", d: "Clear expectations, honest feedback and follow-through, from first call to first day." },
      ] },
      { type: "charter" },
      { type: "regions" },
    ],
  },
  {
    slug: "employers", group: "Employers", title: "For employers",
    heading: "Hire people who raise the standard.",
    intro: "Executive, retained and volume recruitment for hospitality and executive roles — delivered with discretion, pace and a clear recommendation.",
    blocks: [
      { type: "cards", label: "Our services", title: "Three ways we partner with hiring teams.", items: [
        { t: "Executive search", d: "Senior and C-suite leaders, approached with complete discretion.", href: "/executive-search" },
        { t: "Retained recruitment", d: "A dedicated partnership for business-critical hires.", href: "/retained-recruitment" },
        { t: "Volume hiring", d: "Pre-opening and scale-up teams, mobilised at pace.", href: "/volume-hiring" },
      ], art: true },
      { type: "steps", label: "How we work", title: "A clear process, from brief to onboarding.", lede: "You will always know where your search stands — and who is accountable for it.", which: "employer" },
      { type: "text", label: "UK corridor", title: "A structured pipeline from the UK and Europe to the Gulf.", body: [
        "Our UK corridor sourcing connects experienced UK and European professionals with opportunities in the GCC, supported by guidance on contracts, visas and relocation.",
      ] },
      { type: "sectors" },
      cta("Brief us on a role.", "Tell us who you need. A senior consultant will respond personally.", "Contact us", "/contact"),
    ],
  },
  {
    slug: "executive-search", group: "Employers", title: "Executive search",
    heading: "Leaders, found with discretion.",
    intro: "For roles where the right person changes everything. We approach, assess and present senior leaders — quietly and thoroughly.",
    blocks: [
      { type: "text", label: "The approach", title: "Search that is confidential, targeted and personal.", body: [
        "Executive search is built on access and judgement. We map the market, approach candidates directly and discreetly, and assess them against the full picture — capability, character and cultural fit.",
        "Your search stays confidential throughout, and your brand is represented with the care it deserves.",
      ] },
      { type: "cards", label: "What's included", title: "A complete search, end to end.", items: [
        { t: "Market mapping", d: "A structured view of who is in the market and who could be moved." },
        { t: "Direct approach", d: "Confidential outreach to leaders who are not looking on job boards." },
        { t: "Assessment", d: "Structured interviews and referencing against an agreed profile." },
        { t: "Shortlist & presentation", d: "A curated shortlist with a clear, reasoned recommendation." },
        { t: "Offer management", d: "Negotiation, mobility support and onboarding follow-through." },
      ] },
      cta("Planning a leadership hire?", "Let's talk through the role, the timeline and the profile.", "Start a conversation", "/contact"),
    ],
  },
  {
    slug: "retained-recruitment", group: "Employers", title: "Retained recruitment",
    heading: "A dedicated partner for critical hires.",
    intro: "When a hire is too important to leave to chance, a retained search gives you a committed consultant, a transparent process and regular reporting.",
    blocks: [
      { type: "text", label: "The approach", title: "Commitment on both sides.", body: [
        "A retained search means we work exclusively on your mandate, with dedicated time and resources. You receive regular progress updates, market insight and honest advice on what is realistic.",
      ] },
      { type: "cards", label: "What you can expect", title: "Structure, visibility and focus.", items: [
        { t: "Dedicated consultant", d: "One accountable lead, supported by our research team." },
        { t: "Regular reporting", d: "Clear updates on activity, market feedback and shortlist progress." },
        { t: "Curated shortlist", d: "Candidates who are qualified, interested and ready to move." },
      ] },
      { type: "steps", label: "How it works", title: "From agreed brief to confirmed start date.", lede: "Every retained search follows the same transparent path.", which: "employer" },
      cta("Have a critical role to fill?", "We'll outline how a retained search would work for you.", "Talk to us", "/contact"),
    ],
  },
  {
    slug: "volume-hiring", group: "Employers", title: "Volume hiring",
    heading: "Teams mobilised at pace.",
    intro: "Pre-opening, seasonal and scale-up hiring — skilled hospitality teams sourced, screened and ready when you need them.",
    blocks: [
      { type: "text", label: "The approach", title: "Scale without losing standards.", body: [
        "Opening a property or expanding quickly demands speed and consistency. We build structured pipelines, screen carefully and coordinate mobilisation, so your teams arrive prepared and aligned with your brand.",
      ] },
      { type: "cards", label: "What's included", title: "Everything needed to staff up well.", items: [
        { t: "Pipeline building", d: "Role-by-role sourcing plans aligned to your opening or expansion timeline." },
        { t: "Screening & selection", d: "Structured assessment so quality holds up at volume." },
        { t: "Mobilisation support", d: "Coordination of contracts, visas and arrival for international hires." },
        { t: "Culinary and service brigades", d: "Experienced teams across kitchen, front-of-house and operations." },
      ] },
      { type: "sectors" },
      cta("Opening soon?", "Share your timeline and headcount — we'll propose a hiring plan.", "Get in touch", "/contact"),
    ],
  },
  {
    slug: "candidates", group: "Candidates", title: "For candidates",
    heading: "Find the role you'll be proud of.",
    intro: "Free to register. Confidential by default. A personal consultant who is with you from first conversation to first day.",
    blocks: [
      { type: "charter" },
      { type: "steps", label: "The journey", title: "From first conversation to first day.", lede: "You are never left wondering where you stand. A named consultant is with you at every step.", which: "candidate" },
      { type: "sectors" },
      { type: "faq" },
      cta("Ready for your next move?", "Register once and let us introduce you — with your approval, always.", "Register your profile", "/register"),
    ],
  },
  {
    slug: "register", group: "Candidates", title: "Register your profile",
    heading: "Register your profile.",
    intro: "Tell us about your experience and what you are looking for. It takes a couple of minutes, it is free, and nothing is shared without your consent.",
    blocks: [{ type: "register" }, { type: "charter" }],
  },
  {
    slug: "faqs", group: "Candidates", title: "Candidate FAQs",
    heading: "Your questions, answered.",
    intro: "Straight answers on fees, confidentiality, data and what happens after you register.",
    blocks: [{ type: "faq" }, cta("Still have a question?", "Ask us directly — we reply personally.", "Contact us", "/contact")],
  },
  {
    slug: "sectors", group: "Company", title: "Sectors we recruit",
    heading: "The people behind great hospitality.",
    intro: "From luxury hotels and fine dining to cloud kitchens and corporate leadership, we recruit across the hospitality ecosystem.",
    blocks: [{ type: "sectors" }, { type: "regions" }, cta("Hiring in one of these sectors?", "Tell us about the role and we'll start the conversation.", "Contact us", "/contact")],
  },
  {
    slug: "hospitality-advisory", group: "Company", title: "Hospitality advisory",
    heading: "Beyond recruitment.",
    intro: "Strategic advisory for hospitality ventures — from feasibility and concept to operations, spaces and brand.",
    blocks: [
      { type: "text", label: "Why advisory", title: "A value multiplier for your venture.", body: [
        "Great teams need great foundations. Our advisory practice helps owners and operators get the concept, operations and environment right — then staff them with the people who make them work.",
      ] },
      { type: "advisory" },
      cta("Planning a new venture?", "Let's talk about feasibility, concept and the team behind it.", "Start a conversation", "/contact"),
    ],
  },
  {
    slug: "insights", group: "Company", title: "Insights",
    heading: "Perspectives on talent and hospitality.",
    intro: "Practical guidance for candidates and employers across the GCC, the UK and Europe. New articles are on the way.",
    blocks: [
      { type: "cards", label: "Coming soon", title: "Topics we'll be writing about.", art: true, items: [
        { t: "Preparing for a GCC hospitality interview", d: "What employers look for, and how to present your experience." },
        { t: "Moving to the Gulf: a practical guide", d: "Contracts, visas and what to expect when relocating." },
        { t: "How to run a confidential leadership search", d: "Best practice for discreet senior hiring." },
      ] },
    ],
  },
  {
    slug: "contact", group: "Company", title: "Contact",
    heading: "Let's talk.",
    intro: "Whether you are hiring or looking for your next role, a senior consultant will reply personally, in confidence.",
    blocks: [{ type: "contact" }],
  },
  {
    slug: "legal", group: "Legal", title: "Privacy & terms",
    heading: "Privacy & terms.",
    intro: "How we handle your information and the terms of using this website.",
    blocks: [{
      type: "prose", sections: [
        { h: "Draft notice", p: ["This is draft placeholder text and must be reviewed and replaced by qualified legal counsel before launch."] },
        { h: "Information we collect", p: ["Details you provide when you register or contact us, such as your name, contact details, employment history and preferences."] },
        { h: "How we use it", p: ["To assess your suitability for roles, to introduce you to employers with your consent, and to communicate with you about opportunities."] },
        { h: "Sharing", p: ["We never share your profile with an employer without your explicit approval."] },
        { h: "Your rights", p: ["You can ask to access, correct or delete your data at any time by contacting us."] },
        { h: "Cookies", p: ["This website may use cookies for essential functionality and analytics."] },
        { h: "Website terms", p: ["Content on this website is provided for general information. Opportunities and services are subject to separate agreements."] },
      ],
    }],
  },
];
