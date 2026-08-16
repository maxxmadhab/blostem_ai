<div
  style={{
    marginBottom: 14,
    padding: "9px 16px",
    borderRadius: 8,
    background:
      backendStatus === "ok"
        ? "rgba(16,185,129,0.07)"
        : backendStatus === "down"
          ? "rgba(239,68,68,0.07)"
          : "rgba(0,212,255,0.04)",
    border: `1px solid ${
      backendStatus === "ok"
        ? "rgba(16,185,129,0.2)"
        : backendStatus === "down"
          ? "rgba(239,68,68,0.2)"
          : C.border
    }`,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 12,
  }}
>
  <div
    style={{
      width: 7,
      height: 7,
      borderRadius: "50%",
      flexShrink: 0,
      background: backendStatus === "ok" ? C.green : backendStatus === "down" ? C.red : C.orange,
      animation: backendStatus === "checking" ? "pulse 1.5s infinite" : "none",
    }}
  />
  <span style={{ color: C.mutedLight }}>
    {backendStatus === "ok" && "ML Backend connected - Logistic Regression trained on Telco Churn dataset (7,043 rows)"}
    {backendStatus === "down" && `ML status check failed - predictions will still try ${API_BASE}${backendError ? ` (${backendError})` : ""}`}
    {backendStatus === "checking" && `Connecting to ML backend at ${API_BASE}...`}
  </span>
</div>
