import pandas as pd
import numpy as np
import pickle
import json
import os
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


# Ensure files are saved in the same directory as the script
BASE = os.path.dirname(os.path.abspath(__file__))
EXCEL_PATH = os.path.join(BASE, "Telco_customer_churn.xlsx")

def train():
    print(f"Loading dataset from {EXCEL_PATH}...")
    try:
        df = pd.read_excel(EXCEL_PATH)
    except FileNotFoundError:
        print("ERROR: Telco_customer_churn.xlsx not found! Please place it in the server/ folder.")
        return

    # Define exact features as per your README specification
    features = [
        'tenure', 'MonthlyCharges', 'TotalCharges', 'SeniorCitizen',
        'Contract', 'InternetService', 'TechSupport', 'PaymentMethod',
        'PaperlessBilling', 'Partner', 'Dependents', 'PhoneService',
        'MultipleLines', 'OnlineSecurity', 'OnlineBackup',
        'DeviceProtection', 'StreamingTV', 'StreamingMovies'
    ]

    column_map = {
        'Tenure Months': 'tenure',
        'Monthly Charges': 'MonthlyCharges',
        'Total Charges': 'TotalCharges',
        'Senior Citizen': 'SeniorCitizen',
        'Internet Service': 'InternetService',
        'Tech Support': 'TechSupport',
        'Payment Method': 'PaymentMethod',
        'Paperless Billing': 'PaperlessBilling',
        'Phone Service': 'PhoneService',
        'Multiple Lines': 'MultipleLines',
        'Online Security': 'OnlineSecurity',
        'Online Backup': 'OnlineBackup',
        'Device Protection': 'DeviceProtection',
        'Streaming TV': 'StreamingTV',
        'Streaming Movies': 'StreamingMovies',
        'Churn Label': 'Churn',
    }
    df = df.rename(columns=column_map)

    required_columns = features + ['Churn']
    missing_columns = [col for col in required_columns if col not in df.columns]
    if missing_columns:
        print(f"ERROR: Dataset is missing required columns: {missing_columns}")
        return

    # Basic cleaning: TotalCharges sometimes contains empty spaces
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df['TotalCharges'] = df['TotalCharges'].fillna(0)

    X = df[features]
    # Target variable: Convert Yes/No to 1/0
    y = df['Churn'].apply(lambda x: 1 if str(x).strip().lower() in {'yes', '1', 'true'} else 0)

    print("One-hot encoding categoricals...")
    # This automatically ignores numerics and one-hot encodes string columns
    X_encoded = pd.get_dummies(X)
    
    # Save the exact column order so the API can perfectly match it later
    feature_cols = list(X_encoded.columns)

    print("Splitting data (80% Train, 20% Test)...")
    X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

    print("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    print("Training Logistic Regression model...")
    # C=0.5 adds slight regularization to prevent overfitting
    model = LogisticRegression(C=0.5, max_iter=1000, random_state=42)
    model.fit(X_train_scaled, y_train)

    print("Evaluating model...")
    y_pred = model.predict(X_test_scaled)
    
    # Calculate and round metrics matching your frontend
    metrics = {
        "accuracy": round(accuracy_score(y_test, y_pred) * 100, 1),
        "precision": round(precision_score(y_test, y_pred) * 100, 1),
        "recall": round(recall_score(y_test, y_pred) * 100, 1),
        "f1": round(f1_score(y_test, y_pred) * 100, 1)
    }
    
    print(f"Results: {metrics}")

    print("Exporting artifacts to server/ directory...")
    with open(os.path.join(BASE, "model.pkl"), "wb") as f:
        pickle.dump(model, f)

    with open(os.path.join(BASE, "scaler.pkl"), "wb") as f:
        pickle.dump(scaler, f)

    with open(os.path.join(BASE, "feature_cols.json"), "w") as f:
        json.dump(feature_cols, f)

    with open(os.path.join(BASE, "metrics.json"), "w") as f:
        json.dump(metrics, f)

    print("Success! You can now run `python index.py` or deploy to Render.")

if __name__ == "__main__":
    train()
