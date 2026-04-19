import os, json, pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# ── Load pre-trained artifacts ────────────────────────────────────────────────
BASE = os.path.dirname(__file__)

with open(os.path.join(BASE, "model.pkl"), "rb") as f:
    model: LogisticRegression = pickle.load(f)

with open(os.path.join(BASE, "scaler.pkl"), "rb") as f:
    scaler: StandardScaler = pickle.load(f)

with open(os.path.join(BASE, "feature_cols.json")) as f:
    FEATURE_COLS: list[str] = json.load(f)

with open(os.path.join(BASE, "metrics.json")) as f:
    MODEL_METRICS: dict = json.load(f)

# ── Helper: build feature vector from raw form input ─────────────────────────
def build_features(data: dict) -> pd.DataFrame:
    tenure            = float(data.get("tenure", 0))
    monthly_charges   = float(data.get("monthlyCharges", 0))
    total_charges     = tenure * monthly_charges          # derived
    senior_citizen    = int(data.get("seniorCitizen", 0))
    contract          = data.get("contract", "Month-to-month")
    internet_service  = data.get("internetService", "Fiber optic")
    tech_support      = data.get("techSupport", "No")
    payment_method    = data.get("paymentMethod", "Electronic check")
    paperless_billing = data.get("paperlessBilling", "Yes")
    partner           = data.get("partner", "No")
    dependents        = data.get("dependents", "No")
    phone_service     = data.get("phoneService", "Yes")
    multiple_lines    = data.get("multipleLines", "No")
    online_security   = data.get("onlineSecurity", "No")
    online_backup     = data.get("onlineBackup", "No")
    device_protection = data.get("deviceProtection", "No")
    streaming_tv      = data.get("streamingTV", "No")
    streaming_movies  = data.get("streamingMovies", "No")

    # Build raw dict
    raw = pd.DataFrame([{
        "tenure": tenure,
        "MonthlyCharges": monthly_charges,
        "TotalCharges": total_charges,
        "SeniorCitizen": senior_citizen,
        "Contract": contract,
        "InternetService": internet_service,
        "TechSupport": tech_support,
        "PaymentMethod": payment_method,
        "PaperlessBilling": paperless_billing,
        "Partner": partner,
        "Dependents": dependents,
        "PhoneService": phone_service,
        "MultipleLines": multiple_lines,
        "OnlineSecurity": online_security,
        "OnlineBackup": online_backup,
        "DeviceProtection": device_protection,
        "StreamingTV": streaming_tv,
        "StreamingMovies": streaming_movies,
    }])

    cat_cols = ["Contract","InternetService","TechSupport","PaymentMethod",
                "PaperlessBilling","Partner","Dependents","PhoneService",
                "MultipleLines","OnlineSecurity","OnlineBackup",
                "DeviceProtection","StreamingTV","StreamingMovies"]
    num_cols = ["tenure","MonthlyCharges","TotalCharges","SeniorCitizen"]

    # FIX: Removed drop_first=True to ensure single-row columns aren't dropped
    encoded = pd.get_dummies(raw[cat_cols + num_cols])

    # Align to training columns (fill missing dummies with 0)
    for col in FEATURE_COLS:
        if col not in encoded.columns:
            encoded[col] = 0
    
    # Ensure columns are in the exact order the model expects
    encoded = encoded[FEATURE_COLS]
    
    return encoded

# ── Routes ────────────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": "LogisticRegression", "features": len(FEATURE_COLS)})

@app.route("/metrics", methods=["GET"])
def metrics():
    return jsonify(MODEL_METRICS)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "No JSON body received"}), 400

    try:
        X = build_features(data)
        X_scaled = scaler.transform(X)
        prob = model.predict_proba(X_scaled)[0][1]  # P(churn=1)
        score = int(round(prob * 100))

        if score >= 65:
            label = "High"
            recommendation = "Immediate intervention needed. Offer a loyalty discount and schedule a personal retention call within 24 hours."
        elif score >= 35:
            label = "Medium"
            recommendation = "Monitor closely. Consider proactive outreach with value-add offers this week before risk escalates."
        else:
            label = "Low"
            recommendation = "Customer appears stable. Great opportunity to explore upsell options or referral incentives."

        # Top contributing factors
        coef = model.coef_[0]
        X_arr = X_scaled[0]
        contributions = sorted(
            zip(FEATURE_COLS, coef * X_arr),
            key=lambda x: abs(x[1]),
            reverse=True
        )[:5]
        
        factors = [{"feature": f.replace("_"," "), "impact": round(float(v), 3)} for f, v in contributions]

        return jsonify({
            "score": score,
            "probability": round(float(prob), 4),
            "label": label,
            "recommendation": recommendation,
            "topFactors": factors,
            "modelMetrics": MODEL_METRICS,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)