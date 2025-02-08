const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS brand (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS skintype (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url TEXT,
  brand_id INTEGER,
  category_id INTEGER,
  skintype_id INTEGER,
  FOREIGN KEY (brand_id) REFERENCES brand(id),
  FOREIGN KEY (category_id) REFERENCES category(id),
  FOREIGN KEY (skintype_id) REFERENCES skintype(id)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  status VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message TEXT NOT NULL,
  user_id INTEGER,
  product_id INTEGER NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO brand (name) VALUES
  ('BIODERMA');

INSERT INTO category (name) VALUES
  ('Face'),
  ('Body'),
  ('Eyes'),
  ('Lips'),
  ('Hands');

INSERT INTO skintype (name) VALUES
  ('Sensitive'),
  ('Dehydrated'),
  ('Dry to very dry'),
  ('Combination to oily');

INSERT INTO products (name, description, photo_url, brand_id, category_id, skintype_id) VALUES
  ('Sensibio Defensive Rich', 'The active soothing cream, developed to strengthen the self-defence power of sentitive skin dried out by environmental aggressions.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739042344/sensibioRich_j16ny9.jpg', 1, 1, 1),
  ('Atoderm Ultra Cream', 'Ultra-nourishing and moisturizing daily care. Strengthens the skin barrier.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739042357/atodermUltraCream_zqxj5l.jpg', 1, 2, 3),
  ('Atoderm Hands & Nails', 'The nourishing cream for soft and supple hands. 8h hydration.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739014457/atodermCream_gpmwm0.jpg', 1, 5, 3),
  ('Hydrabio Toner', 'Hydrating, liquid toning lotion for dehydrated skin.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739042360/hydrobioToner_fsiiyi.jpg', 1, 3, 2),
  ('Atoderm Lip Balm', 'A daily moisturizing care that soothes, nourishes and repairs dry lips.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739042619/atodermLips_ol2flt.jpg', 1, 4, 3),
  ('Sébium Mat Control', 'The care which mattifies and smoothes for a lastingly transformed skin.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739042622/sebiumMatControl_gb1leq.jpg', 1, 1, 4),
  ('Sébium Exfoliating Gel', 'Purifying, exfoliating gel that provides the appearance of smoother skin.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739043149/sebiumExfoliant_fvuc2i.jpg', 1, 1, 4),
  ('Cicabio Mains', 'The repairing balm with a second skin effect. Hands instant relief.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739043298/cicabioHandCream_rxzyd2.jpg', 1, 5, 1),
  ('Sensibio Micellar cleansing oil', 'Ecobiological cleansing oil with micellar technology to cleanse and take care of the skin.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739043398/sensibioOil_oo2vcx.jpg', 1, 3, 1),
  ('Sébium Foaming Gel', 'The purifying gentle cleanser. Removes impurities, controls shine.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739042953/sebiumGel_yze6ej.jpg', 1, 2, 4),
  ('Atoderm Shower Oil', '24h hydration and immediate comfort right from the shower.', 'https://res.cloudinary.com/dboemgriz/image/upload/v1739014457/atodermOil_r4awg9.jpg', 1, 2, 3);
`
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();