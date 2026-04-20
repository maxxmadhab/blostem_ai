Maxx Ai ⬡
🔗 Live Demo: https://blostem-ai.vercel.app/
⚠️ Connection Note: The backend is hosted on Render's free tier. If the "AI Insights Engine" status shows as offline, please refresh the website. Render puts the server to "sleep" after inactivity, and it may take 30–60 seconds to spin back up on the first request.

📈 Data Analytics & Insights
This project was built under the Data Analytics & Insights track. My goal was to build an engine that doesn't just display numbers, but turns raw data into actionable decisions.

What excites me about this work:
The ability to take a chaotic dataset (like 7,000+ rows of customer behavior from the telco churn dataset) and condense it into a single "Churn Score" or a "Decision Recommendation" is where the true power of AI lies. Building tools for Customer Segmentation, Funnel Analytics, Churn Prediction, and Market Research allows businesses to move from "What happened?" to "What should we do next?"

🚀 Features & Modules
⚡ AI Churn Prediction (The Flagship)
The Engine: A real Machine Learning model (Logistic Regression) trained on a dataset of 7,043 customers.

The Output: Provides a real-time probability score (%) of a customer leaving.

Explainable AI: It doesn't just give a score; it displays the Top Contributing Factors (e.g., how much "Contract Type" or "Monthly Charges" pushed the score up or down) using model coefficients.

◈ Customer Segmentation
Interactive Scatter Plot visualizing customer clusters.

Uses a rule-based engine to classify users into "High Value Loyalists," "High Risk," or "New/Untapped" based on Engagement vs. Spend.

Allows real-time input to see how new data points are auto-classified by the system.

▽ Funnel Analytics
Visualizes the customer journey from "Site Visitors" to "Retained Users."

Identifies critical drop-off points in the conversion pipeline to help businesses optimize their UI/UX.

◎ Decision Engine
The "Action" layer of the dashboard.

Translates analytical insights into operational strategies (e.g., "Shift ad spend from Facebook to LinkedIn").

Allows users to "Approve" or "Dismiss" AI-generated initiatives.

◉ Market Research
Radar Chart analysis comparing "Nexus AI" against industry competitors.

Metrics include AI Capabilities, UI/UX Design, and Pricing Value to provide a 360-degree competitive view.

🛠️ Tech Stack
Frontend (Deployed on Vercel):

React 18 + Vite: For a lightning-fast, modular UI.

Recharts: For complex, responsive data visualizations.

Custom CSS: Professional dark-mode interface with glassmorphism effects.

Backend (Deployed on Render):

Python Flask: Lightweight API handling model inference.

Scikit-Learn: The backbone of the Logistic Regression ML model.

Pandas & NumPy: For real-time data preprocessing and feature alignment.

Gunicorn: Production-grade WSGI server.

🧠 The Machine Learning Model
The model was trained locally using a LogisticRegression algorithm.

Training Accuracy: 80.3%

Precision: 67.8%

Recall: 58.0%

F1 Score: 62.5%

Pipeline:

Preprocessing: Handles missing values and converts categorical data via One-Hot Encoding.

Scaling: Uses StandardScaler to normalize feature magnitudes.

Inference: The API receives JSON input from the React frontend, transforms it to match the training schema (29 features), and returns the prediction probability.
