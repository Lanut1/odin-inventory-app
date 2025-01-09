const db = require("../db/queries");
require('dotenv').config();
const { validationResult } = require("express-validator");

function indexPageGet(req, res) {
  res.render("index");
}

async function productCardGet(req, res) {
  try {
    const productID = parseInt(req.params.id);

    if (isNaN(productID)) throw new Error('Invalid product ID');

    const product = await db.getProductByID(productID);
    res.render("productCard", {product});
  } catch (error) {
    console.error('Error fetching product info:', error);
    res.status(500).render('errorPage', { 
      message: 'Unable to fetch product info', 
      error: error.message
    });
  }
}

async function productCardDelete(req, res) {
  try {
    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) throw new Error("Please enter valid admin password!");

    const productID = parseInt(req.params.id);

    if (isNaN(productID)) throw new Error('Invalid product ID');

    await db.deleteProduct(productID);
    res.redirect("/products");
  } catch (error) {
    console.error('Error deleting product card:', error);
    res.status(500).render('errorPage', { 
      message: 'Unable to delete product', 
      error: error.message
    });
  }
}

async function productsGet(req, res) {
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
    console.error('Error fetching filtered products:', error);
    res.status(500).render('errorPage', { 
      message: 'Unable to fetch products', 
      error: error.message
    });
  }
}

async function productFormGet(req, res) {
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
    console.error('Error opening new product form:', error);
    res.status(500).render('errorPage', { 
      message: 'Unable to open product form', 
      error: error.message
    });
  }
}

async function productsPost( req, res) {
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
    console.error('Error adding new product:', error);
    res.status(500).render('errorPage', { 
      message: 'Unable to add new product', 
      error: error.message
    });
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