const { injectReplacements } = require("sequelize/lib/utils/sql");
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

  getProductByCategoryId: async (idOrName) => {
    try {
      const isNumber = !isNaN(idOrName);

      const [rows] = await database.query(
        `
      SELECT 
        c.id AS category_id, 
        c.category_name,
        p.id AS product_id, 
        p.product_code, 
        p.product_name,
        p.product_price, 
        p.status, 
        p.description, 
        p.image,
        b.brand_name
      FROM category c
      LEFT JOIN products p ON c.id = p.category_id AND p.status = 1
      LEFT JOIN brand b ON p.brand_id = b.id
      WHERE ${isNumber ? "c.id = :value" : "c.category_name = :value"}
      `,
        { replacements: { value: idOrName } },
      );
      return rows;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getAllCategory: async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const [rows] = await database.query(
        `SELECT ROW_NUMBER() OVER (ORDER BY id) as serial, id, category_name FROM category
        LIMIT ${limit} OFFSET ${offset}`,
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
