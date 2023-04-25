const router = require("express").Router(); // creating instance of express router
const {
  addMessage,
  getAllMessages,
} = require("../controllers/messageController");

// post route for addMessage: /api/v1/messages/addMessage
router.post("/addMessage", addMessage);

// post route for getMessages: /api/v1/messages/getMessages
router.post("/getMessages", getAllMessages);

module.exports = router;
