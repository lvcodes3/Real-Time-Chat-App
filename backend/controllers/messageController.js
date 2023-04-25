const db = require("../db/db"); // PGSQL DB connection

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const response = await db.query(
      "INSERT INTO messages(message, sender_id, receiver_id, send_date) VALUES($1, $2, $3, $4) RETURNING *",
      [message, from, to]
    );
    if (response.rowCount > 0) {
      return res.json({
        msg: "Message added successfully.",
      });
    } else {
      return res.json({
        msg: "Message not added.",
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
