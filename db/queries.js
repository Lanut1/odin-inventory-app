const pool = require("./pool");

async function getAllProducts() {
  const { rows } = await pool.query(`
    SELECT p.*,
      b.name AS brand_name,
      c.name AS category_name,
      s.name AS skintype_name
    FROM products p
    JOIN brand b ON p.brand_id = b.id
    JOIN category c ON p.category_id = c.id
    JOIN skintype s ON p.skintype_id = s.id;
  `);

  return rows;
}

async function getProductByID(id) {
  return await pool.query("SELECT * FROM products WHERE products.id = $1", [id]);
}

async function getAllBrands() {
  const { rows } = await pool.query("SELECT name FROM brand");
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT name FROM category");
  return rows;
}

async function getAllSkintypes() {
  const { rows } = await pool.query("SELECT name FROM skintype");
  return rows;
}

async function getFilteredProducts(brands, categories, skintypes) {
  // Create an array of parameters to pass to the query
  const queryParams = [];
  const whereConditions = [];
  let paramCounter = 1;

  // Build dynamic WHERE conditions based on non-empty arrays
  if (brands && brands.length > 0) {
    whereConditions.push(`b.name = ANY($${paramCounter})`);
    queryParams.push(brands);
    paramCounter++;
  }

  if (categories && categories.length > 0) {
    whereConditions.push(`c.name = ANY($${paramCounter})`);
    queryParams.push(categories);
    paramCounter++;
  }

  if (skintypes && skintypes.length > 0) {
    whereConditions.push(`s.name = ANY($${paramCounter})`);
    queryParams.push(skintypes);
    paramCounter++;
  }

  // Construct the final WHERE clause
  const whereClause = whereConditions.length > 0 
    ? `WHERE ${whereConditions.join(' AND ')}` 
    : '';

  // Execute the query
  const { rows } = await pool.query(`
    SELECT p.*,
      b.name AS brand_name,
      c.name AS category_name,
      s.name AS skintype_name
    FROM products p
    JOIN brand b ON p.brand_id = b.id
    JOIN category c ON p.category_id = c.id
    JOIN skintype s ON p.skintype_id = s.id
    ${whereClause};`,
    queryParams
  );

  return rows;
}

module.exports = {
  getAllProducts,
  getProductByID,
  getAllBrands,
  getAllCategories,
  getAllSkintypes,
  getFilteredProducts
}