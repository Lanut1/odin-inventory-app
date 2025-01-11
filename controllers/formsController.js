const db = require("../db/queries");
require('dotenv').config();

async function productFormGet(req, res, next) {
  try {
    const [brands, categories, skintypes] = await Promise.all([
      db.getAllBrands(),
      db.getAllCategories(),
      db.getAllSkintypes()
    ]);

    let product = null;
    const errors = null;

    if (req.params.id) {
      product = await db.getProductByID(req.params.id);
    }

    res.render("productForm", {brands, categories, skintypes, product, errors});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  productFormGet
}