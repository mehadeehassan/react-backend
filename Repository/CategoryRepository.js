const database = require("../Config/database");

const CategoryRepository = {
  createCategory: async (req) => {
    try {
      return await database.query(
        `INSERT INTO category (category_name) VALUES ('${req.body.category_name}')`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  updateCategory: async (req) => {
    try {
      return await database.query(
        `UPDATE category SET category_name = '${req.body.category_name}' WHERE id = ${req.body.id}`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  deleteCategory: async (req) => {
    try {
      return await database.query(
        `DELETE FROM category WHERE id = ${req.params.id}`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getProductByCategoryId: async (id) => {
    try {
      const [rows] = await database.query(`
        SELECT 
          c.id AS category_id, 
          c.category_name,
          p.id AS product_id, 
          p.product_code, 
          p.product_name,
          p.product_price, 
          p.status, 
          p.description, 
          p.image
        FROM category c
        LEFT JOIN products p ON c.id = p.category_id
        WHERE c.id = ${id}
      `);
      return rows;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getAllCategory: async () => {
    try {
      const [rows] = await database.query(
        `SELECT ROW_NUMBER() OVER (ORDER BY id) as serial, id, category_name FROM category`,
      );
      return rows;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getCategoryCount: async () => {
    try {
      const [rows] = await database.query(
        `SELECT COUNT(*) as total FROM category`,
      );
      return rows[0].total;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = CategoryRepository;
