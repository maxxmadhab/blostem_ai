// ─── Design Tokens ─────────────────────────────────────────────────────────
export const C = {
  cyan: "#00d4ff", purple: "#7c3aed", green: "#10b981",
  orange: "#f59e0b", red: "#ef4444", pink: "#ec4899",
  bg: "#030c1a", bgAlt: "#071326", bgCard: "rgba(7,20,42,0.85)",
  border: "rgba(0,212,255,0.13)", borderHover: "rgba(0,212,255,0.3)",
  text: "#dde8f8", muted: "#4e6280", mutedLight: "#7a96bb",
};

// ─── Customer Trends ────────────────────────────────────────────────────────
export const customerTrends = [
  { month:"Jan", customers:8400, churned:320, revenue:124000 },
  { month:"Feb", customers:8700, churned:280, revenue:131000 },
  { month:"Mar", customers:9100, churned:350, revenue:138000 },
  { month:"Apr", customers:9400, churned:290, revenue:142000 },
  { month:"May", customers:9800, churned:310, revenue:149000 },
  { month:"Jun", customers:10200, churned:260, revenue:156000 },
  { month:"Jul", customers:10600, churned:340, revenue:161000 },
  { month:"Aug", customers:10900, churned:280, revenue:167000 },
  { month:"Sep", customers:11200, churned:220, revenue:172000 },
  { month:"Oct", customers:11800, churned:190, revenue:181000 },
  { month:"Nov", customers:12100, churned:210, revenue:186000 },
  { month:"Dec", customers:12400, churned:180, revenue:193000 },
];

// ─── Segmentation ───────────────────────────────────────────────────────────
export const SEG_COLORS = {
  "High Value": C.cyan, "At Risk": C.red,
  "New Users": C.purple, "Dormant": C.orange,
};

export const segmentData = [
  ...[{x:88,y:91},{x:79,y:83},{x:93,y:76},{x:72,y:88},{x:85,y:79},{x:91,y:94},{x:76,y:82},{x:82,y:90},{x:95,y:85},{x:69,y:77}]
    .map((p,i)=>({...p,z:8,segment:"High Value",id:i})),
  ...[{x:22,y:25},{x:31,y:18},{x:18,y:33},{x:28,y:40},{x:15,y:22},{x:35,y:28},{x:24,y:35},{x:12,y:30},{x:40,y:20},{x:26,y:14}]
    .map((p,i)=>({...p,z:8,segment:"At Risk",id:i+10})),
  ...[{x:48,y:52},{x:55,y:46},{x:43,y:58},{x:51,y:63},{x:59,y:49},{x:45,y:55},{x:62,y:57},{x:50,y:44}]
    .map((p,i)=>({...p,z:8,segment:"New Users",id:i+20})),
  ...[{x:14,y:68},{x:20,y:74},{x:11,y:61},{x:17,y:80},{x:23,y:65}]
    .map((p,i)=>({...p,z:8,segment:"Dormant",id:i+28})),
];

// ─── Funnel ─────────────────────────────────────────────────────────────────
export const funnelSteps = [
  { name:"Impressions", value:100000 },
  { name:"Clicks",      value:42000  },
  { name:"Signups",     value:18000  },
  { name:"Trial",       value:8500   },
  { name:"Purchase",    value:3200   },
];
export const funnelColors = [C.cyan,"#6366f1",C.purple,C.orange,C.red];

// ─── Insights ───────────────────────────────────────────────────────────────
export const allInsights = [
  { type:"warning", icon:"!", text:"Checkout drop-off increased 14% today",        action:"Enable faster checkout or offer discount",      time:"2m" },
  { type:"tip",     icon:"i", text:'Segment "At Risk" shows 68% churn probability', action:"Launch win-back email campaign immediately",    time:"8m" },
  { type:"success", icon:"↑", text:"High-Value segment revenue up 23% this week",  action:"Expand loyalty rewards for this segment",       time:"15m" },
  { type:"warning", icon:"!", text:"Mobile conversion rate dropped to 1.8%",       action:"Optimize mobile checkout flow immediately",     time:"32m" },
  { type:"tip",     icon:"i", text:"42% of trial users never complete onboarding", action:"Add guided onboarding tooltips to key steps",   time:"1h" },
  { type:"success", icon:"↑", text:"Google Pay can boost conversions by 18%",      action:"Prioritize Google Pay integration this sprint", time:"2h" },
  { type:"warning", icon:"!", text:"Payment failure rate spiked to 8.4%",          action:"Investigate gateway & notify affected users",   time:"3h" },
  { type:"success", icon:"↑", text:"Email campaign drove 340 new signups",         action:"Scale campaign to lookalike audiences",         time:"5h" },
];

// ─── ML Rules ───────────────────────────────────────────────────────────────
export const mlRules = [
  { cond:"checkout_dropoff > 40%",      action:"Enable faster checkout or offer discount",     status:"active",  triggered:3 },
  { cond:"segment[AtRisk].churn > 60%", action:"Launch win-back email sequence immediately",   status:"active",  triggered:1 },
  { cond:"mobile_conversion < 2%",      action:"Optimize mobile checkout UX",                  status:"active",  triggered:1 },
  { cond:"trial_completion < 50%",      action:"Trigger guided onboarding tooltip flow",       status:"active",  triggered:0 },
  { cond:"revenue_dip > 15%",           action:"Alert account manager + retention deal",       status:"paused",  triggered:0 },
];

// ─── Sentiment ──────────────────────────────────────────────────────────────
export const sentimentData = [
  { topic:"Product Quality",  positive:72, neutral:18, negative:10 },
  { topic:"Customer Support", positive:58, neutral:22, negative:20 },
  { topic:"Pricing",          positive:44, neutral:28, negative:28 },
  { topic:"Onboarding",       positive:65, neutral:20, negative:15 },
  { topic:"Mobile App",       positive:51, neutral:24, negative:25 },
];

export const trendingKW = [
  { term:"AI Analytics",     volume:890, trend:"+34%", color:C.cyan   },
  { term:"Churn Prevention", volume:620, trend:"+18%", color:C.green  },
  { term:"Customer 360",     volume:540, trend:"+27%", color:C.purple },
  { term:"Predictive CRM",   volume:380, trend:"+42%", color:C.orange },
  { term:"SaaS Retention",   volume:720, trend:"+11%", color:C.red    },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
export const fmt = (n) =>
  n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : n;

export const riskColor = (r) => r >= 65 ? C.red : r >= 35 ? C.orange : C.green;
export const riskLabel = (r) => r >= 65 ? "High" : r >= 35 ? "Medium" : "Low";

// ─── API base URL (set via Vercel env var) ──────────────────────────────────
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";