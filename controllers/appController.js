const db = require("../db/queries");
require('dotenv').config();

function indexPageGet(req, res) {
  let user = null;

  if (req.isAuthenticated()) {
    user = req.user;
  }

  res.render("index", {user});
}

module.exports = {
  indexPageGet
}