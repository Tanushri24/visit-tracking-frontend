// src/types.ts

// Visit Tracking Types
export type Schedule = {
  place: string;
  task: string;
  time: string;
};

export type Expense = {
  type: string;
  amount: string;
};

export type Visit = {
  company: string;
  purpose: string;
  location: string;
  date: string;
  followUp: string;
  stage: "Lead" | "Discussion" | "Proposal" | "Negotiation" | "Won" | "Lost";
  outcome: string;
};

export type TabType = "visit" | "schedule" | "expense";