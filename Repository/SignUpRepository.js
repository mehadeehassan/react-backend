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

  //user registration
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

  //update user by id
  updateUser: async (req) => {
    try {
      return await database.query(
        `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', password = '${req.body.password}' WHERE id = ${req.body.id}`,
      );
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  //Delete user by id
  deleteUser: async (id) => {
    //console.log(id);
    try {
      return await database.query(`DELETE FROM users WHERE id = ${id}`);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  //get user by id
  getUserById: async (id) => {
    try {
      return await database.query(`SELECT * FROM users WHERE id = ${id}`);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },
  //get all user limit
  getAllUserLimit: async () => {
    try {
      return await database.query(`SELECT * FROM users LIMIT 20`);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  // //get all user
  // getAllUser: async () => {
  //   try {
  //     return await database.query(`SELECT * FROM users`);
  //   } catch (error) {
  //     console.log(error.message);
  //     return [];
  //   }
  // },
};

module.exports = SignUpRepository;
