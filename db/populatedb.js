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
  ('Sensibio Defensive Rich', 'The active soothing cream, developed to strengthen the self-defence power of sentitive skin dried out by environmental aggressions.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B40240%7D_%7B%7D_%7B28695W%7D.png.webp?itok=AJN60H3d', 1, 1, 1),
  ('Atoderm Ultra Cream', 'Ultra-nourishing and moisturizing daily care. Strengthens the skin barrier.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B63346%7D_%7BBIO_ATODERM_CREME%7D_%7B28065A%7D.png.webp?itok=HScAna60', 1, 2, 3),
  ('Atoderm Hands & Nails', 'The nourishing cream for soft and supple hands. 8h hydration.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B37150%7D_%7B%7D_%7B28070D%7D.png.webp?itok=eLB7GRS3', 1, 5, 3),
  ('Hydrabio Toner', 'Hydrating, liquid toning lotion for dehydrated skin.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B84601%7D_%7BBIO_HYDRABIO_TONIQUE%7D_%7B28379%7D.png.webp?itok=Y09x7Wf0', 1, 3, 2),
  ('Atoderm Lip Balm', 'A daily moisturizing care that soothes, nourishes and repairs dry lips.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B37252%7D_%7BBIO_ATODERM_BAUME_LEVRES%7D_%7B28095W%7D.png.webp?itok=RlHKpDnN', 1, 4, 3),
  ('Sébium Mat Control', 'The care which mattifies and smoothes for a lastingly transformed skin.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B38332%7D_%7BBIO_SEBIUM_MAT_CONTROL%7D_%7B28658B%7D.png.webp?itok=Iu7cKAx2', 1, 1, 4),
  ('Sébium Exfoliating Gel', 'Purifying, exfoliating gel that provides the appearance of smoother skin.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B38464%7D_%7BBIO_SEBIUM_GEL_GOMMANT%7D_%7B28625I%7D.png.webp?itok=mIRqGBuO', 1, 1, 4),
  ('Cicabio Mains', 'The repairing balm with a second skin effect. Hands instant relief.', 'https://www.bioderma.us/sites/us/files/styles/large/public/2022-10/Cicabio-Mains-2022%20%282%29-min.png.webp?itok=X50R6UXp', 1, 5, 1),
  ('Sensibio Micellar cleansing oil', 'Ecobiological cleansing oil with micellar technology to cleanse and take care of the skin.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B107154%7D_%7BBIO_SENSIBIO_MICELLAR_CLEANSING_OIL%7D_%7B28701A%7D.png.webp?itok=IXte_WgP', 1, 3, 1),
  ('Sébium Foaming Gel', 'The purifying gentle cleanser. Removes impurities, controls shine.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/%7B63370%7D_%7B%7D_%7B28664A%7D.png.webp?itok=6TVs_xXG', 1, 2, 4),
  ('Atoderm Shower Oil', '24h hydration and immediate comfort right from the shower.', 'https://www.bioderma.us/sites/us/files/styles/large/public/products/Atoderm-Huile-de-douche-F1L-28138C-MAD-June24.png.webp?itok=EtHhzosw', 1, 2, 3);
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