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
    const role = req.body.role ?? "user";
    const permissions = JSON.stringify(req.body.permissions ?? []);
    try {
      return await database.query(
        `INSERT INTO users (name, email, password, status, role, permissions) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}', ${status}, '${role}', '${permissions}')`,
      );
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  updateUser: async (req) => {
    const role = req.body.role ?? "user";
    const permissions = JSON.stringify(req.body.permissions ?? []);
    try {
      const query = req.body.password
        ? `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', password = '${req.body.password}', status = ${req.body.status}, role = '${role}', permissions = '${permissions}' WHERE id = ${req.params.id}`
        : `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', status = ${req.body.status}, role = '${role}', permissions = '${permissions}' WHERE id = ${req.params.id}`;
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
