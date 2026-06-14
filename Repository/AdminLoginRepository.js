const database = require("../Config/database");

const AdminLoginRepository = {
  findAdminByEmail: async (email) => {
    try {
      const [rows] = await database.query(
        `SELECT * FROM users WHERE email = '${email}'`
      );
      return rows[0];
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
};

module.exports = AdminLoginRepository;