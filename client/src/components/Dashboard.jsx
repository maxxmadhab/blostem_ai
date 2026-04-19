import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { C, customerTrends, allInsights } from "../data/mockData";

// Helper components for the dashboard
const KPICard = ({ label, value, change, icon, color, cls }) => (
  <div className={`kpi-card ${cls}`} style={{ border: `1px solid ${C.border}`, borderTop: `2px solid ${color}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.06em", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 18, lineHeight: 1 }}>{icon}</div>
    </div>
    <div style={{ fontSize: 28, fontWeight: 900, color: C.text, letterSpacing: "-0.03em", marginBottom: 6 }}>{value}</div>
    <div style={{ fontSize: 12, fontWeight: 600, color: change > 0 ? C.green : C.red, display: "flex", alignItems: "center", gap: 3 }}>
      <span>{change > 0 ? "↑" : "↓"}</span><span>{Math.abs(change)}% vs last month</span>
    </div>
  </div>
);

// Custom tooltip for charts
const TooltipBox = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(3,12,26,.97)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'Exo 2',sans-serif", fontSize: 12 }}>
      {label && <p style={{ color: C.cyan, fontWeight: 700, marginBottom: 5 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || C.text, marginBottom: 2 }}>
          {p.name}: <strong>{typeof p.value === "number" && p.value > 999 ? p.value.toLocaleString() : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const kpis = [
    { label: "TOTAL CUSTOMERS", value: "12,400", change: 8.2, icon: "👥", color: C.cyan, cls: "fade1" },
    { label: "CHURN RATE", value: "2.1%", change: -0.4, icon: "📉", color: C.purple, cls: "fade2" },
    { label: "REVENUE AT RISK", value: "$284K", change: -12.3, icon: "⚡", color: C.orange, cls: "fade3" },
    { label: "RETENTION SCORE", value: "87.4", change: 3.1, icon: "🎯", color: C.green, cls: "fade4" },
  ];

  return (
    <div>
      {/* Top KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {kpis.map(k => <KPICard key={k.label} {...k} />)}
      </div>

      {/* Main Charts Area */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Area Chart: Customer Growth */}
        <div className="glass fade2" style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Customer Growth</div>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={customerTrends}>
              <defs>
                <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.cyan} stopOpacity={.28}/><stop offset="95%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.red} stopOpacity={.28}/><stop offset="95%" stopColor={C.red} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={TooltipBox} />
              <Area type="monotone" dataKey="customers" stroke={C.cyan} fill="url(#gC)" strokeWidth={2} name="Customers" />
              <Area type="monotone" dataKey="churned" stroke={C.red} fill="url(#gR)" strokeWidth={2} name="Churned" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Live Insights Feed */}
        <div className="glass fade4" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Live AI Insights</div>
            <div style={{ fontSize: 9.5, color: C.green, letterSpacing: "0.08em", fontWeight: 800, background: "rgba(16,185,129,0.1)", padding: "3px 8px", borderRadius: 5 }}>● LIVE</div>
          </div>
          <div style={{ maxHeight: 218, overflowY: "auto" }}>
            {allInsights.slice(0, 4).map((ins, i) => (
              <div key={i} className={`insight-card ins-${ins.type} slide`} style={{ animationDelay: `${i * .08}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{ins.text}</div>
                  <div style={{ fontSize: 10, color: C.muted, flexShrink: 0, marginLeft: 8 }}>{ins.time}</div>
                </div>
                <div style={{ fontSize: 11.5, color: C.muted }}>→ {ins.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}