DROP database if EXISTS bamazon_db;

CREATE database bamazon_db;

USE bamazon_db;

DROP TABLE IF EXISTS products;

CREATE table products (

item_id INT auto_increment,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
primary key (item_id)

)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dove Conditioner', 'Cosmetics', 6.25, 100),
		('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 150),
		('Brawny Paper Towels', 'Grocery', 4.25, 250),
		('Granny Smith Apples', 'Produce', 0.35, 200),
		('Chiquita Bannana', 'Produce', 0.20, 200),
		('Nike Shorts', 'Clothing', 17.88, 150),
		('Purina Cat Chow', 'Pet', 7.25, 160),
		('Fancy Feast Wet Cat Food', 'Pet', 12.50, 160),
		('Ibuprophen', 'Pharmacy', 4.95, 290),
		('Band Aid', 'Pharmacy', 3.25, 460),
		('Ben & Jerry Ice Cream', 'Grocery', 3.25, 1000);
        
SELECT * FROM products;