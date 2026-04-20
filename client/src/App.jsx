import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./components/Dashboard";
import ChurnPredictor from "./components/ChurnPredictor";
import Segmentation from "./components/Segmentation";
import FunnelAnalytics from "./components/FunnelAnalytics";
import DecisionEngine from "./components/DecisionEngine";
import MarketResearch from "./components/MarketResearch";
import { C, API_BASE } from "./data/mockData";

function Settings() {
  return (
    <div className="glass fade1" style={{ padding: 32, maxWidth: 600 }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Settings</div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 24 }}>Configure your Nexus Analytics workspace</div>
      {[
        { label: "API Endpoint", value: API_BASE, type: "text" },
        { label: "Refresh Interval (seconds)", value: "30", type: "number" },
        { label: "Default Risk Threshold (%)", value: "65", type: "number" },
      ].map(f => (
        <div key={f.label} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10.5, color: C.muted, marginBottom: 6, fontWeight: 700, letterSpacing: "0.05em" }}>
            {f.label.toUpperCase()}
          </div>
          <input className="field" defaultValue={f.value} type={f.type} />
        </div>
      ))}
      <button className="btn-primary" style={{ marginTop: 8 }}>Save Settings</button>
    </div>
  );
}

const PAGES = {
  dashboard:    <Dashboard />,
  churn:        <ChurnPredictor />,
  segmentation: <Segmentation />,
  funnel:       <FunnelAnalytics />,
  insights:     <DecisionEngine />,
  market:       <MarketResearch />,
  settings:     <Settings />,
};

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ marginLeft: 228, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <TopBar page={page} />
        <main style={{ flex: 1, padding: "22px 26px", maxWidth: 1280 }}>
          {PAGES[page] ?? <Dashboard />}
        </main>
      </div>
    </div>
  );
}
