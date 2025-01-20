const db = require("../db/queries");
require('dotenv').config();

async function indexPageGet(req, res, next) {
  try {
    let user = null;
 
    if (req.isAuthenticated()) {
      user = req.user;
    }
  
    const favouriteProducts = await db.getFavouriteProducts();
  
    res.render("index", {user, favouriteProducts});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  indexPageGet
}