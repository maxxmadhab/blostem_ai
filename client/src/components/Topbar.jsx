import { C } from "../data/mockData";

export default function TopBar({ page }) {
  const titles = { dashboard: "Analytics Overview", churn: "Churn Predictor", segmentation: "Customer Segmentation", funnel: "Funnel Analytics", insights: "Decision Engine", market: "Market Research" };
  
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 26px", borderBottom: `1px solid ${C.border}`, background: "rgba(3,12,26,0.92)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 90 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, animation: "pulse 2.5s infinite", boxShadow: `0 0 6px ${C.green}` }} />
        <span style={{ fontSize: 12, color: C.green, fontWeight: 700, letterSpacing: "0.05em" }}>AI Insights Engine Active</span>
        <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>·</span>
        <span style={{ fontSize: 13, color: C.mutedLight, fontWeight: 600 }}>{titles[page] || ""}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg,${C.cyan},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: `0 0 14px rgba(0,212,255,0.22)` }}>A</div>
      </div>
    </div>
  );
}