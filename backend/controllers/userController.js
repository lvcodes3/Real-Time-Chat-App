const db = require("../db/db"); // PGSQL DB connection
const bcrypt = require("bcrypt"); // bcrypt for password

// register a user from the register form page
module.exports.register = async (req, res, next) => {
  // get input data from req.body
  const { username, email, password } = req.body;

  try {
    // 1. check if username already exists in the db
    const usernameCheck = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (usernameCheck.rowCount !== 0) {
      return res.json({
        msg: "Username already exists in the db.",
        status: false,
      });
    }

    // 2. check if email already exists in the db
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rowCount !== 0) {
      return res.json({
        msg: "Email already exists in the db.",
        status: false,
      });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. insert user in the db
    const user = await db.query(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    // 5. modify returned user obj
    delete user.rows[0].id;
    delete user.rows[0].password;
    delete user.rows[0].is_avatar_image_set;
    delete user.rows[0].avatar_image;

    // 6. return user data to frontend
    return res.json({
      status: true,
      data: user.rows[0],
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
