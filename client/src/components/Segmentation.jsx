import { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { C } from "../data/mockData";

const SEED = [
  { id:1,  engagement:88, spend:92 }, { id:2,  engagement:75, spend:84 },
  { id:3,  engagement:91, spend:77 }, { id:4,  engagement:82, spend:88 },
  { id:5,  engagement:78, spend:95 }, { id:6,  engagement:85, spend:71 },
  { id:7,  engagement:18, spend:22 }, { id:8,  engagement:25, spend:15 },
  { id:9,  engagement:12, spend:35 }, { id:10, engagement:28, spend:20 },
  { id:11, engagement:22, spend:10 }, { id:12, engagement:8,  spend:30 },
  { id:13, engagement:55, spend:60 }, { id:14, engagement:48, spend:72 },
  { id:15, engagement:63, spend:45 }, { id:16, engagement:40, spend:55 },
  { id:17, engagement:70, spend:50 }, { id:18, engagement:35, spend:65 },
  { id:19, engagement:52, spend:48 }, { id:20, engagement:44, spend:38 },
];

function getCluster(user) {
  if (user.engagement > 70 && user.spend > 70) return 0;
  if (user.engagement < 30 && user.spend < 40) return 1;
  return 2;
}

const COLORS = [C.cyan, C.red, C.purple];
const LABELS = ["High Value Loyalists", "High Risk / Detractors", "New / Untapped"];
const DESCS  = ["Retain & upsell",      "Urgent re-engagement",   "Nurture to convert"];

const initialUsers = SEED.map(u => ({ ...u, cluster: getCluster(u) }));

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background:"rgba(3,12,26,.97)", border:`1px solid ${C.border}`, borderRadius:9, padding:"10px 14px", fontSize:12, fontFamily:"'Exo 2',sans-serif" }}>
      <div style={{ color:COLORS[d.cluster], fontWeight:800, marginBottom:4 }}>{LABELS[d.cluster]}</div>
      <div style={{ color:C.mutedLight }}>Engagement: <strong style={{color:C.text}}>{d.engagement}</strong></div>
      <div style={{ color:C.mutedLight }}>Spend: <strong style={{color:C.text}}>{d.spend}</strong></div>
      {d.id > SEED.length && <div style={{ color:C.orange, fontSize:10.5, marginTop:4 }}>● New entry</div>}
    </div>
  );
}

export default function Segmentation() {
  const [users, setUsers]       = useState(initialUsers);
  const [form, setForm]         = useState({ engagement:"", spend:"" });
  const [error, setError]       = useState("");
  const [lastAdded, setLastAdded] = useState(null);

  const counts = [0,1,2].map(c => users.filter(u => u.cluster === c).length);

  const previewCluster = (() => {
    const e = Number(form.engagement), s = Number(form.spend);
    if (form.engagement !== "" && form.spend !== "" && e >= 0 && e <= 100 && s >= 0 && s <= 100)
      return getCluster({ engagement: e, spend: s });
    return null;
  })();

  const handleAdd = () => {
    const eng = Number(form.engagement), spnd = Number(form.spend);
    if (!form.engagement || !form.spend)                       { setError("Fill both fields."); return; }
    if (eng < 0 || eng > 100 || spnd < 0 || spnd > 100)       { setError("Values must be 0–100."); return; }
    setError("");
    const newUser = { id: users.length + 1, engagement: eng, spend: spnd, cluster: getCluster({ engagement: eng, spend: spnd }) };
    setUsers(prev => [...prev, newUser]);
    setLastAdded(newUser);
    setForm({ engagement:"", spend:"" });
  };

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:16, alignItems:"start" }}>

        {/* Chart */}
        <div className="glass fade1" style={{ padding:26 }}>
          <div style={{ fontSize:15, fontWeight:800, marginBottom:4 }}>AI Customer Clusters</div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:20 }}>Rule-based segmentation · engagement vs lifetime spend</div>
          <div style={{ display:"flex", gap:20, marginBottom:18 }}>
            {LABELS.map((label, i) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:COLORS[i], boxShadow:`0 0 6px ${COLORS[i]}` }}/>
                <span style={{ color:C.mutedLight, fontWeight:600 }}>{label}</span>
                <span style={{ color:COLORS[i], fontWeight:800, fontSize:11 }}>({counts[i]})</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart margin={{ top:10, right:20, bottom:14, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" dataKey="engagement" name="Engagement" domain={[0,100]}
                tick={{ fill:C.muted, fontSize:10 }} axisLine={false} tickLine={false}
                label={{ value:"Engagement Score", position:"insideBottom", offset:-4, fill:C.muted, fontSize:10 }} />
              <YAxis type="number" dataKey="spend" name="Spend" domain={[0,100]}
                tick={{ fill:C.muted, fontSize:10 }} axisLine={false} tickLine={false}
                label={{ value:"Spend Score", angle:-90, position:"insideLeft", fill:C.muted, fontSize:10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={users}>
                {users.map((u, i) => (
                  <Cell key={i} fill={COLORS[u.cluster]}
                    style={{ filter:`drop-shadow(0 0 ${u.id > SEED.length ? "8px" : "4px"} ${COLORS[u.cluster]})` }} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Right panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Input form */}
          <div className="glass fade2" style={{ padding:20 }}>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>Add Customer</div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:16 }}>Enter scores → auto-classify</div>
            {["engagement","spend"].map(key => (
              <div key={key} style={{ marginBottom:12 }}>
                <div style={{ fontSize:10.5, color:C.muted, fontWeight:700, letterSpacing:"0.05em", marginBottom:5 }}>
                  {key.toUpperCase()} (0–100)
                </div>
                <input className="field" type="number" min="0" max="100"
                  placeholder={key === "engagement" ? "e.g. 82" : "e.g. 75"}
                  value={form[key]}
                  onChange={e => { setError(""); setForm(f => ({ ...f, [key]: e.target.value })); }}
                  onKeyDown={e => e.key === "Enter" && handleAdd()}
                />
              </div>
            ))}

            {error && (
              <div style={{ fontSize:11, color:C.red, marginBottom:10, padding:"7px 10px", background:"rgba(239,68,68,0.08)", borderRadius:6, border:"1px solid rgba(239,68,68,0.2)" }}>
                ⚠ {error}
              </div>
            )}

            {/* Live preview */}
            {previewCluster !== null && (
              <div style={{ marginBottom:12, padding:"9px 12px", borderRadius:8, background:`${COLORS[previewCluster]}10`, border:`1px solid ${COLORS[previewCluster]}30`, display:"flex", alignItems:"center", gap:9 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:COLORS[previewCluster], flexShrink:0 }}/>
                <div>
                  <div style={{ fontSize:11.5, fontWeight:700, color:COLORS[previewCluster] }}>{LABELS[previewCluster]}</div>
                  <div style={{ fontSize:10.5, color:C.muted }}>{DESCS[previewCluster]}</div>
                </div>
              </div>
            )}

            <button className="btn-primary" style={{ width:"100%", padding:"10px" }} onClick={handleAdd}>
              + Add to Chart
            </button>
          </div>

          {/* Last classified */}
          {lastAdded && (
            <div className="glass fade3" style={{ padding:16, borderTop:`2px solid ${COLORS[lastAdded.cluster]}` }}>
              <div style={{ fontSize:10, color:C.muted, fontWeight:700, letterSpacing:"0.06em", marginBottom:6 }}>LAST CLASSIFIED</div>
              <div style={{ fontSize:13, fontWeight:700, color:COLORS[lastAdded.cluster], marginBottom:5 }}>{LABELS[lastAdded.cluster]}</div>
              <div style={{ fontSize:11.5, color:C.mutedLight }}>
                Eng: <strong style={{color:C.text}}>{lastAdded.engagement}</strong> · Spend: <strong style={{color:C.text}}>{lastAdded.spend}</strong>
              </div>
              <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>{DESCS[lastAdded.cluster]}</div>
            </div>
          )}

          {/* Rules reference */}
          <div className="glass fade3" style={{ padding:16 }}>
            <div style={{ fontSize:12, fontWeight:700, marginBottom:12 }}>Segment Rules</div>
            {[
              { label:"High Value",   rule:"Eng > 70 AND Spend > 70", color:C.cyan   },
              { label:"High Risk",    rule:"Eng < 30 AND Spend < 40", color:C.red    },
              { label:"New/Untapped", rule:"Everything else",         color:C.purple },
            ].map(r => (
              <div key={r.label} style={{ display:"flex", gap:10, marginBottom:9, fontSize:11, alignItems:"flex-start" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:r.color, flexShrink:0, marginTop:3 }}/>
                <span style={{ color:C.text, fontWeight:700 }}>{r.label}</span>
                <span style={{ color:C.muted }}>— {r.rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}