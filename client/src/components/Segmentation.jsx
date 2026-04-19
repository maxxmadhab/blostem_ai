import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { C } from "../data/mockData";

const data = Array.from({ length: 60 }).map((_, i) => ({
  engagement: (i * 37 + 19) % 100,
  spend: (i * 53 + 11) % 100,
  cluster: i % 3,
}));

export default function Segmentation() {
  const colors = [C.cyan, C.red, C.purple];
  const labels = ["High Value Loyalists", "High Risk / Detractors", "New / Untapped"];

  return (
    <div className="glass fade3" style={{ padding: 26, minHeight: 400 }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>AI Customer Clusters</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>Machine learning grouping based on 30-day engagement vs lifetime spend.</div>
      
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {labels.map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors[i] }} />
            {label}
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis type="number" dataKey="engagement" name="Engagement Score" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis type="number" dataKey="spend" name="Spend Score" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: "rgba(3,12,26,.97)", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
          <Scatter name="Customers" data={data}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.cluster]} style={{ filter: `drop-shadow(0 0 4px ${colors[entry.cluster]})` }} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
