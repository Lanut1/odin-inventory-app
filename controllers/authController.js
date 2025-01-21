const db = require("../db/queries");
require('dotenv').config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("../middleware/passportConfig");

function registerPageGet(req, res) {
  if (req.isAuthenticated()) throw new Error("PLease log out from your current account!");

  res.render("registrationPage", {
    username: null,
    email: null,
    errors: null,
    user: null
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
        errors: errors.mapped(),
        user: null
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
  if (req.isAuthenticated()) throw new Error("PLease log out from your current account!");

  res.render("loginPage", {
    username: null,
    authError: null,
    errors: null,
    user: null
  });
}

async function loginPagePost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("loginPage", {
        authError: null,
        errors: errors.mapped(),
        username: req.body.username,
        user: null
      });
    }
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).render("loginPage", {
          authError: {msg: info.message},
          errors: null,
          username: req.body.username,
          user: null
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.redirect("/products");
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
}

async function logoutGet(req, res, next) {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerPageGet,
  registerPagePost,
  loginPageGet,
  loginPagePost,
  logoutGet
}