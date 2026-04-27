import React, { useState } from 'react';
import styles from './Analytics.module.css';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  topRestaurants,
  ordersByCity,
  ordersByHour,
  ordersByDay,
  discountComparison
} from '../data/mockData';
import { TrendingUp, Filter } from 'lucide-react';

export default function Analytics() {
  const [selectedCity, setSelectedCity] = useState('all');
  const colors = ['#FF6B35', '#F7931E', '#FDB913', '#FDBF57', '#FFD89B', '#FFE5D9'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <GlassCard variant="dark" noBorder>
          <div className={styles.tooltipContent}>
            <p className={styles.tooltipLabel}>{label}</p>
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: <strong>{entry.value.toLocaleString()}</strong>
              </p>
            ))}
          </div>
        </GlassCard>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <SectionHeader 
        title="Analytics Dashboard"
        subtitle="Comprehensive analysis of order patterns and trends"
        icon={TrendingUp}
        action={
          <button className={styles.filterBtn}>
            <Filter size={18} />
            Filters
          </button>
        }
      />

      <div className={styles.grid}>
        {/* Top Restaurants */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <div>
              <h3>Top Restaurants by Orders</h3>
              <p>Leading restaurants by order volume</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topRestaurants}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#FF6B35" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Orders by City */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <div>
              <h3>Orders by City</h3>
              <p>Distribution across major cities</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={ordersByCity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, orders }) => `${name}: ${orders}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="orders"
                animationDuration={800}
              >
                {ordersByCity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Orders by Hour */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <div>
              <h3>Orders by Hour</h3>
              <p>Peak hours and demand patterns</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={ordersByHour}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="hour" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="#FF6B35" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOrders)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Orders by Day */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <div>
              <h3>Orders by Day of Week</h3>
              <p>Weekly order trends</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ordersByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#F7931E" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Discount Impact */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <div>
              <h3>Impact of Discounts on Order Value</h3>
              <p>Average order value comparison</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={discountComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="category" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} formatter={(value) => `₹${value}`} />
              <Bar dataKey="avgValue" fill="#FDB913" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Restaurant Revenue */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <div>
              <h3>Restaurant Revenue Comparison</h3>
              <p>Top performing restaurants by revenue</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={topRestaurants}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" />
              <XAxis type="number" stroke="var(--text-secondary)" />
              <YAxis dataKey="name" type="category" width={120} stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#FF6B35" radius={[0, 8, 8, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
