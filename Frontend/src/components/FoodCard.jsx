import React from 'react';
import styles from './FoodCard.module.css';
import { Star, ShoppingCart } from 'lucide-react';

export default function FoodCard({ restaurant }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        <div className={styles.icon}>🍽️</div>
      </div>
      
      <div className={styles.content}>
        <h4 className={styles.name}>{restaurant.name}</h4>
        <p className={styles.cuisine}>⭐ {restaurant.rating} • {restaurant.orders} orders</p>
        
        <div className={styles.stats}>
          <span className={styles.stat}>₹{restaurant.avgOrderValue}</span>
          <span className={styles.stat}>{restaurant.orders} orders</span>
        </div>
        
        <div className={styles.trendBadge} data-trend={restaurant.trend}>
          {restaurant.trend === 'up' && '↗ Growing'}
          {restaurant.trend === 'down' && '↘ Declining'}
          {restaurant.trend === 'stable' && '→ Stable'}
        </div>
      </div>
      
      <button className={styles.button}>
        <ShoppingCart size={18} />
      </button>
    </div>
  );
}
