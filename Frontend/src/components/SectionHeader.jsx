import React from 'react';
import styles from './SectionHeader.module.css';

const SectionHeader = ({
  title,
  subtitle,
  icon: Icon,
  action,
  variant = 'default',
}) => {
  return (
    <div className={`${styles.header} ${styles[variant]}`}>
      <div className={styles.content}>
        {Icon && <Icon className={styles.icon} size={32} />}
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default SectionHeader;
