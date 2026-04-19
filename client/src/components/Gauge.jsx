import { C } from "../data/mockData";

// Helper function to color the gauge (Green for low risk, Red for high)
const riskColor = (r) => r >= 65 ? C.red : r >= 35 ? C.orange : C.green;

export default function Gauge({ value }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  const color = riskColor(pct);
  const startAngle = -225; 
  const totalArc = 270;
  const endAngle = startAngle + (pct / 100) * totalArc;
  
  const toXY = (deg, r) => ({
    x: 100 + r * Math.cos((deg * Math.PI) / 180),
    y: 100 + r * Math.sin((deg * Math.PI) / 180),
  });
  
  const arc = (start, end, r, large) => {
    const s = toXY(start, r); 
    const e = toXY(end, r);
    return `M${s.x},${s.y} A${r},${r} 0 ${large ? 1 : 0} 1 ${e.x},${e.y}`;
  };
  
  const large = (pct / 100) * totalArc > 180 ? 1 : 0;
  const dot = toXY(endAngle, 68);
  
  return (
    <svg width="200" height="150" viewBox="0 0 200 150">
      <path d={arc(startAngle, startAngle + totalArc, 68, 1)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={10} strokeLinecap="round"/>
      {pct > 0 && (
        <path 
          d={arc(startAngle, endAngle, 68, large)} 
          fill="none" 
          stroke={color} 
          strokeWidth={10} 
          strokeLinecap="round" 
          style={{ filter: `drop-shadow(0 0 5px ${color})`, transition: "all .8s ease" }}
        />
      )}
      <circle 
        cx={dot.x} cy={dot.y} r={6} fill={color} 
        style={{ filter: `drop-shadow(0 0 8px ${color})`, transition: "all .8s ease" }}
      />
      <text x="20" y="135" fill={C.green} fontSize="9" fontFamily="'Exo 2'" fontWeight="700">LOW</text>
      <text x="88" y="28" fill={C.orange} fontSize="9" fontFamily="'Exo 2'" fontWeight="700">MED</text>
      <text x="158" y="135" fill={C.red} fontSize="9" fontFamily="'Exo 2'" fontWeight="700">HIGH</text>
    </svg>
  );
}
