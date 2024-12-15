const db = require("../db/queries");

function indexPageGet(req, res) {
  res.render("index");
}

async function productCardGet(req, res) {
  try {
    const productID = parseInt(req.params.id);
    const product = await db.getProductByID(productID);
    res.render("productCard", {product});
  } catch (error) {
    console.error('Error fetching product info:', error);
    res.status(500).render('error', { 
      message: 'Unable to fetch product info', 
      error: error.message
    });
  }
}

// async function productCardPut(req, res) {
//   try {
//     const productID = parseInt(req.params.id);

//   } catch (error) {
//     console.error('Error updating product card:', error);
//     res.status(500).render('error', { 
//       message: 'Unable to update product', 
//       error: error.message
//     });
//   }
// }

async function productCardDelete(req, res) {
  try { 
    const productID = parseInt(req.params.id);
    await db.deleteProduct(productID);
    res.redirect("/products");
  } catch (error) {
    console.error('Error deleting product card:', error);
    res.status(500).render('error', { 
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
    res.status(500).render('error', { 
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

    if (req.params.id) {
      product = await db.getProductByID(req.params.id);
    }

    res.render("productForm", {brands, categories, skintypes, product});
  } catch (error) {
    console.error('Error opening new product form:', error);
    res.status(500).render('error', { 
      message: 'Unable to open product form', 
      error: error.message
    });
  }
}

async function productsPost(req,res) {
  try {
    let { name, description, photo_url, brand, category, skintype } = req.body;

    if (req.body.newBrandText) {
      brand = req.body.newBrandText;
      await db.addNewBrand(brand);
    }

    const brandID = await db.getBrandIDByName(brand);
 
    if (req.body.newCategoryText) {
      category = req.body.newCategoryText;
      await db.addNewCategory(category);
    }

    const categoryID = await db.getCategoryIDByName(category);

    if (req.body.newSkintypeText) {
      skintype = req.body.newSkintypeText;
      await db.addNewSkintype(skintype);
    }

    const skintypeID = await db.getSkintypeIDByName(skintype);
 
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
    res.status(500).render('error', { 
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