import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import ChurnPredictor from "./components/ChurnPredictor";
import Segmentation from "./components/Segmentation";
import FunnelAnalytics from "./components/FunnelAnalytics";
import DecisionEngine from "./components/DecisionEngine";
import MarketResearch from "./components/MarketResearch";
import { C } from "./data/mockData"; // Make sure to import your colors if needed

export default function App() {
  // State to manage which page is currently active
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      {/* Fixed Sidebar */}
      <Sidebar page={page} setPage={setPage} />

      {/* Main Content Area (offset by sidebar width) */}
      <div style={{ flex: 1, marginLeft: 228, display: "flex", flexDirection: "column" }}>
        <Topbar page={page} />
        
        {/* Dynamic Page Content */}
        <div style={{ padding: 26, flex: 1 }}>
          {page === "dashboard" && <Dashboard />}
          {page === "churn" && <ChurnPredictor />}
          {/* Add placeholders for the other pages for now */}
          {page === "segmentation" && <Segmentation />}
          {page === "funnel" && <FunnelAnalytics />}
          {page === "insights" && <DecisionEngine />}
          {page === "market" && <MarketResearch />}
          {page === "market" && <div className="glass" style={{padding: 40, textAlign: "center"}}>Market Research Module (Coming Soon)</div>}
        </div>
      </div>
    </div>
  );
}
