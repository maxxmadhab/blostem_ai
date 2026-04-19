import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { C } from "../data/mockData";

// Custom tooltip for the funnel
const FunnelTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div style={{ background: "rgba(3,12,26,.97)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'Exo 2',sans-serif" }}>
      <div style={{ color: data.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{data.stage}</div>
      <div style={{ color: C.text, fontSize: 12 }}>
        Users: <strong>{data.count.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default function FunnelAnalytics() {
  // Funnel drop-off data
  const data = [
    { stage: "Site Visitors", count: 18400, color: C.cyan },
    { stage: "Free Signups", count: 8200, color: "#3b82f6" }, 
    { stage: "Active Users", count: 5400, color: C.purple },
    { stage: "Paid Subs", count: 2100, color: C.orange },
    { stage: "Retained (6mo+)", count: 1850, color: C.green }
  ];

  return (
    <div className="glass fade1" style={{ padding: 26, minHeight: 400 }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Conversion Funnel Drop-off</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>AI tracking of user progression from initial acquisition to long-term retention.</div>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={true} vertical={false} />
          <XAxis type="number" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="stage" type="category" tick={{ fill: C.text, fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} width={100} />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<FunnelTooltip />} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color}40)` }} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}