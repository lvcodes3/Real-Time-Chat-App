const router = require("express").Router(); // creating instance of express router
const { register } = require("../controllers/userController");

// post route for register: /api/v1/auth/register
router.post("/register", register);

module.exports = router;
