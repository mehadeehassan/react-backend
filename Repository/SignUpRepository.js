const database = require("../Config/database");

const SignUpRepository = {
  //check user is exist
  checkUserIsExistByEmail: async (email) => {
    const [rows] = await database.query(
      `SELECT * FROM users WHERE email = '${email}'`,
    );
    return rows[0];
  },

  //check email for update
  checkEmailForUpdate: async (email, id) => {
    const [rows] = await database.query(
      `SELECT * FROM users WHERE email = '${email}' AND id != ${id}`,
    );
    return rows[0];
  },

  //create user
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

  //update user
  editorUser: async (req) => {
    try {
      return await database.query(
        `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', password = '${req.body.password}' WHERE id = ${req.body.id}`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
};

module.exports = SignUpRepository;
