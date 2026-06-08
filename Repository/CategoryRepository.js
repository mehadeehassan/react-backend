const database = require("../Config/database");

//add category repository
const CategoryRepository = {
  createCategory: async (req) => {
    try {
      return await database.query(
        `INSERT INTO category (category_name) VALUES ('${req.body.category_name}')`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
  //update category repository
  updateCategory: async (req) => {
    try {
      return await database.query(
        `UPDATE category SET category_name = '${req.body.category_name}' WHERE id = ${req.body.id}`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
  //delete category repository
  deleteCategory: async (req) => {
    try {
      return await database.query(
        `DELETE FROM category WHERE id = ${req.params.id}`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  //get all category repository
  getAllCategory: async () => {
  try {
    const [rows] = await database.query(
      `SELECT ROW_NUMBER() OVER (ORDER BY id) as serial, id, category_name FROM category`
    );
    return rows;
  } catch (error) {
    console.log(error.message);
    return [];
  }
},
  //total category count
  getCategoryCount: async () => {
    try {
      const [rows] = await database.query(
        `SELECT COUNT(*) as total FROM category`,
      );
      return rows[0].total;
    } catch (error) {
      return 0;
    }
  },
};

module.exports = CategoryRepository;
