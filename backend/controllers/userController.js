const db = require("../db/db"); // PGSQL DB connection
const bcrypt = require("bcrypt"); // bcrypt for password

module.exports.register = async (req, res, next) => {
  try {
    // get input data from req.body
    const { username, email, password } = req.body;

    // 1. check if username already exists in the db
    const usernameCheck = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (usernameCheck.rowCount !== 0) {
      return res.json({
        status: false,
        msg: "Username already exists in the db.",
      });
    }

    // 2. check if email already exists in the db
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rowCount !== 0) {
      return res.json({
        status: false,
        msg: "Email already exists in the db.",
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
    delete user.rows[0].password;

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

module.exports.login = async (req, res, next) => {
  try {
    // get input data from req.body
    const { username, password } = req.body;

    // 1. check if username does not exist in the db
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rowCount === 0) {
      return res.json({
        status: false,
        msg: "Incorrect username or password.",
      });
    }

    // 2. check if password is valid
    const dbPassword = await db.query(
      "SELECT password from users WHERE username = $1",
      [username]
    );
    const isValidPassword = await bcrypt.compare(
      password,
      dbPassword.rows[0].password
    );
    if (!isValidPassword) {
      return res.json({
        status: false,
        msg: "Incorrect username or password.",
      });
    }

    // 3. modify returned user obj
    delete user.rows[0].password;

    // 4. return user data to frontend
    return res.json({
      status: true,
      data: user.rows[0],
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const avatarImage = req.body.image;

    // update the user
    const userData = await db.query(
      "UPDATE users SET avatar_image = $1, is_avatar_image_set = $2 WHERE id = $3 RETURNING *",
      [avatarImage, true, id]
    );

    // send back confirmation
    return res.json({
      isSet: userData.rows[0].is_avatar_image_set,
      image: userData.rows[0].avatar_image,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
