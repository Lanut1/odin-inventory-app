const db = require("../db/queries");
require('dotenv').config();

async function productFormGet(req, res, next) {
  try {
    if (!req.isAuthenticated() || req.user.status !== "admin") throw new Error("Please log in as admin user");
    
    const [brands, categories, skintypes] = await Promise.all([
      db.getAllBrands(),
      db.getAllCategories(),
      db.getAllSkintypes()
    ]);

    let product = null;
    const errors = null;
    let user = null;

    if (req.isAuthenticated()) {
      user = req.user;
    }

    if (req.params.id) {
      product = await db.getProductByID(req.params.id);
    }

    res.render("productForm", {brands, categories, skintypes, product, errors, user});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  productFormGet
}