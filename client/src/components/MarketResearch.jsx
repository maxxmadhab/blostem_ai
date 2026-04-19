import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { C } from "../data/mockData";

// Custom Tooltip for Radar Chart
const RadarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(3,12,26,.97)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px", fontSize: 12 }}>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 700, marginBottom: 2 }}>
          {p.name}: {p.value} / 150
        </div>
      ))}
    </div>
  );
};

export default function MarketResearch() {
  // Fake competitive analysis data
  const data = [
    { metric: 'AI Capabilities', NexusAI: 145, Competitor: 85, fullMark: 150 },
    { metric: 'Predictive Accuracy', NexusAI: 135, Competitor: 105, fullMark: 150 },
    { metric: 'Data Integration', NexusAI: 120, Competitor: 130, fullMark: 150 },
    { metric: 'UI/UX Design', NexusAI: 140, Competitor: 90, fullMark: 150 },
    { metric: 'Pricing Value', NexusAI: 125, Competitor: 110, fullMark: 150 },
    { metric: 'Customer Support', NexusAI: 130, Competitor: 115, fullMark: 150 },
  ];

  return (
    <div className="glass fade3" style={{ padding: 26, minHeight: 400 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Competitive Landscape Analysis</div>
          <div style={{ fontSize: 13, color: C.muted }}>Real-time NLP sentiment analysis across social media and review platforms.</div>
        </div>
        
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: C.text }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }} />
            NEXUS AI
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: C.muted }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.orange }} />
            COMPETITOR
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1, height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: C.mutedLight, fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Tooltip content={<RadarTooltip />} />
              <Radar name="Nexus AI" dataKey="NexusAI" stroke={C.cyan} fill={C.cyan} fillOpacity={0.4} />
              <Radar name="Competitor" dataKey="Competitor" stroke={C.orange} fill={C.orange} fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Summary Sidebar */}
        <div style={{ width: 280, background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 20, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, letterSpacing: "0.1em", marginBottom: 12 }}>AI MARKET SUMMARY</div>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>Strongest Advantage</div>
            <div style={{ fontSize: 12, color: C.mutedLight }}>Your "AI Capabilities" score is 70% higher than the industry average. Highlight this in Q3 marketing.</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>Vulnerability Detected</div>
            <div style={{ fontSize: 12, color: C.mutedLight }}>Competitors are currently outperforming in "Data Integration" speeds. Engineering should review API latency.</div>
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.05)` }}>
            <div style={{ fontSize: 11, color: C.muted }}>Total Market Sentiment</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: C.green }}>+42.8%</div>
            <div style={{ fontSize: 11, color: C.green }}>↑ trending positive</div>
          </div>
        </div>
      </div>
    </div>
  );
}