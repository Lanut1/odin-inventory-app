const db = require("../db/queries");
require('dotenv').config();

function indexPageGet(req, res) {
  res.render("index");
}

module.exports = {
  indexPageGet
}