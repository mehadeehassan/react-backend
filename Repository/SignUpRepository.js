const database = require("../Config/database");

const SignUpRepository = {
  checkUserIsExistByEmail: async (email) => {
    try {
      const [rows] = await database.query(
        `SELECT * FROM users WHERE email = '${email}'`,
      );
      return rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },

  checkEmailForUpdate: async (email, id) => {
    try {
      const [rows] = await database.query(
        `SELECT * FROM users WHERE email = '${email}' AND id != ${parseInt(id)}`,
      );
      return rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createSignUp: async (req) => {
    const status = req.body.status ?? 1;
    try {
      return await database.query(
        `INSERT INTO users (name, email, password, status) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}', ${status})`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  updateUser: async (req) => {
    try {
      const query = req.body.password
        ? `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', password = '${req.body.password}', status = ${req.body.status} WHERE id = ${req.params.id}`
        : `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', status = ${req.body.status} WHERE id = ${req.params.id}`;
      return await database.query(query);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  deleteUser: async (id) => {
    try {
      return await database.query(`DELETE FROM users WHERE id = ${id}`);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getUserById: async (id) => {
    try {
      return await database.query(`SELECT * FROM users WHERE id = ${id}`);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getAllUserLimit: async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      return await database.query(
        `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getUserCount: async () => {
    try {
      const [rows] = await database.query(
        `SELECT COUNT(*) as total FROM users`,
      );
      return rows[0].total;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = SignUpRepository;
