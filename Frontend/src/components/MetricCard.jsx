import React from 'react';
import styles from './MetricCard.module.css';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCard({ title, value, unit = '', icon: Icon, trend = null }) {
  const formatValue = (val) => {
    if (typeof val !== 'number') return val;
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toLocaleString();
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
          {Icon && <div className={styles.iconWrapper}><Icon size={24} /></div>}
        </div>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{formatValue(value)}</span>
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>
        {trend && (
          <div className={`${styles.trend} ${styles[trend]}`}>
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{trend === 'up' ? '+' : '-'}12.5%</span>
          </div>
        )}
      </div>
    </div>
  );
}
