const database = require("../Config/database");

const ProductsListRepository = {
  createProduct: async (req) => {
    try {
      const imagePath = req.file ? req.file.path : null;
      return await database.query(
        `INSERT INTO products (product_code, product_name, category_id, brand_id, status, description, image) 
       VALUES ('${req.body.product_code}', '${req.body.product_name}', ${req.body.category_id}, ${req.body.brand_id}, ${req.body.status}, '${req.body.description}', '${imagePath}')`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
  getAllProduct: async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const [rows] = await database.query(`
      SELECT ROW_NUMBER() OVER (ORDER BY p.id) as serial,
        p.id, p.product_code, p.product_name, p.status, p.description, p.image,
        p.category_id, p.brand_id,
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
      const imagePath = req.file ? req.file.path : null;
      const query = imagePath
        ? `UPDATE products SET product_code='${req.body.product_code}', product_name='${req.body.product_name}', category_id=${req.body.category_id}, brand_id=${req.body.brand_id}, status=${req.body.status}, description='${req.body.description}', image='${imagePath}' WHERE id=${req.body.id}`
        : `UPDATE products SET product_code='${req.body.product_code}', product_name='${req.body.product_name}', category_id=${req.body.category_id}, brand_id=${req.body.brand_id}, status=${req.body.status}, description='${req.body.description}' WHERE id=${req.body.id}`;
      return await database.query(query);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  deleteProduct: async (req) => {
    try {
      return await database.query(
        `DELETE FROM products WHERE id=${req.params.id}`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
};

module.exports = ProductsListRepository;
