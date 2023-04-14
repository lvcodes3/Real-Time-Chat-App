const router = require("express").Router(); // creating instance of express router
const { register, login } = require("../controllers/userController");

// post route for register: /api/v1/auth/register
router.post("/register", register);

// post route for login: /api/v1/auth/login
router.post("/login", login);

module.exports = router;
