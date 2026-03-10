export type UseCaseSlug =
  | "legal-compliance-ai-contracts"
  | "luxury-real-estate-ai-broker"
  | "wealth-management-ai-analyst"
  | "logistics-wholesale-ai-dispatcher"
  | "shopify-virtual-try-on-app";

export interface UseCaseSeoArticle {
  slug: UseCaseSlug;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: {
    heading: string;
    body: string;
    listTitle?: string;
    listItems?: string[];
  }[];
}

export const USE_CASE_ARTICLES: UseCaseSeoArticle[] = [
  {
    slug: "legal-compliance-ai-contracts",
    title: "AI Contract Intelligence for Legal & Compliance Teams",
    metaTitle:
      "AI Contract Analysis Engine for Legal & Compliance Teams | Ketly",
    metaDescription:
      "Automate contract review with Ketly's AI engine that extracts, structures, and analyzes clauses from multi-page PDF agreements in seconds.",
    description:
      "Use case: AI system that extracts, structures, and analyzes clauses from complex contracts in seconds.",
    lead:
      "Manual contract review slows deals, introduces human error, and drains senior legal talent on repetitive work.",
    sections: [
      {
        heading: "The bottleneck: manual contract review at scale",
        body:
          "Legal and compliance teams are drowning in repetitive contract work. Each new agreement requires reading dozens of pages just to find the same familiar risk patterns—termination, liability, data processing, SLAs, jurisdiction. When deal volume grows, quality either drops or timelines explode.",
        listTitle: "Typical pain points we see",
        listItems: [
          "Senior counsels forced to manually scan boilerplate clauses in every contract.",
          "No unified structure for key obligations, risks, and renewal terms.",
          "Inconsistent redlines across teams and jurisdictions.",
          "High risk of overlooking critical clauses under deadline pressure.",
        ],
      },
      {
        heading: "How Ketly's AI engine restructures your contracts",
        body:
          "We build a private, domain‑tuned AI engine that ingests your existing templates, playbooks, and historical negotiations. The system is engineered to follow your risk appetite—not generic internet patterns. Every new PDF contract is parsed into a structured knowledge object that your team can review in minutes instead of hours.",
        listTitle: "What the engine automatically extracts",
        listItems: [
          "Key business terms: parties, value, renewal dates, jurisdiction.",
          "Risk‑bearing clauses: limitation of liability, indemnities, caps and carve‑outs.",
          "Compliance‑sensitive language: data protection, cross‑border transfers, audit rights.",
          "Operational obligations: SLAs, escalation paths, reporting cadence.",
        ],
      },
      {
        heading: "Outcomes for legal and compliance leaders",
        body:
          "Instead of acting as manual readers of every document, your senior lawyers become designers of the decision logic that the AI executes. The result is a repeatable, measurable review process that scales without burning out your core team.",
        listTitle: "Impact our clients typically observe",
        listItems: [
          "Contract review cycles compressed from weeks to days.",
          "Consistent application of internal playbooks across all geographies.",
          "Instant visibility into non‑standard clauses across your entire portfolio.",
          "Audit‑ready contract data that can be queried in seconds.",
        ],
      },
    ],
  },
  {
    slug: "shopify-virtual-try-on-app",
    title: "Shopify Virtual Try-On App for Premium Fashion Brands",
    metaTitle:
      "Shopify Virtual Try-On App to Reduce Returns & Boost AOV | VYON by Ketly",
    metaDescription:
      "Launch a virtual try-on experience inside your Shopify store that lets customers see outfits on themselves, reduces returns, and increases Average Order Value.",
    description:
      "Flagship use case: a virtual try-on layer for Shopify that turns browsing into a cinematic fitting room experience.",
    lead:
      "Classic e‑commerce galleries cannot answer the only question that matters in fashion: “How will this look on me?”. VYON closes this gap directly inside your Shopify store.",
    sections: [
      {
        heading: "Why static product photos no longer convert",
        body:
          "Even the most beautiful product photography cannot replicate the feeling of seeing yourself in the garment. Customers hesitate, open new tabs, and postpone the decision because they cannot connect the lookbook model with their own body type and style. The result is lower conversion, high return rates, and aggressive discounting just to move inventory.",
        listTitle: "Signals that your store needs virtual try-on",
        listItems: [
          "High return rates driven by “did not fit / did not look as expected”.",
          "Customers asking for more photos, videos, or real‑life try‑on content.",
          "Strong traffic from paid ads, but weak add‑to‑cart and checkout completion.",
          "A large share of orders containing just one item instead of full looks.",
        ],
      },
      {
        heading: "How VYON lives inside your Shopify storefront",
        body:
          "VYON is not a separate app that sends your clients to a different domain. We embed a virtual fitting room as a native layer inside your existing product pages. Customers upload a single reference photo once; from that moment, they can preview full outfits in a few taps without ever leaving the journey you designed.",
        listTitle: "Key capabilities of the VYON try-on layer",
        listItems: [
          "Zero‑code integration with Shopify themes and headless storefronts.",
          "Realistic renders that preserve fabric behavior, silhouettes, and styling.",
          "Support for complete looks: dresses, outerwear, shoes, and accessories in one frame.",
          "Persistent customer profiles so returning buyers can try new collections instantly.",
        ],
      },
      {
        heading: "Driving measurable uplift in AOV and loyalty",
        body:
          "Once shoppers can see themselves in curated outfits, their behavior changes. They build baskets around full looks instead of isolated items, returns fall because expectations are aligned, and repeat visits grow as your store becomes a destination for experimentation rather than simple browsing.",
        listTitle: "Outcomes fashion brands typically target with VYON",
        listItems: [
          "Noticeable reduction in size‑ and fit‑related returns over the first collection cycles.",
          "Increase in Average Order Value as customers buy complete looks.",
          "Higher engagement on new drops thanks to instantly “try‑able” campaigns.",
          "A differentiated brand perception: from standard Shopify store to digital atelier.",
        ],
      },
    ],
  },
  {
    slug: "luxury-real-estate-ai-broker",
    title: "AI Broker for Luxury Real Estate",
    metaTitle: "AI WhatsApp Broker for Luxury Real Estate | Ketly",
    metaDescription:
      "Qualify high‑net‑worth leads 24/7 with an AI broker that lives in WhatsApp, responds instantly, and schedules property viewings without human friction.",
    description:
      "Use case: AI broker in WhatsApp that qualifies leads and schedules viewings for luxury real estate brands.",
    lead:
      "In luxury property, response time defines perceived service quality. A delayed reply often means a lost multi‑million‑dollar client.",
    sections: [
      {
        heading: "Why traditional lead handling fails HNWI buyers",
        body:
          "High‑net‑worth clients expect instant, precise, and discreet responses. Standard contact forms, unmonitored inboxes, and slow call‑backs create friction. Your human agents cannot realistically be online 24/7 across time zones.",
        listTitle: "Breakpoints in the classic funnel",
        listItems: [
          "Leads arrive across WhatsApp, Instagram, website forms, and phone calls.",
          "No unified logic to qualify intent, budget, and location preference.",
          "Agents manually copy details into CRM, introducing delays and errors.",
          "Out‑of‑hours inquiries silently die without a response.",
        ],
      },
      {
        heading: "Designing an always‑on AI broker",
        body:
          "Ketly engineers an AI broker that lives natively inside WhatsApp and your preferred messengers. It understands your portfolio, brand tone, and qualification logic. Every conversation is guided towards either a viewing, a call with a senior broker, or a curated shortlist of properties.",
        listTitle: "Capabilities the AI broker can handle",
        listItems: [
          "Instant answers to property questions using your verified inventory data.",
          "Soft and hard qualification flows tuned to your brand voice.",
          "Calendar integration to propose, confirm, and reschedule viewings.",
          "Structured lead profiles pushed directly into your CRM.",
        ],
      },
      {
        heading: "What this unlocks for your sales team",
        body:
          "Your human brokers focus on relationships and negotiations, not inbox triage. Every qualified inquiry lands in their calendar with full context, while the AI filters noise and handles routine information requests.",
        listTitle: "Results luxury clients aim for",
        listItems: [
          "No unanswered messages from serious buyers, regardless of timezone.",
          "Clean, structured lead data before any human interaction.",
          "Higher conversion from first contact to viewing.",
          "A digital experience that matches the standard of the physical properties.",
        ],
      },
    ],
  },
  {
    slug: "wealth-management-ai-analyst",
    title: "AI Analyst for Wealth Management Firms",
    metaTitle: "AI Report Analyst for Wealth Management | Ketly",
    metaDescription:
      "Turn dense financial reports into personalized client‑ready summaries with an AI analyst tuned to your investment philosophy.",
    description:
      "Use case: AI analyst that parses complex financial reports and generates tailored portfolio narratives for VIP clients.",
    lead:
      "Relationship managers are drowning in PDFs: quarterly fund updates, macro reports, product notes. Clients expect clarity, not documents.",
    sections: [
      {
        heading: "The reporting overload in modern wealth management",
        body:
          "Advisors are expected to read, interpret, and explain a continuous stream of research while still maintaining deep personal relationships with each client. In reality, most reports are skimmed, and only a fraction of insights reaches the end investor.",
        listTitle: "Where the current model breaks",
        listItems: [
          "Important risk disclosures remain buried inside technical language.",
          "Different desks use different templates and terminology.",
          "Advisors spend evenings manually drafting recap emails.",
          "Clients receive generic updates instead of tailored explanations.",
        ],
      },
      {
        heading: "Embedding an AI analyst into your stack",
        body:
          "We design an AI layer that ingests your proprietary research, product documentation, and historical client communication. The system learns your lexicon and investment philosophy, then generates concise, compliant explanations for each client profile.",
        listTitle: "What the AI analyst delivers",
        listItems: [
          "Plain‑language summaries for each product or strategy.",
          "Side‑by‑side comparisons of scenarios, risks, and fees.",
          "Talking points tailored to each client segment or persona.",
          "Audit trails of what was communicated and when.",
        ],
      },
      {
        heading: "Impact on client experience and operations",
        body:
          "Your team stops re‑writing the same explanations and instead focuses on strategic conversations. Every client receives a narrative that matches their risk profile and level of sophistication.",
        listTitle: "KPIs this typically improves",
        listItems: [
          "Time to prepare for client meetings.",
          "Client understanding of portfolio changes.",
          "Consistency of disclosures across teams.",
          "Perceived value of advisory fees.",
        ],
      },
    ],
  },
  {
    slug: "logistics-wholesale-ai-dispatcher",
    title: "AI Dispatcher for Logistics & Wholesale Operations",
    metaTitle: "AI Freight Quote Dispatcher for Logistics & Wholesale | Ketly",
    metaDescription:
      "Automate freight quotes by turning unstructured email requests into instant, accurate responses powered by AI.",
    description:
      "Use case: AI dispatcher that reads unstructured shipping requests and generates instant freight quotes.",
    lead:
      "Sales and operations teams in logistics spend countless hours manually parsing emails before they can even start calculating a quote.",
    sections: [
      {
        heading: "Unstructured requests block scalable quoting",
        body:
          "Customers describe routes, cargo, and constraints in free‑form language. Human operators must interpret every message, extract the relevant details, and key them into internal tools. Under heavy load, quotes are delayed or never sent at all.",
        listTitle: "Typical friction points in the workflow",
        listItems: [
          "Information scattered across long email threads and attachments.",
          "Multiple back‑and‑forth messages just to clarify basics.",
          "Operators re‑enter the same data into several systems.",
          "High risk of mis‑typed dimensions, weights, or INCOTERMS.",
        ],
      },
      {
        heading: "Building an AI dispatcher around your pricing logic",
        body:
          "Ketly engineers an AI dispatcher that reads incoming requests, structures all relevant parameters, and routes them into your existing pricing engines or spreadsheets. The AI never improvises prices; it strictly follows your approved logic.",
        listTitle: "What the dispatcher automates",
        listItems: [
          "Extraction of origin, destination, cargo type, and timing constraints.",
          "Detection of missing critical data and automated clarification prompts.",
          "Population of internal quote calculators or TMS fields.",
          "Drafting of clean, professional quote replies for operator approval.",
        ],
      },
      {
        heading: "From overloaded inboxes to predictable response times",
        body:
          "Instead of triaging inboxes, your team supervises an automated system that prepares quotes in the background. Operators step in only where judgment and negotiation are required.",
        listTitle: "Operational gains teams aim for",
        listItems: [
          "Faster average response time on new quote requests.",
          "Higher quote throughput per operator.",
          "Reduced errors in structured data entry.",
          "Improved win rate thanks to consistent, timely replies.",
        ],
      },
    ],
  },
];

export function findUseCaseBySlug(slug: string): UseCaseSeoArticle | undefined {
  return USE_CASE_ARTICLES.find((article) => article.slug === slug);
}

