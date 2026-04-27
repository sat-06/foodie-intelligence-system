import React from 'react';
import styles from './RecommendationCard.module.css';
import { Star, Clock, MapPin, Zap } from 'lucide-react';

export default function RecommendationCard({ item, type = 'restaurant' }) {
  if (type === 'restaurant') {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h4 className={styles.name}>{item.name}</h4>
            <p className={styles.cuisine}>{item.cuisine}</p>
          </div>
          <div className={styles.rating}>
            <Star size={16} fill="#FDB913" color="#FDB913" />
            <span>{item.rating}</span>
          </div>
        </div>
        
        <div className={styles.details}>
          <div className={styles.detail}>
            <Clock size={16} />
            <span>{item.avgDeliveryTime}</span>
          </div>
          <div className={styles.detail}>
            <MapPin size={16} />
            <span>Min ₹{item.minOrder}</span>
          </div>
          <div className={styles.detail}>
            <Zap size={16} />
            <span>{item.discount} Off</span>
          </div>
        </div>
        
        <button className={styles.button}>View Restaurant</button>
      </div>
    );
  }

  // Food item card
  return (
    <div className={styles.foodCard}>
      <div className={styles.foodHeader}>
        <h4 className={styles.foodName}>{item.name}</h4>
        <span className={styles.price}>₹{item.price}</span>
      </div>
      
      <p className={styles.restaurant}>{item.restaurant}</p>
      
      <div className={styles.foodFooter}>
        <div className={styles.foodRating}>
          <Star size={14} fill="#FDB913" color="#FDB913" />
          <span>{item.rating}</span>
        </div>
        <span className={styles.orders}>{item.orders} orders</span>
      </div>
      
      <button className={styles.foodButton}>Order Now</button>
    </div>
  );
}
