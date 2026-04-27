import React from 'react';
import styles from './ChartCard.module.css';

export default function ChartCard({ title, description, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
