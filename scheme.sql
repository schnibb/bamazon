DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products(item_id, product_name. department_name, price, stock_quantity)
VALUES(77387, "iphone", "cell phones", 799.05, 99), (589624, "macbook pro", "laptops", 3179.23, 179), (884526, "play station 4", "electronics", 475.99, 58), (215611, "vizio", "electronics", 899.99, 46), (369214, "go pro hero 7", "cameras", 459.50, 89), (854389, "ipad pro 12.9 inch", "electronics", 1100.99, 25), (348169, "glass drinking glasses", "home goods", 27.99, 1009), (266638, "dinner plates", "home goods", 35.79, 60), (137892, "blanket", "home goods", 27.99, 300), (19380, "pens", "office supplies", 5.50, 100), (100971, "printer paper", "office supplies", 15.99, 156), (91240, "paper", "office supplies", 19.99, 1000);