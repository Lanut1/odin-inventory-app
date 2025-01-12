const pool = require("./pool");

async function getProductByID(id) {
  const result = await pool.query(`
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

  if (result.rowCount === 0) {
    throw new Error(`Product with ID ${id} not found`);
  }

  return result.rows[0];
}

async function addNewProduct(newProduct) {
  const result = await pool.query(`
    INSERT INTO products (name, description, photo_url, brand_id, category_id, skintype_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `, [ 
      newProduct.name,
      newProduct.description,
      newProduct.photo_url,
      newProduct.brand_id,
      newProduct.category_id,
      newProduct.skintype_id
    ]);

  if (result.rowCount === 0) {
    throw new Error("Failed to add new product");
  }
}

async function updateProduct(id, newProduct) {
  const result = await pool.query(`
    UPDATE products
    SET
      name = $1,
      description = $2,
      photo_url = $3,
      brand_id = $4,
      category_id = $5,
      skintype_id = $6
    WHERE id = $7 RETURNING id;
    `, [
      newProduct.name,
      newProduct.description,
      newProduct.photo_url,
      newProduct.brand_id,
      newProduct.category_id,
      newProduct.skintype_id,
      id
    ]);
  
    if (result.rowCount === 0) {
      throw new Error(`Failed to update product with ID ${id}`);
    }
}

async function deleteProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE products.id = $1 RETURNING id", [id]);

  if (result.rowCount === 0) {
    throw new Error(`Failed to delete product with ID ${id}`);
  }
}

async function getAllBrands() {
  const { rows } = await pool.query("SELECT name FROM brand");
  return rows;
}

async function getBrandIDByName(name) {
  const result = await pool.query("SELECT id FROM brand WHERE brand.name = $1", [name]);

  if (result.rowCount === 0) {
    throw new Error(`Brand with name '${name}' not found`);
  }

  return result.rows[0];
}

async function addNewBrand(name) {
  const result = await pool.query("INSERT INTO brand (name) VALUES ($1) RETURNING id", [name]);

  if (result.rowCount === 0) {
    throw new Error(`Failed to add new brand with name '${name}'`);
  }

  return result.rows[0];
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT name FROM category");
  return rows;
}

async function getCategoryIDByName(name) {
  const result = await pool.query("SELECT id FROM category WHERE category.name = $1", [name]);

  if (result.rowCount === 0) {
    throw new Error(`Category with name '${name}' not found`);
  }

  return result.rows[0];
}

async function addNewCategory(name) {
  const result = await pool.query("INSERT INTO category (name) VALUES ($1) RETURNING id", [name]);

  if (result.rowCount === 0) {
    throw new Error(`Failed to add new category with name '${name}'`);
  }

  return result.rows[0];
}

async function getAllSkintypes() {
  const { rows } = await pool.query("SELECT name FROM skintype");
  return rows;
}

async function getSkintypeIDByName(name) {
  const result = await pool.query("SELECT id FROM skintype WHERE skintype.name = $1", [name]);

  if (result.rowCount === 0) {
    throw new Error(`Skintype with name '${name}' not found`);
  }

  return result.rows[0];
}

async function addNewSkintype(name) {
  const result = await pool.query("INSERT INTO skintype (name) VALUES ($1) RETURNING id", [name]);

  if (result.rowCount === 0) {
    throw new Error(`Failed to add new skintype with name '${name}'`);
  }

  return result.rows[0];
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

async function checkUsername(username) {
  const result = await pool.query("SELECT id FROM users WHERE username = $1", [username]);

  return result.rowCount;
}

async function checkEmail(email) {
  const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

  return result.rowCount;
}

async function registerUser(user) {
  const result = await pool.query(`
    INSERT INTO users (username, email, password_hash, status)
    VALUES ($1, $2, $3, $4) RETURNING id;
  `, [
    user.username,
    user.email,
    user.password_hash,
    user.status
  ]);

  if (result.rowCount === 0) throw new Error("Failed to register new user");
}

async function getUserInfoByUsername(username) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

  return result.rows[0];
}

async function getUserInfoByID(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0];
}

module.exports = {
  getProductByID,
  addNewProduct,
  updateProduct,
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
  getProducts,
  checkUsername,
  checkEmail,
  registerUser,
  getUserInfoByUsername,
  getUserInfoByID
}