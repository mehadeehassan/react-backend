const database = require("../Config/database");

const BrandRepository = {
  createBrand: async (req) => {
    try {
      return await database.query(
        `INSERT INTO brand (brand_name) VALUES ('${req.body.brand_name}')`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  updateBrand: async (req) => {
    try {
      return await database.query(
        `UPDATE brand SET brand_name = '${req.body.brand_name}' WHERE id = ${req.body.id}`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  deleteBrand: async (req) => {
    try {
      return await database.query(
        `DELETE FROM brand WHERE id = ${req.params.id}`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getAllBrand: async () => {
    try {
      const [rows] = await database.query(
        `SELECT ROW_NUMBER() OVER (ORDER BY id) as serial, id, brand_name FROM brand`,
      );
      return rows;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getBrandCount: async () => {
    try {
      const [rows] = await database.query(
        `SELECT COUNT(*) as total FROM brand`,
      );
      return rows[0].total;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = BrandRepository;
