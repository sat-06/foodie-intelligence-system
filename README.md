# 🍽️ Foodie Intelligence System

A modern food analytics and recommendation system that combines data analysis, customer insights, and a real-time interactive UI to help users discover the best food options based on their preferences.

---

## 🚀 Project Overview

**Foodie Intelligence System** is a data-driven application built using a full pipeline of tools and technologies:

| Layer | Technology |
|---|---|
| Data Exploration | SQL |
| Data Cleaning & Processing | Pandas & NumPy |
| Insights Generation | Data Visualization |
| Interactive UI | React Frontend |
| Smart Suggestions | Recommendation Engine |

The system analyzes food order data and provides **personalized recommendations** based on:

- 📍 Location
- 🕐 Time of order
- 👤 Customer behavior
- 💸 Spending patterns

---

## 🎯 Key Features

### 📊 Data Analytics
- Top restaurants analysis
- Orders by city, time, and day
- Discount impact analysis
- Customer segmentation

### 👥 Customer Insights
- Spending categories — **Low / Medium / High**
- Frequency categories
- Top customers by orders & spending

### 🍴 Recommendation System
Filter-based recommendations using:
- City
- Subzone
- Time
- Spending category
- Frequency category
- Smart fallback logic
- Popular restaurants & items

### 🎨 Advanced UI
- Modern **React-based** frontend
- Food-themed design
- Responsive dashboard
- Interactive charts via **Recharts**

---

## 🏗️ System Architecture

```
┌────────────────────┐
│   Raw Dataset      │
│ (Food Orders CSV)  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Data Cleaning    │
│ (Pandas, NumPy)    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Feature Engineering│
│  + Segmentation    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Final Dataset     │
│  (CSV → JSON)      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ React Frontend UI  │
│ (Charts + Filters) │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Recommendation     │
│ Logic (Frontend)   │
└────────────────────┘
```

---

## 🔄 Project Workflow

```
1. SQL Exploration
   ↓
2. Data Cleaning (Pandas)
   ↓
3. Feature Engineering
   ↓
4. EDA & Visualization
   ↓
5. Customer Segmentation
   ↓
6. Recommendation Logic
   ↓
7. CSV → JSON Conversion
   ↓
8. Frontend Integration (React)
   ↓
9. Interactive Dashboard & UI
```

---

## 📁 Project Structure

```
foodie-intelligence-system/
│
├── Frontend/                   # React UI
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   │   └── finalFoodOrders.json
│   │   └── App.jsx
│
├── src/                        # Data processing
│   ├── data/cleaned/
│   │   └── final_food_orders.csv
│   ├── data_cleaning.ipynb
│   ├── feature_engineering.ipynb
│   └── convert_csv_to_json.ipynb
│
├── notebooks/                  # Analysis & EDA
│   └── analysis.ipynb
│
├── sql/                        # SQL queries
│   └── phase1.sql
│
└── README.md
```

---

## 🧠 Recommendation Logic

The system uses a **rule-based approach** with the following steps:

1. **Filter** the dataset by:
   - City
   - Time
   - Spending category
   - Frequency category

2. **Apply fallback logic:**
   - Full dataset is used if no match is found for the given filters

3. **Generate recommendations:**
   - Top restaurants (based on order frequency)
   - Top food items

---

## 🛠️ Tech Stack

### 🧮 Data Processing
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)

### 🗄️ Database
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### 📊 Visualization
![Matplotlib](https://img.shields.io/badge/Matplotlib-11557C?style=for-the-badge&logo=python&logoColor=white)
![Seaborn](https://img.shields.io/badge/Seaborn-4C72B0?style=for-the-badge&logo=python&logoColor=white)

### 🎨 Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css3&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=react&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)
