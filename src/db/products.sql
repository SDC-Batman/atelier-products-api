

CREATE TABLE products (
  id integer PRIMARY KEY,
  name varchar(50),
  description text,
  slogan text,
  category text,
  default_price varchar(20),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

CREATE TABLE features (
  id integer,
  product_id integer REFERENCES products (id),
  feature varchar(100),
  value varchar(100)
);

-- need to change id to style_id to get the correct output from my query
CREATE TABLE styles (
  style_id integer PRIMARY KEY,
  product_id integer references products (id),
  name varchar(50),
  sale_price varchar(20),
  original_price varchar(20),
  default_style boolean
);

CREATE TABLE skus (
  id integer,
  styleId integer references styles (style_id),
  size varchar(12),
  quantity integer
);

CREATE TABLE photos (
  id integer,
  styleId integer references styles (style_id),
  url text,
  thumbnail_url text
);

CREATE TABLE related (
  id integer,
  current_product_id integer references products (id),
  related_product_id integer references products (id)
);

CREATE TABLE cart (
  sku_id integer,
  count integer,
)



\copy products (id, name, description, slogan, category, default_price) from '/Users/goksu/Desktop/sdc-data/product.csv' delimiter ',' csv header;
\copy features from '/Users/goksu/Desktop/sdc-data/features.csv' delimiter ',' csv header;
\copy styles from '/Users/goksu/Desktop/sdc-data/styles.csv' delimiter ',' csv header;
\copy skus from '/Users/goksu/Desktop/sdc-data/skus.csv' delimiter ',' csv header;
\copy photos from '/Users/goksu/Desktop/sdc-data/transformed_photos.csv' delimiter ',' csv header;
\copy related from '/Users/goksu/Desktop/sdc-data/related.csv' delimiter ',' csv header where related_product_id != 0;

--CREATE INDEX pid on products (id);
CREATE INDEX featureId on features (product_id);
CREATE INDEX stylesId on styles (product_id);
CREATE INDEX photoId on  photos (styleId);
CREATE INDEX skuId on skus (id);
CREATE INDEX skuStyle on skus (styleId);
CREATE INDEX relatedId on related (current_product_id, related_product_id);






