import React from 'react';
import styles from './RestaurantInsights.module.css';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { 
  BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  topRestaurants,
  restaurantPerformance
} from '../data/mockData';
import { TrendingUp, TrendingDown, Minus, Store } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <GlassCard variant="dark" noBorder>
        <div className={styles.tooltipContent}>
          <p className={styles.tooltipLabel}>{payload[0].name || 'Value'}</p>
          <p style={{ color: payload[0].fill }}>
            <strong>{payload[0].value}</strong>
          </p>
        </div>
      </GlassCard>
    );
  }
  return null;
};

export default function RestaurantInsights() {
  const topByRevenue = [...topRestaurants].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className={styles.container}>
      <SectionHeader 
        title="Restaurant Insights"
        subtitle="Performance metrics and insights for partner restaurants"
        icon={Store}
      />

      <div className={styles.grid}>
        {/* Top Restaurants by Orders */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <h3>Top by Order Volume</h3>
            <p>Ranking by total order count</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topRestaurants}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#FF6B35" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Top Restaurants by Revenue */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <h3>Top by Revenue</h3>
            <p>Ranking by total revenue generated</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topByRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#F7931E" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Average Order Value per Restaurant */}
        <GlassCard variant="elevated">
          <div className={styles.chartHeader}>
            <h3>Average Order Value</h3>
            <p>AOV metrics for top performers</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" />
              <XAxis dataKey="name" type="category" angle={-45} textAnchor="end" height={100} stroke="var(--text-secondary)" />
              <YAxis dataKey="avgOrderValue" name="Avg Order Value" stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} formatter={(value) => `₹${value.toFixed(2)}`} />
              <Scatter name="Avg Order Value" data={topRestaurants} fill="#FDB913" />
            </ScatterChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Restaurant Performance Cards */}
      <section className={styles.performanceSection}>
        <SectionHeader 
          title="Performance Details"
          subtitle="Individual restaurant metrics and trends"
        />
        <div className={styles.performanceGrid}>
          {restaurantPerformance.map((restaurant, idx) => (
            <GlassCard key={restaurant.id} variant="accent" className={styles.performanceCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerContent}>
                  <h4 className={styles.restaurantName}>{restaurant.name}</h4>
                  <div className={styles.rating}>
                    <span className={styles.ratingValue}>⭐ {restaurant.rating}</span>
                    <span className={styles.orderCount}>{restaurant.orders} orders</span>
                  </div>
                </div>
                <div className={styles.trendIcon}>
                  {restaurant.trend === 'up' && <TrendingUp color="#10B981" size={24} strokeWidth={2.5} />}
                  {restaurant.trend === 'down' && <TrendingDown color="#EF4444" size={24} strokeWidth={2.5} />}
                  {restaurant.trend === 'stable' && <Minus color="#F59E0B" size={24} strokeWidth={2.5} />}
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.label}>Revenue</span>
                  <span className={styles.value}>₹{restaurant.revenue.toLocaleString()}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.label}>Avg Order Value</span>
                  <span className={styles.value}>₹{restaurant.avgOrderValue.toFixed(2)}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.label}>Total Orders</span>
                  <span className={styles.value}>{restaurant.orders}</span>
                </div>
              </div>

              <button className={styles.button}>View Details</button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className={styles.featuredSection}>
        <SectionHeader 
          title="Featured Restaurants"
          subtitle="Spotlight on our top performing partners"
        />
        <div className={styles.cardsGrid}>
          {restaurantPerformance.slice(0, 6).map(restaurant => (
            <GlassCard key={restaurant.id} variant="accent" className={styles.featuredCard}>
              <div className={styles.featuredContent}>
                <div className={styles.featuredHeader}>
                  <h4>{restaurant.name}</h4>
                  <span className={styles.featuredRating}>⭐ {restaurant.rating}</span>
                </div>
                <p className={styles.featuredDescription}>{restaurant.cuisine || 'Premium Dining'}</p>
                <div className={styles.featuredStats}>
                  <div className={styles.fstat}>
                    <span>Orders</span>
                    <strong>{restaurant.orders}</strong>
                  </div>
                  <div className={styles.fstat}>
                    <span>Revenue</span>
                    <strong>₹{(restaurant.revenue / 1000).toFixed(0)}K</strong>
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
