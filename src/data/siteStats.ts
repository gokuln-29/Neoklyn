export type SiteStat = {
  key: "experience" | "delivery" | "pricing" | "founderBuilt";
  value: string;
  suffix: string;
  aboutLabel: string;
  homeLabel: string;
  homeSubLabel: string;
  homeColor: string;
};

export const siteStats: SiteStat[] = [
  {
    key: "experience",
    value: "10",
    suffix: "+",
    aboutLabel: "Years Engineering Experience",
    homeLabel: "Years Engineering Experience",
    homeSubLabel: "Web development since 2015",
    homeColor: "var(--cyan)",
  },
  {
    key: "delivery",
    value: "2-5",
    suffix: " wks",
    aboutLabel: "Typical Delivery",
    homeLabel: "Typical Delivery",
    homeSubLabel: "vs 6-14 weeks at traditional agencies",
    homeColor: "var(--violet)",
  },
  {
    key: "pricing",
    value: "40-60",
    suffix: "%",
    aboutLabel: "Below Agency Pricing",
    homeLabel: "Below Agency Pricing",
    homeSubLabel: "AI speed, passed to you",
    homeColor: "var(--blue)",
  },
  {
    key: "founderBuilt",
    value: "100",
    suffix: "%",
    aboutLabel: "Founder-Built Projects",
    homeLabel: "Founder-Built & Reviewed",
    homeSubLabel: "You work directly with the engineer",
    homeColor: "var(--cyan)",
  },
];
