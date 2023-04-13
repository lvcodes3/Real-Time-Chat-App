/////////////////////////////////////////
// ESTABLISHING CONNECTION TO PGSQL DB //
/////////////////////////////////////////
const { Pool } = require("pg");
require("dotenv").config();

// bc of defined PG env variables, no parameters required in Pool()
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
