const database = require("../Config/database");

const SignUpRepository = {
  checkUserIsExistByEmail: async (email) => {
    const [rows] = await database.query(
      `SELECT * FROM users WHERE email = '${email}'`,
    );
    return rows[0];
  },
  createSignUp: async (req) => {
    try {
      return await database.query(
        `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
};

module.exports = SignUpRepository;
