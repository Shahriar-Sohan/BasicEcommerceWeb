USE rivalray_db;

-- product_tags 
CREATE TABLE product_tags (
    tag_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(255) NOT NULL
);

-- product_categories
CREATE TABLE product_categories (
    category_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT
);

-- product_gender
CREATE TABLE product_gender (
    gender_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    gender_name VARCHAR(50) NOT NULL
);

-- product_brand
CREATE TABLE product_brand (
    brand_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(50) NOT NULL
);

-- product_images (moved up)
CREATE TABLE product_images (
    image_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(255) NOT NULL,
    image_alt VARCHAR(255),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- product_variant
CREATE TABLE product_variant (
    variant_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL
);

-- products
CREATE TABLE products (
    product_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    image_id INT UNSIGNED,
    category_id INT UNSIGNED,
    gender_id INT UNSIGNED,
    brand_id INT UNSIGNED,
    tag_id INT UNSIGNED,
    variant_id INT UNSIGNED,

    product_title VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10,2) UNSIGNED NOT NULL,
    product_discount TINYINT UNSIGNED DEFAULT 0,
    is_featured BIT DEFAULT 0,
    is_new BIT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign Key Constraints
    FOREIGN KEY (category_id) REFERENCES product_categories(category_id),
    FOREIGN KEY (gender_id) REFERENCES product_gender(gender_id),
    FOREIGN KEY (brand_id) REFERENCES product_brand(brand_id),
    FOREIGN KEY (tag_id) REFERENCES product_tags(tag_id),
    FOREIGN KEY (variant_id) REFERENCES product_variant(variant_id),
    FOREIGN KEY (image_id) REFERENCES product_images(image_id)
);

-- product_stock
CREATE TABLE product_stock (
    stock_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_id INT UNSIGNED,
    variant_id INT UNSIGNED,
    product_quantity INT UNSIGNED DEFAULT 0,

    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (variant_id) REFERENCES product_variant(variant_id)
);

-- junction table for tags and products
CREATE TABLE product_tag_relationship (
    product_id INT UNSIGNED,
    tag_id INT UNSIGNED,
    PRIMARY KEY (product_id, tag_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES product_tags(tag_id) ON DELETE CASCADE
);


--joining
SELECT
products.product_title,
product_categories.category_name
FROM
products
JOIN
product_categories ON products.category_id = product_categories.category_id;