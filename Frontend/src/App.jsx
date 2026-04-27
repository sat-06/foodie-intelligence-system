import React, { useState } from 'react';
import styles from './App.module.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import CustomerInsights from './pages/CustomerInsights';
import RestaurantInsights from './pages/RestaurantInsights';
import Recommendation from './pages/Recommendation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'analytics':
        return <Analytics />;
      case 'customer-insights':
        return <CustomerInsights />;
      case 'restaurant-insights':
        return <RestaurantInsights />;
      case 'recommendations':
        return <Recommendation />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={styles.app}>
      <Navbar activeLink={currentPage} onLinkChange={setCurrentPage} />
      <main className={styles.main}>
        {renderPage()}
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Foodie Intelligence System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
