import React, { useState } from 'react';
import styles from './FilterPanel.module.css';
import { Filter } from 'lucide-react';
import foodOrders from '../data/finalFoodOrders.json';

// Unique cities from real dataset
const cities = [...new Set(foodOrders.map(item => item.City).filter(Boolean))];

// Subzones grouped city-wise from real dataset
const subzones = {};
cities.forEach(city => {
  subzones[city] = [
    ...new Set(
      foodOrders
        .filter(item => item.City === city)
        .map(item => item.Subzone)
        .filter(Boolean)
    )
  ];
});

// Unique hours from real dataset
const hours = [...new Set(foodOrders.map(item => item.order_hour).filter(hour => hour !== null && hour !== undefined))]
  .sort((a, b) => Number(a) - Number(b));

// Categories from real dataset
const spendingCategories = [
  ...new Set(foodOrders.map(item => item.spending_category).filter(Boolean))
];

const frequencyCategories = [
  ...new Set(foodOrders.map(item => item.frequency_category).filter(Boolean))
];

export default function FilterPanel({ onFilter }) {
  const [filters, setFilters] = useState({
    city: cities[0] || '',
    subzone: subzones[cities[0]]?.[0] || '',
    hour: hours[0] || '',
    spendingCategory: spendingCategories[0] || '',
    frequencyCategory: frequencyCategories[0] || ''
  });

  const handleCityChange = (e) => {
    const newCity = e.target.value;

    setFilters(prev => ({
      ...prev,
      city: newCity,
      subzone: subzones[newCity]?.[0] || ''
    }));
  };

  const handleSubzoneChange = (e) => {
    setFilters(prev => ({
      ...prev,
      subzone: e.target.value
    }));
  };

  const handleHourChange = (e) => {
    setFilters(prev => ({
      ...prev,
      hour: e.target.value
    }));
  };

  const handleSpendingChange = (e) => {
    setFilters(prev => ({
      ...prev,
      spendingCategory: e.target.value
    }));
  };

  const handleFrequencyChange = (e) => {
    setFilters(prev => ({
      ...prev,
      frequencyCategory: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <Filter size={20} />
        <h3>Filters</h3>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.filterGroup}>
          <label htmlFor="city">City</label>
          <select
            id="city"
            value={filters.city}
            onChange={handleCityChange}
            className={styles.select}
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="subzone">Subzone</label>
          <select
            id="subzone"
            value={filters.subzone}
            onChange={handleSubzoneChange}
            className={styles.select}
          >
            {(subzones[filters.city] || []).map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="hour">Preferred Hour</label>
          <select
            id="hour"
            value={filters.hour}
            onChange={handleHourChange}
            className={styles.select}
          >
            {hours.map(hour => (
              <option key={hour} value={hour}>{hour}:00</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="spending">Spending Category</label>
          <select
            id="spending"
            value={filters.spendingCategory}
            onChange={handleSpendingChange}
            className={styles.select}
          >
            {spendingCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="frequency">Frequency Category</label>
          <select
            id="frequency"
            value={filters.frequencyCategory}
            onChange={handleFrequencyChange}
            className={styles.select}
          >
            {frequencyCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Get Recommendations
        </button>
      </form>
    </div>
  );
}