import React from 'react';
import styles from './Navbar.module.css';
import { UtensilsCrossed } from 'lucide-react';

export default function Navbar({ activeLink, onLinkChange }) {
  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Analytics', id: 'analytics' },
    { name: 'Customer Insights', id: 'customer-insights' },
    { name: 'Restaurant Insights', id: 'restaurant-insights' },
    { name: 'Recommendations', id: 'recommendations' }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <UtensilsCrossed size={28} color="#FF6B35" />
          <span>Foodie Intelligence</span>
        </div>
        
        <ul className={styles.navLinks}>
          {links.map(link => (
            <li key={link.id}>
              <button
                className={`${styles.navLink} ${activeLink === link.id ? styles.active : ''}`}
                onClick={() => onLinkChange(link.id)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
