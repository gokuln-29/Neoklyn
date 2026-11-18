/**
 * Buyer-intent landing pages served at /solutions/[slug].
 *
 * Rules for editing this file:
 *  - Only state prices, timelines and terms that are already published on the
 *    site (home FAQ, service pages): websites from ₹50,000 / $600, web apps and
 *    mobile apps typically ₹1-4 lakh, AI agents from ₹1 lakh, delivery in 2-5
 *    weeks, a fixed written quote within 24 hours, 30 days of free post-launch
 *    fixes, full ownership of code, data and accounts.
 *  - Results come from the case studies in src/app/work/projects.ts. Do not
 *    repeat numbers here.
 *  - No ranking, traffic or revenue promises.
 *  - Each page must say something specific to its audience. If a page would
 *    read the same with the audience swapped, it should not exist.
 */

export type SolutionFaq = { question: string; answer: string };

export type Solution = {
  slug: string;
  /** Parent service page, used for the breadcrumb and a contextual link. */
  serviceSlug: "web" | "mobile" | "ai-agents" | "ecommerce";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  titleOutline: string;
  titleSolid: string;
  intro: string;
  /** What this kind of business needs from the solution. */
  needs: { title: string; body: string }[];
  /** What we actually build. */
  builds: string[];
  pricing: { from: string; detail: string; timeline: string };
  /** Slugs from src/app/work/projects.ts shown as proof. */
  caseSlugs: string[];
  /** Extra section with a heading, for content only this page has. */
  extra?: { heading: string; paragraphs: string[]; bullets?: string[] };
  faqs: SolutionFaq[];
  related: { href: string; label: string }[];
  whatsappMessage: string;
};

export const solutions: Solution[] = [
  {
    slug: "website-for-clinics",
    serviceSlug: "web",
    metaTitle: "Website for Clinics & Doctors, From ₹50,000 | NeoKlyn",
    metaDescription:
      "Clinic website with appointment enquiries, WhatsApp and tap-to-call. Fixed price from ₹50,000, live in 2-5 weeks. See our Madurai physio clinic project.",
    eyebrow: "Websites for clinics",
    titleOutline: "CLINIC",
    titleSolid: "WEBSITES",
    intro:
      "Most patients pick a clinic in a few seconds, on a phone, after a Google search. If they can't see your services, your timings and a way to book within those seconds, they call the next clinic. We build clinic websites around that moment.",
    needs: [
      {
        title: "Be found when someone searches nearby",
        body: "Your site should match your Google Business Profile exactly (name, address, phone, hours), have a page for each treatment you offer, and load quickly on mobile data.",
      },
      {
        title: "Make booking effortless",
        body: "An appointment request form, a WhatsApp button and a tap-to-call number on every screen. The fewer steps between 'I need an appointment' and 'request sent', the more enquiries you get.",
      },
      {
        title: "Show who patients will meet",
        body: "Doctor and therapist profiles, qualifications, clinic photos, fees where you want to show them and genuine patient feedback (with permission). Trust is decided on the first screen.",
      },
      {
        title: "Stay easy to update",
        body: "Holiday timings, a new service, a new doctor: your staff should be able to change these without waiting for a developer.",
      },
    ],
    builds: [
      "Service and treatment pages, one per service you want to rank for",
      "Doctor or team profile pages",
      "Appointment request form that emails you and offers a WhatsApp follow-up",
      "Tap-to-call and WhatsApp buttons that stay visible on mobile",
      "Google Map, address and opening hours, with matching LocalBusiness structured data",
      "A simple content editor so your team can update timings and services",
      "Privacy policy and consent wording next to every form",
      "Call, WhatsApp and form tracking so you can see where enquiries come from",
    ],
    pricing: {
      from: "From ₹50,000",
      detail:
        "A clinic website with an online appointment request sits in the websites-from-₹50,000 range. Features such as online payments or a patient portal make it a web app, typically ₹1-4 lakh. You get a fixed written quote within 24 hours.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: ["sharon-physio"],
    extra: {
      heading: "What we avoid on a clinic website",
      paragraphs: [
        "We don't recommend collecting medical details through a website form. Ask for a name, a phone number and a preferred time, and take the clinical conversation to a call or an in-person visit. It keeps patient data out of inboxes and keeps you on the safe side of privacy expectations.",
        "We also don't promise a Google ranking. A good website gives you the foundations (speed, structure, matching business details), but rankings depend on your area, your competition and your reviews.",
      ],
    },
    faqs: [
      {
        question: "How much does a clinic website cost?",
        answer:
          "Websites start from ₹50,000 with a fixed written quote within 24 hours. If you want online payments or a patient portal, that is a web app and typically ranges ₹1-4 lakh depending on the features.",
      },
      {
        question: "Can patients book appointments on the website?",
        answer:
          "Yes. The standard option is an appointment request form that notifies you, with WhatsApp and tap-to-call alongside. If patients need to choose exact slots, we can connect a booking calendar such as Cal.com.",
      },
      {
        question: "Will the site help me appear on Google Maps?",
        answer:
          "Maps listings come from your Google Business Profile, not your website. We make sure the website details match the profile, add the right structured data and can walk you through setting up and completing the profile. We can't guarantee a position.",
      },
      {
        question: "Can my staff update timings and services?",
        answer:
          "We can add a simple content editor so your team changes timings, fees, photos and services themselves. It is included in the scope discussion at quote time.",
      },
      {
        question: "Who owns the website?",
        answer:
          "You do. You own the code, content, data and the hosting and domain accounts. After launch you also get 30 days of free fixes.",
      },
    ],
    related: [
      { href: "/work/sharon-physio", label: "Sharon Physio case study" },
      { href: "/services/web", label: "Web development services" },
      { href: "/solutions/ai-agent-for-small-business", label: "AI assistant for enquiries on WhatsApp" },
      { href: "/insights/website-development-cost-guide", label: "Website development cost guide" },
    ],
    whatsappMessage: "Hi NeoKlyn, I run a clinic and I'd like a quote for a website.",
  },
  {
    slug: "website-for-traders-and-distributors",
    serviceSlug: "web",
    metaTitle: "B2B Website for Traders & Distributors | NeoKlyn",
    metaDescription:
      "B2B website for trading and distribution companies: product catalogue, quote requests and WhatsApp enquiries. Fixed price from ₹50,000, built in 2-5 weeks.",
    eyebrow: "Websites for traders and distributors",
    titleOutline: "B2B TRADING",
    titleSolid: "WEBSITES",
    intro:
      "Buyers who have never met you check your website before they send an enquiry. A trading company website has one job: make your range easy to browse and make asking for a price easy and credible, especially for buyers in another city or country.",
    needs: [
      {
        title: "A catalogue buyers can scan",
        body: "Clear categories, consistent product names and specifications, and enough detail that a procurement team can decide whether to ask for a quote.",
      },
      {
        title: "A real request-for-quote flow",
        body: "A quote form that carries the product or category the buyer was looking at, so you don't have to ask what they meant.",
      },
      {
        title: "Credibility for first-time buyers",
        body: "Company profile, what you supply and to whom, certifications you hold, warehouse or office details and several ways to reach a person.",
      },
      {
        title: "Updates without a developer",
        body: "New products and price-list changes should be a content task for your team, not a development project.",
      },
    ],
    builds: [
      "Product and category catalogue with search and filters where the range needs them",
      "Request-a-quote forms that include the product or category",
      "Downloadable catalogue or price list",
      "WhatsApp and email enquiry buttons for fast first contact",
      "Company profile, certification and contact pages for buyer due diligence",
      "A content management system so your team can add and edit products",
      "Fast, mobile-first pages, since many buyers browse on their phones",
    ],
    pricing: {
      from: "From ₹50,000",
      detail:
        "A company website with a catalogue and enquiry forms starts from ₹50,000. A larger catalogue, a buyer portal or a custom quote system is a web app and typically ranges ₹1-4 lakh. You get a fixed written quote within 24 hours.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: ["dwarka-trading"],
    faqs: [
      {
        question: "Can the website handle hundreds of products?",
        answer:
          "Yes. We set up a content management system so products are added and edited as content, not code, and we structure categories so buyers can browse. The size of the catalogue affects scope, so we confirm it in the quote.",
      },
      {
        question: "Can buyers request quotes instead of buying online?",
        answer:
          "That is the usual setup for B2B trading. Buyers submit a quote request that you receive by email, and you reply with pricing. An online cart and payments is a separate ecommerce scope.",
      },
      {
        question: "Do you work with companies outside India?",
        answer:
          "Yes. We're based in Bengaluru and have built for a trading company in the Middle East. Working remotely over calls and WhatsApp is how most of our projects run.",
      },
      {
        question: "Can we start small and add features later?",
        answer:
          "Yes. Many companies start with a catalogue and quote form, then add a buyer portal or more content later. You own the code, so you can extend it with us or anyone else.",
      },
    ],
    related: [
      { href: "/work/dwarka-trading", label: "Dwarka General Trading case study" },
      { href: "/services/web", label: "Web development services" },
      { href: "/solutions/website-for-manufacturers", label: "Websites for manufacturers" },
      { href: "/estimate", label: "Free project estimate" },
    ],
    whatsappMessage: "Hi NeoKlyn, we're a trading company and want a website with a product catalogue and quote requests.",
  },
  {
    slug: "website-for-manufacturers",
    serviceSlug: "web",
    metaTitle: "Website for Manufacturers & Industrial Firms | NeoKlyn",
    metaDescription:
      "Industrial and manufacturing company website: capabilities, project gallery, brochures and RFQ forms. Fixed price from ₹50,000, built in 2-5 weeks.",
    eyebrow: "Websites for manufacturers",
    titleOutline: "MANUFACTURER",
    titleSolid: "WEBSITES",
    intro:
      "Contractors and procurement teams use a manufacturer's website to answer three questions: can you make what we need, have you done it before, and how do we reach you. Most industrial sites answer none of them quickly. Ours are built to answer all three in the first minute.",
    needs: [
      {
        title: "Capabilities stated plainly",
        body: "What you make, the materials and standards you work to, capacity and the industries you serve, written for an engineer skimming at a desk.",
      },
      {
        title: "Proof you've done it before",
        body: "A project gallery with photos, scope and location. For industrial buyers, a clear record of past projects counts for more than any slogan.",
      },
      {
        title: "Documents buyers expect",
        body: "Brochures, spec sheets, certifications and company registration details they can download and forward internally.",
      },
      {
        title: "A reliable platform",
        body: "A site that stays up, loads fast and can be updated. Some manufacturers also need to move an older, harder-to-maintain site without downtime.",
      },
    ],
    builds: [
      "Capabilities and products pages written around buyer questions",
      "Project gallery with scope, location and photos",
      "Downloadable brochures, spec sheets and certificates",
      "Request-for-quote form routed to the right person",
      "WhatsApp, phone and email contacts by region or department",
      "Migration from an older site or hosting setup, with a plan to avoid downtime",
      "A simple editor so new projects and documents can be added in-house",
    ],
    pricing: {
      from: "From ₹50,000",
      detail:
        "A manufacturer website with capabilities, a project gallery and quote forms starts from ₹50,000. Integrations with internal systems, or a larger migration, are scoped separately and typically sit in the ₹1-4 lakh range. You get a fixed written quote within 24 hours.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: ["zinad-concrete-works", "lpsm-pvt-ltd"],
    extra: {
      heading: "Moving off an old site without breaking it",
      paragraphs: [
        "If your current site runs on old hosting or an unmaintained system, the risk is not the redesign, it is the switchover. We plan the move so the old site keeps running until the new one is tested, keep existing page addresses working with redirects, and cut over when it is ready.",
      ],
      bullets: [
        "Inventory of existing pages and documents so nothing is lost",
        "Redirects from old addresses so existing Google listings keep working",
        "Test on a private address before the domain is switched",
        "Rollback plan on the day of the switch",
      ],
    },
    faqs: [
      {
        question: "Our current site is old. Can you move it without downtime?",
        answer:
          "That is how we plan migrations: build and test the new site on a private address, keep the old site live, then switch the domain. Existing page addresses are redirected so search listings keep pointing to the right content.",
      },
      {
        question: "Can buyers download catalogues and certificates?",
        answer:
          "Yes. Brochures, spec sheets and certificates can be offered as downloads, and you can update them yourself through a simple content editor.",
      },
      {
        question: "How much does a manufacturer website cost?",
        answer:
          "From ₹50,000 for a company website with capabilities, projects and quote forms. Integrations or larger migrations are scoped separately, typically ₹1-4 lakh. The quote is fixed and written.",
      },
      {
        question: "Do you build for companies outside India?",
        answer:
          "Yes. We have built for industrial companies in India and the Middle East. We work remotely and agree check-in calls up front.",
      },
    ],
    related: [
      { href: "/work/zinad-concrete-works", label: "Zinad Concrete Works case study" },
      { href: "/work/lpsm-pvt-ltd", label: "LPSM Pvt Ltd case study" },
      { href: "/solutions/website-for-traders-and-distributors", label: "Websites for traders and distributors" },
      { href: "/website-audit", label: "Free website audit" },
    ],
    whatsappMessage: "Hi NeoKlyn, we're a manufacturing company and want a website that shows our capabilities and takes quote requests.",
  },
  {
    slug: "website-for-travel-agencies",
    serviceSlug: "web",
    metaTitle: "Website for Travel Agencies & Tour Operators | NeoKlyn",
    metaDescription:
      "Travel agency website with package pages, fast image galleries and booking enquiries by form and WhatsApp. Fixed price from ₹50,000, built in 2-5 weeks.",
    eyebrow: "Websites for travel agencies",
    titleOutline: "TRAVEL AGENCY",
    titleSolid: "WEBSITES",
    intro:
      "Travel is bought with the eyes first, which makes it a hard website to get right: big photography wants to be slow, and a slow site loses the visitor before they see it. We build travel sites that look rich and still load quickly on a phone, and then make it simple to send an enquiry.",
    needs: [
      {
        title: "Images that don't slow the page",
        body: "Properly sized and compressed photography, loaded in the right order, so destinations look good without a long wait.",
      },
      {
        title: "Packages that answer the obvious questions",
        body: "Duration, what's included, who it suits, an indicative price and a clear next step. People leave when they have to guess.",
      },
      {
        title: "Enquiry, not checkout",
        body: "Most agencies sell by conversation. The site's job is to start that conversation with the traveller's dates, group size and budget already filled in.",
      },
      {
        title: "Destination content that gets found",
        body: "Guides and itineraries people search for, written under your name, give you reasons to be found beyond your own package list.",
      },
    ],
    builds: [
      "Package and destination pages with galleries and itineraries",
      "Enquiry form that captures dates, group size and budget",
      "WhatsApp button with a pre-filled message naming the package",
      "Optimised image delivery so galleries stay fast on mobile",
      "Optional immersive effects and animation, kept within a performance budget",
      "Content editor for adding packages and seasonal offers",
      "Enquiry tracking so you know which pages produce conversations",
    ],
    pricing: {
      from: "From ₹50,000",
      detail:
        "A travel website with package pages and enquiry forms starts from ₹50,000. Heavily animated or 3D experiences and online payments add scope, and are quoted fixed once we know what you want.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: ["travex-ventures"],
    faqs: [
      {
        question: "Can the site take online bookings and payments?",
        answer:
          "It can, but most agencies start with enquiry-led booking and add payments later. Online payment is a separate scope that we quote fixed once the requirements are clear.",
      },
      {
        question: "Will animations and large photos slow the site down?",
        answer:
          "Not if they are built with a performance budget. We size and compress images, load them in the right order and test on mobile. Effects that cost too much speed are cut.",
      },
      {
        question: "Can I add new packages myself?",
        answer:
          "Yes. We can add a content editor so you can publish new packages, change prices and update seasonal offers without a developer.",
      },
      {
        question: "How long does a travel website take?",
        answer:
          "Typically 2-5 weeks, depending on how many packages and how much custom visual work is involved. The timeline is part of the written quote.",
      },
    ],
    related: [
      { href: "/work/travex-ventures", label: "Travex Ventures case study" },
      { href: "/services/3d", label: "3D and immersive web experiences" },
      { href: "/solutions/website-for-premium-brands", label: "Websites for premium brands" },
      { href: "/estimate", label: "Free project estimate" },
    ],
    whatsappMessage: "Hi NeoKlyn, I run a travel business and I'd like a quote for a website with package pages.",
  },
  {
    slug: "website-for-premium-brands",
    serviceSlug: "web",
    metaTitle: "Website for Premium & D2C Brands, From ₹50,000 | NeoKlyn",
    metaDescription:
      "Brand-led website for premium and D2C brands: art-directed pages, fast loading and a clear enquiry or buy path. Fixed price, built in 2-5 weeks.",
    eyebrow: "Websites for premium brands",
    titleOutline: "PREMIUM BRAND",
    titleSolid: "WEBSITES",
    intro:
      "A premium brand's website is judged the way its product is: on feel, detail and confidence. A site that looks cheap or loads slowly tells a buyer your product might be too. We build brand websites that look considered and stay fast.",
    needs: [
      {
        title: "A look that matches the product",
        body: "Typography, spacing, photography and motion chosen for your brand, not dropped into a template everyone else is using.",
      },
      {
        title: "Speed as part of the luxury",
        body: "Premium visitors have little patience for a heavy page. Fast loading is part of how the brand feels.",
      },
      {
        title: "A clear path to act",
        body: "Beautiful pages still need to lead somewhere: an enquiry, a reservation or a purchase. We design the path as carefully as the visuals.",
      },
      {
        title: "Room to grow",
        body: "Start with the brand site, then add a store or a members area when you are ready, on the same foundation.",
      },
    ],
    builds: [
      "Art-directed pages designed around your brand and photography",
      "Subtle, purposeful animation kept within a speed budget",
      "Collection or product showcase pages",
      "Enquiry, reservation or purchase paths designed per brand",
      "Optional ecommerce on the same platform",
      "Performance and accessibility checks before launch",
    ],
    pricing: {
      from: "From ₹50,000",
      detail:
        "A brand website starts from ₹50,000. Custom art direction, richer animation and a store raise the scope. You get a fixed written quote within 24 hours, and it stays fixed unless the scope changes.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: ["aathithyan"],
    faqs: [
      {
        question: "Do you design the brand look too?",
        answer:
          "We design the website experience around your existing brand. If you need a new identity, our branding and UI/UX service covers that and can be scoped with the site.",
      },
      {
        question: "Can the site sell products online later?",
        answer:
          "Yes. We build on a foundation that can take an online store when you're ready, using Shopify, WooCommerce or a custom build depending on the catalogue.",
      },
      {
        question: "Will animation make the site slow?",
        answer:
          "Only if it's done carelessly. We set a performance budget, test on mobile and drop effects that cost more than they add.",
      },
    ],
    related: [
      { href: "/work/aathithyan", label: "Aathithyan case study" },
      { href: "/services/branding", label: "Branding and UI/UX design" },
      { href: "/services/ecommerce", label: "Ecommerce development" },
      { href: "/solutions/website-for-travel-agencies", label: "Websites for travel agencies" },
    ],
    whatsappMessage: "Hi NeoKlyn, I run a brand and I'd like a quote for a premium website.",
  },
  {
    slug: "mobile-app-development-cost-india",
    serviceSlug: "mobile",
    metaTitle: "Mobile App Development Cost in India (₹1-4 Lakh) | NeoKlyn",
    metaDescription:
      "What a mobile app costs in India: typical ₹1-4 lakh range, what moves the price, timelines and what to ask for in a quote. Fixed price, you own the code.",
    eyebrow: "Mobile app cost in India",
    titleOutline: "MOBILE APP",
    titleSolid: "COST",
    intro:
      "Mobile app quotes in India range from a few thousand rupees to crores, which is no use when you are trying to budget. Here is the range we work in, what moves a project up or down it, and what to insist on in any quote you get, ours or someone else's.",
    needs: [
      {
        title: "What an app does sets the price",
        body: "A booking or appointment app, an ordering app and a membership or field-staff app are different amounts of work. The number of screens matters less than logins, payments, notifications, admin tools and integrations.",
      },
      {
        title: "One codebase or two",
        body: "A cross-platform app covers iOS and Android from one codebase and is usually the right starting point for a first version. Separate native apps cost more and are justified when you need deep device features or maximum performance.",
      },
      {
        title: "The back end is half the work",
        body: "Most apps need a server, database and an admin panel to manage content, users or orders. A quote that only mentions screens is missing half the project.",
      },
      {
        title: "Running costs are separate",
        body: "Store accounts, hosting, SMS or WhatsApp messaging and any paid APIs are ongoing costs. A good quote lists them so there are no surprises after launch.",
      },
    ],
    builds: [
      "Cross-platform iOS and Android apps from one codebase",
      "Back end, database and admin panel for managing the app",
      "Push notifications, user accounts and payments where needed",
      "Store submission support for Apple App Store and Google Play",
      "Source code, accounts and documentation handed to you",
      "30 days of free fixes after launch",
    ],
    pricing: {
      from: "From ₹1 lakh",
      detail:
        "Mobile apps typically range ₹1-4 lakh (about $1,200-5,000) depending on scope. Complex apps, large integrations or custom native work are quoted individually. The quote is fixed and written, and you receive it within 24 hours.",
      timeline: "Typically 2-5 weeks for a focused first version",
    },
    caseSlugs: [],
    extra: {
      heading: "What to insist on in any app quote",
      paragraphs: [
        "These apply whoever you hire. If a quote doesn't cover them, ask.",
      ],
      bullets: [
        "A fixed price in writing, with what's in and out of scope",
        "You own the source code, the store accounts and the data, from day one",
        "The back end and admin panel are included, or clearly priced",
        "A list of recurring costs after launch (store fees, hosting, messaging, APIs)",
        "Who builds it and who reviews it",
        "What happens after launch: fixes, updates and who you call",
      ],
    },
    faqs: [
      {
        question: "How much does a mobile app cost in India?",
        answer:
          "At NeoKlyn, mobile apps typically range ₹1-4 lakh (about $1,200-5,000) depending on scope, fixed price. The biggest factors are accounts and payments, the admin back end, integrations and how many user types the app has.",
      },
      {
        question: "How long does it take to build an app?",
        answer:
          "A focused first version typically takes 2-5 weeks. Larger apps with many integrations take longer, and we put the timeline in the written quote.",
      },
      {
        question: "Should I build for iPhone and Android together?",
        answer:
          "For most first versions, yes: a cross-platform app covers both from one codebase and keeps cost down. We explain when native is worth the extra cost in our native vs cross-platform guide.",
      },
      {
        question: "What are the app store costs?",
        answer:
          "Apple charges an annual developer fee and Google a one-time registration fee, and both are paid by you on accounts you own. Check the current amounts on Apple's and Google's sites, since they can change.",
      },
      {
        question: "Do I own the app code?",
        answer: "Yes. You own the code, the data and the store accounts, and you can take it to another developer at any time.",
      },
    ],
    related: [
      { href: "/insights/native-vs-cross-platform-app-development", label: "Native vs cross-platform: cost and timeline guide" },
      { href: "/services/mobile", label: "Mobile app development services" },
      { href: "/estimate", label: "Get a free app estimate" },
      { href: "/insights/website-development-cost-guide", label: "Website development cost guide" },
    ],
    whatsappMessage: "Hi NeoKlyn, I'm planning a mobile app and want a rough cost and timeline.",
  },
  {
    slug: "ai-agent-for-small-business",
    serviceSlug: "ai-agents",
    metaTitle: "AI Agent for Small Business: WhatsApp & Leads | NeoKlyn",
    metaDescription:
      "AI assistant that answers customer questions, takes booking requests and follows up leads on WhatsApp and your website. From ₹1 lakh, built in 2-5 weeks.",
    eyebrow: "AI agents for small business",
    titleOutline: "AI AGENT FOR",
    titleSolid: "SMALL BUSINESS",
    intro:
      "If your team spends its day answering the same questions on WhatsApp (timings, prices, availability, how to book), an AI agent can take that repetitive load while your people handle the conversations that need them. We build agents that answer from your approved information, and hand over to a person when they should.",
    needs: [
      {
        title: "Answers from your information, not guesses",
        body: "The agent answers from the services, prices, timings and policies you approve. If it doesn't know, it says so and passes the conversation to your team.",
      },
      {
        title: "Booking and lead capture",
        body: "It collects the name, number and request, and sends it to you in a form your team can act on, instead of leaving it in a chat thread.",
      },
      {
        title: "A person in the loop",
        body: "Clear handover to a human for anything sensitive, unusual or high-value. For clinics and similar businesses, it must never give medical advice.",
      },
      {
        title: "Follow-up that actually happens",
        body: "Leads go quiet because nobody had time to chase them. Automated follow-up reminders mean fewer enquiries are forgotten.",
      },
    ],
    builds: [
      "A WhatsApp or website assistant trained on your approved FAQs and policies",
      "Booking and enquiry capture with notifications to your team",
      "Lead follow-up and reminder workflows",
      "Handover to a human, with the conversation attached",
      "Conversation logs so you can see what customers ask and improve the answers",
      "Guardrails for topics the agent must not answer",
    ],
    pricing: {
      from: "From ₹1 lakh",
      detail:
        "AI agent projects start from ₹1 lakh. The final price depends on the number of workflows, integrations and the channel. You get a fixed written quote within 24 hours.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: [],
    extra: {
      heading: "What to know about WhatsApp before you commit",
      paragraphs: [
        "Automating WhatsApp uses WhatsApp's business platform, which has its own account approval process and messaging charges paid to Meta or a provider. These are separate from our build fee, and we'll explain them before you commit so the running cost is clear.",
        "You can also start with an assistant on your website, as on this site, and add WhatsApp once you know which questions matter most. Try the KLYN assistant on this page to see how it behaves.",
      ],
    },
    faqs: [
      {
        question: "What can an AI agent do for a small business?",
        answer:
          "Typical jobs are answering common customer questions, capturing booking requests and leads, sending follow-up reminders and passing complex conversations to your team. We scope it around your busiest repetitive tasks.",
      },
      {
        question: "Will it say something wrong to my customers?",
        answer:
          "We limit the risk by restricting it to information you approve, adding rules for topics it must refuse, keeping logs and making handover to a human easy. No AI system is perfect, which is why a person stays in the loop for anything important.",
      },
      {
        question: "How much does it cost?",
        answer:
          "AI agent projects start from ₹1 lakh, depending on workflows, integrations and channel. WhatsApp messaging fees are paid separately to the provider, and we explain them up front.",
      },
      {
        question: "Where do I start?",
        answer:
          "Take the 2-minute AI readiness audit to see which of your workflows are worth automating first, then we can talk through a scope.",
      },
    ],
    related: [
      { href: "/audit", label: "Free AI readiness audit" },
      { href: "/services/ai-agents", label: "AI agent development services" },
      { href: "/insights/shipping-production-ai-agents", label: "Shipping AI agents to production" },
      { href: "/solutions/website-for-clinics", label: "Websites for clinics" },
    ],
    whatsappMessage: "Hi NeoKlyn, I'd like to know how an AI assistant could handle our WhatsApp enquiries.",
  },
  {
    slug: "website-development-bengaluru",
    serviceSlug: "web",
    metaTitle: "Website Development in Bengaluru, From ₹50,000 | NeoKlyn",
    metaDescription:
      "Bengaluru web development studio: fixed-price business websites from ₹50,000, built in 2-5 weeks by a senior engineer. How to choose a developer.",
    eyebrow: "Website development in Bengaluru",
    titleOutline: "BENGALURU WEBSITE",
    titleSolid: "DEVELOPMENT",
    intro:
      "Bengaluru has thousands of agencies and freelancers, so the problem is not finding a web developer, it is telling them apart. NeoKlyn is a small studio based in the city: one senior engineer builds and reviews your project, you get a fixed written quote and you own everything we build.",
    needs: [
      {
        title: "Know who is building it",
        body: "Some agencies sell with a senior person and hand the work to a larger team. At NeoKlyn, the founder, a senior engineer with 10+ years of experience, architects and reviews every project personally.",
      },
      {
        title: "Fixed price, in writing",
        body: "Open-ended hourly billing is how budgets drift. You get a fixed written quote within 24 hours of describing your project, and it stays fixed unless the scope changes.",
      },
      {
        title: "Speed that doesn't cut corners",
        body: "We use AI-accelerated development for the repetitive 70% of the work, and a human reviews every line. That is why standard websites take 2-5 weeks, not months.",
      },
      {
        title: "Ownership and support",
        body: "You own the code, content, data and accounts. After launch, 30 days of fixes are included, and we can stay on as a support partner if you want one.",
      },
    ],
    builds: [
      "Business and service websites for local and national audiences",
      "Websites for clinics, traders, manufacturers, travel and premium brands",
      "Web apps, portals and dashboards",
      "Ecommerce stores",
      "Mobile apps and AI agents when the website is not the whole answer",
    ],
    pricing: {
      from: "From ₹50,000",
      detail:
        "Websites from ₹50,000 (about $600). Web apps typically ₹1-4 lakh depending on features. We price roughly 40-60% below typical agency quotes by running without the overhead of a large office and sales team.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: ["sharon-physio", "dwarka-trading"],
    extra: {
      heading: "Seven questions to ask any Bengaluru web developer",
      paragraphs: [
        "Whoever you hire, ask these before you sign. The answers separate a studio that will deliver from one that will chase you for more money.",
      ],
      bullets: [
        "Can I see live websites you've built, and talk to the client?",
        "Who exactly will build my project, and who reviews it?",
        "Is the price fixed, and what is outside the scope?",
        "Do I own the code, the domain and the hosting account?",
        "What does it cost to run per year (hosting, domain, tools)?",
        "What happens if something breaks after launch?",
        "How will I be able to update the content myself?",
      ],
    },
    faqs: [
      {
        question: "Do I need to meet in person?",
        answer:
          "No. Our projects run remotely over calls, WhatsApp and shared previews, including for clients outside India. We agree check-in points at the start.",
      },
      {
        question: "How much does a website cost in Bengaluru?",
        answer:
          "At NeoKlyn websites start from ₹50,000 and web apps typically range ₹1-4 lakh, fixed price. Our website cost guide explains what drives the price and what to watch for in a cheap quote.",
      },
      {
        question: "How long will it take?",
        answer: "Typically 2-5 weeks for a standard website. Larger projects take longer, and the timeline is part of the written quote.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Yes. Run the free website audit to see what to fix first, then we can scope a redesign or targeted improvements.",
      },
    ],
    related: [
      { href: "/insights/website-development-cost-guide", label: "Website development cost guide" },
      { href: "/website-audit", label: "Free website audit" },
      { href: "/work", label: "Our work" },
      { href: "/solutions/website-development-madurai", label: "Website development in Madurai" },
    ],
    whatsappMessage: "Hi NeoKlyn, I'm in Bengaluru and I'd like a quote for a website.",
  },
  {
    slug: "website-development-madurai",
    serviceSlug: "web",
    metaTitle: "Website Development in Madurai, From ₹50,000 | NeoKlyn",
    metaDescription:
      "Website development for Madurai and Tamil Nadu businesses: fixed price from ₹50,000, built in 2-5 weeks, with a Madurai clinic website as our local example.",
    eyebrow: "Website development in Madurai",
    titleOutline: "MADURAI WEBSITE",
    titleSolid: "DEVELOPMENT",
    intro:
      "Businesses in Madurai and across Tamil Nadu don't need an agency in a bigger city to get a good website, but they do need a developer who understands local customers and will explain things plainly. We built the website for Sharon Physio in Madurai, and we work with businesses there the same way as everywhere else: a clear scope, a fixed price and no jargon.",
    needs: [
      {
        title: "Customers who search on their phones",
        body: "Local customers find businesses on mobile, often on mobile data. We build for phones first, with tap-to-call and WhatsApp on every page.",
      },
      {
        title: "A site that matches your Google listing",
        body: "For local businesses, your Google Business Profile and your website need to say the same thing. We make sure the name, address, phone and hours are consistent.",
      },
      {
        title: "Plain-language communication",
        body: "A clear explanation of what you are paying for, in plain English, with a written quote you can compare. We're happy to discuss on calls or WhatsApp.",
      },
      {
        title: "Realistic budgets",
        body: "Websites from ₹50,000. If your needs are bigger, we'll say so and show you what drives the price, rather than selling you features you won't use.",
      },
    ],
    builds: [
      "Business websites for shops, clinics, schools, trades and services",
      "Appointment and enquiry forms with WhatsApp and tap-to-call",
      "Google Maps, hours and local business structured data",
      "A simple editor so you can update the site yourself",
      "Online stores when you're ready to sell outside your town",
    ],
    pricing: {
      from: "From ₹50,000",
      detail:
        "Websites from ₹50,000 with a fixed written quote within 24 hours. Larger web apps typically ₹1-4 lakh depending on features. You own the code, content and accounts.",
      timeline: "Typically 2-5 weeks",
    },
    caseSlugs: ["sharon-physio"],
    faqs: [
      {
        question: "Do you work with businesses in Madurai?",
        answer:
          "Yes. Sharon Physio, a physiotherapy clinic in Madurai, is one of our projects. We work remotely over calls and WhatsApp, which keeps the price down and works well for most small-business websites.",
      },
      {
        question: "Can my website be in Tamil as well as English?",
        answer:
          "Yes, a bilingual site is possible. It adds content and design work, so we include it in the quote once you tell us which pages need it.",
      },
      {
        question: "What do I need to get started?",
        answer:
          "Tell us what your business does, who your customers are and what you want visitors to do. If you have a current site, run the free audit and send us the result.",
      },
      {
        question: "How much will it cost to run each year?",
        answer:
          "Domain and hosting are the main running costs, and we put an estimate in the quote. You own the accounts, so you are never locked in.",
      },
    ],
    related: [
      { href: "/work/sharon-physio", label: "Sharon Physio case study" },
      { href: "/solutions/website-for-clinics", label: "Websites for clinics" },
      { href: "/website-audit", label: "Free website audit" },
      { href: "/solutions/website-development-bengaluru", label: "Website development in Bengaluru" },
    ],
    whatsappMessage: "Hi NeoKlyn, I'm in Madurai and I'd like a quote for a website.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Solution pages that feature a given case study, for "similar sites" links. */
export function solutionsForCase(projectSlug: string): Solution[] {
  return solutions.filter((s) => s.caseSlugs.includes(projectSlug));
}

export function solutionsForService(serviceSlug: string): Solution[] {
  return solutions.filter((s) => s.serviceSlug === serviceSlug);
}
