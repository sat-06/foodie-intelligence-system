import React from 'react';
import styles from './GlassCard.module.css';

const GlassCard = ({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  noBorder = false,
  hoverable = true,
}) => {
  return (
    <div
      className={`
        ${styles.glassCard}
        ${styles[variant]}
        ${interactive ? styles.interactive : ''}
        ${noBorder ? styles.noBorder : ''}
        ${hoverable ? styles.hoverable : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
