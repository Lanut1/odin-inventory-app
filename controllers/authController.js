const db = require("../db/queries");
require('dotenv').config();

function registerPageGet(req, res) {
  res.render("registrationPage");
}

async function registerPagePost(req, res) {

}

function loginPageGet(req, res) {
  res.render("loginPage");
}

async function loginPagePost(req, res) {

}


module.exports = {
  registerPageGet,
  registerPagePost,
  loginPageGet,
  loginPagePost
}