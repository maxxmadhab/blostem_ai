const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://blostemai.vercel.app",
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : []),
].map((origin) => origin.trim()).filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "blostem-ai-api" });
});

// Helper function to determine risk label
const getRiskLabel = (r) => r >= 65 ? "High" : r >= 35 ? "Medium" : "Low";

app.post("/api/predict", (req, res) => {
  const form = req.body;
  let s = 0;

  // The "ML" Logic from your original file
  if (form.contract === "Month-to-month") s += 34;
  if (form.contract === "One year") s += 10;
  if (form.internetService === "Fiber optic") s += 14;
  if (form.techSupport === "No") s += 11;
  if (form.paymentMethod === "Electronic check") s += 17;
  if (Number(form.tenure) < 12) s += 19;
  else if (Number(form.tenure) > 36) s -= 18;
  if (Number(form.monthlyCharges) > 80) s += 9;
  if (form.paperlessBilling === "Yes") s += 4;

  // Add slight randomization and cap between 5 and 96
  s = Math.max(5, Math.min(96, s + Math.floor(Math.random() * 7 - 3)));

  // Simulate processing time
  setTimeout(() => {
    res.json({ score: s, label: getRiskLabel(s) });
  }, 1600);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
