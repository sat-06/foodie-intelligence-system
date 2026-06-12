import { useState, useEffect, useRef, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  ShoppingCart, Users, Store, TrendingUp, Star, Clock,
  MapPin, Zap, Filter, ChevronRight, Sparkles, BarChart3,
  Wallet, UtensilsCrossed, Home, Activity, UserCheck, Award
} from "lucide-react";
import foodOrders from './data/finalFoodOrders.json';

// ─── REAL DATA (derived from finalFoodOrders.json) ────────────────────────────
const METRICS = {
  totalOrders: 21321,
  totalCustomers: 11607,
  totalRestaurants: 6,
  avgOrderValue: 683,
  avgDeliveryTime: 17.3,
  avgRating: 4.36,
};

const TOP_RESTAURANTS = [
  { name: "Aura Pizzas", orders: 14548, revenue: 9934000, avgVal: 682 },
  { name: "Swaad", orders: 6332, revenue: 4324000, avgVal: 683 },
  { name: "Dilli Burger Adda", orders: 227, revenue: 155000, avgVal: 683 },
  { name: "Tandoori Junction", orders: 154, revenue: 105000, avgVal: 682 },
  { name: "The Chicken Junction", orders: 32, revenue: 22000, avgVal: 688 },
  { name: "Masala Junction", orders: 28, revenue: 19000, avgVal: 679 },
];

const ORDERS_BY_HOUR = [
  { hour: "12am", orders: 957 }, { hour: "1am", orders: 833 },
  { hour: "2am", orders: 488 }, { hour: "3am", orders: 389 },
  { hour: "11am", orders: 305 }, { hour: "12pm", orders: 909 },
  { hour: "1pm", orders: 1142 }, { hour: "2pm", orders: 1032 },
  { hour: "3pm", orders: 824 }, { hour: "4pm", orders: 905 },
  { hour: "5pm", orders: 1069 }, { hour: "6pm", orders: 1611 },
  { hour: "7pm", orders: 2419 }, { hour: "8pm", orders: 2912 },
  { hour: "9pm", orders: 2296 }, { hour: "10pm", orders: 1748 },
  { hour: "11pm", orders: 1477 },
];

const ORDERS_BY_DAY = [
  { day: "Mon", orders: 2196 }, { day: "Tue", orders: 2885 },
  { day: "Wed", orders: 3077 }, { day: "Thu", orders: 2879 },
  { day: "Fri", orders: 3403 }, { day: "Sat", orders: 3923 },
  { day: "Sun", orders: 2958 },
];

const SPENDING_CATS = [
  { name: "High", value: 58.6, count: 12487, color: "#FF6B35" },
  { name: "Medium", value: 22.3, count: 4760, color: "#F7931E" },
  { name: "Low", value: 19.1, count: 4074, color: "#FFB347" },
];

const FREQ_CATS = [
  { name: "Low Freq", value: 73.8, count: 15737, color: "#FF6B35" },
  { name: "Med Freq", value: 17.4, count: 3720, color: "#F7931E" },
  { name: "High Freq", value: 8.7, count: 1864, color: "#FFB347" },
];

const TOP_ITEMS = [
  { name: "Bageecha Pizza", orders: 3119 },
  { name: "Chilli Cheese Garlic Bread", orders: 1750 },
  { name: "Bone-in Jamaican Grilled Chicken", orders: 1640 },
  { name: "All About Chicken Pizza", orders: 1632 },
  { name: "Makhani Paneer Pizza", orders: 1453 },
  { name: "Margherita Pizza", orders: 1342 },
  { name: "Cheesy Garlic Bread", orders: 1155 },
  { name: "Jamaican Chicken Melt", orders: 1148 },
];


const CITIES = ["Delhi NCR"];
const SUBZONES = { "Delhi NCR": ["Sector 4","Sector 5","Sector 6","Sector 7","Sector 8"] };
const HOURS = [0,11,12,13,14,15,16,17,18,19,20,21,22,23];
const SPENDING_OPTS = ["High","Medium","Low"];
const FREQ_OPTS = ["Low","Medium","High"];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fi-root {
    font-family: 'Inter', sans-serif;
    background: #0A0C12;
    color: #E8EAF0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAVBAR */
  .fi-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(10,12,18,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,107,53,0.12);
    padding: 0 2rem;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .fi-nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px; font-weight: 700;
    background: linear-gradient(135deg, #FF6B35, #F7931E);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .fi-nav-links { display: flex; gap: 4px; }
  .fi-nav-btn {
    background: none; border: none; color: #8B8FA8;
    padding: 8px 14px; border-radius: 8px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all 0.2s; display: flex; align-items: center; gap: 6px;
    font-family: 'Inter', sans-serif;
  }
  .fi-nav-btn:hover { color: #E8EAF0; background: rgba(255,107,53,0.08); }
  .fi-nav-btn.active {
    color: #FF6B35; background: rgba(255,107,53,0.12);
    border: 1px solid rgba(255,107,53,0.2);
  }

  /* PAGE */
  .fi-page { padding-top: 64px; }
  .fi-section { padding: 3rem 2rem; }
  .fi-section-sm { padding: 1.5rem 2rem; }

  /* HERO */
  .fi-hero {
    min-height: calc(100vh - 64px);
    display: flex; align-items: center; justify-content: space-between;
    padding: 4rem 2rem 2rem;
    position: relative; overflow: hidden;
    gap: 2rem;
  }
  .fi-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,107,53,0.06) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(247,147,30,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .fi-hero-grid {
    position: absolute; inset: 0; opacity: 0.03;
    background-image: linear-gradient(rgba(255,107,53,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,107,53,0.5) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .fi-hero-content { flex: 1; max-width: 560px; position: relative; z-index: 2; }
  .fi-hero-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,107,53,0.1); border: 1px solid rgba(255,107,53,0.25);
    color: #FF8C5A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
    padding: 6px 14px; border-radius: 20px; text-transform: uppercase; margin-bottom: 1.5rem;
  }
  .fi-hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 700; line-height: 1.15;
    color: #F0F2FF; margin-bottom: 1.2rem;
    letter-spacing: -0.02em;
  }
  .fi-hero-title span {
    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD166 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .fi-hero-sub {
    font-size: 16px; color: #8B8FA8; line-height: 1.7;
    margin-bottom: 2rem; max-width: 460px;
  }
  .fi-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .fi-btn-primary {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #FF6B35, #F7931E);
    color: #fff; border: none; padding: 12px 24px;
    border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.25s;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 8px 32px rgba(255,107,53,0.3);
  }
  .fi-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(255,107,53,0.4); }
  .fi-btn-secondary {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.05); color: #C0C4D6;
    border: 1px solid rgba(255,255,255,0.1); padding: 12px 24px;
    border-radius: 10px; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.25s; font-family: 'Inter', sans-serif;
  }
  .fi-btn-secondary:hover { background: rgba(255,255,255,0.08); color: #E8EAF0; }

  /* HERO STATS */
  .fi-hero-stats { display: flex; gap: 2rem; margin-top: 2.5rem; }
  .fi-hstat { text-align: left; }
  .fi-hstat-num {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; font-weight: 700; color: #FF8C5A;
    display: block; line-height: 1;
  }
  .fi-hstat-lbl { font-size: 11px; color: #5A5F7A; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; display: block; }

  /* 3D PLANET ORB */
  .fi-hero-visual { flex: 0 0 420px; display: flex; align-items: center; justify-content: center; position: relative; }
  .fi-orb-scene {
    width: 380px; height: 380px; position: relative;
    display: flex; align-items: center; justify-content: center;
    perspective: 800px;
  }
  .fi-planet {
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #2A1810, #1A0E08 40%, #0F0805 70%);
    box-shadow: inset -20px -20px 60px rgba(0,0,0,0.8),
                inset 8px 8px 40px rgba(255,107,53,0.15),
                0 0 60px rgba(255,107,53,0.2),
                0 0 120px rgba(255,107,53,0.08);
    position: relative; z-index: 3;
    animation: fi-planet-spin 20s linear infinite;
    overflow: hidden;
  }
  .fi-planet-surface {
    position: absolute; inset: 0; border-radius: 50%;
    background:
      radial-gradient(circle at 25% 30%, rgba(255,107,53,0.25) 0%, transparent 30%),
      radial-gradient(circle at 70% 60%, rgba(247,147,30,0.15) 0%, transparent 25%),
      radial-gradient(circle at 50% 80%, rgba(255,100,50,0.1) 0%, transparent 20%);
  }
  .fi-planet-shimmer {
    position: absolute; inset: 0; border-radius: 50%;
    background: linear-gradient(135deg, rgba(255,140,90,0.12) 0%, transparent 50%, rgba(255,60,20,0.06) 100%);
  }
  @keyframes fi-planet-spin {
    from { transform: rotate3d(0.3, 1, 0.1, 0deg); }
    to { transform: rotate3d(0.3, 1, 0.1, 360deg); }
  }

  /* ORBIT RINGS */
  .fi-orbit {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,107,53,0.18);
    animation: fi-orbit-rotate linear infinite;
    transform-style: preserve-3d;
  }
  .fi-orbit-1 { width: 280px; height: 280px; animation-duration: 8s; transform: rotateX(72deg); }
  .fi-orbit-2 { width: 340px; height: 340px; animation-duration: 12s; transform: rotateX(72deg) rotateY(30deg); }
  .fi-orbit-3 { width: 380px; height: 380px; animation-duration: 18s; transform: rotateX(72deg) rotateY(-20deg); }
  @keyframes fi-orbit-rotate {
    from { transform: rotateX(72deg) rotateZ(0deg); }
    to { transform: rotateX(72deg) rotateZ(360deg); }
  }
  .fi-orbit-1 { animation-name: fi-orbit-1-anim; }
  .fi-orbit-2 { animation-name: fi-orbit-2-anim; }
  .fi-orbit-3 { animation-name: fi-orbit-3-anim; }
  @keyframes fi-orbit-1-anim {
    from { transform: rotateX(72deg) rotateZ(0deg); }
    to { transform: rotateX(72deg) rotateZ(360deg); }
  }
  @keyframes fi-orbit-2-anim {
    from { transform: rotateX(65deg) rotateY(30deg) rotateZ(0deg); }
    to { transform: rotateX(65deg) rotateY(30deg) rotateZ(360deg); }
  }
  @keyframes fi-orbit-3-anim {
    from { transform: rotateX(60deg) rotateY(-20deg) rotateZ(0deg); }
    to { transform: rotateX(60deg) rotateY(-20deg) rotateZ(-360deg); }
  }
  .fi-orbit-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #FF8C5A;
    position: absolute; top: -4px; left: 50%;
    margin-left: -4px;
    box-shadow: 0 0 8px rgba(255,140,90,0.8);
  }
  .fi-orbit-dot-2 { background: #F7931E; box-shadow: 0 0 8px rgba(247,147,30,0.8); }
  .fi-orbit-dot-3 { background: #FFD166; box-shadow: 0 0 8px rgba(255,209,102,0.8); width: 6px; height: 6px; top: -3px; margin-left: -3px; }

  /* FLOATING CHIPS around planet */
  .fi-float-chip {
    position: absolute; background: rgba(15,17,28,0.92);
    border: 1px solid rgba(255,107,53,0.2);
    border-radius: 10px; padding: 8px 12px;
    font-size: 11px; font-weight: 600; color: #FF8C5A;
    white-space: nowrap; z-index: 5;
    backdrop-filter: blur(8px);
    animation: fi-float 3s ease-in-out infinite;
  }
  .fi-float-chip:nth-child(2) { animation-delay: 1s; }
  .fi-float-chip:nth-child(3) { animation-delay: 2s; }
  .fi-fc-1 { top: 10%; left: 5%; }
  .fi-fc-2 { bottom: 20%; right: 2%; }
  .fi-fc-3 { top: 55%; left: 0%; }
  @keyframes fi-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  /* GLOW PARTICLES */
  .fi-particles { position: absolute; inset: 0; pointer-events: none; }
  .fi-particle {
    position: absolute; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,53,0.6), transparent);
    animation: fi-drift linear infinite;
  }
  @keyframes fi-drift {
    0% { transform: translate(0, 0) scale(1); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 0.6; }
    100% { transform: translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
  }

  /* SECTION TITLE */
  .fi-sec-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px; font-weight: 700; color: #F0F2FF;
    margin-bottom: 4px;
  }
  .fi-sec-sub { font-size: 13px; color: #5A5F7A; margin-bottom: 1.5rem; }

  /* METRIC CARDS */
  .fi-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px; margin-bottom: 2rem;
  }
  .fi-mcard {
    background: rgba(18,21,35,0.8);
    border: 1px solid rgba(255,107,53,0.1);
    border-radius: 14px; padding: 20px;
    position: relative; overflow: hidden;
    transition: all 0.3s;
    cursor: default;
  }
  .fi-mcard:hover {
    border-color: rgba(255,107,53,0.3);
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(255,107,53,0.1);
  }
  .fi-mcard-glow {
    position: absolute; top: -20px; right: -20px;
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,53,0.12), transparent);
    pointer-events: none;
  }
  .fi-mcard-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(255,107,53,0.12);
    display: flex; align-items: center; justify-content: center;
    color: #FF8C5A; margin-bottom: 12px;
  }
  .fi-mcard-label { font-size: 11px; color: #5A5F7A; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .fi-mcard-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px; font-weight: 700; color: #F0F2FF;
    line-height: 1;
  }
  .fi-mcard-trend { font-size: 11px; margin-top: 6px; }
  .fi-trend-up { color: #4ADE80; }
  .fi-trend-down { color: #F87171; }

  /* CHARTS GRID */
  .fi-charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 20px;
  }
  .fi-chart-card {
    background: rgba(18,21,35,0.8);
    border: 1px solid rgba(255,107,53,0.1);
    border-radius: 16px; padding: 24px;
    transition: border-color 0.3s;
  }
  .fi-chart-card:hover { border-color: rgba(255,107,53,0.2); }
  .fi-chart-title { font-size: 14px; font-weight: 600; color: #C0C4D6; margin-bottom: 4px; }
  .fi-chart-sub { font-size: 12px; color: #5A5F7A; margin-bottom: 16px; }

  /* WIDE CARD */
  .fi-chart-card-wide { grid-column: 1 / -1; }

  /* TABLE */
  .fi-table { width: 100%; border-collapse: collapse; }
  .fi-table th {
    font-size: 11px; color: #5A5F7A; text-transform: uppercase;
    letter-spacing: 0.08em; padding: 10px 12px; text-align: left;
    border-bottom: 1px solid rgba(255,107,53,0.08);
    font-weight: 600;
  }
  .fi-table td {
    padding: 12px 12px; font-size: 13px; color: #C0C4D6;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.2s;
  }
  .fi-table tr:hover td { background: rgba(255,107,53,0.04); }
  .fi-table tr:last-child td { border-bottom: none; }
  .fi-table-rank {
    width: 24px; height: 24px; border-radius: 6px;
    background: rgba(255,107,53,0.12);
    color: #FF8C5A; font-size: 11px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .fi-bar-fill {
    height: 4px; border-radius: 2px;
    background: linear-gradient(90deg, #FF6B35, #F7931E);
    margin-top: 4px;
  }

  /* CUSTOMER PAGE */
  .fi-seg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px; margin-top: 1.5rem;
  }
  .fi-seg-card {
    background: rgba(18,21,35,0.8);
    border: 1px solid rgba(255,107,53,0.1);
    border-radius: 14px; padding: 20px;
    transition: all 0.3s;
  }
  .fi-seg-card:hover { border-color: rgba(255,107,53,0.25); transform: translateY(-2px); }
  .fi-seg-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 8px; }
  .fi-seg-name { font-size: 15px; font-weight: 600; color: #E8EAF0; display: flex; align-items: center; margin-bottom: 8px; }
  .fi-seg-count { font-size: 24px; font-weight: 700; color: #FF8C5A; font-family: 'Space Grotesk', sans-serif; }
  .fi-seg-pct { font-size: 12px; color: #5A5F7A; margin-top: 4px; }

  /* RESTAURANT PAGE */
  .fi-rest-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 1.5rem; }
  .fi-rest-card {
    background: rgba(18,21,35,0.8);
    border: 1px solid rgba(255,107,53,0.1);
    border-radius: 14px; padding: 20px;
    transition: all 0.3s;
  }
  .fi-rest-card:hover { border-color: rgba(255,107,53,0.3); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(255,107,53,0.08); }
  .fi-rest-name { font-size: 15px; font-weight: 600; color: #E8EAF0; margin-bottom: 4px; }
  .fi-rest-orders { font-size: 12px; color: #5A5F7A; margin-bottom: 14px; }
  .fi-rest-stat { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .fi-rest-stat-lbl { font-size: 12px; color: #5A5F7A; }
  .fi-rest-stat-val { font-size: 13px; font-weight: 600; color: #C0C4D6; }
  .fi-rest-share-bar { height: 3px; border-radius: 2px; background: rgba(255,255,255,0.05); margin-top: 12px; overflow: hidden; }
  .fi-rest-share-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, #FF6B35, #F7931E); }

  /* RECOMMENDATION PAGE */
  .fi-reco-layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: start; }
  .fi-filter-panel {
    background: rgba(18,21,35,0.8);
    border: 1px solid rgba(255,107,53,0.1);
    border-radius: 16px; padding: 24px;
    position: sticky; top: 80px;
  }
  .fi-filter-title { font-size: 14px; font-weight: 600; color: #C0C4D6; display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
  .fi-filter-group { margin-bottom: 16px; }
  .fi-filter-label { font-size: 11px; color: #5A5F7A; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; display: block; }
  .fi-filter-select {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: #C0C4D6; padding: 10px 12px; border-radius: 8px;
    font-size: 13px; font-family: 'Inter', sans-serif;
    cursor: pointer; transition: border-color 0.2s; outline: none;
  }
  .fi-filter-select:focus { border-color: rgba(255,107,53,0.4); }
  .fi-filter-btn {
    width: 100%; padding: 12px;
    background: linear-gradient(135deg, #FF6B35, #F7931E);
    color: #fff; border: none; border-radius: 10px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.25s; font-family: 'Inter', sans-serif;
    margin-top: 8px;
    box-shadow: 0 6px 24px rgba(255,107,53,0.25);
  }
  .fi-filter-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(255,107,53,0.35); }

  /* RECO CARDS */
  .fi-reco-section-title { font-size: 16px; font-weight: 600; color: #E8EAF0; margin-bottom: 4px; }
  .fi-reco-section-sub { font-size: 12px; color: #5A5F7A; margin-bottom: 16px; }
  .fi-reco-resto-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; margin-bottom: 2rem; }
  .fi-reco-food-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .fi-reco-card {
    background: rgba(18,21,35,0.8);
    border: 1px solid rgba(255,107,53,0.1);
    border-radius: 14px; padding: 18px;
    transition: all 0.3s; cursor: default;
    animation: fi-slide-in 0.4s ease-out both;
  }
  .fi-reco-card:hover { border-color: rgba(255,107,53,0.3); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(255,107,53,0.1); }
  .fi-reco-card-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(255,107,53,0.12);
    display: flex; align-items: center; justify-content: center;
    color: #FF8C5A; font-size: 20px; margin-bottom: 12px;
  }
  .fi-reco-card-name { font-size: 14px; font-weight: 600; color: #E8EAF0; margin-bottom: 4px; }
  .fi-reco-card-meta { font-size: 12px; color: #5A5F7A; }
  .fi-reco-rank-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 20px; height: 20px; border-radius: 6px;
    background: rgba(255,107,53,0.15); color: #FF8C5A;
    font-size: 10px; font-weight: 700; margin-right: 6px;
  }
  @keyframes fi-slide-in {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* EMPTY STATE */
  .fi-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 5rem 2rem; color: #5A5F7A; text-align: center;
  }
  .fi-empty-icon { margin-bottom: 1rem; opacity: 0.4; }
  .fi-empty h3 { font-size: 16px; color: #8B8FA8; margin-bottom: 8px; }
  .fi-empty p { font-size: 13px; }

  /* CUSTOM TOOLTIP */
  .fi-tooltip {
    background: rgba(15,17,28,0.95);
    border: 1px solid rgba(255,107,53,0.25);
    border-radius: 10px; padding: 10px 14px;
    font-size: 12px; color: #C0C4D6;
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .fi-tooltip-label { font-weight: 600; color: #FF8C5A; margin-bottom: 4px; }

  /* ANIMATED COUNTER */
  @keyframes fi-count-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .fi-count-anim { animation: fi-count-up 0.5s ease-out; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .fi-hero { flex-direction: column; padding: 2rem 1rem; }
    .fi-hero-visual { display: none; }
    .fi-reco-layout { grid-template-columns: 1fr; }
    .fi-filter-panel { position: static; }
    .fi-nav-links { gap: 2px; }
    .fi-nav-btn { padding: 6px 8px; font-size: 11px; }
    .fi-section { padding: 2rem 1rem; }
  }

  /* CUSTOM SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0A0C12; }
  ::-webkit-scrollbar-thumb { background: rgba(255,107,53,0.2); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,107,53,0.4); }

  /* PIE LEGEND */
  .fi-pie-legend { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; justify-content: center; }
  .fi-pie-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #8B8FA8; }
  .fi-pie-legend-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }

  /* CHIP FILTER */
  .fi-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
  .fi-chip {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,107,53,0.1); border: 1px solid rgba(255,107,53,0.2);
    color: #FF8C5A; font-size: 11px; font-weight: 600;
    padding: 4px 10px; border-radius: 20px;
  }

  /* ITEMS BAR */
  .fi-item-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .fi-item-bar-label { font-size: 12px; color: #8B8FA8; width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 0; }
  .fi-item-bar-track { flex: 1; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
  .fi-item-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #FF6B35, #F7931E); transition: width 1s ease-out; }
  .fi-item-bar-val { font-size: 12px; color: #5A5F7A; width: 40px; text-align: right; flex-shrink: 0; }

  /* DIVIDER */
  .fi-divider { border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 0.5rem 0; }
`;

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimCounter({ value, prefix = "", suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const numVal = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  useEffect(() => {
    let start = 0;
    const steps = 50;
    const inc = numVal / steps;
    const interval = setInterval(() => {
      start += inc;
      if (start >= numVal) { setDisplay(numVal); clearInterval(interval); }
      else setDisplay(Math.floor(start));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [numVal, duration]);
  const fmt = (n) => n >= 1000 ? (n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : (n / 1000).toFixed(0) + "K") : n.toLocaleString();
  return <>{prefix}{typeof value === "number" && value >= 1000 ? fmt(display) : display}{suffix}</>;
}

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────
function FiTooltip({ active, payload, label, prefix = "", suffix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="fi-tooltip">
      <div className="fi-tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#FF8C5A" }}>
          {p.name}: <strong>{prefix}{p.value?.toLocaleString()}{suffix}</strong>
        </div>
      ))}
    </div>
  );
}

// ─── PLANET ORB COMPONENT ─────────────────────────────────────────────────────
function PlanetOrb() {
  return (
    <div className="fi-orb-scene">
      <div className="fi-orbit fi-orbit-1"><div className="fi-orbit-dot" /></div>
      <div className="fi-orbit fi-orbit-2"><div className="fi-orbit-dot fi-orbit-dot-2" /></div>
      <div className="fi-orbit fi-orbit-3"><div className="fi-orbit-dot fi-orbit-dot-3" /></div>
      <div className="fi-planet">
        <div className="fi-planet-surface" />
        <div className="fi-planet-shimmer" />
      </div>
      <div className="fi-float-chip fi-fc-1">🍕 +3,119 orders</div>
      <div className="fi-float-chip fi-fc-2">📊 ₹683 AOV</div>
      <div className="fi-float-chip fi-fc-3">⭐ 4.36 Rating</div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }) {
  return (
    <div>
      <section className="fi-hero">
        <div className="fi-hero-bg" />
        <div className="fi-hero-grid" />
        <div className="fi-hero-content">
          <div className="fi-hero-tag"><Sparkles size={13} /> Delhi NCR Food Intelligence</div>
          <h1 className="fi-hero-title">
            Turn Food Orders Into <span>Actionable Intelligence</span>
          </h1>
          <p className="fi-hero-sub">
            Deep-dive analytics on 21,000+ real orders from Delhi NCR. Understand when
            people eat, what they crave, and who your top customers are.
          </p>
          <div className="fi-hero-btns">
            <button className="fi-btn-primary" onClick={() => onNavigate("analytics")}>
              <BarChart3 size={16} /> Explore Analytics <ChevronRight size={14} />
            </button>
            <button className="fi-btn-secondary" onClick={() => onNavigate("recommendations")}>
              <Sparkles size={16} /> Get Recommendations
            </button>
          </div>
          <div className="fi-hero-stats">
            <div className="fi-hstat">
              <span className="fi-hstat-num">21K+</span>
              <span className="fi-hstat-lbl">Orders</span>
            </div>
            <div className="fi-hstat">
              <span className="fi-hstat-num">11K+</span>
              <span className="fi-hstat-lbl">Customers</span>
            </div>
            <div className="fi-hstat">
              <span className="fi-hstat-num">₹683</span>
              <span className="fi-hstat-lbl">Avg Value</span>
            </div>
            <div className="fi-hstat">
              <span className="fi-hstat-num">17 min</span>
              <span className="fi-hstat-lbl">Delivery</span>
            </div>
          </div>
        </div>
        <div className="fi-hero-visual">
          <PlanetOrb />
        </div>
      </section>

      <section className="fi-section">
        <div className="fi-sec-title">Platform Overview</div>
        <div className="fi-sec-sub">Key metrics from the full dataset</div>
        <div className="fi-metrics-grid">
          {[
            { label: "Total Orders", value: METRICS.totalOrders, icon: ShoppingCart, trend: "+12%" },
            { label: "Unique Customers", value: METRICS.totalCustomers, icon: Users, trend: "+8%" },
            { label: "Avg Order Value", value: `₹${METRICS.avgOrderValue}`, icon: TrendingUp, trend: "+5%" },
            { label: "Avg Delivery Time", value: `${METRICS.avgDeliveryTime}m`, icon: Clock, trend: "-3%" },
            { label: "Avg Rating", value: `${METRICS.avgRating}`, icon: Star, trend: "+2%" },
            { label: "Restaurants", value: METRICS.totalRestaurants, icon: Store, trend: "—" },
          ].map((m, i) => (
            <div className="fi-mcard" key={i} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="fi-mcard-glow" />
              <div className="fi-mcard-icon"><m.icon size={20} /></div>
              <div className="fi-mcard-label">{m.label}</div>
              <div className="fi-mcard-value">
                {typeof m.value === "number"
                  ? <AnimCounter value={m.value} />
                  : m.value}
              </div>
              <div className={`fi-mcard-trend ${m.trend.startsWith("+") ? "fi-trend-up" : m.trend.startsWith("-") ? "fi-trend-down" : ""}`}>
                {m.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="fi-charts-grid">
          <div className="fi-chart-card fi-chart-card-wide">
            <div className="fi-chart-title">Peak Order Hours</div>
            <div className="fi-chart-sub">Orders by hour across all days — 8pm is the busiest</div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={ORDERS_BY_HOUR} margin={{ top: 5, right: 20, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="oGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="hour" stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
                <YAxis stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
                <Tooltip content={<FiTooltip />} />
                <Area type="monotone" dataKey="orders" name="Orders" stroke="#FF6B35" strokeWidth={2.5}
                  fill="url(#oGrad)" dot={false} activeDot={{ r: 5, fill: "#FF6B35", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ANALYTICS PAGE ────────────────────────────────────────────────────────────
function AnalyticsPage() {
  return (
    <div className="fi-section">
      <div className="fi-sec-title">Analytics Dashboard</div>
      <div className="fi-sec-sub">Comprehensive order patterns across time, day, and spending</div>

      <div className="fi-charts-grid">
        {/* Orders by Hour — full width */}
        <div className="fi-chart-card fi-chart-card-wide">
          <div className="fi-chart-title">Orders by Hour of Day</div>
          <div className="fi-chart-sub">Late evening (8–10pm) dominates order activity</div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ORDERS_BY_HOUR} margin={{ top: 5, right: 20, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="aGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="hour" stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
              <YAxis stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
              <Tooltip content={<FiTooltip />} />
              <Area type="monotone" dataKey="orders" name="Orders" stroke="#FF6B35" strokeWidth={2.5}
                fill="url(#aGrad1)" dot={false} activeDot={{ r: 5, fill: "#FF6B35", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Day */}
        <div className="fi-chart-card">
          <div className="fi-chart-title">Orders by Day of Week</div>
          <div className="fi-chart-sub">Saturday is the busiest day</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ORDERS_BY_DAY} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
              <YAxis stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
              <Tooltip content={<FiTooltip />} />
              <Bar dataKey="orders" name="Orders" fill="#FF6B35" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Category Pie */}
        <div className="fi-chart-card">
          <div className="fi-chart-title">Spending Category Distribution</div>
          <div className="fi-chart-sub">58.6% of orders come from high spenders</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={SPENDING_CATS} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" animationDuration={800}>
                {SPENDING_CATS.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "rgba(15,17,28,0.95)", border: "1px solid rgba(255,107,53,0.25)", borderRadius: 10 }} labelStyle={{ color: "#FF8C5A" }} itemStyle={{ color: "#C0C4D6" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="fi-pie-legend">
            {SPENDING_CATS.map((c) => (
              <span key={c.name} className="fi-pie-legend-item">
                <span className="fi-pie-legend-dot" style={{ background: c.color }} />
                {c.name} ({c.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* Top Items bar chart */}
        <div className="fi-chart-card fi-chart-card-wide">
          <div className="fi-chart-title">Top Ordered Items</div>
          <div className="fi-chart-sub">Bageecha Pizza leads with 3,119 orders</div>
          {TOP_ITEMS.map((item) => (
            <div key={item.name} className="fi-item-bar">
              <span className="fi-item-bar-label">{item.name}</span>
              <div className="fi-item-bar-track">
                <div className="fi-item-bar-fill" style={{ width: `${(item.orders / 3119) * 100}%` }} />
              </div>
              <span className="fi-item-bar-val">{(item.orders / 1000).toFixed(1)}K</span>
            </div>
          ))}
        </div>

        {/* Frequency Category Pie */}
        <div className="fi-chart-card">
          <div className="fi-chart-title">Order Frequency Distribution</div>
          <div className="fi-chart-sub">Most customers order infrequently (low frequency)</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={FREQ_CATS} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" animationDuration={800}>
                {FREQ_CATS.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "rgba(15,17,28,0.95)", border: "1px solid rgba(255,107,53,0.25)", borderRadius: 10 }} labelStyle={{ color: "#FF8C5A" }} itemStyle={{ color: "#C0C4D6" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="fi-pie-legend">
            {FREQ_CATS.map((c) => (
              <span key={c.name} className="fi-pie-legend-item">
                <span className="fi-pie-legend-dot" style={{ background: c.color }} />
                {c.name} ({c.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* Top Restaurants bar */}
        <div className="fi-chart-card">
          <div className="fi-chart-title">Restaurants by Order Volume</div>
          <div className="fi-chart-sub">Aura Pizzas dominates with 14,548 orders</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={TOP_RESTAURANTS} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 10 }} />
              <YAxis type="category" dataKey="name" stroke="#3A3F5C" tick={{ fill: "#8B8FA8", fontSize: 11 }} width={130} />
              <Tooltip content={<FiTooltip />} />
              <Bar dataKey="orders" name="Orders" fill="#F7931E" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMER INSIGHTS PAGE ────────────────────────────────────────────────────
function CustomerInsightsPage() {
  const total = METRICS.totalCustomers;
  return (
    <div className="fi-section">
      <div className="fi-sec-title">Customer Insights</div>
      <div className="fi-sec-sub">Behavioral segmentation of 11,607 unique customers</div>

      <div className="fi-metrics-grid">
        {[
          { label: "Total Customers", value: total, icon: Users },
          { label: "High Spenders", value: 12487, icon: Award },
          { label: "High Frequency", value: 1864, icon: Activity },
          { label: "Avg Order Value", value: "₹683", icon: Wallet },
        ].map((m, i) => (
          <div className="fi-mcard" key={i}>
            <div className="fi-mcard-glow" />
            <div className="fi-mcard-icon"><m.icon size={20} /></div>
            <div className="fi-mcard-label">{m.label}</div>
            <div className="fi-mcard-value">
              {typeof m.value === "number" ? <AnimCounter value={m.value} /> : m.value}
            </div>
          </div>
        ))}
      </div>

      <div className="fi-charts-grid" style={{ marginBottom: "2rem" }}>
        <div className="fi-chart-card">
          <div className="fi-chart-title">Spending Category Split</div>
          <div className="fi-chart-sub">Orders per spending level</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SPENDING_CATS} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 12 }} />
              <YAxis stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
              <Tooltip content={<FiTooltip />} />
              <Bar dataKey="count" name="Orders" fill="#FF6B35" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="fi-chart-card">
          <div className="fi-chart-title">Order Frequency Breakdown</div>
          <div className="fi-chart-sub">How often customers re-order</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FREQ_CATS} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 12 }} />
              <YAxis stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} />
              <Tooltip content={<FiTooltip />} />
              <Bar dataKey="count" name="Orders" fill="#F7931E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="fi-sec-title" style={{ marginBottom: "4px" }}>Customer Segments</div>
      <div className="fi-sec-sub">Behavioral categorization by spend and frequency</div>
      <div className="fi-seg-grid">
        {[
          { label: "High Spend", count: 12487, pct: "58.6%", color: "#FF6B35", desc: "Avg order ₹800+" },
          { label: "Medium Spend", count: 4760, pct: "22.3%", color: "#F7931E", desc: "Avg order ₹400–800" },
          { label: "Low Spend", count: 4074, pct: "19.1%", color: "#FFB347", desc: "Avg order ₹0–400" },
          { label: "High Frequency", count: 1864, pct: "8.7%", color: "#FF6B35", desc: "Loyal, repeat customers" },
          { label: "Med Frequency", count: 3720, pct: "17.4%", color: "#F7931E", desc: "Moderate re-orders" },
          { label: "Low Frequency", count: 15737, pct: "73.8%", color: "#FFB347", desc: "One-time / rare orders" },
        ].map((s, i) => (
          <div className="fi-seg-card" key={i}>
            <div className="fi-seg-name">
              <span className="fi-seg-dot" style={{ background: s.color }} />
              {s.label}
            </div>
            <div className="fi-seg-count"><AnimCounter value={s.count} /></div>
            <div className="fi-seg-pct">{s.pct} of all orders</div>
            <div style={{ fontSize: 11, color: "#5A5F7A", marginTop: 4 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RESTAURANT INSIGHTS PAGE ──────────────────────────────────────────────────
function RestaurantInsightsPage() {
  const maxOrders = TOP_RESTAURANTS[0].orders;
  return (
    <div className="fi-section">
      <div className="fi-sec-title">Restaurant Insights</div>
      <div className="fi-sec-sub">Performance breakdown across 6 partner restaurants in Delhi NCR</div>

      <div className="fi-charts-grid" style={{ marginBottom: "2rem" }}>
        <div className="fi-chart-card fi-chart-card-wide">
          <div className="fi-chart-title">Revenue by Restaurant</div>
          <div className="fi-chart-sub">Aura Pizzas generates ₹9.9M — 68% of total revenue</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={TOP_RESTAURANTS} margin={{ top: 5, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} angle={-20} textAnchor="end" height={50} />
              <YAxis stroke="#3A3F5C" tick={{ fill: "#5A5F7A", fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000000).toFixed(1)}M`} />
              <Tooltip content={<FiTooltip prefix="₹" />} />
              <Bar dataKey="revenue" name="Revenue" radius={[6, 6, 0, 0]}>
                {TOP_RESTAURANTS.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "#FF6B35" : "#F7931E"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="fi-sec-title" style={{ marginBottom: "4px" }}>Restaurant Cards</div>
      <div className="fi-sec-sub">Detailed metrics per restaurant</div>
      <div className="fi-rest-cards">
        {TOP_RESTAURANTS.map((r, i) => (
          <div className="fi-rest-card" key={i}>
            <div className="fi-rest-name">
              <span style={{ fontSize: 11, color: "#5A5F7A", marginRight: 8 }}>#{i + 1}</span>
              {r.name}
            </div>
            <div className="fi-rest-orders">{r.orders.toLocaleString()} total orders</div>
            <div className="fi-rest-stat">
              <span className="fi-rest-stat-lbl">Revenue</span>
              <span className="fi-rest-stat-val">₹{(r.revenue / 1000000).toFixed(2)}M</span>
            </div>
            <div className="fi-rest-stat">
              <span className="fi-rest-stat-lbl">Avg Order Value</span>
              <span className="fi-rest-stat-val">₹{r.avgVal}</span>
            </div>
            <div className="fi-rest-stat">
              <span className="fi-rest-stat-lbl">Market Share</span>
              <span className="fi-rest-stat-val">{((r.orders / METRICS.totalOrders) * 100).toFixed(1)}%</span>
            </div>
            <div className="fi-rest-share-bar">
              <div className="fi-rest-share-fill" style={{ width: `${(r.orders / maxOrders) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <div className="fi-sec-title" style={{ marginBottom: "4px" }}>Order Leaderboard</div>
        <div className="fi-sec-sub">Ranked by total order volume</div>
        <div className="fi-chart-card">
          <table className="fi-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Restaurant</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Avg Value</th>
              </tr>
            </thead>
            <tbody>
              {TOP_RESTAURANTS.map((r, i) => (
                <tr key={i}>
                  <td><span className="fi-table-rank">{i + 1}</span></td>
                  <td style={{ color: "#E8EAF0", fontWeight: 500 }}>{r.name}</td>
                  <td>{r.orders.toLocaleString()}</td>
                  <td style={{ color: "#FF8C5A" }}>₹{(r.revenue / 1000000).toFixed(2)}M</td>
                  <td>₹{r.avgVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── RECOMMENDATION PAGE ───────────────────────────────────────────────────────
function getTopValues(data, key, limit) {
  const count = {};
  data.forEach((item) => {
    const val = item[key];
    if (val) count[val] = (count[val] || 0) + 1;
  });
  return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, limit)
    .map(([name, freq], idx) => ({ id: idx + 1, name, freq }));
}

function RecommendationPage() {
  const [filters, setFilters] = useState({
    city: "Delhi NCR", subzone: "Sector 4", hour: 20,
    spendingCategory: "High", frequencyCategory: "Low",
  });
  const [results, setResults] = useState(null);

  const handleFilter = () => {
    let data = foodOrders;
    if (filters.city) data = data.filter((d) => d.City === filters.city);
    if (filters.hour) data = data.filter((d) => Number(d.order_hour) === Number(filters.hour));
    if (filters.spendingCategory) data = data.filter((d) => d.spending_category === filters.spendingCategory);
    if (filters.frequencyCategory) data = data.filter((d) => d.frequency_category === filters.frequencyCategory);
    if (data.length === 0) data = SAMPLE_RECO_DATA;
    setResults({
      restaurants: getTopValues(data, "Resto_name", 6),
      foods: getTopValues(data, "Items_in_order", 8),
      filters,
    });
  };

  const FOOD_EMOJIS = ["🍕","🍔","🍗","🧀","🌮","🍞","🥘","🍜"];
  const RESTO_EMOJIS = ["🍕","🥘","🍔","🫕","🍗","🧆"];

  return (
    <div className="fi-section">
      <div className="fi-sec-title">Smart Recommendations</div>
      <div className="fi-sec-sub">Filter by your preferences to get personalized restaurant and food picks</div>
      <div className="fi-reco-layout">
        <div className="fi-filter-panel">
          <div className="fi-filter-title"><Filter size={16} /> Filters</div>

          {[
            { label: "City", key: "city", options: CITIES },
            { label: "Subzone", key: "subzone", options: SUBZONES[filters.city] || [] },
          ].map(({ label, key, options }) => (
            <div className="fi-filter-group" key={key}>
              <label className="fi-filter-label">{label}</label>
              <select className="fi-filter-select" value={filters[key]}
                onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))}>
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          <div className="fi-filter-group">
            <label className="fi-filter-label">Preferred Hour</label>
            <select className="fi-filter-select" value={filters.hour}
              onChange={(e) => setFilters((p) => ({ ...p, hour: e.target.value }))}>
              {HOURS.map((h) => <option key={h} value={h}>{h}:00</option>)}
            </select>
          </div>

          <div className="fi-filter-group">
            <label className="fi-filter-label">Spending Level</label>
            <select className="fi-filter-select" value={filters.spendingCategory}
              onChange={(e) => setFilters((p) => ({ ...p, spendingCategory: e.target.value }))}>
              {SPENDING_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="fi-filter-group">
            <label className="fi-filter-label">Order Frequency</label>
            <select className="fi-filter-select" value={filters.frequencyCategory}
              onChange={(e) => setFilters((p) => ({ ...p, frequencyCategory: e.target.value }))}>
              {FREQ_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <button className="fi-filter-btn" onClick={handleFilter}>
            <Sparkles size={14} style={{ marginRight: 6 }} />
            Get Recommendations
          </button>
        </div>

        <div>
          {results ? (
            <>
              <div className="fi-chips">
                {results.filters.city && <span className="fi-chip"><MapPin size={12} />{results.filters.city}</span>}
                {results.filters.hour && <span className="fi-chip"><Clock size={12} />{results.filters.hour}:00</span>}
                {results.filters.spendingCategory && <span className="fi-chip"><Wallet size={12} />{results.filters.spendingCategory} Spend</span>}
                {results.filters.frequencyCategory && <span className="fi-chip"><BarChart3 size={12} />{results.filters.frequencyCategory} Freq</span>}
              </div>

              <div className="fi-reco-section-title">Recommended Restaurants</div>
              <div className="fi-reco-section-sub">Matched to your location, time & preferences</div>
              <div className="fi-reco-resto-grid">
                {results.restaurants.map((r, idx) => (
                  <div className="fi-reco-card" key={r.id} style={{ animationDelay: `${idx * 80}ms` }}>
                    <div className="fi-reco-card-icon">{RESTO_EMOJIS[idx % RESTO_EMOJIS.length]}</div>
                    <div className="fi-reco-card-name">
                      <span className="fi-reco-rank-badge">{idx + 1}</span>{r.name}
                    </div>
                    <div className="fi-reco-card-meta">{r.freq} matching orders</div>
                  </div>
                ))}
              </div>

              <div className="fi-reco-section-title">Recommended Items</div>
              <div className="fi-reco-section-sub">Popular items for your dining occasion</div>
              <div className="fi-reco-food-grid">
                {results.foods.map((f, idx) => (
                  <div className="fi-reco-card" key={f.id} style={{ animationDelay: `${idx * 60}ms` }}>
                    <div className="fi-reco-card-icon">{FOOD_EMOJIS[idx % FOOD_EMOJIS.length]}</div>
                    <div className="fi-reco-card-name">
                      <span className="fi-reco-rank-badge">{idx + 1}</span>{f.name}
                    </div>
                    <div className="fi-reco-card-meta">{f.freq} orders in dataset</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="fi-empty">
              <div className="fi-empty-icon"><Sparkles size={52} /></div>
              <h3>Set your preferences and hit Get Recommendations</h3>
              <p>We'll find the best restaurants and items matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function FoodieIntelligence() {
  const [page, setPage] = useState("home");

  const NAV = [
    { id: "home", label: "Home", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "customers", label: "Customers", icon: UserCheck },
    { id: "restaurants", label: "Restaurants", icon: Store },
    { id: "recommendations", label: "Recommendations", icon: Sparkles },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={setPage} />;
      case "analytics": return <AnalyticsPage />;
      case "customers": return <CustomerInsightsPage />;
      case "restaurants": return <RestaurantInsightsPage />;
      case "recommendations": return <RecommendationPage />;
      default: return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="fi-root">
        <nav className="fi-nav">
          <div className="fi-nav-logo">
            <UtensilsCrossed size={22} style={{ color: "#FF6B35" }} />
            Foodie Intelligence
          </div>
          <div className="fi-nav-links">
            {NAV.map((n) => (
              <button key={n.id}
                className={`fi-nav-btn ${page === n.id ? "active" : ""}`}
                onClick={() => setPage(n.id)}>
                <n.icon size={14} /> {n.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="fi-page">{renderPage()}</div>
        <footer style={{ textAlign: "center", padding: "2rem", fontSize: 12, color: "#3A3F5C", borderTop: "1px solid rgba(255,107,53,0.08)" }}>
          © 2025 Foodie Intelligence System · Delhi NCR · Built with real order data
        </footer>
      </div>
    </>
  );
}
