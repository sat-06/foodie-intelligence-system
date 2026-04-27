import React, { useEffect, useState } from 'react';
import styles from './StatCard.module.css';

const AnimatedCounter = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [value, duration]);

  return <>{displayValue}</>;
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  gradient,
  delay = 0,
}) => {
  return (
    <div 
      className={`${styles.statCard} ${gradient ? styles[gradient] : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <p className={styles.title}>{title}</p>
          {trendLabel && (
            <span className={`${styles.trendLabel} ${trend > 0 ? styles.positive : styles.negative}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        {Icon && (
          <div className={styles.iconWrapper}>
            <Icon size={24} />
          </div>
        )}
      </div>

      <div className={styles.valueSection}>
        <h3 className={styles.value}>
          <AnimatedCounter value={value} />
        </h3>
      </div>

      <div className={styles.footer}>
        <div className={styles.sparkline}></div>
      </div>
    </div>
  );
};

export default StatCard;
