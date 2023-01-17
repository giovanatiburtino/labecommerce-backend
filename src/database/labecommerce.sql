
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

PRAGMA table_info ('users');


INSERT INTO users (id, email, password)
VALUES 
    ("1", "giovana@gmail.com", "031101"),
    ("2", "ana@gmail.com", "010101"),
    ("3", "jose@outlook.com", "j0s3");


SELECT * FROM users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

PRAGMA table_info ('products');


INSERT INTO products (id, name, price, category)
VALUES ("p001", "AIR JORDAN 1 MID", 1199.00, "SNEAKERS"),
       ("p002", "NIKE AIR FORCE 1", 799.99, "SNEAKERS"),
       ("p003", "PALM ANGELS POOL SLIDER", 920.50, "SANDALS"),
       ("p004", "AIR JORDAN ZION 2", 999.99, "SNEAKERS"),
       ("p005", "ADIDAS STAN SMITH", 549.90, "SHOES");


SELECT * FROM products;