const db = require("../data/db.js");

// Get all products
const getProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a product
const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `
      SELECT 
        * 
      FROM 
        products 
      WHERE 
        product_id = ?
    `;
    const [product] = await db.query(query, [id]);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { product_name, product_desc, company_id, category_ids, product_image, product_price } = req.body;
    const [result] = await db.query(
      "INSERT INTO products (product_name, product_desc, company_id, product_image, product_price) VALUES (?, ?, ?, ?, ?)",
      [product_name, product_desc, company_id, product_image, product_price]
    );
    const product_id = result.insertId;

    for (const category_id of category_ids) {
      await db.query(
        "INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)",
        [product_id, category_id]
      );
    }

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { product_name, product_desc, company_id, category_ids, product_image, product_price } = req.body;

    await db.query(
      "UPDATE products SET product_name = ?, product_desc = ?, company_id = ?, product_image = ?, product_price = ? WHERE product_id = ?",
      [product_name, product_desc, company_id, product_image, product_price, product_id]
    );

    await db.query("DELETE FROM product_categories WHERE product_id = ?", [product_id]);

    for (const category_id of category_ids) {
      await db.query(
        "INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)",
        [product_id, category_id]
      );
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product\
const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    await db.query("DELETE FROM product_categories WHERE product_id = ?", [product_id]);
    await db.query("DELETE FROM products WHERE product_id = ?", [product_id]);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const query = `
      SELECT 
        p.product_id,
        p.product_name,
        p.product_desc,
        p.company_id,
        p.product_image,
        p.product_price
      FROM 
        products p
      JOIN 
        product_categories pc ON p.product_id = pc.product_id
      WHERE 
        pc.category_id = ?
    `;
    const [products] = await db.query(query, [category_id]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all products by company
const getProductsByCompany = async (req, res) => {
  try {
    const { company_id } = req.params;
    const query = `
      SELECT 
        * 
      FROM 
        products 
      WHERE 
        company_id = ?
    `;
    const [products] = await db.query(query, [company_id]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new product category
const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    await db.query(
      "INSERT INTO categories (category_name) VALUES (?)",
      [category_name]
    );
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all product categories
const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      "SELECT * FROM categories"
    );
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a product category
const updateCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const { category_name } = req.body;

    await db.query(
      "UPDATE categories SET category_name = ? WHERE category_id = ?",
      [category_name, category_id]
    );

    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product category
const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    await db.query("DELETE FROM product_categories WHERE category_id = ?", [category_id]);
    await db.query("DELETE FROM categories WHERE category_id = ?", [category_id]);

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByCompany,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};