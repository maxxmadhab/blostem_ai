import { useEffect, useState } from "react";
import { API_BASE, C, riskColor } from "../data/mockData";
import Gauge from "./Gauge";

const HEALTH_TIMEOUT_MS = 20000;

const FIELDS = [
  { key: "tenure", label: "Tenure (months)", type: "number", ph: "e.g. 24" },
  { key: "monthlyCharges", label: "Monthly Charges ($)", type: "number", ph: "e.g. 79.99" },
  { key: "contract", label: "Contract Type", type: "select", opts: ["Month-to-month", "One year", "Two year"] },
  { key: "internetService", label: "Internet Service", type: "select", opts: ["DSL", "Fiber optic", "No"] },
  { key: "techSupport", label: "Tech Support", type: "select", opts: ["Yes", "No", "No internet service"] },
  {
    key: "paymentMethod",
    label: "Payment Method",
    type: "select",
    opts: [
      "Electronic check",
      "Mailed check",
      "Bank transfer (automatic)",
      "Credit card (automatic)",
    ],
  },
  { key: "paperlessBilling", label: "Paperless Billing", type: "select", opts: ["Yes", "No"] },
  { key: "seniorCitizen", label: "Senior Citizen", type: "select", opts: ["No", "Yes"] },
  { key: "partner", label: "Has Partner", type: "select", opts: ["Yes", "No"] },
  { key: "onlineSecurity", label: "Online Security", type: "select", opts: ["Yes", "No", "No internet service"] },
  { key: "streamingTV", label: "Streaming TV", type: "select", opts: ["Yes", "No", "No internet service"] },
  { key: "multipleLines", label: "Multiple Lines", type: "select", opts: ["Yes", "No", "No phone service"] },
];

const DEFAULTS = {
  tenure: "",
  monthlyCharges: "",
  contract: "Month-to-month",
  internetService: "Fiber optic",
  techSupport: "No",
  paymentMethod: "Electronic check",
  paperlessBilling: "Yes",
  seniorCitizen: "No",
  partner: "No",
  onlineSecurity: "No",
  streamingTV: "No",
  multipleLines: "No",
};

function MetricSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 58, borderRadius: 8 }} />
      ))}
    </div>
  );
}

function FactorBar({ feature, impact }) {
  const isPositive = impact > 0;
  const width = Math.min(100, Math.abs(impact) * 180);

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
        <span style={{ color: C.mutedLight }}>{feature}</span>
        <span style={{ color: isPositive ? C.red : C.green, fontWeight: 700 }}>
          {isPositive ? "+" : ""}
          {impact.toFixed(3)}
        </span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            borderRadius: 2,
            background: isPositive ? C.red : C.green,
            transition: "width 0.8s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function ChurnPredictor() {
  const [form, setForm] = useState(DEFAULTS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverMetrics, setServerMetrics] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState("checking");

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE}/health`, {
          signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
        });

        if (!res.ok) {
          setBackendStatus("down");
          return;
        }

        setBackendStatus("ok");

        try {
          const metricsRes = await fetch(`${API_BASE}/metrics`, {
            signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
          });

          if (metricsRes.ok) {
            const metrics = await metricsRes.json();
            setServerMetrics(metrics);
          }
        } catch {
          // Keep the backend marked healthy even if metrics take a bit longer.
        }
      } catch {
        setBackendStatus("down");
      } finally {
        setMetricsLoading(false);
      }
    };

    checkBackend();
  }, []);

  const predict = async () => {
    if (!form.tenure || !form.monthlyCharges) {
      setError("Please fill in Tenure and Monthly Charges at minimum.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      ...form,
      seniorCitizen: form.seniorCitizen === "Yes" ? 1 : 0,
      tenure: Number(form.tenure),
      monthlyCharges: Number(form.monthlyCharges),
    };

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Prediction failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message || "Could not connect to prediction server.");
    } finally {
      setLoading(false);
    }
  };

  const metricItems = [
    { m: "Accuracy", v: serverMetrics ? `${serverMetrics.accuracy}%` : "-", c: C.cyan },
    { m: "Precision", v: serverMetrics ? `${serverMetrics.precision}%` : "-", c: C.purple },
    { m: "Recall", v: serverMetrics ? `${serverMetrics.recall}%` : "-", c: C.green },
    { m: "F1 Score", v: serverMetrics ? `${serverMetrics.f1}%` : "-", c: C.orange },
  ];

  return (
    <div>
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
          {backendStatus === "down" && `ML Backend offline - Unable to reach ${API_BASE}`}
          {backendStatus === "checking" && `Connecting to ML backend at ${API_BASE}...`}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="glass fade1" style={{ padding: 26 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Customer Attributes</div>
          <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 18 }}>
            Enter customer data to get a real ML-based churn probability
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
            {FIELDS.map((field) => (
              <div key={field.key}>
                <div style={{ fontSize: 10.5, color: C.muted, marginBottom: 5, letterSpacing: "0.04em", fontWeight: 700 }}>
                  {field.label.toUpperCase()}
                </div>
                {field.type === "select" ? (
                  <select className="field" value={form[field.key]} onChange={(e) => setField(field.key, e.target.value)}>
                    {field.opts.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="field"
                    type={field.type}
                    placeholder={field.ph}
                    value={form[field.key]}
                    onChange={(e) => setField(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div
              style={{
                marginTop: 14,
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(239,68,68,0.09)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: C.red,
                fontSize: 12,
              }}
            >
              Warning: {error}
            </div>
          )}

          <button
            className="btn-primary"
            onClick={predict}
            disabled={loading || backendStatus !== "ok"}
            style={{ marginTop: 18, width: "100%", padding: "12px", fontSize: 14 }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                <span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>...</span>
                Analyzing via ML model...
              </span>
            ) : (
              "Predict Churn Risk"
            )}
          </button>

          <div style={{ marginTop: 10, fontSize: 10.5, color: C.muted, textAlign: "center" }}>
            Powered by Logistic Regression - Telco Churn Dataset - scikit-learn
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="glass fade2" style={{ padding: 26, textAlign: "center", flex: 1 }}>
            {loading ? (
              <div style={{ padding: "40px 20px" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `3px solid ${C.border}`,
                    borderTopColor: C.cyan,
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto 16px",
                  }}
                />
                <div style={{ color: C.muted, fontSize: 13 }}>Running prediction model...</div>
              </div>
            ) : result ? (
              <>
                <div style={{ fontSize: 10.5, color: C.muted, marginBottom: 6, letterSpacing: "0.08em", fontWeight: 700 }}>
                  CHURN PROBABILITY
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: -10 }}>
                  <Gauge value={result.score} />
                </div>
                <div
                  style={{
                    fontSize: 54,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: riskColor(result.score),
                    marginBottom: 10,
                    lineHeight: 1,
                  }}
                >
                  {result.score}%
                </div>
                <div style={{ marginBottom: 16 }}>
                  <span className={`tag tag-${result.label.toLowerCase()}`}>{result.label} Risk</span>
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: C.muted,
                    background: "rgba(0,212,255,0.04)",
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    textAlign: "left",
                    marginBottom: 14,
                  }}
                >
                  <span style={{ color: C.cyan, fontWeight: 700 }}>AI Recommendation:</span>
                  <br />
                  {result.recommendation}
                </div>

                {result.topFactors && result.topFactors.length > 0 && (
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.muted,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        marginBottom: 10,
                      }}
                    >
                      TOP CONTRIBUTING FACTORS
                    </div>
                    {result.topFactors.map((factor, index) => (
                      <FactorBar key={index} feature={factor.feature} impact={factor.impact} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: "52px 20px" }}>
                <div style={{ fontSize: 42, opacity: 0.2, marginBottom: 16 }}>ML</div>
                <div style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.6 }}>
                  Fill in the customer attributes
                  <br />
                  and run the prediction
                </div>
              </div>
            )}
          </div>

          <div className="glass fade3" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Model Performance Metrics</div>
              <div style={{ fontSize: 9.5, color: C.muted }}>Trained on 7,043 rows</div>
            </div>
            {metricsLoading ? (
              <MetricSkeleton />
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                {metricItems.map(({ m, v, c }) => (
                  <div
                    key={m}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 8,
                      padding: "10px 12px",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ fontSize: 10, color: C.muted, marginBottom: 4, letterSpacing: "0.06em" }}>{m.toUpperCase()}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 10, fontSize: 10.5, color: C.muted, lineHeight: 1.6 }}>
              Model: <span style={{ color: C.cyan, fontFamily: "monospace" }}>LogisticRegression(C=0.5)</span>
              <span style={{ float: "right" }}>80/20 train-test split</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
