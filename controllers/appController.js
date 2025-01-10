const db = require("../db/queries");
require('dotenv').config();
const { validationResult } = require("express-validator");

function indexPageGet(req, res) {
  res.render("index");
}

async function productCardGet(req, res, next) {
  try {
    const productID = parseInt(req.params.id);

    if (isNaN(productID)) throw new Error('Invalid product ID');

    const product = await db.getProductByID(productID);
    res.render("productCard", {product});
  } catch (error) {
    next(error);
  }
}

async function productCardDelete(req, res, next) {
  try {
    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) throw new Error("Please enter valid admin password!");

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
    const filterBrands = req.query.brand ? 
      (Array.isArray(req.query.brand) ? req.query.brand : [req.query.brand]) 
      : [];

    const filterCategories = req.query.category ? 
      (Array.isArray(req.query.category) ? req.query.category : [req.query.category]) 
      : [];
    const filterSkintypes = req.query.skintype ? 
      (Array.isArray(req.query.skintype) ? req.query.skintype : [req.query.skintype]) 
      : [];

    const brands = await db.getAllBrands();
    const categories = await db.getAllCategories();
    const skintypes = await db.getAllSkintypes();
    const products = await db.getProducts(filterBrands, filterCategories, filterSkintypes);

    res.render("products", {
      products,
      brands,
      categories,
      skintypes,
      filters: {
        brands: filterBrands,
        categories: filterCategories,
        skintypes: filterSkintypes
      }
    });
    
  } catch (error) { 
    next(error);
  }
}

async function productFormGet(req, res, next) {
  try {
    const brands = await db.getAllBrands();
    const categories = await db.getAllCategories();
    const skintypes = await db.getAllSkintypes();
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

async function productsPost(req, res, next) {
  try {
    let { password, name, description, photo_url, brand_name, category_name, skintype_name } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) throw new Error("Please enter valid admin password!");

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).render("productForm", {
        brands: await db.getAllBrands(),
        categories: await db.getAllCategories(),
        skintypes: await db.getAllSkintypes(),
        product: req.body,
        errors: errors.array()
      })
    }

    if (req.body.newBrandText) {
      brand_name = req.body.newBrandText;
      await db.addNewBrand(brand_name);
    }

    const brandID = await db.getBrandIDByName(brand_name);
 
    if (req.body.newCategoryText) {
      category_name = req.body.newCategoryText;
      await db.addNewCategory(category_name);
    }

    const categoryID = await db.getCategoryIDByName(category_name);

    if (req.body.newSkintypeText) {
      skintype_name = req.body.newSkintypeText;
      await db.addNewSkintype(skintype_name);
    }

    const skintypeID = await db.getSkintypeIDByName(skintype_name);
 
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

module.exports = {
  indexPageGet,
  productsGet,
  productsPost,
  productCardGet,
  productCardDelete,
  productFormGet
}