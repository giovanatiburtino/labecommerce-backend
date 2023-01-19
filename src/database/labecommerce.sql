-- Active: 1673871648594@@127.0.0.1@3306

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




-- Get All Users // Retorna todos os usuários cadastrados ordenado pela coluna email em ordem crescente

SELECT * FROM users
ORDER BY email ASC;



-- Get All Products // Retorna todos os produtos cadastrados ordenado pela coluna price em ordem crescente

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;



-- Search Product by name // Retorna o resultado baseado no termo de busca

SELECT * FROM products
WHERE name LIKE "%air%";



-- Create User // mocka um novo usuário e insere o item mockado na tabela users

INSERT INTO users (id, email, password)
VALUES ("4", "astrodev@email.com", "astrodev123");



-- Create Product 

INSERT INTO products (id, name, price, category)
VALUES ("p006", "VANS CLASSICS SLIP-ON", 210, "SNEAKERS");



-- Get Products By Id // mocka uma id e retorna uma busca baseada no valor mockado

SELECT * FROM products
WHERE id = "p004";



-- Delete User By Id //

DELETE FROM users
WHERE id = "3";



-- Delete Product By Id // mocka uma id e deleta a linha baseada no valor mockado

DELETE FROM products
WHERE id = "p005";



-- Edit User By Id // mocka valores para editar um user e editar a linha baseada nos valores mockados

UPDATE users
SET password = "astrodev333"
WHERE id = "4";



-- Edit Product By Id // mocka valores para editar um produto e editar a linha baseada nos valores mockados

UPDATE products
SET category = "CASUAL"
WHERE id = "p006";




CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

PRAGMA table_info ("purchases");

SELECT * FROM purchases;



INSERT INTO purchases(id, total_price, paid, buyer_id)
VALUES
    ("pur01", 1300.50, 0, "1"),
    ("pur02", 1050.00, 0, "1"),
    ("pur03", 1250.00, 0, "2"),
    ("pur04", 1100.50, 0, "2");




UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "pur01";



SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "2";