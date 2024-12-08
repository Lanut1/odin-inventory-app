const db = require("../db/queries");

function indexPageGet(req, res) {
  res.render("index");
}

async function productsGet(req, res) {
  try {
    const products = await db.getAllProducts();
    const brands = await db.getAllBrands();
    const categories = await db.getAllCategories();
    const skintypes = await db.getAllSkintypes();

    res.render("products", {
      products,
      brands,
      categories,
      skintypes,
      filters: {}
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).render('error', { 
      message: 'Unable to fetch products', 
      error: error.message
    });
  }
}

async function filteredProductsGet(req, res) {
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
    const products = await db.getFilteredProducts(filterBrands, filterCategories, filterSkintypes);

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
    console.error('Error fetching products:', error);
    res.status(500).render('error', { 
      message: 'Unable to fetch products', 
      error: error.message
    });
  }
}

module.exports = {
  indexPageGet,
  productsGet,
  filteredProductsGet
}