-- Active: 1673871648594@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

PRAGMA table_info ('users');


INSERT INTO users (id, name, email, password)
VALUES 
    ("u001", "Giovana", "giovana@gmail.com", "031101"),
    ("u002", "Ana" ,"ana@gmail.com" ,"010101"),
    ("u003", "Jose", "jose@outlook.com", "jose123");



SELECT * FROM users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

PRAGMA table_info ('products');


INSERT INTO products (id, name, price, description, image_url)
VALUES ("p001", "AIR JORDAN 1 MID", 1199.00, "Tênis icônico, conforto diário", "https://imgnike-a.akamaihd.net/1920x1920/016511IN.jpg"),
       ("p002", "NIKE AIR FORCE 1", 799.99, "Estilo Lendário com sofisticação.", "https://imgnike-a.akamaihd.net/1920x1920/01113751.jpg"),
       ("p003", "ADIDAS NMD_R1", 850.90, "Destaque-se na selva de concreto.", "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/50c01d050bea46b88e85acbc0115cef2_9366/Tenis_NMD_R1_Branco_GZ7925_01_standard.jpg"),
       ("p004", "AIR JORDAN ZION 2", 999.99, "Tênis AIR JORDAN ZION 2", "https://imgnike-a.akamaihd.net/1920x1920/024438ID.jpg"),
       ("p005", "TÊNIS JORDAN STAY LOYAL 2", 679.99, "Inspirado nas gerações de J, esse tênis é uma colagem de tudo o que é cool.", "https://imgnike-a.akamaihd.net/1920x1920/024262IX.jpg");



SELECT * FROM products;


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

INSERT INTO users (id, name, email, password)
VALUES ("u004", "Maria", "maria@outlook.com", "mariazinha");



-- Create Product 

INSERT INTO products (id, name, price, description, image_url)
VALUES ("p006", "VANS CLASSICS SLIP-ON", 210.00, "Tênis classico ", "https://secure-static.vans.com.br/medias/sys_master/vans/vans/h65/hd6/h00/h00/10798868430878/1002000580083U-01-BASEIMAGE-Hires.jpg");



-- Get Products By Id // mocka uma id e retorna uma busca baseada no valor mockado

SELECT * FROM products
WHERE id = "p006";



-- Delete User By Id //

DELETE FROM users
WHERE id = "u003";



-- Delete Product By Id // mocka uma id e deleta a linha baseada no valor mockado

DELETE FROM products
WHERE id = "p004";



-- Edit User By Id // mocka valores para editar um user e editar a linha baseada nos valores mockados

UPDATE users
SET password = "mariazinha333"
WHERE id = "u004";



-- Edit Product By Id // mocka valores para editar um produto e editar a linha baseada nos valores mockados

UPDATE products
SET description = "O Tênis Slip-On, nomeado originalmente como Vans #98, virou uma febre mundial."
WHERE id = "p006";




CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

PRAGMA table_info ("purchases");


INSERT INTO purchases(id, buyer_id, total_price, paid)
VALUES
    ("pur01", "u001", 3597.00, 0),
    ("pur02", "u001", 4254.50, 0),
    ("pur03", "u002", 1359.98, 0),
    ("pur04", "u002", 999.99, 0);


SELECT * FROM purchases;


-- UPDATE purchases
-- SET delivered_at = DATETIME('now')
-- WHERE id = "pur01";


SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "u002";


CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)
    FOREIGN KEY (product_id) REFERENCES products (id)
);

PRAGMA table_info ("purchases_products");

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("pur01", "p001", 3),
    ("pur02", "p003", 5),
    ("pur03", "p005", 2);


SELECT * FROM purchases_products;

SELECT  
    purchases.id AS purchasesID,
    products.id AS productsID,
    products.name AS productName,
    purchases_products.quantity AS quantity,
    purchases.buyer_id AS buyer
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchasesID
RIGHT JOIN products
ON purchases_products.product_id = productsID;

