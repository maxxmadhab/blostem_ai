export const C = {
  cyan: "#00d4ff", purple: "#7c3aed", green: "#10b981",
  orange: "#f59e0b", red: "#ef4444", pink: "#ec4899",
  bg: "#030c1a", bgAlt: "#071326", bgCard: "rgba(7,20,42,0.85)",
  border: "rgba(0,212,255,0.13)", text: "#dde8f8", muted: "#4e6280",
  mutedLight: "#92a4c2",
};

export const customerTrends = [
  { month:"Jan", customers:8400, churned:320, revenue:124000 },
  { month:"Feb", customers:8900, churned:300, revenue:132000 },
  { month:"Mar", customers:9400, churned:285, revenue:141000 },
  { month:"Apr", customers:9900, churned:260, revenue:153000 },
  { month:"May", customers:10700, churned:248, revenue:168000 },
  { month:"Jun", customers:12400, churned:236, revenue:184000 },
];

export const allInsights = [
  { type:"warning", icon:"!", text:"Checkout drop-off increased 14% today", action:"Enable faster checkout or offer discount", time:"2m" },
  { type:"success", icon:"+", text:"Retention score improved in premium users", action:"Expand loyalty nudges", time:"9m" },
  { type:"info", icon:"i", text:"Fiber customers show higher risk this week", action:"Trigger support outreach", time:"18m" },
  { type:"warning", icon:"!", text:"Monthly contracts are driving most churn", action:"Promote annual plan upgrade", time:"31m" },
];

// Export segmentData, funnelSteps, mlRules, etc. here as well
