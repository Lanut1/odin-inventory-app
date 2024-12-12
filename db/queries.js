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

async function addNewProduct(newProduct) {
  await pool.query(`
    INSERT INTO products (name, description, photo_url, brand_id, category_id, skintype_id) VALUES
      ($1, $2, $3, $4, $5, $6);
    `, [ newProduct.name, newProduct.description, newProduct.photo_url, newProduct.brand_id, newProduct.category_id, newProduct.skintype_id ]);
}

async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE products.id = $1", [id]);
}

async function getAllBrands() {
  const { rows } = await pool.query("SELECT name FROM brand");
  return rows;
}

async function getBrandIDByName(name) {
  const { rows } = await pool.query("SELECT id FROM brand WHERE brand.name = $1", [name]);
  return rows[0];
}

async function addNewBrand(name) {
  await pool.query("INSERT INTO brand (name) VALUES ($1)", [name]);
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT name FROM category");
  return rows;
}

async function getCategoryIDByName(name) {
  const { rows } = await pool.query("SELECT id FROM category WHERE category.name = $1", [name]);
  return rows[0];
}

async function addNewCategory(name) {
  await pool.query("INSERT INTO category (name) VALUES ($1)", [name]);
}

async function getAllSkintypes() {
  const { rows } = await pool.query("SELECT name FROM skintype");
  return rows;
}

async function getSkintypeIDByName(name) {
  const { rows } = await pool.query("SELECT id FROM skintype WHERE skintype.name = $1", [name]);
  return rows[0];
}

async function addNewSkintype(name) {
  await pool.query("INSERT INTO skintype (name) VALUES ($1)", [name]);
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
  addNewProduct,
  deleteProduct,
  getAllBrands,
  getBrandIDByName,
  addNewBrand,
  getAllCategories,
  getCategoryIDByName,
  addNewCategory,
  getAllSkintypes,
  getSkintypeIDByName,
  addNewSkintype,
  getProducts
}