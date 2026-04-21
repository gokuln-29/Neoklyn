export type SiteStat = {
  key: "projects" | "retention" | "experience" | "hubs";
  value: number;
  suffix: string;
  aboutLabel: string;
  homeLabel: string;
  homeSubLabel: string;
  homeColor: string;
};

export const siteStats: SiteStat[] = [
  {
    key: "projects",
    value: 120,
    suffix: "+",
    aboutLabel: "Enterprise Projects",
    homeLabel: "Enterprise Deployments",
    homeSubLabel: "Successfully Delivered",
    homeColor: "var(--cyan)",
  },
  {
    key: "retention",
    value: 98,
    suffix: "%",
    aboutLabel: "Client Retention",
    homeLabel: "Client Retention Rate",
    homeSubLabel: "Verified Long-Term",
    homeColor: "var(--violet)",
  },
  {
    key: "experience",
    value: 5,
    suffix: "yr",
    aboutLabel: "Experience",
    homeLabel: "Engineering Excellence",
    homeSubLabel: "Zero Compromise",
    homeColor: "var(--blue)",
  },
  {
    key: "hubs",
    value: 3,
    suffix: "",
    aboutLabel: "Global Hubs",
    homeLabel: "Globally We Serve",
    homeSubLabel: "Head Office in Bengaluru",
    homeColor: "var(--cyan)",
  },
];
