import { useState } from "react";
import { C } from "../data/mockData";

export default function DecisionEngine() {
  const [decisions, setDecisions] = useState([
    { id: 1, type: "Retention", text: "Offer 15% discount to 342 at-risk 'High Value' users.", impact: "+$12.4k estimated MRR retained", risk: "Low", color: C.green },
    { id: 2, type: "Acquisition", text: "Shift $500/day ad spend from Facebook to LinkedIn.", impact: "-18% Customer Acquisition Cost", risk: "Medium", color: C.orange },
    { id: 3, type: "Product", text: "Force-enable new dashboard feature for all users.", impact: "+22% engagement rate", risk: "High", color: C.red },
  ]);

  const handleAction = (id) => {
    // Remove the item from the list when acted upon to simulate taking action
    setDecisions(decisions.filter(d => d.id !== id));
  };

  return (
    <div className="glass fade2" style={{ padding: 26, minHeight: 400 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Automated Decision Engine</div>
          <div style={{ fontSize: 13, color: C.muted }}>Approve or dismiss AI-generated operational strategies.</div>
        </div>
        <div style={{ fontSize: 11, color: C.cyan, background: "rgba(0,212,255,0.1)", padding: "4px 10px", borderRadius: 6, fontWeight: 700, letterSpacing: "0.05em" }}>
          {decisions.length} PENDING ACTIONS
        </div>
      </div>

      {decisions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>All caught up!</div>
          <div style={{ fontSize: 12 }}>The AI is currently analyzing new data.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {decisions.map((d) => (
            <div key={d.id} className="slide" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, background: "rgba(0,0,0,0.2)", borderLeft: `4px solid ${d.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: d.color, letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>{d.type} INITIATIVE</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{d.text}</div>
                </div>
                <div style={{ fontSize: 11, color: C.mutedLight, background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 4 }}>
                  Risk: <span style={{ color: d.color, fontWeight: 700 }}>{d.risk}</span>
                </div>
              </div>
              
              <div style={{ fontSize: 12, color: C.cyan, marginBottom: 16 }}>↳ {d.impact}</div>
              
              <div style={{ display: "flex", gap: 10 }}>
                <button 
                  onClick={() => handleAction(d.id)}
                  style={{ padding: "8px 16px", background: C.green, color: "#000", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: "pointer", flex: 1 }}
                >
                  APPROVE & EXECUTE
                </button>
                <button 
                  onClick={() => handleAction(d.id)}
                  style={{ padding: "8px 16px", background: "transparent", color: C.mutedLight, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", flex: 1 }}
                >
                  DISMISS
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}