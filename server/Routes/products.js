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
    product_tags.tag_name AS tag,
    product_variant.size,
    product_variant.color,
    product_images.image_url AS image_url,
    product_images.image_alt AS image_alt
FROM
    products
JOIN product_categories ON products.category_id = product_categories.category_id
JOIN product_brand ON products.brand_id = product_brand.brand_id
JOIN product_gender ON products.gender_id = product_gender.gender_id
LEFT JOIN product_tags ON products.tag_id = product_tags.tag_id
JOIN product_variant ON products.variant_id = product_variant.variant_id
JOIN product_images ON products.image_id = product_images.image_id
`

//get all products
router.get('/products',(req,res)=>{
    db.query(productSql, (err,results)=>{
        if(err){
            console.error('Error fetching products: ', err);
            return res.status(500).send('Error fetching products');
        }
        res.json(results)
    })
});

router.get('/products/:id',(req,res)=>{
    const sql = `${productSql} WHERE products.product_id = ?`
    db.query(sql,[req.params.id],(err,results)=>{
        if(err){
            console.error('Error fetching product: ', err);
            return res.status(500).send('Error fetching product');
        }
        if (results.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.json(results[0]);
    })
});

// router.post('/products/add',(req,res)=>{

// });
// router.put();
// router.delete();

export default router;