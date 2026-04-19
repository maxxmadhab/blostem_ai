import pandas as pd
import pickle
import json
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

print("Loading data...")
df = pd.read_csv("")

# Basic Data Cleaning
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'].fillna(df['TotalCharges'].mean(), inplace=True)

# Select features mentioned in your ChurnPredictor
features = ['tenure', 'MonthlyCharges', 'TotalCharges', 'SeniorCitizen', 'Contract', 
            'InternetService', 'TechSupport', 'PaymentMethod', 'PaperlessBilling', 
            'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'OnlineSecurity', 
            'OnlineBackup', 'DeviceProtection', 'StreamingTV', 'StreamingMovies']

X = df[features]
y = df['Churn'].apply(lambda x: 1 if x == 'Yes' else 0)

# One-hot encoding
X_encoded = pd.get_dummies(X)
feature_cols = list(X_encoded.columns)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Scale Data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Model
print("Training Logistic Regression Model...")
model = LogisticRegression(C=0.5, random_state=42, max_iter=1000)
model.fit(X_train_scaled, y_train)

# Calculate Metrics
y_pred = model.predict(X_test_scaled)
metrics = {
    "accuracy": round(accuracy_score(y_test, y_pred) * 100, 1),
    "precision": round(precision_score(y_test, y_pred) * 100, 1),
    "recall": round(recall_score(y_test, y_pred) * 100, 1),
    "f1": round(f1_score(y_test, y_pred) * 100, 1)
}

print(f"Metrics: {metrics}")

# Save Artifacts
print("Saving artifacts...")
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

with open("feature_cols.json", "w") as f:
    json.dump(feature_cols, f)

with open("metrics.json", "w") as f:
    json.dump(metrics, f)

print("Done! Artifacts generated successfully.")