const db = require('../data/db.js');

// Get all Products
const getProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product[0]);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get Product by Company ID
const getProductByCompany = async (req, res) => {
  try {
    const [product] = await db.query('SELECT * FROM products WHERE company_id = ?', [req.params.id]);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by company ID:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get Product by category name
const getProductByCategory = async (req, res) => {
  try {
    const [product] = await db.query('SELECT * FROM products WHERE category = ?', [req.params.category]);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by category:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get product by company id and category 
const getProductByCompanyAndCategory = async (req, res) => {
  try {
    const [product] = await db.query('SELECT * FROM products WHERE company_id = ? AND category = ?', [req.params.id, req.params.category]);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by company ID and category:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get all categories
const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT DISTINCT category FROM products');

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Categories not found' });
    }

    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get categories by company id
const getCategoriesByCompany = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT DISTINCT category FROM products WHERE company_id = ?', [req.params.id]);

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Categories not found' });
    }

    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories by company ID:', err);
    res.status(500).json({ message: err.message });
  }
}

// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      image,
      company_id,
    } = req.body;

    // Validate required fields
    // if (
    //   !company_id ||
    //   !name ||
    //   !description ||
    //   !category ||
    //   !price ||
    //   !image
    // ) {
    //   return res.status(400).json({ message: 'All fields are required' });
    // }

    const [newProduct] = await db.query(
      `INSERT INTO products
        (name, description, category, price, image, company_id) 
       VALUES 
        (?, ?, ?, ?, ?, ?)`,
      [name, description, category, price, image, company_id]
    );

    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: err.message });
  }
}

// Update Product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      image,
      company_id,
    } = req.body;

    // Validate required fields
    if (
      !company_id ||
      !name ||
      !description ||
      !category ||
      !price ||
      !image
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const update_date = new Date();

    const [updatedProduct] = await db.query(
      `UPDATE products
       SET 
        name = ?,
        description = ?,
        category = ?,
        price = ?,
        image = ?,
        company_id = ?,
        update_date = ?
       WHERE id = ?`,
      [name, description, category, price, image, company_id, update_date, req.params.id]
    );

    if (updatedProduct.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: err.message });
  }
}

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const [deletedProduct] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);

    if (deletedProduct.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getProducts,
  getProductById,
  getProductByCompany,
  getProductByCategory,
  getProductByCompanyAndCategory,
  getCategoriesByCompany,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
};

