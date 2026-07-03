const database = require("../Config/database");

const ProductsListRepository = {
  createProduct: async (req) => {
    try {
      const imagePath = req.file ? req.file.filename : null;
      if (!imagePath) {
        return { error: true, message: "Image is required" };
      }
      return await database.query(
        `INSERT INTO products (product_code, product_name, product_price ,category_id, brand_id, status, description, image,  discount_percentage, is_on_sale) 
       VALUES ('${req.body.product_code}','${req.body.product_name}',  '${req.body.product_price}', ${req.body.category_id}, ${req.body.brand_id}, ${req.body.status}, '${req.body.description}', '${imagePath}', ${req.body.discount_percentage}, ${req.body.is_on_sale})`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  getAllProduct: async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const [rows] = await database.query(`
      SELECT ROW_NUMBER() OVER (ORDER BY p.id) as serial,
        p.id, p.product_code, p.product_name, p.product_price, p.status, p.description, p.image,
        p.category_id, p.brand_id, p.discount_percentage, p.is_on_sale,
        c.category_name, b.brand_name
      FROM products p
      LEFT JOIN category c ON p.category_id = c.id
      LEFT JOIN brand b ON p.brand_id = b.id
      LIMIT ${limit} OFFSET ${offset}
    `);
      return rows;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  getProductCount: async () => {
    try {
      const [rows] = await database.query(
        `SELECT COUNT(*) as total FROM products`,
      );
      return rows[0].total;
    } catch (error) {
      return 0;
    }
  },

  updateProduct: async (req) => {
    try {
      const imagePath = req.file ? req.file.filename : null;
      const query = imagePath
        ? `UPDATE products SET product_code='${req.body.product_code}', product_name='${req.body.product_name}', product_price='${req.body.product_price}' ,category_id=${req.body.category_id}, brand_id=${req.body.brand_id}, status=${req.body.status}, description='${req.body.description}', image='${imagePath}', discount_percentage=${req.body.discount_percentage}, is_on_sale=${req.body.is_on_sale} WHERE id=${req.body.id}`
        : `UPDATE products SET product_code='${req.body.product_code}', product_name='${req.body.product_name}', product_price='${req.body.product_price}' ,category_id=${req.body.category_id}, brand_id=${req.body.brand_id}, status=${req.body.status}, description='${req.body.description}', discount_percentage=${req.body.discount_percentage}, is_on_sale=${req.body.is_on_sale} WHERE id=${req.body.id}`;
      return await database.query(query);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  deleteProduct: async (req) => {
    try {
      return await database.query(
        `DELETE FROM products WHERE id=${req.params.id}`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  getDiscountedProductsByCategory: async (idOrName) => {
    try {
      const isNumber = !isNaN(idOrName);
      const [rows] = await database.query(
        `
        SELECT 
          c.id AS category_id, c.category_name,
          p.id AS product_id, p.product_code, p.product_name,
          p.product_price, p.discount_percentage,
          ROUND(p.product_price - (p.product_price * p.discount_percentage / 100), 2) AS discounted_price,
          p.status, p.description, p.image,
          b.brand_name
        FROM category c
        LEFT JOIN products p ON c.id = p.category_id
        LEFT JOIN brand b ON p.brand_id = b.id
        WHERE ${isNumber ? "c.id = :value" : "c.category_name = :value"}
          AND p.discount_percentage > 0
          AND p.is_on_sale = TRUE
        `,
        { replacements: { value: idOrName } },
      );
      return rows;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getAllDiscountedProducts: async () => {
    try {
      const [rows] = await database.query(`
        SELECT 
          p.id AS product_id, p.product_code, p.product_name,
          p.product_price, p.discount_percentage,
          ROUND(p.product_price - (p.product_price * p.discount_percentage / 100), 2) AS discounted_price,
          p.status, p.description, p.image,
          b.brand_name, c.category_name
        FROM products p
        LEFT JOIN brand b ON p.brand_id = b.id
        LEFT JOIN category c ON p.category_id = c.id
        WHERE p.discount_percentage > 0 AND p.is_on_sale = TRUE
        ORDER BY p.discount_percentage DESC
      `);
      return rows;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};

module.exports = ProductsListRepository;
