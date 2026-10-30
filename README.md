# AutoValue AI - Car Price Prediction Platform 🚗💡

An intelligent, full-stack vehicle valuation platform that leverages machine learning to predict used car market values with high accuracy. Built with a modern React frontend and a robust Python/Flask machine learning inference backend.

---

## 🌟 Key Features

- **Accurate Machine Learning Valuation**: Trained on 8,000+ CarDekho vehicle sales records with preprocessed features (brand, model, year, mileage, fuel type, transmission, ownership).
- **Interactive Valuation Wizard**: Sleek, multi-step user experience powered by React, Tailwind CSS, and Framer Motion micro-animations.
- **Dynamic Brand & Model Catalog**: Dynamic vehicle catalogue populated directly from model metadata and backend specs.
- **Transparent Market Insights**: Shows predicted price in INR (`₹`), model evaluation metrics, and warnings for edge-case vehicles (e.g., post-2020 vehicles).
- **Production-Ready Architecture**: Clean REST API design, robust input validation, comprehensive test coverage (unit & integration tests), and decoupled architecture.

---

## 🏗️ Project Architecture

```
Car price prediction/
├── .gitignore
├── README.md
├── backend/
│   └── backend/
│       ├── app.py                     # Flask API service
│       ├── train.py                   # ML model training pipeline
│       ├── requirements.txt           # Python dependencies
│       ├── data/
│       │   └── car_details_v3.csv     # Dataset
│       ├── models/
│       │   ├── car_price_model.joblib # Trained ML model artifact
│       │   └── model_metrics.json     # MAE, RMSE, and R² scores
│       ├── routes/                    # API endpoints (/health, /predict, /model-info)
│       ├── tests/                     # Backend test suite
│       └── utils/                     # Validators, preprocessing, loaders
└── frontend/
    └── frontend/
        ├── package.json               # Node.js dependencies
        ├── vite.config.js             # Vite configuration with /api proxy
        ├── src/
        │   ├── components/            # Reusable UI & wizard components
        │   ├── pages/                 # Home, Prediction, Results pages
        │   ├── services/              # API clients & data mappers
        │   └── theme/                 # Design tokens and styles
        └── tests/                     # Frontend integration & unit tests
```

---

## 🚀 Quick Start Guide

### Prerequisites

- **Python 3.10+**
- **Node.js 18+ & npm**

---

### 1. Backend Setup

From the project root:

```powershell
cd backend/backend
# Install dependencies (if not already installed)
pip install -r requirements.txt

# Run the backend API server (runs on http://127.0.0.1:5000)
python app.py
```

*Alternatively, on Windows you can simply run:*
```bat
.\run_dev.bat
```

To re-train the model from scratch:
```powershell
python train.py
```

---

### 2. Frontend Setup

In a new terminal:

```powershell
cd frontend/frontend
# Install dependencies
npm install

# Start Vite dev server (runs on http://localhost:3000)
npm run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/health` | Service status and model artifact readiness |
| `GET`  | `/api/model-info` | Model metadata, evaluation scores, and supported brands/models |
| `POST` | `/api/predict` | Computes price prediction given vehicle attributes |

#### Sample Request (`POST /api/predict`):
```json
{
  "brand": "Maruti",
  "model": "Swift",
  "year": 2017,
  "mileage": 45000,
  "fuelType": "Petrol",
  "transmission": "Manual",
  "owner": "1st Owner"
}
```

#### Sample Response:
```json
{
  "currency": "INR",
  "model": "AutoValue AI Regressor",
  "normalised_input": { ... },
  "predicted_price_inr": 485000,
  "warnings": []
}
```

---

## 🧪 Testing

### Backend Tests
```powershell
cd backend/backend
python -m unittest discover -s tests -v
```

### Frontend Tests
```powershell
cd frontend/frontend
npm test
npm run test:integration
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
