-- =========================
-- PHASE 1: BASIC EXPLORATION
-- =========================

-- =========================
-- 1. DATASET OVERVIEW
-- =========================

-- Total rows
SELECT COUNT(*) 
FROM food_orders;
-- Number of unique restaurants
SELECT COUNT(DISTINCT `Restaurant Id`)
FROM food_orders;
-- Number of unique customers
SELECT COUNT(DISTINCT `Customer Id`)
FROM food_orders;
-- Number of unique items/dishes
SELECT COUNT(DISTINCT `Item Name`)
FROM food_orders;

-- =========================
-- 2. TOP DISHES & CUISINES
-- =========================

-- Top cuisines by number of orders
SELECT `Items in order`, COUNT(*) AS total_orders
FROM food_orders
GROUP BY `Items in order`
ORDER BY total_orders DESC
LIMIT 10;
--Top Restaurants
SELECT 'Restaurant name', COUNT(*) AS total_orders
FROM food_orders
GROUP BY 'Restaurant name',COUNT(*) AS total_orders
ORDER BY total_orders DESC
LIMIT 10;

-- =========================
-- 3. CUSTOMER ACTIVITY
-- =========================

--Most Frequent Customers
SELECT `Customer Id`, COUNT(*) AS total_cust
FROM food_orders
GROUP BY `Customer Id` 
ORDER BY total_cust DESC
LIMIT 10;
--Highest Spending Customer
SELECT `Customer Id`, SUM(`Total`) AS total_spent
FROM food_orders
GROUP BY `Customer Id`
ORDER BY total_spent DESC
LIMIT 10;

-- =========================
-- 4. PEAK ORDERING TIME
-- =========================

--Orders by Hour
SELECT HOUR(`Order Placed At`) AS order_hour,
COUNT(*) AS total_orders
FROM food_orders
GROUP BY order_hour
ORDER BY total_orders DESC;
--Orders by Day
SELECT DATE(`Order Placed At`) AS order_date,
COUNT(*) AS total_orders
FROM food_orders
GROUP BY order_date
ORDER BY total_orders DESC;