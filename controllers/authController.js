const db = require("../db/queries");
require('dotenv').config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("../middleware/passportConfig");

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
  res.render("loginPage", {
    username: null,
    errors: null
  });
}

async function loginPagePost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("loginPage", {
        errors: errors.array(),
        username: req.body.username,
      });
    }
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).render("loginPage", {
          errors: [{ msg: info.message }],
          username: req.body.username,
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

module.exports = {
  registerPageGet,
  registerPagePost,
  loginPageGet,
  loginPagePost
}