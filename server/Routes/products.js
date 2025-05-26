import express from 'express'
import db from '../server.js'

const router = express.Router();

const productSql = `
SELECT
products.product_id,
	products.product_title AS title,
	products.product_description AS description,
	products.product_price AS price,
	products.product_discount AS discount,
	product_categories.category_name AS category,
	product_brand.brand_name AS brand,
	product_gender.gender_name AS gender,
	product_variant.size,
	product_variant.color,
	product_images.image_url AS image_url,
	product_images.image_alt AS image_alt
	FROM
	products
	JOIN product_categories ON products.category_id = product_categories.category_id
	JOIN product_brand ON products.brand_id = product_brand.brand_id
	JOIN product_gender ON products.gender_id = product_gender.gender_id
	JOIN product_variant ON products.variant_id = product_variant.variant_id
	JOIN product_images ON products.image_id = product_images.image_id
	`

//get all products
router.get('/products', (req, res) => {
  db.query(productSql, (err, results) => {
    if (err) {
      console.error('Error fetching products: ', err);
      return res.status(500).send('Error fetching products');
    }
    res.json(results)
  })
});

router.get('/products/:id', (req, res) => {
  const sql = `${productSql} WHERE products.product_id = ?`
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error fetching product: ', err);
      return res.status(500).send('Error fetching product');
    }
    if (results.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.json(results[0]);
  })
});

router.post('/products/add', (req, res) => {
  const { title, description, price, category, brand, gender, tag, size, color, discount, featuredProduct, newArrival } = req.body;
  if (!title || !category || !brand || !gender || !size || !color) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    "SELECT variant_id FROM product_variant WHERE size = ? AND color = ?",
    [size, color],
    (variantErr, variantResults) => {
      if (variantErr) {
        console.error("Error checking variant:", variantErr);
        return res.status(500).send("Error checking variant");
      }

      if (variantResults.length > 0) {
        insertProduct(variantResults[0].variant_id);
      } else {
        db.query(
          "INSERT INTO product_variant (size, color) VALUES (?, ?)",
          [size, color],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error inserting variant:", insertErr);
              return res.status(500).send("Error inserting variant");
            }
            insertProduct(insertResult.insertId);
          }
        );
      }
    }
  );

  function insertProduct(variantId) {
    const sql = `
          INSERT INTO products (
            image_id, category_id, gender_id, brand_id, tag_id, variant_id,
            product_title, product_description, product_price, product_discount,
            is_featured, is_new
          ) VALUES (
            1,
            (SELECT category_id FROM product_categories WHERE category_name = ?),
            (SELECT gender_id FROM product_gender WHERE gender_name = ?),
            (SELECT brand_id FROM product_brand WHERE brand_name = ?),
            ?, ?, ?, ?, ?, ?
          )
        `;
    const values = [category, gender, brand, variantId, title, description, price, discount, featuredProduct, newArrival];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("error creating product: ", err);
        return res.status(500).send("error while creating product");
      } else {
        const productId = result.insertId;
        if (Array.isArray(tag) && tag.length > 0){
          
        }
      }
    });
  }

  return; // Prevents double response
});

router.put('/products/:id/edit', (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    category,
    brand,
    gender,
    size,
    color,
    discount,
    featuredProduct,
    newArrival
  } = req.body;

  if (!title || !category || !brand || !gender || !size || !color) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    "SELECT variant_id FROM product_variant WHERE size = ? AND color = ?",
    [size, color],
    (variantErr, variantResults) => {
      if (variantErr) {
        console.error("Error checking variant:", variantErr);
        return res.status(500).send("Error checking variant");
      }

      const updateProduct = (variantId) => {
        const sql = `
          UPDATE products
          SET
            product_title = ?,
            product_description = ?,
            product_price = ?,
            product_discount = ?,
            is_featured = ?,
            is_new = ?,
            variant_id = (
              SELECT variant_id FROM product_variant WHERE size = ? AND color = ?
            ),
            category_id = (SELECT category_id FROM product_categories WHERE category_name = ?),
            brand_id = (SELECT brand_id FROM product_brand WHERE brand_name = ?),
            gender_id = (SELECT gender_id FROM product_gender WHERE gender_name = ?)
          WHERE product_id = ?
        `;
        const values = [title, description, price, discount, featuredProduct, newArrival, size, color, category, brand, gender, id];
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error("Error updating product:", err);
            return res.status(500).send("Error updating product");
          }
          res.status(200).send("Product updated successfully");
        });
      };

      if (variantResults.length > 0) {
        updateProduct(variantResults[0].variant_id);
      } else {
        db.query(
          "INSERT INTO product_variant (size, color) VALUES (?, ?)",
          [size, color],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error inserting variant:", insertErr);
              return res.status(500).send("Error inserting variant");
            }
            updateProduct(insertResult.insertId);
          }
        );
      }
    }
  );
});

router.delete('/products/:id/dlt', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM products WHERE product_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error()
      return res.status(500).send("error while executing delete in database")
    } else {
      res.status(200).send("successfull")
    }
  })
});

export default router;
