export const PROJECT_TYPES = [
  {
    value: "Web App",
    description: "Custom web platforms, dashboards, and SaaS products.",
  },
  {
    value: "Mobile App",
    description: "Native or cross-platform mobile experiences.",
  },
  {
    value: "Ecommerce",
    description: "Conversion-focused online stores and commerce systems.",
  },
  {
    value: "AI Agent",
    description: "Autonomous assistants and workflow automation systems.",
  },
  {
    value: "3D Website",
    description: "Immersive web experiences powered by 3D and motion.",
  },
  {
    value: "Full Brand + Web",
    description: "End-to-end identity, UX, and web presence rollout.",
  },
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];

export const ESTIMATE_FEATURES: Record<ProjectType, string[]> = {
  "Web App": [
    "Auth",
    "Dashboard",
    "API Integrations",
    "CMS",
    "Payment Gateway",
    "Admin Panel",
    "AI Features",
    "Real-time/WebSockets",
  ],
  "Mobile App": [
    "Auth",
    "Push Notifications",
    "Offline Mode",
    "In-App Payments",
    "Maps/Location",
    "Camera/Media",
    "Chat/Messaging",
    "Analytics",
  ],
  Ecommerce: [
    "Product Catalog",
    "Cart/Checkout",
    "Payment Gateway",
    "Inventory Mgmt",
    "Reviews/Ratings",
    "Multi-currency",
    "Shipping Integration",
    "Admin Panel",
  ],
  "AI Agent": [
    "RAG Pipeline",
    "Multi-Agent System",
    "Workflow Automation",
    "Chat Interface",
    "API Integrations",
    "Analytics Dashboard",
    "Custom Training",
    "Voice/Speech",
  ],
  "3D Website": [
    "3D Product Viewer",
    "Scroll Animations",
    "WebGL Scenes",
    "Interactive Configurator",
    "AR Preview",
    "Particle Effects",
    "Video Integration",
    "Custom Shaders",
  ],
  "Full Brand + Web": [
    "Brand Identity",
    "Logo Design",
    "Design System",
    "Landing Pages",
    "CMS",
    "SEO Optimization",
    "Social Templates",
    "Motion Graphics",
  ],
};

export const SCALE_OPTIONS = [
  {
    value: "MVP",
    title: "MVP",
    description: "Fast launch, focused core features",
  },
  {
    value: "Growth Stage",
    title: "Growth Stage",
    description: "50K+ users, scalable architecture",
  },
  {
    value: "Enterprise",
    title: "Enterprise",
    description: "Compliance, SLA, multi-region readiness",
  },
] as const;

export type ScaleOption = (typeof SCALE_OPTIONS)[number]["value"];

export const TIMELINE_OPTIONS = [
  {
    value: "ASAP <4 weeks",
    description: "Critical launch timeline",
  },
  {
    value: "Standard 6–12 weeks",
    description: "Balanced planning and delivery",
  },
  {
    value: "Flexible (no rush)",
    description: "Phased delivery with room to iterate",
  },
] as const;

export type TimelineOption = (typeof TIMELINE_OPTIONS)[number]["value"];
