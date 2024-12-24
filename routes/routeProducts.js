const express = require('express');
const { 
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
 } = require('../controller/controllerProducts.js');

const routerProducts = express.Router(); 

// Get all products
routerProducts.get('/all', getProducts);

// Get a product by id
routerProducts.get('/:id', getProductById);

// Get products by company id
routerProducts.get('/company/:id', getProductByCompany);

// Get categories by company id
routerProducts.get('/company/:id/categories', getCategoriesByCompany);

// Get all categories
routerProducts.get('/categories', getCategories);

// Get products by category
routerProducts.get('/category/:category', getProductByCategory);

// Get products by company id and category
routerProducts.get('/company/:company_id/category/:category', getProductByCompanyAndCategory);

// Create a new product
routerProducts.post('/new', createProduct);

// Update a product
routerProducts.put('/update/:id', updateProduct);

// Delete a product
routerProducts.delete('/delete/:id', deleteProduct);

module.exports = routerProducts;