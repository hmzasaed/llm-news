export type License = "Proprietary" | "Open weights";
export type Evidence = "Verified" | "Estimated" | "Projected";
export type LabTier = "Frontier lab" | "Hyperscaler" | "Open-weight challenger";

export interface BenchmarkSet {
  gpqa: number;
  swe: number;
  terminal: number;
  hle: number;
  mmmu: number;
  arena: number;
}

export interface Model {
  id: string;
  name: string;
  labId: string;
  license: License;
  released: string;
  context: number;
  input: number;
  output: number;
  cached?: number;
  score: number;
  benchmarks: BenchmarkSet;
  speed: number;
  evidence: Evidence;
  params: string;
  summary: string;
  strengths: string[];
  bestFor: string;
  tags: string[];
}

export interface LabEvent {
  date: string;
  label: string;
  value?: string;
}

export interface Lab {
  id: string;
  name: string;
  short: string;
  monogram: string;
  color: string;
  founded: string;
  hq: string;
  ceo: string;
  employees: string;
  tier: LabTier;
  tagline: string;
  description: string;
  valuation: string;
  valuationNote: string;
  valuationN: number | null;
  arr: number | null;
  revenue: string;
  revenueNote: string;
  capital: string;
  capitalNote: string;
  multiple: string;
  multipleNote: string;
  burn: string;
  burnNote: string;
  ipo: string;
  website: string;
  socials: { x?: string; linkedin?: string; github?: string; blog?: string };
  revenueMix: { label: string; value: number }[];
  mixNote: string;
  backers: string[];
  highlights: string[];
  risks: string[];
  history: LabEvent[];
}

export const BENCHMARKS = [
  { key: "gpqa", label: "GPQA Diamond", short: "Knowledge" },
  { key: "swe", label: "SWE / DeepSWE", short: "Coding" },
  { key: "terminal", label: "Terminal-Bench", short: "Agents" },
  { key: "hle", label: "Humanity's Last Exam", short: "Research" },
  { key: "mmmu", label: "MMMU-Pro", short: "Multimodal" },
] as const;

export const LABS: Lab[] = [
  {
    id: "anthropic",
    name: "Anthropic",
    short: "Anthropic",
    monogram: "AN",
    color: "#d9a786",
    founded: "2021",
    hq: "San Francisco, US",
    ceo: "Dario Amodei",
    employees: "~4,000",
    tier: "Frontier lab",
    tagline: "Safety-first frontier intelligence.",
    description:
      "Anthropic turned an enterprise-first bet into the fastest revenue ramp in software history. Claude Code and the API now carry a business valued at just under a trillion dollars, with an IPO filing in hand.",
    valuation: "$965B",
    valuationNote: "Series H · May 2026",
    valuationN: 965,
    arr: 65,
    revenue: "$65B",
    revenueNote: "Run-rate · end-Jul 2026",
    capital: "$95B",
    capitalNote: "Raised across G + H in 2026",
    multiple: "14.8×",
    multipleNote: "Series H valuation / Jul run-rate",
    burn: "Adjusted profit",
    burnNote: "Positive adjusted operating income in Q2 2026",
    ipo: "IPO filed · debut expected mid-Nov 2026",
    website: "https://www.anthropic.com",
    socials: {
      x: "https://x.com/AnthropicAI",
      linkedin: "https://www.linkedin.com/company/anthropicresearch",
      github: "https://github.com/anthropics",
      blog: "https://www.anthropic.com/research",
    },
    revenueMix: [
      { label: "Enterprise API", value: 62 },
      { label: "Claude Code", value: 19 },
      { label: "Consumer", value: 13 },
      { label: "Cloud partners", value: 6 },
    ],
    mixNote: "Modeled from investor disclosures and reported run-rate commentary.",
    backers: ["Amazon", "Google", "ICONIQ", "Fidelity", "Lightspeed", "Altimeter", "Sequoia", "Greenoaks", "Dragoneer", "GIC"],
    highlights: [
      "Revenue moved from roughly $9B at the end of 2025 to $65B by July 2026.",
      "More than 500 accounts spend over $1M annually; enterprise contracts lead the mix.",
      "Claude Code crossed a $2.5B run-rate and became the wedge into engineering budgets.",
    ],
    risks: [
      "Cloud-partner revenue is booked gross, which flatters headline comparisons.",
      "The IPO arrives with a valuation that assumes years of exceptional execution.",
      "Frontier training costs and compute commitments remain the dominant cost line.",
    ],
    history: [
      { date: "Feb 2026", label: "Series G closes", value: "$30B at $380B" },
      { date: "Mar 2026", label: "Run-rate crosses $30B" },
      { date: "May 2026", label: "Series H closes", value: "$65B at $965B" },
      { date: "Jul 2026", label: "Run-rate reaches $65B" },
      { date: "Aug 2026", label: "IPO path confirmed" },
      { date: "Nov 2026", label: "Expected Nasdaq debut" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    short: "OpenAI",
    monogram: "OA",
    color: "#27b591",
    founded: "2015",
    hq: "San Francisco, US",
    ceo: "Sam Altman",
    employees: "~6,000",
    tier: "Frontier lab",
    tagline: "The default interface for artificial intelligence.",
    description:
      "The consumer category creator is now an enterprise business too. OpenAI's GPT-6 family, Codex and a nascent ads engine power the widest distribution in AI, against the largest capital requirements in the sector.",
    valuation: "$852B",
    valuationNote: "Mar 2026 · $1.4T talks",
    valuationN: 852,
    arr: 50,
    revenue: "~$50B",
    revenueNote: "Annualized · Sep 2026",
    capital: "$122B",
    capitalNote: "Series G · Mar 2026",
    multiple: "35×",
    multipleNote: "Mar valuation / Aug run-rate",
    burn: "Cash-flow negative",
    burnNote: "~$278B cumulative negative FCF projected 2026–30",
    ipo: "Confidential filing · listing targeted for 2027",
    website: "https://openai.com",
    socials: {
      x: "https://x.com/OpenAI",
      linkedin: "https://www.linkedin.com/company/openai",
      github: "https://github.com/openai",
      blog: "https://openai.com/news",
    },
    revenueMix: [
      { label: "Consumer subscriptions", value: 34 },
      { label: "Enterprise seats", value: 28 },
      { label: "API & platform", value: 26 },
      { label: "Ads & commerce", value: 7 },
      { label: "Licensing", value: 5 },
    ],
    mixNote: "Modeled from reported revenue commentary; OpenAI does not publish a segment breakdown.",
    backers: ["SoftBank", "Amazon", "NVIDIA", "Microsoft", "a16z", "MGX", "TPG", "Thrive", "D. E. Shaw"],
    highlights: [
      "ChatGPT reached 1 billion monthly app users in May 2026.",
      "Enterprise revenue overtook consumer revenue ahead of schedule.",
      "In-chat ads and commerce reached a $1B annualized run-rate.",
    ],
    risks: [
      "The gap between headline revenue and cumulative cash burn remains historic.",
      "Consumer market share fell below 50% for the first time in May 2026.",
      "Compute commitments depend on continued access to enormous third-party capacity.",
    ],
    history: [
      { date: "Mar 2026", label: "Series G closes", value: "$122B at $852B" },
      { date: "May 2026", label: "ChatGPT reaches 1B monthly users" },
      { date: "Aug 2026", label: "Enterprise overtakes consumer" },
      { date: "Sep 2026", label: "GPT-6.1 Sol launches", value: "$2 / $10 per 1M" },
      { date: "Oct 2026", label: "New raise in talks", value: "$30B at up to $1.4T" },
      { date: "2027", label: "Expected public listing window" },
    ],
  },
  {
    id: "google",
    name: "Google DeepMind",
    short: "Google",
    monogram: "GD",
    color: "#8ab4f8",
    founded: "2010",
    hq: "London / Mountain View",
    ceo: "Demis Hassabis",
    employees: "~190,000 (Alphabet)",
    tier: "Hyperscaler",
    tagline: "Research depth, wrapped in global distribution.",
    description:
      "Gemini is Google's full-stack play: custom TPUs, a top-ranked frontier model and distribution across Search, Android, Workspace and Cloud. Standalone Gemini revenue is still undisclosed, but the infrastructure flywheel is unmistakable.",
    valuation: "$4.1T",
    valuationNote: "Alphabet market cap · est. Oct 2026",
    valuationN: 4100,
    arr: null,
    revenue: "$24.8B",
    revenueNote: "Google Cloud Q2 2026 · +82% YoY",
    capital: "$195–205B",
    capitalNote: "Alphabet capex guide · 2026",
    multiple: "—",
    multipleNote: "Gemini revenue not separately disclosed",
    burn: "Highly profitable",
    burnNote: "Alphabet consolidated operating margin, Q2 2026",
    ipo: "Public · GOOGL",
    website: "https://deepmind.google",
    socials: {
      x: "https://x.com/GoogleDeepMind",
      linkedin: "https://www.linkedin.com/company/googledeepmind",
      github: "https://github.com/google-deepmind",
      blog: "https://blog.google/technology/ai/",
    },
    revenueMix: [
      { label: "Cloud & AI infra", value: 41 },
      { label: "Search & ads", value: 33 },
      { label: "AI subscriptions", value: 15 },
      { label: "Workspace", value: 11 },
    ],
    mixNote: "Alphabet-level modeled mix. Gemini is monetized through bundles and Cloud.",
    backers: ["Public markets", "Institutional investors"],
    highlights: [
      "Gemini 4 Argon took the Arena crown days after general availability.",
      "Google Cloud grew 82% in Q2 2026, its fastest pace in years.",
      "TPU vertical integration gives Alphabet the widest control over unit economics.",
    ],
    risks: [
      "Gemini's standalone economics remain hidden inside larger segments.",
      "Capex is now a market-moving variable rather than a footnote.",
      "Regulatory scrutiny of distribution deals continues to escalate.",
    ],
    history: [
      { date: "Sep 2026", label: "Gemini 3.8 Flash ships" },
      { date: "Sep 2026", label: "Gemini 4 Argon announced to partners" },
      { date: "Oct 2026", label: "Argon general availability", value: "$2 / $10 promo" },
      { date: "Oct 2026", label: "Arena Elo record", value: "1532" },
      { date: "Oct 2026", label: "Q3 earnings · Oct 28" },
      { date: "Dec 2026", label: "Argon list price steps up", value: "$4 / $20" },
    ],
  },
  {
    id: "meta",
    name: "Meta AI",
    short: "Meta",
    monogram: "ME",
    color: "#4f8cff",
    founded: "2013",
    hq: "Menlo Park, US",
    ceo: "Mark Zuckerberg",
    employees: "~75,000",
    tier: "Hyperscaler",
    tagline: "Open ambition, ad-funded distribution.",
    description:
      "Meta Superintelligence Labs reset the roadmap in 2026. The Muse family and an open-weights release put Meta back in the frontier conversation, while advertising still pays for the buildout.",
    valuation: "$1.9T",
    valuationNote: "Meta market cap · est. Oct 2026",
    valuationN: 1900,
    arr: null,
    revenue: "$60.8B",
    revenueNote: "Q2 2026 revenue · +28% YoY",
    capital: "$130–145B",
    capitalNote: "2026 capex guide",
    multiple: "—",
    multipleNote: "No standalone AI revenue disclosure",
    burn: "FCF under pressure",
    burnNote: "$0.8B Q2 free cash flow as capex absorbs cash",
    ipo: "Public · META",
    website: "https://ai.meta.com",
    socials: {
      x: "https://x.com/AIatMeta",
      linkedin: "https://www.linkedin.com/company/meta",
      github: "https://github.com/facebookresearch",
      blog: "https://ai.meta.com/blog/",
    },
    revenueMix: [
      { label: "Advertising", value: 92 },
      { label: "AI products", value: 4 },
      { label: "Devices & other", value: 4 },
    ],
    mixNote: "Meta reports at the segment level; AI monetization is embedded in ads.",
    backers: ["Public markets", "Institutional investors"],
    highlights: [
      "Muse Wonder became the top open-weight-adjacent release of October.",
      "Meta runs one of the largest owned compute fleets in the world.",
      "Ad-ranking improvements are the clearest near-term AI ROI signal.",
    ],
    risks: [
      "Capital intensity is rising faster than disclosed AI revenue.",
      "Talent and organizational churn have followed the superintelligence reset.",
      "Open-weight strategy can commoditize the layer above Meta's own ads business.",
    ],
    history: [
      { date: "Jun 2026", label: "Meta Superintelligence Labs restructure" },
      { date: "Aug 2026", label: "Capex guide raised twice", value: "$130–145B" },
      { date: "Sep 2026", label: "Muse Spark 1.3 ships" },
      { date: "Oct 2026", label: "Muse Wonder + Muse Spark Open" },
      { date: "Oct 2026", label: "Q3 earnings · Oct 21" },
      { date: "2026", label: "$279B in signed data-center leases" },
    ],
  },
  {
    id: "xai",
    name: "SpaceXAI",
    short: "xAI",
    monogram: "XA",
    color: "#d7dde6",
    founded: "2023",
    hq: "Palo Alto, US",
    ceo: "Elon Musk",
    employees: "~1,500",
    tier: "Frontier lab",
    tagline: "A lab inside the SpaceX orbit.",
    description:
      "xAI is no longer a standalone startup. Absorbed into SpaceX in February 2026, the Grok team now operates inside a public company with compute, launch and satellite infrastructure attached.",
    valuation: "$250B",
    valuationNote: "xAI mark · SpaceX acquisition, Feb 2026",
    valuationN: 250,
    arr: 3.3,
    revenue: "$2.56B",
    revenueNote: "AI segment Q2 2026 · includes X",
    capital: "$20B",
    capitalNote: "Series E · Jan 2026",
    multiple: "76×",
    multipleNote: "Acquisition mark / annualized Q1 revenue",
    burn: "Operating loss",
    burnNote: "$1.26B AI-segment operating loss in Q2 2026",
    ipo: "Public via SpaceX · Nasdaq, Jun 2026",
    website: "https://x.ai",
    socials: {
      x: "https://x.com/xai",
      linkedin: "https://www.linkedin.com/company/x-ai",
      blog: "https://x.ai/news",
    },
    revenueMix: [
      { label: "X subscriptions", value: 34 },
      { label: "Enterprise API", value: 30 },
      { label: "AI compute", value: 26 },
      { label: "Data licensing", value: 10 },
    ],
    mixNote: "Modeled from the SpaceX AI segment, which also includes X advertising.",
    backers: ["SpaceX", "Valor", "Fidelity", "QIA", "NVIDIA", "Cisco"],
    highlights: [
      "Grok 4.7 holds a credible third-place position on agentic tool use.",
      "X provides a live distribution and data channel no rival can copy exactly.",
      "SpaceX capital access and compute make the lab strategically durable.",
    ],
    risks: [
      "AI-segment losses remain large relative to disclosed revenue.",
      "Standalone xAI financials are now buried inside SpaceX reporting.",
      "Governance and brand concentration around one founder remain unusual.",
    ],
    history: [
      { date: "Jan 2026", label: "Series E closes", value: "$20B at ~$230B" },
      { date: "Feb 2026", label: "SpaceX acquires xAI", value: "$250B all-stock" },
      { date: "Jun 2026", label: "SpaceX lists on Nasdaq" },
      { date: "Aug 2026", label: "Grok 4.6 ships" },
      { date: "Sep 2026", label: "Grok 4.7 ships", value: "$2 / $6 per 1M" },
      { date: "Oct 2026", label: "AI segment Q2 revenue disclosed", value: "$2.56B" },
    ],
  },
  {
    id: "mistral",
    name: "Mistral AI",
    short: "Mistral",
    monogram: "MI",
    color: "#ff7a2f",
    founded: "2023",
    hq: "Paris, France",
    ceo: "Arthur Mensch",
    employees: "~1,000",
    tier: "Open-weight challenger",
    tagline: "Europe's sovereign frontier lab.",
    description:
      "Mistral has converted the demand for data residency into a real business. A $1B ARR milestone and a Samsung-led round make it the most credible non-US, non-Chinese challenger.",
    valuation: "$24.4B",
    valuationNote: "€21B+ Series D · Sep 2026",
    valuationN: 24.4,
    arr: 1,
    revenue: "$1B+",
    revenueNote: "ARR · Sep 2026",
    capital: "€3B",
    capitalNote: "Series D · Sep 2026",
    multiple: "24×",
    multipleNote: "Series D valuation / ARR",
    burn: "Growth investment",
    burnNote: "Margins not disclosed; sovereign deployments carry services costs",
    ipo: "Private · IPO remains an option",
    website: "https://mistral.ai",
    socials: {
      x: "https://x.com/MistralAI",
      linkedin: "https://www.linkedin.com/company/mistral-ai",
      github: "https://github.com/mistralai",
      blog: "https://mistral.ai/news",
    },
    revenueMix: [
      { label: "Enterprise API", value: 54 },
      { label: "Sovereign deployments", value: 24 },
      { label: "Consumer subscriptions", value: 12 },
      { label: "Licensing", value: 10 },
    ],
    mixNote: "Modeled from company commentary; Mistral does not publish a segment split.",
    backers: ["Samsung", "ASML", "NVIDIA", "EQT", "Bpifrance", "Salesforce Ventures", "a16z"],
    highlights: [
      "Crossed $1B ARR roughly three years after founding.",
      "Sovereign AI contracts create a moat around procurement and compliance.",
      "Open weights drive adoption where closed APIs cannot be deployed.",
    ],
    risks: [
      "Frontier capability still trails the top three US labs on several boards.",
      "European public-sector budgets move more slowly than private demand.",
      "Open weights invite price competition from Asian labs with lower cost bases.",
    ],
    history: [
      { date: "Feb 2025", label: "Mistral 3 launch wave" },
      { date: "Feb 2026", label: "ARR passes $400M" },
      { date: "Sep 2026", label: "Series D closes", value: "€3B at €21B+" },
      { date: "Sep 2026", label: "ARR crosses $1B" },
      { date: "Oct 2026", label: "Mistral Large 4 ships", value: "$0.68 / $2.09" },
      { date: "2026", label: "Sovereign AI pipeline expands" },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    short: "DeepSeek",
    monogram: "DS",
    color: "#5a7dff",
    founded: "2023",
    hq: "Hangzhou, China",
    ceo: "Liang Wenfeng",
    employees: "~300",
    tier: "Open-weight challenger",
    tagline: "Efficiency as a business weapon.",
    description:
      "DeepSeek's open-weight models and brutal pricing keep deflationary pressure on the entire API market. A reported $74B round would mark one of the highest revenue multiples in AI.",
    valuation: "$74B",
    valuationNote: "Reported round target · 2026",
    valuationN: 74,
    arr: 1,
    revenue: "$1B",
    revenueNote: "Annualized · Sep 2026",
    capital: "$7.5B",
    capitalNote: "Reported raise · 2026",
    multiple: "74×",
    multipleNote: "Reported target / annualized revenue",
    burn: "API profitable",
    burnNote: "82.9% gross margin on API; chatbot is free",
    ipo: "IPO path reported · not confirmed",
    website: "https://www.deepseek.com",
    socials: {
      x: "https://x.com/deepseek_ai",
      github: "https://github.com/deepseek-ai",
      blog: "https://api-docs.deepseek.com/news",
    },
    revenueMix: [
      { label: "API", value: 100 },
    ],
    mixNote: "All disclosed revenue is API; consumer chat generates no revenue.",
    backers: ["High-Flyer", "Reported Chinese institutional investors"],
    highlights: [
      "DeepSeek V4.1 Flash offers frontier-adjacent capability at $0.15 / $0.60 per 1M.",
      "The company reaches $1B annualized revenue with a tiny team.",
      "Open weights distribute the model far beyond DeepSeek's own serving capacity.",
    ],
    risks: [
      "Revenue is tiny relative to the reported valuation and funding target.",
      "US export controls constrain access to leading compute.",
      "Geopolitical restrictions limit Western enterprise adoption.",
    ],
    history: [
      { date: "Jan 2025", label: "R1 triggers global repricing" },
      { date: "Jul 2026", label: "Annualized revenue nears $500M" },
      { date: "Sep 2026", label: "V4.1 Flash launches" },
      { date: "Sep 2026", label: "Revenue crosses $1B", value: "82.9% API GM" },
      { date: "Oct 2026", label: "V4.1 Flash 1017 refresh" },
      { date: "2026", label: "$7.5B raise reported" },
    ],
  },
  {
    id: "moonshot",
    name: "Moonshot AI",
    short: "Moonshot",
    monogram: "MO",
    color: "#a78bfa",
    founded: "2023",
    hq: "Beijing, China",
    ceo: "Yang Zhilin",
    employees: "~1,000",
    tier: "Open-weight challenger",
    tagline: "China's open-weight breakout.",
    description:
      "Kimi K3 made Moonshot a global name in open models. Revenue inflected from $300M to $1B in two months, and a pre-IPO round at $50B is reportedly in motion.",
    valuation: "$50B",
    valuationNote: "Reported pre-IPO talks · 2026",
    valuationN: 50,
    arr: 1,
    revenue: "$1B",
    revenueNote: "ARR · Aug 2026",
    capital: "In talks",
    capitalNote: "Pre-IPO financing reported",
    multiple: "50×",
    multipleNote: "Reported mark / Aug ARR",
    burn: "Not disclosed",
    burnNote: "Private; heavy training and inference investment",
    ipo: "Pre-IPO · Hong Kong reported",
    website: "https://www.moonshot.ai",
    socials: {
      x: "https://x.com/Kimi_Moonshot",
      github: "https://github.com/MoonshotAI",
      blog: "https://moonshot.ai/blog",
    },
    revenueMix: [
      { label: "API", value: 52 },
      { label: "Consumer subscriptions", value: 38 },
      { label: "Enterprise", value: 10 },
    ],
    mixNote: "Modeled from reported ARR and product commentary.",
    backers: ["Alibaba", "Tencent", "HongShan", "IDG Capital", "Reported sovereign funds"],
    highlights: [
      "Kimi K3 is the highest-ranked open-weights model on several aggregators.",
      "ARR grew from $300M in June to $1B in August 2026.",
      "Long-context and agentic coding are credible alternatives to US flagships.",
    ],
    risks: [
      "Revenue growth is recent and its durability is untested.",
      "Export controls and domestic chip supply shape the training roadmap.",
      "Consumer AI in China monetizes at low ARPU relative to enterprise.",
    ],
    history: [
      { date: "Apr 2026", label: "Kimi ARR passes $200M" },
      { date: "Jun 2026", label: "ARR reaches $300M" },
      { date: "Aug 2026", label: "ARR crosses $1B" },
      { date: "Sep 2026", label: "$50B pre-IPO talks reported" },
      { date: "Oct 2026", label: "Kimi K3 gains on open leaderboards" },
      { date: "2026", label: "Hong Kong listing path" },
    ],
  },
  {
    id: "zai",
    name: "Z.ai",
    short: "Z.ai",
    monogram: "ZA",
    color: "#38d9d0",
    founded: "2019",
    hq: "Beijing, China",
    ceo: "Zhang Peng",
    employees: "~2,000",
    tier: "Open-weight challenger",
    tagline: "The enterprise open-model specialist.",
    description:
      "Zhipu's Z.ai is now a listed company with $1.6B ARR and a fast-growing GLM franchise. Its edge is cost-efficient open models tuned for enterprise agents.",
    valuation: "Listed · HKEX",
    valuationNote: "IPO Jan 2026 · raised $558M",
    valuationN: null,
    arr: 1.6,
    revenue: "$1.6B",
    revenueNote: "ARR · end-Aug 2026",
    capital: "$558M",
    capitalNote: "Hong Kong IPO · Jan 2026",
    multiple: "—",
    multipleNote: "Public multiple moves daily",
    burn: "Narrowing losses",
    burnNote: "H1 2026 losses narrowed on cloud gains",
    ipo: "Public · HKEX since Jan 2026",
    website: "https://z.ai",
    socials: {
      x: "https://x.com/Zai_org",
      github: "https://github.com/zai-org",
      blog: "https://z.ai/blog",
    },
    revenueMix: [
      { label: "Enterprise", value: 64 },
      { label: "API", value: 24 },
      { label: "Consumer", value: 12 },
    ],
    mixNote: "Modeled from ARR disclosure and first-half results commentary.",
    backers: ["Public markets", "Alibaba", "Tencent", "Legend Capital", "Sequoia China"],
    highlights: [
      "ARR jumped to $1.6B by August 2026, helped by explosive cloud gains.",
      "GLM-5.3 Flash is one of the cheapest credible agentic models available.",
      "Public listing provides a currency for compute and talent.",
    ],
    risks: [
      "Enterprise projects carry service and customization costs.",
      "Margin pressure from Chinese API price competition is intense.",
      "Access to frontier accelerators remains a structural constraint.",
    ],
    history: [
      { date: "Jan 2026", label: "Hong Kong IPO", value: "$558M raised" },
      { date: "Aug 2026", label: "GLM-5.3 launches", value: "$1.40 / $4.40" },
      { date: "Aug 2026", label: "ARR reaches $1.6B" },
      { date: "Aug 2026", label: "GLM-5.3 Flash ships", value: "$0.15 / $0.50" },
      { date: "Sep 2026", label: "GLM 5.3 Prime ships" },
      { date: "Oct 2026", label: "Cached input pricing cut" },
    ],
  },
  {
    id: "minimax",
    name: "MiniMax",
    short: "MiniMax",
    monogram: "MM",
    color: "#ff6fae",
    founded: "2021",
    hq: "Shanghai, China",
    ceo: "Yan Junjie",
    employees: "~1,500",
    tier: "Open-weight challenger",
    tagline: "Multimodal models at consumer prices.",
    description:
      "MiniMax pairs fast, cheap text models with a broad multimodal portfolio. A January IPO and $800M ARR make it one of China's most closely watched AI listings.",
    valuation: "Listed · HKEX",
    valuationNote: "IPO Jan 2026 · raised $619M",
    valuationN: null,
    arr: 0.8,
    revenue: "$800M",
    revenueNote: "ARR · Aug 2026",
    capital: "$619M",
    capitalNote: "Hong Kong IPO · Jan 2026",
    multiple: "—",
    multipleNote: "Public multiple moves daily",
    burn: "Not disclosed",
    burnNote: "H1 2026 revenue $116.6M, +283% YoY",
    ipo: "Public · HKEX since Jan 2026",
    website: "https://www.minimax.io",
    socials: {
      x: "https://x.com/MiniMax_AI",
      github: "https://github.com/MiniMax-AI",
      blog: "https://www.minimax.io/news",
    },
    revenueMix: [
      { label: "API", value: 46 },
      { label: "Consumer", value: 39 },
      { label: "Enterprise", value: 15 },
    ],
    mixNote: "Modeled from public filings and product mix.",
    backers: ["Public markets", "Alibaba", "Tencent", "IDG", "Hillhouse"],
    highlights: [
      "M3.1 Flash launched at $0.15 / $0.60 per 1M tokens.",
      "ARR rose to $800M in August 2026.",
      "Multimodal output broadens the funnel beyond text APIs.",
    ],
    risks: [
      "Standalone text capability trails the top open-weight rivals.",
      "Consumer app economics are thin across the Chinese market.",
      "Post-IPO capital may not close the compute gap.",
    ],
    history: [
      { date: "Jan 2026", label: "Hong Kong IPO", value: "$619M raised" },
      { date: "Aug 2026", label: "ARR reaches $800M" },
      { date: "Aug 2026", label: "H1 revenue +283% YoY" },
      { date: "Oct 2026", label: "MiniMax M3.1 Flash", value: "$0.15 / $0.60" },
      { date: "2026", label: "Hailuo video franchise expands" },
      { date: "2026", label: "Enterprise API push" },
    ],
  },
  {
    id: "xiaomi",
    name: "Xiaomi MiMo",
    short: "Xiaomi",
    monogram: "XI",
    color: "#ff6900",
    founded: "2023",
    hq: "Beijing, China",
    ceo: "Lei Jun",
    employees: "~45,000",
    tier: "Open-weight challenger",
    tagline: "A hardware giant's open-model bet.",
    description:
      "Xiaomi's MiMo team turned a device-company skunkworks into a top-20 model lab. MiMo-V2.6-Pro combines a million-token context with sub-dollar output pricing, aimed at phones, cars and consumer agents.",
    valuation: "Listed · HKEX",
    valuationNote: "Xiaomi group · public",
    valuationN: null,
    arr: null,
    revenue: "n/a",
    revenueNote: "MiMo revenue not separately disclosed",
    capital: "Internal",
    capitalNote: "Funded from Xiaomi's balance sheet",
    multiple: "—",
    multipleNote: "AI unit embedded in a public hardware group",
    burn: "Strategic investment",
    burnNote: "No standalone AI P&L disclosure",
    ipo: "Public parent · HKEX 1810",
    website: "https://mimo.xiaomi.com",
    socials: {
      x: "https://x.com/Xiaomi",
      linkedin: "https://www.linkedin.com/company/xiaomi",
      github: "https://github.com/XiaomiMiMo",
      blog: "https://mimo.xiaomi.com/blog",
    },
    revenueMix: [
      { label: "Devices & agents", value: 58 },
      { label: "API", value: 27 },
      { label: "Licensing", value: 15 },
    ],
    mixNote: "Modeled from the group's AI strategy; no separate MiMo financials are public.",
    backers: ["Xiaomi Group"],
    highlights: [
      "MiMo-V2.6-Pro landed top-20 overall on its first ranking.",
      "Arena Elo of 1490.7 is extraordinary for a sub-dollar model.",
      "Distribution across phones, cars and smart home is a unique channel.",
    ],
    risks: [
      "No standalone AI revenue or margin disclosure.",
      "Hardware margins fund a business with no direct R&D return yet.",
      "Model quality must be sustained across device constraints.",
    ],
    history: [
      { date: "Sep 2026", label: "MiMo-V2.6-Pro launches", value: "$0.435 / $0.87" },
      { date: "Sep 2026", label: "MiMo-V2.6-Flash ships", value: "$0.14 / $0.28" },
      { date: "Oct 2026", label: "MiMo enters top-20 overall" },
      { date: "Oct 2026", label: "Arena Elo reaches 1490.7" },
      { date: "2026", label: "On-device agent rollout expands" },
      { date: "2026", label: "Open-weight downloads climb" },
    ],
  },
  {
    id: "alibaba",
    name: "Qwen · Alibaba",
    short: "Alibaba",
    monogram: "QW",
    color: "#ff8a3d",
    founded: "2019",
    hq: "Hangzhou, China",
    ceo: "Eddie Wu",
    employees: "~200,000 (Alibaba)",
    tier: "Hyperscaler",
    tagline: "The open-weight distribution machine.",
    description:
      "Qwen's open models are everywhere, from Western startups to Chinese devices. Alibaba's AI cloud and compute segment is now a $7B quarterly business and the commercial engine behind that reach.",
    valuation: "$310B",
    valuationNote: "Alibaba market cap · est. Oct 2026",
    valuationN: 310,
    arr: null,
    revenue: "$7.14B",
    revenueNote: "AI cloud & compute Q2 2026",
    capital: "~$53B",
    capitalNote: "3-year AI infrastructure plan",
    multiple: "—",
    multipleNote: "AI revenue not separately disclosed",
    burn: "Cloud profitable",
    burnNote: "Segment profitability varies by quarter",
    ipo: "Public · NYSE / HKEX",
    website: "https://qwen.ai",
    socials: {
      x: "https://x.com/Alibaba_Qwen",
      github: "https://github.com/QwenLM",
      blog: "https://qwen.ai/blog",
    },
    revenueMix: [
      { label: "Cloud & compute", value: 61 },
      { label: "Enterprise AI", value: 24 },
      { label: "Consumer apps", value: 9 },
      { label: "API", value: 6 },
    ],
    mixNote: "Modeled at the Alibaba segment level; Qwen licensing is not disclosed.",
    backers: ["Public markets"],
    highlights: [
      "Qwen 3.8 Max is a top-20 overall model and a leading open-weight option.",
      "Alibaba's AI cloud revenue reached $7.14B in the June quarter.",
      "Open distribution seeds enterprise demand across Asia.",
    ],
    risks: [
      "Geopolitical constraints affect Western adoption.",
      "Cloud growth is increasingly expensive to sustain.",
      "Model quality leadership changes hands quickly in China.",
    ],
    history: [
      { date: "Jun 2026", label: "AI cloud revenue hits $7.14B" },
      { date: "Aug 2026", label: "Qwen 3.8 Flash ships", value: "$0.15 / $0.47" },
      { date: "Sep 2026", label: "Qwen 3.8 Max ships", value: "$2 / $6" },
      { date: "Sep 2026", label: "Qwen3.8 Max Prime ships" },
      { date: "Oct 2026", label: "Qwen3.8 Omni Flash ships" },
      { date: "2026", label: "Open-weight downloads climb" },
    ],
  },
  {
    id: "cohere",
    name: "Cohere",
    short: "Cohere",
    monogram: "CO",
    color: "#7dd3a7",
    founded: "2019",
    hq: "Toronto, Canada",
    ceo: "Aidan Gomez",
    employees: "~500",
    tier: "Open-weight challenger",
    tagline: "Private deployment for the enterprise.",
    description:
      "Cohere stays deliberately out of the consumer race. Command models, sovereign deployments and retrieval infrastructure target regulated enterprises that cannot send data to a hyperscaler.",
    valuation: "$7B",
    valuationNote: "Sep 2025 round · reported $20B target",
    valuationN: 7,
    arr: 0.24,
    revenue: "$240M",
    revenueNote: "ARR · end-2025",
    capital: "$600M+",
    capitalNote: "Total disclosed equity",
    multiple: "29×",
    multipleNote: "Last priced mark / ARR",
    burn: "Not disclosed",
    burnNote: "Private; enterprise delivery heavy",
    ipo: "Private",
    website: "https://cohere.com",
    socials: {
      x: "https://x.com/cohere",
      linkedin: "https://www.linkedin.com/company/cohere-ai",
      github: "https://github.com/cohere-ai",
      blog: "https://cohere.com/blog",
    },
    revenueMix: [
      { label: "Enterprise & sovereign", value: 78 },
      { label: "API", value: 14 },
      { label: "Partnerships", value: 8 },
    ],
    mixNote: "Modeled from company positioning; no public segment disclosure.",
    backers: ["NVIDIA", "AMD Ventures", "Salesforce Ventures", "Schwarz Group", "Radical Ventures", "Inovia"],
    highlights: [
      "Command A+ is priced for regulated, high-volume enterprise workloads.",
      "Sovereign AI demand is a durable niche that hyperscalers serve imperfectly.",
      "North American enterprise relationships create a defensible pipeline.",
    ],
    risks: [
      "Revenue scale is an order of magnitude below the frontier labs.",
      "The model-quality gap limits premium pricing.",
      "Enterprise deployment is labor-intensive and harder to scale.",
    ],
    history: [
      { date: "Sep 2025", label: "Second close", value: "$7B mark" },
      { date: "2026", label: "Sovereign deployment pipeline grows" },
      { date: "Sep 2026", label: "Command A+ ships", value: "$0.30 / $1.50" },
      { date: "2026", label: "Reported $20B target in talks" },
      { date: "2026", label: "Enterprise agent push" },
      { date: "2026", label: "ARR $240M" },
    ],
  },
];

export const MODELS: Model[] = [
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    labId: "anthropic",
    license: "Proprietary",
    released: "2026-09-22",
    context: 1000000,
    input: 4,
    output: 20,
    cached: 0.2,
    score: 86.7,
    benchmarks: { gpqa: 90.6, swe: 83.0, terminal: 66.4, hle: 65.0, mmmu: 87.7, arena: 1504 },
    speed: 95,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "The current quality ceiling for professional knowledge work. Opus 5.5 leads on long-horizon reasoning, large-context retrieval and terminal-based agent work, at a premium token price.",
    strengths: ["Long-context analysis", "Agentic coding", "Research-grade reasoning", "Enterprise workflows"],
    bestFor: "High-stakes analysis, multi-hour agent runs and coding where correctness beats cost.",
    tags: ["Reasoning", "Coding", "1M context", "Vision"],
  },
  {
    id: "gpt-6-1-sol",
    name: "GPT-6.1 Sol",
    labId: "openai",
    license: "Proprietary",
    released: "2026-09-29",
    context: 1050000,
    input: 2,
    output: 10,
    cached: 0.1,
    score: 84.2,
    benchmarks: { gpqa: 95.4, swe: 78.2, terminal: 55.6, hle: 61.3, mmmu: 84.1, arena: 1497 },
    speed: 196,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "OpenAI's production-optimized flagship. It pairs top-tier science scores with reliable tool use and the best price-to-capability ratio among frontier models.",
    strengths: ["Tool use", "Science reasoning", "Broad multimodal work", "Cost efficiency"],
    bestFor: "Production agents, high-volume reasoning and teams that need frontier quality at $2 / $10.",
    tags: ["Reasoning", "Tools", "1M context", "Value"],
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra",
    labId: "openai",
    license: "Proprietary",
    released: "2026-09-03",
    context: 1050000,
    input: 10,
    output: 50,
    cached: 1,
    score: 84.0,
    benchmarks: { gpqa: 95.8, swe: 74.8, terminal: 57.9, hle: 54.8, mmmu: 86.9, arena: 1489 },
    speed: 62,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "The heavyweight GPT-6 tier. Astra trades latency and price for the strongest ARC-AGI-2 score in the field and excellent complex visual reasoning.",
    strengths: ["Abstract reasoning", "Visual problem solving", "Search-augmented analysis", "Long research tasks"],
    bestFor: "Hard, low-volume problems where a single answer is worth $50 per million output tokens.",
    tags: ["Reasoning", "Vision", "Premium", "1M context"],
  },
  {
    id: "claude-fable-5-1",
    name: "Claude Fable 5.1",
    labId: "anthropic",
    license: "Proprietary",
    released: "2026-09-01",
    context: 1000000,
    input: 10,
    output: 50,
    cached: 0.25,
    score: 83.3,
    benchmarks: { gpqa: 93.4, swe: 81.2, terminal: 55.8, hle: 65.0, mmmu: 85.4, arena: 1511.6 },
    speed: 71,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "Anthropic's premium creative and research model. Fable leads deeply open-ended tasks and chart understanding, with the highest HLE score in the tracked set.",
    strengths: ["Creative reasoning", "Chart comprehension", "Deep research", "Nuanced writing"],
    bestFor: "Research synthesis, complex documents and premium creative work with generous budgets.",
    tags: ["Premium", "Research", "Vision", "Long context"],
  },
  {
    id: "gemini-4-argon",
    name: "Gemini 4 Argon",
    labId: "google",
    license: "Proprietary",
    released: "2026-10-13",
    context: 1000000,
    input: 2,
    output: 10,
    cached: 0.1,
    score: 82.9,
    benchmarks: { gpqa: 96.4, swe: 77.9, terminal: 57.4, hle: 60.2, mmmu: 89.4, arena: 1532.3 },
    speed: 84,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "The newest frontier release and the current Arena favourite. Argon leads multimodal understanding and graduate science, with introductory pricing that undercuts Anthropic.",
    strengths: ["Multimodal understanding", "Science knowledge", "Long video", "Value at launch pricing"],
    bestFor: "Vision-heavy products and general frontier work at half the Opus 5.5 price until Nov 30.",
    tags: ["Vision", "Reasoning", "1M context", "Promo pricing"],
  },
  {
    id: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    labId: "anthropic",
    license: "Proprietary",
    released: "2026-09-28",
    context: 1000000,
    input: 2,
    output: 10,
    cached: 0.2,
    score: 82.3,
    benchmarks: { gpqa: 95.6, swe: 72.4, terminal: 70.6, hle: 58.9, mmmu: 82.3, arena: 1498 },
    speed: 138,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "The workhorse of the Claude line. Sonnet 5.5 tops terminal-agent benchmarks and is the best value for Claude Code, at the same $2 / $10 as GPT-6.1 Sol.",
    strengths: ["Terminal agents", "Coding", "Document work", "Balanced price"],
    bestFor: "Software teams running Claude Code all day; the best price/performance in the Claude family.",
    tags: ["Coding", "Agents", "1M context", "Value"],
  },
  {
    id: "muse-wonder-full",
    name: "Muse Wonder Full",
    labId: "meta",
    license: "Proprietary",
    released: "2026-10-12",
    context: 1000000,
    input: 4,
    output: 20,
    score: 80.7,
    benchmarks: { gpqa: 92.0, swe: 76.1, terminal: 61.8, hle: 62.1, mmmu: 82.0, arena: 1501 },
    speed: 118,
    evidence: "Estimated",
    params: "Undisclosed",
    summary:
      "Meta's comeback flagship. Muse Wonder Full matches the mid-frontier on agentic coding and research, and is unusually strong for a lab that still ships open weights.",
    strengths: ["Agentic coding", "Open ecosystem lineage", "Long context", "General reasoning"],
    bestFor: "Teams that want Meta distribution or a non-US, non-Anthropic frontier option with open cousins.",
    tags: ["Open ecosystem", "Coding", "1M context", "Frontier"],
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    labId: "moonshot",
    license: "Open weights",
    released: "2026-08-28",
    context: 1000000,
    input: 3,
    output: 15,
    score: 76.2,
    benchmarks: { gpqa: 93.5, swe: 79.4, terminal: 58.7, hle: 56.0, mmmu: 78.2, arena: 1489 },
    speed: 87,
    evidence: "Verified",
    params: "Undisclosed MoE",
    summary:
      "The benchmark leader among open-weight models. K3 proves that Chinese open releases can land within a few points of the US frontier, especially in coding.",
    strengths: ["Open weights", "Coding", "Long context", "Self-hosting"],
    bestFor: "Enterprises that need frontier-adjacent quality with open deployment and lower cost.",
    tags: ["Open weights", "Coding", "1M context", "China"],
  },
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    labId: "google",
    license: "Proprietary",
    released: "2026-09-02",
    context: 1000000,
    input: 0.75,
    output: 3.75,
    score: 69.2,
    benchmarks: { gpqa: 95.4, swe: 73.1, terminal: 52.4, hle: 44.5, mmmu: 85.6, arena: 1498.9 },
    speed: 382,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "The price-performance benchmark. Flash scores within a few points of flagships on knowledge and vision while costing a fraction and running multiple times faster.",
    strengths: ["Speed", "Low cost", "Vision", "High throughput"],
    bestFor: "Consumer-scale inference, classification, extraction and vision tasks at volume.",
    tags: ["Value", "Speed", "Vision", "1M context"],
  },
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    labId: "openai",
    license: "Proprietary",
    released: "2026-09-22",
    context: 1050000,
    input: 0.1,
    output: 0.5,
    cached: 0.01,
    score: 66.6,
    benchmarks: { gpqa: 90.5, swe: 66.4, terminal: 34.9, hle: 40.8, mmmu: 76.4, arena: 1468 },
    speed: 340,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "Frontier-adjacent knowledge at commodity prices. Luna brings a 1M context and 90%+ GPQA for ten cents per million input tokens, resetting the value frontier.",
    strengths: ["Extreme value", "1M context", "Fast", "Knowledge"],
    bestFor: "High-volume document pipelines, retrieval and agent subtasks where cost dominates.",
    tags: ["Value", "Fast", "1M context", "High volume"],
  },
  {
    id: "grok-4-7",
    name: "Grok 4.7",
    labId: "xai",
    license: "Proprietary",
    released: "2026-09-21",
    context: 500000,
    input: 2,
    output: 6,
    cached: 0.5,
    score: 74.1,
    benchmarks: { gpqa: 92.7, swe: 78.3, terminal: 57.1, hle: 51.8, mmmu: 80.1, arena: 1490 },
    speed: 210,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "A fast, cheap frontier challenger with strong real-time and tool-use behaviour. Grok 4.7 benefits from X distribution and aggressive output pricing.",
    strengths: ["Real-time knowledge", "Tool use", "Speed", "Low output cost"],
    bestFor: "Real-time agent workflows and applications already embedded in X or SpaceX infrastructure.",
    tags: ["Speed", "Tools", "Value", "Real-time"],
  },
  {
    id: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    labId: "deepseek",
    license: "Open weights",
    released: "2026-10-17",
    context: 1000000,
    input: 0.15,
    output: 0.6,
    cached: 0.015,
    score: 72.0,
    benchmarks: { gpqa: 90.9, swe: 74.0, terminal: 31.2, hle: 48.4, mmmu: 80.6, arena: 1471 },
    speed: 264,
    evidence: "Verified",
    params: "Open-weight MoE",
    summary:
      "The price floor for capable open models. Flash matches much larger models on knowledge and coding while undercutting almost every hosted API on output cost.",
    strengths: ["Open weights", "Price", "Knowledge", "Self-hosting"],
    bestFor: "Cost-sensitive production workloads and teams that want to own the serving layer.",
    tags: ["Open weights", "Value", "1M context", "Fast"],
  },
  {
    id: "qwen3-8-max",
    name: "Qwen3.8 Max",
    labId: "alibaba",
    license: "Open weights",
    released: "2026-09-03",
    context: 1000000,
    input: 2,
    output: 6,
    cached: 0.25,
    score: 74.6,
    benchmarks: { gpqa: 92.7, swe: 78.6, terminal: 56.2, hle: 49.8, mmmu: 82.8, arena: 1482.9 },
    speed: 156,
    evidence: "Verified",
    params: "Open-weight MoE",
    summary:
      "Alibaba's open flagship is a balanced all-rounder with strong coding, multimodal understanding and a low output price. It is the most widely deployed Chinese open family.",
    strengths: ["Open weights", "Coding", "Multimodal", "Ecosystem"],
    bestFor: "Teams standardizing on an open family across language, vision and code in one stack.",
    tags: ["Open weights", "Coding", "Vision", "1M context"],
  },
  {
    id: "mimo-v2-6-pro",
    name: "MiMo-V2.6-Pro",
    labId: "xiaomi",
    license: "Open weights",
    released: "2026-09-21",
    context: 1000000,
    input: 0.435,
    output: 0.87,
    score: 73.7,
    benchmarks: { gpqa: 91.8, swe: 71.9, terminal: 34.9, hle: 42.1, mmmu: 75.4, arena: 1490.7 },
    speed: 230,
    evidence: "Estimated",
    params: "Undisclosed",
    summary:
      "Xiaomi's open-weight surprise. MiMo lands top-20 overall at sub-dollar output pricing, proof that hardware-adjacent players can ship competitive models.",
    strengths: ["Open weights", "Extreme value", "Arena performance", "Consumer devices"],
    bestFor: "Budget-constrained agent builders and on-device or edge-adjacent deployment experiments.",
    tags: ["Open weights", "Value", "1M context", "New entrant"],
  },
  {
    id: "glm-5-3",
    name: "GLM-5.3",
    labId: "zai",
    license: "Open weights",
    released: "2026-08-14",
    context: 1000000,
    input: 1.4,
    output: 4.4,
    cached: 0.26,
    score: 71.8,
    benchmarks: { gpqa: 90.9, swe: 77.2, terminal: 53.8, hle: 62.5, mmmu: 78.8, arena: 1479 },
    speed: 142,
    evidence: "Verified",
    params: "Open-weight MoE",
    summary:
      "Z.ai's enterprise workhorse scores exceptionally well on Humanity's Last Exam relative to its price. GLM-5.3 is optimized for long-horizon business agents.",
    strengths: ["Open weights", "Research reasoning", "Tool use", "Cost"],
    bestFor: "Enterprise agent platforms that need strong reasoning at a mid-market token price.",
    tags: ["Open weights", "Research", "Agents", "Value"],
  },
  {
    id: "mistral-large-4",
    name: "Mistral Large 4",
    labId: "mistral",
    license: "Open weights",
    released: "2026-10-06",
    context: 1000000,
    input: 0.68,
    output: 2.09,
    cached: 0.07,
    score: 66.8,
    benchmarks: { gpqa: 88.1, swe: 68.2, terminal: 47.6, hle: 38.2, mmmu: 77.4, arena: 1451 },
    speed: 120,
    evidence: "Verified",
    params: "Open-weight MoE",
    summary:
      "Europe's best open-weight option. Large 4 is efficient, multilingual and deployable on sovereign infrastructure, with a capability profile aimed at enterprise work rather than leaderboard peaks.",
    strengths: ["Sovereign deployment", "Open weights", "Multilingual", "Efficiency"],
    bestFor: "European enterprises and public-sector buyers that require data residency and open weights.",
    tags: ["Open weights", "Sovereign", "Multilingual", "Community"],
  },
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    labId: "anthropic",
    license: "Proprietary",
    released: "2026-10-07",
    context: 1000000,
    input: 0.1,
    output: 0.5,
    cached: 0.01,
    score: 67.2,
    benchmarks: { gpqa: 83.5, swe: 63.4, terminal: 41.2, hle: 34.8, mmmu: 72.9, arena: 1442 },
    speed: 410,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "Anthropic's fastest model, now with a 1M context and the same output price as GPT-6 Luna. Haiku is built for classification, extraction and high-volume assistant traffic.",
    strengths: ["Speed", "Low cost", "Long context", "Safety"],
    bestFor: "High-throughput agents, moderation and document processing inside the Claude ecosystem.",
    tags: ["Speed", "Value", "1M context", "High volume"],
  },
  {
    id: "minimax-m3-1-flash",
    name: "MiniMax M3.1 Flash",
    labId: "minimax",
    license: "Proprietary",
    released: "2026-10-19",
    context: 1000000,
    input: 0.15,
    output: 0.6,
    score: 67.1,
    benchmarks: { gpqa: 89.0, swe: 69.3, terminal: 38.5, hle: 36.1, mmmu: 73.8, arena: 1458 },
    speed: 333,
    evidence: "Estimated",
    params: "Undisclosed",
    summary:
      "A brand-new fast model at Chinese open-weight pricing. M3.1 Flash offers a 1M window and credible knowledge scores for fifteen cents per million input tokens.",
    strengths: ["Speed", "Price", "1M context", "Multimodal house"],
    bestFor: "Southeast Asian consumer apps and volume workloads that need a long context at low cost.",
    tags: ["Value", "Speed", "1M context", "New release"],
  },
  {
    id: "gpt-6-sol",
    name: "GPT-6 Sol",
    labId: "openai",
    license: "Proprietary",
    released: "2026-09-22",
    context: 1050000,
    input: 2,
    output: 10,
    cached: 0.2,
    score: 78.6,
    benchmarks: { gpqa: 94.3, swe: 68.8, terminal: 31.2, hle: 52.4, mmmu: 81.0, arena: 1476 },
    speed: 168,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "The base GPT-6 tier that established OpenAI's 2026 lead in broad reasoning. It is now mostly superseded by Sol, but remains widely deployed.",
    strengths: ["Broad reasoning", "Vision", "Tool use", "Ecosystem"],
    bestFor: "Existing GPT-6 deployments that have not yet moved to Sol.",
    tags: ["Reasoning", "1M context", "Vision"],
  },
  {
    id: "gemini-3-1-pro",
    name: "Gemini 3.1 Pro",
    labId: "google",
    license: "Proprietary",
    released: "2026-04-15",
    context: 1000000,
    input: 2,
    output: 12,
    cached: 0.2,
    score: 64.7,
    benchmarks: { gpqa: 94.4, swe: 80.6, terminal: 48.1, hle: 51.4, mmmu: 84.2, arena: 1486 },
    speed: 99,
    evidence: "Verified",
    params: "Undisclosed",
    summary:
      "The previous Gemini flagship still holds up on coding and science, but has been overtaken by Argon on multimodal reasoning and by Flash on economics.",
    strengths: ["Coding", "Science", "Google integration", "Vision"],
    bestFor: "Teams already standardized on Gemini 3.1 pipelines and Vertex tooling.",
    tags: ["Reasoning", "Coding", "Vision", "Legacy"],
  },
];

export interface PriceTool {
  id: string;
  name: string;
  maker: string;
  category: string;
  monogram: string;
  color: string;
  plans: { name: string; price: string; note: string }[];
  bestFor: string;
  note: string;
}

export const PRICE_TOOLS: PriceTool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    maker: "OpenAI",
    category: "Assistant",
    monogram: "GPT",
    color: "#27b591",
    plans: [
      { name: "Free", price: "$0", note: "Limited GPT-6 Luna" },
      { name: "Go", price: "$8/mo", note: "May include ads" },
      { name: "Plus", price: "$20/mo", note: "Codex included" },
      { name: "Pro", price: "$100–500/mo", note: "Usage tiers" },
    ],
    bestFor: "Broadest all-round AI utility.",
    note: "Pro 500 unlocks Ultrafast. Ads run on Free and Go.",
  },
  {
    id: "claude",
    name: "Claude",
    maker: "Anthropic",
    category: "Assistant",
    monogram: "CL",
    color: "#d9a786",
    plans: [
      { name: "Free", price: "$0", note: "Rolling limits" },
      { name: "Pro", price: "$20/mo", note: "$17/mo annually" },
      { name: "Max 5×", price: "$100/mo", note: "5× Pro usage" },
      { name: "Max 20×", price: "$200/mo", note: "20× Pro usage" },
    ],
    bestFor: "Long documents, writing and Claude Code.",
    note: "Claude Code shares the subscription usage pool.",
  },
  {
    id: "gemini",
    name: "Google AI",
    maker: "Google",
    category: "Assistant",
    monogram: "GA",
    color: "#8ab4f8",
    plans: [
      { name: "Free", price: "$0", note: "Flash-Lite access" },
      { name: "AI Plus", price: "$4.99/mo", note: "2× free limits" },
      { name: "AI Pro", price: "$19.99/mo", note: "Argon + 5TB" },
      { name: "AI Ultra", price: "$99.99–199.99/mo", note: "5× or 20×" },
    ],
    bestFor: "Google Workspace and storage bundling.",
    note: "Students can claim a year of AI Pro through Dec 31, 2026.",
  },
  {
    id: "grok",
    name: "Grok",
    maker: "xAI",
    category: "Assistant",
    monogram: "X",
    color: "#d7dde6",
    plans: [
      { name: "Free", price: "$0", note: "Limited" },
      { name: "Plus", price: "$8/mo", note: "X subscription" },
      { name: "Super", price: "$100/mo", note: "Higher usage" },
      { name: "Ultra", price: "$200/mo", note: "Highest usage" },
    ],
    bestFor: "Real-time X data and cheap frontier access.",
    note: "Premium tier at $30/mo sits between Plus and Super.",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    maker: "Perplexity",
    category: "Research",
    monogram: "PX",
    color: "#20b8cd",
    plans: [
      { name: "Free", price: "$0", note: "Cited search" },
      { name: "Pro", price: "$17/mo", note: "Annual billing" },
      { name: "Max", price: "$167/mo", note: "Annual billing" },
    ],
    bestFor: "Cited research and model routing.",
    note: "Monthly Pro is historically $20; verify in-app.",
  },
  {
    id: "cursor",
    name: "Cursor",
    maker: "Cursor · SpaceX",
    category: "Coding",
    monogram: "CU",
    color: "#c9ff4d",
    plans: [
      { name: "Free", price: "$0", note: "Limited agent requests" },
      { name: "Plus", price: "$8/mo", note: "Grok-only pool" },
      { name: "Premium", price: "$30/mo", note: "4× Plus; API extra" },
      { name: "Super / Ultra", price: "$100 / $200", note: "15× / 50× usage" },
    ],
    bestFor: "An AI-native editor with cloud agents.",
    note: "Third-party Claude, GPT and Gemini usage bills at API list price.",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    maker: "GitHub · Microsoft",
    category: "Coding",
    monogram: "GH",
    color: "#a7b0bd",
    plans: [
      { name: "Free", price: "$0", note: "2,000 completions" },
      { name: "Pro", price: "$10/mo", note: "1,500 credits" },
      { name: "Pro+", price: "$39/mo", note: "7,000 credits" },
      { name: "Max", price: "$100/mo", note: "20,000 credits" },
    ],
    bestFor: "Teams already inside GitHub.",
    note: "Usage-based AI credits; 1 credit = $0.01.",
  },
  {
    id: "devin",
    name: "Devin",
    maker: "Cognition",
    category: "Coding",
    monogram: "DV",
    color: "#ff9666",
    plans: [
      { name: "Free", price: "$0", note: "Light quota" },
      { name: "Pro", price: "$20/mo", note: "Daily + weekly" },
      { name: "Max", price: "$200/mo", note: "No daily cap" },
    ],
    bestFor: "Delegated software engineering work.",
    note: "On-demand credits at API pricing; roll over.",
  },
  {
    id: "m365",
    name: "Microsoft 365",
    maker: "Microsoft",
    category: "Productivity",
    monogram: "M365",
    color: "#ffb84d",
    plans: [
      { name: "Personal", price: "$9.99/mo", note: "Includes Copilot" },
      { name: "Family", price: "$12.99/mo", note: "Owner gets Copilot" },
      { name: "Premium", price: "$19.99/mo", note: "Replaces Copilot Pro" },
    ],
    bestFor: "Office-centric workflows.",
    note: "Copilot Pro is no longer sold separately.",
  },
  {
    id: "replit",
    name: "Replit",
    maker: "Replit",
    category: "Builders",
    monogram: "RE",
    color: "#f26207",
    plans: [
      { name: "Starter", price: "$0", note: "Free builds" },
      { name: "Core", price: "$20/mo", note: "$18 annually" },
      { name: "Pro", price: "$100/mo", note: "More agent time" },
    ],
    bestFor: "Turning prompts into deployed apps.",
    note: "Usage costs vary with agent activity.",
  },
];

export interface UpdateItem {
  date: string;
  type: "Release" | "Capital" | "Pricing" | "Infrastructure";
  title: string;
  detail: string;
  tag: string;
}

export const UPDATES: UpdateItem[] = [
  {
    date: "2026-10-19",
    type: "Release",
    title: "MiniMax M3.1 Flash enters the value tier",
    detail: "A 1M-context model at $0.15 / $0.60 per million tokens, launched into the most crowded segment of the market.",
    tag: "MiniMax",
  },
  {
    date: "2026-10-17",
    type: "Release",
    title: "DeepSeek refreshes V4.1 Flash",
    detail: "The 1017 checkpoint improves knowledge scores while holding the off-peak price at $0.15 / $0.60.",
    tag: "DeepSeek",
  },
  {
    date: "2026-10-15",
    type: "Release",
    title: "Meta opens Muse Spark",
    detail: "An open-weight release lands beside the proprietary Muse Wonder, reviving Meta's open ecosystem strategy.",
    tag: "Meta",
  },
  {
    date: "2026-10-13",
    type: "Release",
    title: "Gemini 4 Argon goes generally available",
    detail: "Google's new flagship debuts at $2 / $10 through Nov 30, then steps up to $4 / $20. It immediately tops the Arena.",
    tag: "Google",
  },
  {
    date: "2026-10-12",
    type: "Release",
    title: "Meta ships Muse Wonder",
    detail: "The superintelligence reset produces its first flagship: a 1M-context model at $4 / $20.",
    tag: "Meta",
  },
  {
    date: "2026-10-20",
    type: "Capital",
    title: "OpenAI seeks $30B ahead of Anthropic's IPO",
    detail: "Reports put the raise at up to a $1.4T valuation, anchored by SoftBank and MGX.",
    tag: "OpenAI",
  },
  {
    date: "2026-10-08",
    type: "Capital",
    title: "OpenAI revenue corrected to ~$50B",
    detail: "The FT reports the earlier $70B run-rate was an investor-adjusted comparison with Anthropic's gross revenue method.",
    tag: "OpenAI",
  },
  {
    date: "2026-10-07",
    type: "Pricing",
    title: "Claude Haiku 5.5 undercuts the market",
    detail: "Anthropic prices its fastest model at $0.10 / $0.50 with a 1M context, matching GPT-6 Luna.",
    tag: "Anthropic",
  },
  {
    date: "2026-09-29",
    type: "Release",
    title: "GPT-6.1 Sol becomes OpenAI's production flagship",
    detail: "A $2 / $10 model with top science scores and improved tool use, priced to defend OpenAI's volume lead.",
    tag: "OpenAI",
  },
  {
    date: "2026-09-28",
    type: "Capital",
    title: "Anthropic draft prospectus surfaces",
    detail: "Q2 revenue of $11.5B and a path to a ~$2T listing valuation enter public view.",
    tag: "Anthropic",
  },
  {
    date: "2026-09-22",
    type: "Release",
    title: "Claude Opus 5.5 takes the quality crown",
    detail: "Anthropic's flagship launches at $4 / $20 with a full 1M context and the highest composite in this atlas.",
    tag: "Anthropic",
  },
  {
    date: "2026-09-08",
    type: "Capital",
    title: "Mistral raises €3B at €21B+",
    detail: "Samsung, EQT and PSG lead a round that cements Europe's sovereign AI champion.",
    tag: "Mistral",
  },
  {
    date: "2026-09-01",
    type: "Release",
    title: "Claude Fable 5.1 pushes premium research",
    detail: "A $10 / $50 model built for deep research and creative work, with the highest HLE score in the set.",
    tag: "Anthropic",
  },
  {
    date: "2026-08-26",
    type: "Pricing",
    title: "Z.ai makes GLM-5.3 Flash effectively free at the margin",
    detail: "At $0.045 / $0.14, the model resets the floor for open-weight agentic workloads.",
    tag: "Z.ai",
  },
  {
    date: "2026-08-17",
    type: "Capital",
    title: "Anthropic run-rate passes $65B",
    detail: "The figure, disclosed to investors, makes Anthropic the largest pure-play AI business by revenue.",
    tag: "Anthropic",
  },
  {
    date: "2026-08-14",
    type: "Release",
    title: "GLM-5.3 launches for enterprise agents",
    detail: "Z.ai's flagship lands at $1.40 / $4.40 with a 1M context and strong research scores.",
    tag: "Z.ai",
  },
];

export const CAPEX_DATA = [
  { name: "Amazon", value: 220, color: "#ffb84d", note: "2026 capex guide" },
  { name: "Alphabet", value: 200, color: "#8ab4f8", note: "Midpoint of $195–205B" },
  { name: "Microsoft", value: 190, color: "#7dd3a7", note: "Calendar 2026" },
  { name: "Meta", value: 137, color: "#4f8cff", note: "Midpoint of $130–145B" },
  { name: "TSMC", value: 62, color: "#dcb8ff", note: "2026 capex envelope" },
];

export const FUNDING_DATA = [
  { name: "OpenAI", value: 122, color: "#27b591" },
  { name: "Anthropic", value: 95, color: "#d9a786" },
  { name: "xAI", value: 20, color: "#d7dde6" },
  { name: "Mistral", value: 3.58, color: "#ff7a2f" },
  { name: "Others", value: 7.2, color: "#546176" },
];

export const FUNDING_TOTAL = FUNDING_DATA.reduce((total, item) => total + item.value, 0);

export const COST_INDEX = [
  { year: "2022", value: 100 },
  { year: "2023", value: 38 },
  { year: "2024", value: 11 },
  { year: "2025", value: 3.1 },
  { year: "2026", value: 0.9 },
];

export const CONDITIONS = [
  { label: "Funding heat", value: 88, status: "Hot", note: "$240B+ into nine labs this year" },
  { label: "Compute tightness", value: 91, status: "Tight", note: "H100 contracts +40% since Oct 2025" },
  { label: "Price pressure", value: 84, status: "Severe", note: "Open-weight output below $1" },
  { label: "IPO window", value: 72, status: "Open", note: "Anthropic, SpaceX and more" },
  { label: "Margin discipline", value: 46, status: "Contested", note: "Capex outpacing cash flow" },
];

export const SCATTER_LABS = [
  { id: "anthropic", name: "Anthropic", arr: 65, val: 965, color: "#d9a786" },
  { id: "openai", name: "OpenAI", arr: 50, val: 852, color: "#27b591" },
  { id: "moonshot", name: "Moonshot", arr: 1, val: 50, color: "#a78bfa" },
  { id: "deepseek", name: "DeepSeek", arr: 1, val: 74, color: "#5a7dff" },
  { id: "mistral", name: "Mistral", arr: 1, val: 24.4, color: "#ff7a2f" },
  { id: "xai", name: "xAI", arr: 3.3, val: 250, color: "#d7dde6" },
  { id: "cohere", name: "Cohere", arr: 0.24, val: 7, color: "#7dd3a7" },
];

export const HERO_STATS = [
  { value: 20, suffix: "", label: "Models tracked" },
  { value: 13, suffix: "", label: "AI companies" },
  { value: Number(FUNDING_TOTAL.toFixed(1)), suffix: "B", prefix: "$", label: "Raised in 2026" },
  { value: 95, suffix: "%", label: "Annual cost decline" },
];

export const DATA_NOTES = {
  updated: "October 21, 2026",
  sources: [
    "Company announcements",
    "Reuters",
    "Financial Times",
    "CNBC",
    "Artificial Analysis",
    "BenchLM",
    "BenchLeader",
    "ARK Invest",
  ],
};

export function getLab(id: string): Lab {
  return LABS.find((lab) => lab.id === id) ?? LABS[0];
}

export function getModel(id: string): Model {
  return MODELS.find((model) => model.id === id) ?? MODELS[0];
}

export function formatContext(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(tokens % 1000000 === 0 ? 0 : 2)}M`;
  return `${Math.round(tokens / 1000)}K`;
}

export function formatCompact(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(2)}T`;
  if (value >= 1) return `${value.toFixed(value < 10 ? 1 : 0)}B`;
  return `${Math.round(value * 1000)}M`;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function blendPrice(model: Model): number {
  return model.input * 0.25 + model.output * 0.75;
}

export function taskCost(model: Model): number {
  return (model.input * 30000 + model.output * 5000) / 1000000;
}

export const MODEL_TAGS = ["All", "Proprietary", "Open weights", "Under $1/M", "1M context", "Vision"];

