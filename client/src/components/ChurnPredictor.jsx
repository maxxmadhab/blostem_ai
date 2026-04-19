import Gauge from "./Gauge";
import { useMemo, useState } from "react";
import { C } from "../data/mockData";

const API_URL = import.meta.env.VITE_API_URL || "https://blostem-ai-vizs.onrender.com";

const initialForm = {
  tenure: "",
  monthlyCharges: "",
  contract: "Month-to-month",
  internetService: "Fiber optic",
  techSupport: "No",
  paymentMethod: "Electronic check",
  paperlessBilling: "Yes",
};

export default function ChurnPredictor() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = useMemo(() => [
    { key: "tenure", label: "Tenure (months)", type: "number", placeholder: "e.g. 24" },
    { key: "monthlyCharges", label: "Monthly charges ($)", type: "number", placeholder: "e.g. 79.99" },
    { key: "contract", label: "Contract type", type: "select", options: ["Month-to-month", "One year", "Two year"] },
    { key: "internetService", label: "Internet service", type: "select", options: ["Fiber optic", "DSL", "No"] },
    { key: "techSupport", label: "Tech support", type: "select", options: ["No", "Yes"] },
    { key: "paymentMethod", label: "Payment method", type: "select", options: ["Electronic check", "Mailed check", "Bank transfer", "Credit card"] },
    { key: "paperlessBilling", label: "Paperless billing", type: "select", options: ["Yes", "No"] },
  ], []);

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const predict = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed with ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const riskColor = (score) => score >= 65 ? C.red : score >= 35 ? C.orange : C.green;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.8fr)", gap: 18 }}>
      <div className="glass fade1" style={{ padding: 26 }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 6 }}>Customer profile</div>
        <div style={{ fontSize: 13, color: C.mutedLight, marginBottom: 20 }}>Enter customer details and run a live churn prediction.</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          {fields.map((field) => (
            <label key={field.key} style={{ display: "grid", gap: 7 }}>
              <span style={{ fontSize: 12, color: C.mutedLight, fontWeight: 700 }}>{field.label}</span>
              {field.type === "select" ? (
                <select className="input-field" value={form[field.key]} onChange={(event) => setField(field.key, event.target.value)}>
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input className="input-field" type={field.type} value={form[field.key]} placeholder={field.placeholder} onChange={(event) => setField(field.key, event.target.value)} />
              )}
            </label>
          ))}
        </div>

        {error && (
          <div style={{ marginTop: 14, color: C.red, fontSize: 13, fontWeight: 700 }}>
            {error}
          </div>
        )}

        <button className="btn-primary" onClick={predict} disabled={loading} style={{ marginTop: 18, width: "100%", padding: "12px", fontSize: 14 }}>
          {loading ? "Analyzing customer data..." : "Predict churn risk"}
        </button>
      </div>

      <div className="glass fade2" style={{ padding: 26, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {result ? (
          <>
            <Gauge value={result.score} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: riskColor(result.score), fontSize: 22, fontWeight: 900 }}>{result.label} risk</div>
              <p style={{ maxWidth: 340, margin: "10px auto 0", color: C.mutedLight, fontSize: 13 }}>
                Prioritize this account with retention actions based on the latest customer profile.
              </p>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: C.cyan, marginBottom: 8 }}>--</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>No prediction yet</div>
            <p style={{ maxWidth: 320, margin: "10px auto 0", color: C.mutedLight, fontSize: 13 }}>
              Submit a customer profile to see the churn risk score.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
