
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