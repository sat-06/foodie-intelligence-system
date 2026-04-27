SELECT COUNT(*) 
FROM food_orders;
SELECT COUNT(DISTINCT `Restaurant Id`)
FROM food_orders;
SELECT COUNT(DISTINCT `Customer Id`)
FROM food_orders;
SELECT COUNT(DISTINCT `Item Name`)
FROM food_orders;
SELECT `Items in order`, COUNT(*) AS total_orders
FROM food_orders
GROUP BY `Items in order`
ORDER BY total_orders DESC
LIMIT 10;
SELECT 'Restaurant name', COUNT(*) AS total_orders
FROM food_orders
GROUP BY 'Restaurant name',COUNT(*) AS total_orders
ORDER BY total_orders DESC
LIMIT 10;
SELECT `Customer Id`, COUNT(*) AS total_cust
FROM food_orders
GROUP BY `Customer Id` 
ORDER BY total_cust DESC
LIMIT 10;
SELECT `Customer Id`, SUM(`Total`) AS total_spent
FROM food_orders
GROUP BY `Customer Id`
ORDER BY total_spent DESC
LIMIT 10;
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