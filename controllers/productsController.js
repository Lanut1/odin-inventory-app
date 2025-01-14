const db = require("../db/queries");
require('dotenv').config();
const { validationResult } = require("express-validator");
const getFilters = require("../utils/getFilters");

async function productCardGet(req, res, next) {
  try {
    const productID = parseInt(req.params.id);
    let user = null;

    if (isNaN(productID)) throw new Error('Invalid product ID');

    const [product, reviews] = await Promise.all([
      db.getProductByID(productID),
      db.getProductReviews(productID)
    ]);

    if (req.isAuthenticated()){
      user = req.user;
    }

    res.render("productCard", {
      product,
      user,
      reviews,
      errors: null
    });
  } catch (error) {
    next(error);
  }
}

async function productCardDelete(req, res, next) {
  try {
    if (!req.isAuthenticated() || req.user.status !== "admin") throw new Error("Please log in as admin user");

    const productID = parseInt(req.params.id);

    if (isNaN(productID)) throw new Error('Invalid product ID');

    await db.deleteProduct(productID);
    res.redirect("/products");
  } catch (error) {
    next(error);
  }
}

async function productsGet(req, res, next) {
  try {
    const { brand, category, skintype } = req.query;

    const filterBrands = getFilters(brand);
    const filterCategories = getFilters(category);
    const filterSkintypes = getFilters(skintype);

    const [brands, categories, skintypes, products] = await Promise.all([
      db.getAllBrands(),
      db.getAllCategories(),
      db.getAllSkintypes(),
      db.getProducts(filterBrands, filterCategories, filterSkintypes)
    ]);

    let user = null;

    if (req.isAuthenticated()){
      user = req.user;
    }

    res.render("products", {
      products,
      brands,
      categories,
      skintypes,
      filters: {
        brands: filterBrands,
        categories: filterCategories,
        skintypes: filterSkintypes
      },
      user
    });
    
  } catch (error) { 
    next(error);
  }
}

async function productsPost(req, res, next) {
  try {
    if (!req.isAuthenticated() || req.user.status !== "admin" ) throw new Error("Please log in as admin user");

    const {
      name,
      description,
      photo_url,
      brand_name,
      category_name,
      skintype_name,
      newBrandText, 
      newCategoryText, 
      newSkintypeText
    } = req.body;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const [brands, categories, skintypes] = await Promise.all([
        db.getAllBrands(),
        db.getAllCategories(),
        db.getAllSkintypes()
      ]);

      return res.status(400).render("productForm", {
        brands,
        categories,
        skintypes,
        product: req.body,
        errors: errors.array(),
        user: req.user
      })
    }

    const [brandID, categoryID, skintypeID] = await Promise.all([
      newBrandText ? db.addNewBrand(newBrandText) : db.getBrandIDByName(brand_name),
      newCategoryText ? db.addNewCategory(newCategoryText) : db.getCategoryIDByName(category_name),
      newSkintypeText ? db.addNewSkintype(newSkintypeText) : db.getSkintypeIDByName(skintype_name)
    ]);
 
    const newProduct = {
      name,
      description,
      photo_url,
      brand_id: brandID.id,
      category_id: categoryID.id,
      skintype_id: skintypeID.id
    }

    if (req.method === "PUT" && req.params.id) {
      await db.updateProduct(req.params.id, newProduct);
    } else {
      await db.addNewProduct(newProduct);
    }   
    
    res.redirect("/products");
  } catch (error) {
    next(error);
  }
} 

async function productReviewPost(req, res, next) {
  try {
    const errors = validationResult(req);

    const productID = parseInt(req.params.id);
    if (isNaN(productID)) throw new Error('Invalid product ID');

    const user = req.user;

    if (!errors.isEmpty()) {
      const [product, reviews] = await Promise.all([
        db.getProductByID(productID),
        db.getProductReviews(productID)
      ]);

      return res.status(500).render("productCard", {
        product,
        user,
        reviews,
        errors: errors.array()
      });
    }

    const newReview = {
      message: req.body.review,
      userID: user.id,
      productID
    }

    await db.addProductReview(newReview);

    res.redirect(`/products/${productID}`);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  productsGet,
  productsPost,
  productCardGet,
  productCardDelete,
  productReviewPost
}