import React, { useState } from 'react';
import styles from './Recommendation.module.css';
import FilterPanel from '../components/FilterPanel';
import RecommendationCard from '../components/RecommendationCard';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { Sparkles, Lightbulb, MapPin, Clock, Wallet, BarChart3 } from 'lucide-react';
import foodOrders from '../data/finalFoodOrders.json';
const getTopValues = (data, key, limit) => {
  const count = {};

  data.forEach(item => {
    const value = item[key];

    if (value) {
      count[value] = (count[value] || 0) + 1;
    }
  });

  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, freq], index) => ({
      id: index + 1,
      name,
      description: `${freq} orders`
    }));
};
export default function Recommendation() {
  const [recommendations, setRecommendations] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilter = (filters) => {
  setActiveFilter(filters);

  let filtered = foodOrders;

  if (filters.city) {
    filtered = filtered.filter(item => item.City === filters.city);
  }

  if (filters.hour) {
    filtered = filtered.filter(item => Number(item.order_hour) === Number(filters.hour));
  }

  if (filters.spendingCategory) {
    filtered = filtered.filter(item => item.spending_category === filters.spendingCategory);
  }

  if (filters.frequencyCategory) {
    filtered = filtered.filter(item => item.frequency_category === filters.frequencyCategory);
  }

  if (filtered.length === 0) {
    filtered = foodOrders;
  }

  const restaurants = getTopValues(filtered, 'Resto_name', 6);
  const foods = getTopValues(filtered, 'Items_in_order', 8);

  setRecommendations({
    restaurants,
    foods,
    filters
  });
};

  const getFilterIcon = (label) => {
    switch(label) {
      case 'City': return <MapPin size={16} />;
      case 'Preferred Time': return <Clock size={16} />;
      case 'Spending Level': return <Wallet size={16} />;
      case 'Order Frequency': return <BarChart3 size={16} />;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      <SectionHeader 
        title="Smart Recommendations"
        subtitle="Personalized restaurant and food recommendations based on your preferences"
        icon={Sparkles}
      />

      <div className={styles.content}>
        {/* Filter Panel */}
        <div className={styles.filterSection}>
          <FilterPanel onFilter={handleFilter} />
        </div>

        {/* Recommendations Display */}
        {recommendations && (
          <div className={styles.recommendationsSection}>
            {/* Explanation */}
            <GlassCard variant="elevated" className={styles.explanationCard}>
              <div className={styles.explanationContent}>
                <div className={styles.explanationHeader}>
                  <Lightbulb size={24} color="var(--primary)" />
                  <h3>Your Smart Recommendations</h3>
                </div>
                <p className={styles.explanationText}>
                  Based on your unique preferences and dining patterns, here are our personalized picks:
                </p>
                <div className={styles.filterChips}>
                  {activeFilter && (
                    <>
                      {activeFilter.city && (
                        <div className={styles.chip}>
                          <MapPin size={14} />
                          <span>{activeFilter.city}</span>
                        </div>
                      )}
                      {activeFilter.hour && (
                        <div className={styles.chip}>
                          <Clock size={14} />
                          <span>{activeFilter.hour}</span>
                        </div>
                      )}
                      {activeFilter.spendingCategory && (
                        <div className={styles.chip}>
                          <Wallet size={14} />
                          <span>{activeFilter.spendingCategory}</span>
                        </div>
                      )}
                      {activeFilter.frequencyCategory && (
                        <div className={styles.chip}>
                          <BarChart3 size={14} />
                          <span>{activeFilter.frequencyCategory}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* Recommended Restaurants */}
            <div className={styles.section}>
              <div className={styles.sectionHeading}>
                <h2>Recommended Restaurants</h2>
                <p>
                  Perfect matches for your location, time preference, and budget
                </p>
              </div>
              <div className={styles.restaurantGrid}>
                {recommendations.restaurants.map((restaurant, idx) => (
                  <div key={restaurant.id} style={{ animation: `slideInUp 0.6s ease-out ${idx * 100}ms both` }}>
                    <RecommendationCard 
                      item={restaurant}
                      type="restaurant"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Foods */}
            <div className={styles.section}>
              <div className={styles.sectionHeading}>
                <h2>Recommended Items</h2>
                <p>
                  Popular and trending items perfect for your dining occasion
                </p>
              </div>
              <div className={styles.foodGrid}>
                {recommendations.foods.map((food, idx) => (
                  <div key={food.id} style={{ animation: `slideInUp 0.6s ease-out ${idx * 100}ms both` }}>
                    <RecommendationCard 
                      item={food}
                      type="food"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!recommendations && (
          <GlassCard variant="elevated" className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Sparkles size={48} />
            </div>
            <h3>No Recommendations Yet</h3>
            <p>Apply filters to discover personalized restaurant and food recommendations</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
