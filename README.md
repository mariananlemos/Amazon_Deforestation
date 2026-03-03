# Amazon Deforestation Prediction — DETER/INPE

> Forecasting deforestation alerts in the Brazilian Amazon using machine learning and time-series analysis on INPE's DETER-AMZ dataset (2015–2025).

---

## Overview

This project builds on official Brazilian deforestation alert data published by INPE (National Institute for Space Research) through the DETER-AMZ system. It applies time-series feature engineering and machine learning to predict monthly deforested area (km²) in the Amazon, replacing a naive linear regression baseline with more robust models.

**Key results:**
- **2024/2025** was the worst year on record: **54,674 km²** alerted — up **+88%** from the previous year.
- Gradient Boosting achieved a dramatically higher R² than the original linear model (~0.0001 → significant improvement).
- SARIMA and Gradient Boosting forecasts are compared against held-out test data.

---

## Data Source

| Resource | Link |
|---|---|
| DETER-AMZ downloads | http://terrabrasilis.dpi.inpe.br/downloads/ |
| DETER live dashboard | http://terrabrasilis.dpi.inpe.br/app/dashboard/alerts/legal/amazon/aggregated/ |
| IPCC climate data | https://www.ipcc.ch/data/ |

The raw file used is `deter-amz-aggregated-03-03-2026-17_42_42.csv`, containing monthly aggregated deforestation alerts by Brazilian state (`uf`), alert class (`className`), and hydrological year (`year`, formatted as `YYYY/YYYY`).

---

## Methodology

### 1. Data Preparation
- Records are aggregated by hydrological year and calendar month to form a monthly time series.
- The current incomplete year (2025) is excluded from training.

### 2. Feature Engineering
Temporal features are created to capture autocorrelation and seasonality:

| Feature | Description |
|---|---|
| `lag_1` | Deforested area in the previous month |
| `lag_12` | Deforested area 12 months ago (same season, previous year) |
| `lag_24` | Deforested area 24 months ago |
| `roll_3` | 3-month rolling average (lag-shifted to avoid leakage) |
| `roll_12` | 12-month rolling average (lag-shifted) |
| `t` | Linear time index |
| `mes` | Calendar month (1–12, explicit seasonality) |

### 3. Train/Test Split
A **chronological 80/20 split** is used — no shuffling — to respect the time-series structure and prevent data leakage.

### 4. Models

| Model | Description |
|---|---|
| **Gradient Boosting** | 300 estimators, max depth 4, learning rate 0.05, 80% subsample |
| **SARIMA(1,1,1)(1,1,1)[12]** | Univariate seasonal ARIMA for baseline comparison |
| **Linear Regression** | Trend-only baseline (reproduces the original project's approach) |

### 5. Evaluation Metrics
- **MAE** — Mean Absolute Error (km²)
- **RMSE** — Root Mean Squared Error (km²)
- **R²** — Coefficient of determination

### 6. 2025 Forecast
A recursive 12-step forecast is generated using the Gradient Boosting model, updating lag features with each predicted value.

---

## Results

| Model | MAE (km²) | R² |
|---|---|---|
| Linear Regression (baseline) | — | ~0.0001 |
| SARIMA(1,1,1)(1,1,1)[12] | — | — |
| **Gradient Boosting** | — | **significant improvement** |

> Exact metric values are printed at runtime and depend on the full dataset.

---

## Key Findings

- **Peak deforestation months** are August, September, and October — corresponding to the dry season in the Amazon.
- **Lag features** (especially `lag_1` and `lag_12`) are the most important predictors, suggesting strong short-term and annual autocorrelation.
- **2024/2025** stands out as a record-breaking period, signaling an urgent acceleration of forest loss.

---

## Outputs

| File | Description |
|---|---|
| `predicao_desmatamento.png` | Static matplotlib dashboard (dark theme) with time series, seasonality, feature importance, and 2025 forecast |
| `dashboard_desmatamento.html` | Interactive Chart.js dashboard with yearly totals, state-level breakdown, model comparison, and forecast |

---

## Project Structure

```
amazon_deforestation/
├── Amazon_Deforestation.ipynb   # Main notebook (Google Colab)
├── README.md                    # This file
└── deter-amz-aggregated-*.csv   # Raw data from DETER/INPE (not versioned)
```

---

## How to Run

1. Open `Amazon_Deforestation.ipynb` in [Google Colab](https://colab.research.google.com/).
2. Upload the DETER-AMZ CSV file (download from the link above).
3. Run all cells in order.
4. The dashboard HTML and PNG chart will be saved to the session storage.

---

## Improvements Over the Original Project

- Chronological train/test split (no shuffle)
- Lag features: t-1, t-12, t-24
- Rolling averages: 3-month and 12-month
- Explicit seasonality as a model feature
- Two production-grade models: SARIMA + Gradient Boosting
- Proper time-series metrics (MAE, RMSE, R²)
- Rich interactive dashboard

---

## References

- INPE — Instituto Nacional de Pesquisas Espaciais: https://www.inpe.br/
- TerraBrasilis platform: http://terrabrasilis.dpi.inpe.br/
- IPCC Climate Data: https://www.ipcc.ch/data/
- Statsmodels SARIMAX documentation: https://www.statsmodels.org/
- Scikit-learn GradientBoostingRegressor: https://scikit-learn.org/

---

*Data last updated: March 3, 2026 — DETER-AMZ / INPE*
