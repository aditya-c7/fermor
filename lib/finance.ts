export const inr0 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const inr = (v: number) => inr0.format(Math.round(v));

export function sipFV(monthly: number, annualRate: number, years: number) {
  const i = annualRate / 12;
  const n = years * 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

export function fdLumpSum(principal: number, annualRate: number, years: number) {
  return principal * Math.pow(1 + annualRate, years);
}

export type Calculator = {
  name: string;
  desc: string;
  category: string;
};

export const calculators: Calculator[] = [
  { name: "SIP Calculator", desc: "SIP growth projection", category: "Investing" },
  { name: "EMI Calculator", desc: "EMI + payoff schedule", category: "Loans" },
  { name: "Income Tax Calculator", desc: "Old vs new regime, FY26-27", category: "Tax" },
  { name: "Home Loan Calculator", desc: "EMI + eligibility check", category: "Loans" },
  { name: "FIRE Calculator", desc: "FIRE number + timeline", category: "Retirement" },
  { name: "CTC Calculator", desc: "CTC to in-hand split", category: "Tax" },
  { name: "FD Calculator", desc: "FD maturity value", category: "Investing" },
  { name: "PPF Calculator", desc: "PPF at 7.1%", category: "Investing" },
];

export const problems = [
  { q: "Where did my salary actually go?", category: "SPENDING" },
  { q: "Old regime or new regime?", category: "TAX" },
  { q: "Is Rs 15,000 SIP enough?", category: "INVESTING" },
  { q: "Nifty hit 25,000. Now what?", category: "MARKETS" },
  { q: "Can I afford this house?", category: "LOANS" },
  { q: "When can I retire?", category: "RETIREMENT" },
];

export const news = [
  {
    category: "MARKETS",
    time: "2h ago",
    title: "Nifty crosses 25,000 for the first time",
    excerpt: "What record levels mean for monthly SIP investors.",
    read: "13 min read",
  },
  {
    category: "INCOME TAX",
    time: "Sep 29, 2026",
    title: "New tax regime changes explained in simple words",
    excerpt: "Slabs, rebate and what FY 2026-27 means for you.",
    read: "9 min read",
  },
  {
    category: "REGULATION",
    time: "Sep 28, 2026",
    title: "UPI charges above Rs 2,000: new MDR rule explained",
    excerpt: "What changes for merchants and everyday payments.",
    read: "6 min read",
  },
];
