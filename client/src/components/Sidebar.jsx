import { C } from "../data/mockData";

export default function Sidebar({ page, setPage }) {
  const nav = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "churn", icon: "⚡", label: "Churn Predictor", badge: "ML" },
    { id: "segmentation", icon: "◈", label: "Segmentation" },
    { id: "funnel", icon: "▽", label: "Funnel Analytics" },
    { id: "insights", icon: "◎", label: "Decision Engine" },
    { id: "market", icon: "◉", label: "Market Research" },
  ];

  return (
    <div style={{ width: 228, minHeight: "100vh", padding: "22px 12px", position: "fixed", left: 0, top: 0, bottom: 0, background: "rgba(3,12,26,0.97)", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", zIndex: 100 }}>
      <div style={{ padding: "2px 10px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.cyan},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: `0 0 18px rgba(0,212,255,0.28)` }}>⬡</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: "-0.02em", color: C.text }}>Maxx Ai</div>
            <div style={{ fontSize: 9.5, color: C.muted, letterSpacing: "0.12em", fontWeight: 600 }}>ANALYTICS AI</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9.5, color: C.muted, letterSpacing: "0.1em", padding: "0 10px", marginBottom: 8, fontWeight: 700 }}>CORE MODULES</div>
        {nav.map(item => (
          <button key={item.id} className={`nav-btn${page === item.id ? " active" : ""}`} onClick={() => setPage(item.id)}>
            <span style={{ fontSize: 15, opacity: page === item.id ? 1 : .55 }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span style={{ marginLeft: "auto", fontSize: 9, background: "rgba(0,212,255,0.13)", color: C.cyan, padding: "2px 6px", borderRadius: 4, letterSpacing: "0.06em", fontWeight: 800 }}>{item.badge}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
