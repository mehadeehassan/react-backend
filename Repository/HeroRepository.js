const database = require("../Config/database");

const HeroRepository = {
  createSlide: async (req) => {
    try {
      const imagePath = req.file ? req.file.filename : null;
      if (!imagePath) {
        return { error: true, message: "Image is required" };
      }
      const categoryId = req.body.category_id ? req.body.category_id : "NULL";
      return await database.query(
        `INSERT INTO hero_slides (title, description, image, button_text, category_id, sort_order, status)
         VALUES ('${req.body.title}', '${req.body.description}', '${imagePath}', '${req.body.button_text}', ${categoryId}, ${req.body.sort_order || 0}, '${req.body.status || "active"}')`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getAllSlides: async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const [rows] = await database.query(`
        SELECT h.*, c.category_name
        FROM hero_slides h
        LEFT JOIN category c ON h.category_id = c.id
        ORDER BY h.sort_order ASC
      LIMIT ${limit} OFFSET ${offset}`
      );
      return rows;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  getActiveSlides: async () => {
    try {
      const [rows] = await database.query(`
        SELECT h.*, c.category_name
        FROM hero_slides h
        LEFT JOIN category c ON h.category_id = c.id
        WHERE h.status = 'active'
        ORDER BY h.sort_order ASC
      `);
      return rows;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  getSlideById: async (id) => {
    try {
      const [rows] = await database.query(
        `SELECT * FROM hero_slides WHERE id = ${id}`,
      );
      return rows;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  updateSlide: async (req) => {
    try {
      const imagePath = req.file ? req.file.filename : null;
      const categoryId = req.body.category_id ? req.body.category_id : "NULL";
      const query = imagePath
        ? `UPDATE hero_slides SET title='${req.body.title}', description='${req.body.description}', image='${imagePath}', button_text='${req.body.button_text}', category_id=${categoryId}, sort_order=${req.body.sort_order || 0}, status='${req.body.status}' WHERE id=${req.body.id}`
        : `UPDATE hero_slides SET title='${req.body.title}', description='${req.body.description}', button_text='${req.body.button_text}', category_id=${categoryId}, sort_order=${req.body.sort_order || 0}, status='${req.body.status}' WHERE id=${req.body.id}`;
      return await database.query(query);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  deleteSlide: async (req) => {
    try {
      return await database.query(
        `DELETE FROM hero_slides WHERE id=${req.params.id}`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  getSlideCount: async () => {
    try {
      const [rows] = await database.query(
        `SELECT COUNT(*) as count FROM hero_slides`,
      );
      return rows[0].count;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = HeroRepository;