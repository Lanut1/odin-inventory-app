const pool = require("./pool");

async function getProductByID(id) {
  const { rows } = await pool.query(`
    SELECT p.*,
      b.name AS brand_name,
      c.name AS category_name,
      s.name AS skintype_name
    FROM products p
    JOIN brand b ON p.brand_id = b.id
    JOIN category c ON p.category_id = c.id
    JOIN skintype s ON p.skintype_id = s.id
    WHERE p.id = $1;`,
    [id]
  );

  return rows[0];
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

async function getProducts(brands, categories, skintypes) {
  const queryParams = [];
  const whereConditions = [];
  let paramCounter = 1;

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

  const whereClause = whereConditions.length > 0 
    ? `WHERE ${whereConditions.join(' AND ')}` 
    : '';

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
  getProductByID,
  getAllBrands,
  getAllCategories,
  getAllSkintypes,
  getProducts
}