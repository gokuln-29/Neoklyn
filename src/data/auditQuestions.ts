export const AUDIT_QUESTIONS = [
  {
    key: "teamSize",
    question: "What's your team size?",
    options: [
      { value: "Solo", points: 1 },
      { value: "2-10", points: 2 },
      { value: "11-50", points: 3 },
      { value: "50+", points: 3 },
    ],
  },
  {
    key: "biggestTimeSink",
    question: "Which of these eats the most time each week?",
    options: [
      { value: "Customer support", points: 2 },
      { value: "Content & marketing", points: 2 },
      { value: "Sales follow-up", points: 2 },
      { value: "Data entry & reporting", points: 2 },
      { value: "Scheduling & operations", points: 2 },
    ],
  },
  {
    key: "manualProcesses",
    question: "How many of your current business processes are still manual — no software automation at all?",
    options: [
      { value: "None — we're already automated", points: 0 },
      { value: "A few", points: 1 },
      { value: "About half", points: 2 },
      { value: "Most or all", points: 3 },
    ],
  },
  {
    key: "aiUsage",
    question: "Do you currently use any AI tools in the business?",
    options: [
      { value: "None yet", points: 2 },
      { value: "Basic tools (ChatGPT, etc.)", points: 2 },
      { value: "Some custom AI workflows", points: 1 },
      { value: "Fully integrated AI systems", points: 0 },
    ],
  },
  {
    key: "timeline",
    question: "What's your timeline to start an AI/automation project?",
    options: [
      { value: "ASAP", points: 4 },
      { value: "1-3 months", points: 3 },
      { value: "3-6 months", points: 1 },
      { value: "Just exploring", points: 0 },
    ],
  },
  {
    key: "budget",
    question: "What's your rough budget range for this?",
    options: [
      { value: "Under $5K", points: 0 },
      { value: "$5K - $20K", points: 1 },
      { value: "$20K - $50K", points: 3 },
      { value: "$50K+", points: 4 },
      { value: "Not sure yet", points: 1 },
    ],
  },
] as const;

export type AuditQuestionKey = (typeof AUDIT_QUESTIONS)[number]["key"];
export type AuditAnswers = Record<AuditQuestionKey, string>;
