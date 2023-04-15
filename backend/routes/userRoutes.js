const router = require("express").Router(); // creating instance of express router
const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");

// post route for register: /api/v1/auth/register
router.post("/register", register);

// post route for login: /api/v1/auth/login
router.post("/login", login);

// post route for setAvatar: /api/v1/auth/setAvatar/:id
router.post("/setAvatar/:id", setAvatar);

// get route for users: /api/v1/auth/allUsers/:id
router.get("/allUsers/:id", getAllUsers);

module.exports = router;
