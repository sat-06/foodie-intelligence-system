import React from 'react';
import styles from './CustomerInsights.module.css';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { 
  PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  topCustomers,
  customerSegments,
  spendingCategory,
  frequencyCategory
} from '../data/mockData';
import { Users } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <GlassCard variant="dark" noBorder>
        <div className={styles.tooltipContent}>
          <p className={styles.tooltipLabel}>{payload[0].name}</p>
          <p style={{ color: payload[0].fill }}>
            <strong>{payload[0].value}</strong>
          </p>
        </div>
      </GlassCard>
    );
  }
  return null;
};

export default function CustomerInsights() {
  const colors = ['#FF6B35', '#F7931E', '#FDB913'];

  return (
    <div className={styles.container}>
      <SectionHeader 
        title="Customer Insights"
        subtitle="Detailed analysis of customer behavior and segmentation"
        icon={Users}
      />

      <div className={styles.grid}>
        {/* Spending Category Distribution */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <h3>Spending Distribution</h3>
            <p>Customer segments by spending level</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {spendingCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Frequency Category Distribution */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <h3>Frequency Distribution</h3>
            <p>Customer segments by order frequency</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={frequencyCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {frequencyCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Top Customers by Orders */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <h3>Top Customers by Orders</h3>
            <p>Most frequent ordering customers</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topCustomers.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#FF6B35" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Top Customers by Spending */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <h3>Top Customers by Spending</h3>
            <p>Highest value customers</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topCustomers.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="spending" fill="#F7931E" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Customer Segments */}
      <section className={styles.segmentsSection}>
        <SectionHeader 
          title="Customer Segments"
          subtitle="Behavioral and value-based customer categorization"
        />
        <div className={styles.segmentsGrid}>
          {customerSegments.map((segment, idx) => (
            <GlassCard 
              key={segment.id} 
              variant="accent"
              className={styles.segmentCard}
            >
              <div className={styles.segmentContent}>
                <div className={styles.segmentHeader}>
                  <div className={styles.segmentTitle}>
                    <h4 className={styles.segmentName}>{segment.name}</h4>
                    <span className={styles.segmentCount}>{segment.count} customers</span>
                  </div>
                  <div 
                    className={styles.segmentBadge}
                    style={{ backgroundColor: segment.color }}
                  >
                    {idx + 1}
                  </div>
                </div>
                <p className={styles.segmentDescription}>{segment.description}</p>
                <div className={styles.segmentStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Avg Spending</span>
                    <span className={styles.statValue}>₹{segment.avgSpending.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
