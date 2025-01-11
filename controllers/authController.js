const db = require("../db/queries");
require('dotenv').config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

function registerPageGet(req, res) {
  res.render("registrationPage", {
    username: null,
    email: null,
    errors: null
  });
}

async function registerPagePost(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("registrationPage", {
        username,
        email,
        errors: errors.array()
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password_hash: hashedPassword,
      status: "user"
    }

    await db.registerUser(newUser);

    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
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