const express = require('express');
const { 
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
} = require('../controller/controllerProducts.js');

const routerProducts = express.Router(); 

// Get all products
routerProducts.get('/all', getProducts);

// Get a product
routerProducts.get('/:id', getProduct);

// Get products by category
routerProducts.get('/category/:category_id', getProductsByCategory);

// Get products by company
routerProducts.get('/company/:company_id', getProductsByCompany);

// Create a new product
routerProducts.post('/new', createProduct);

// Update a product
routerProducts.put('/update/:id', updateProduct);

// Delete a product
routerProducts.delete('/delete/:id', deleteProduct);

// Create a new category
routerProducts.post('/categories/new', createCategory);

// Get all categories
routerProducts.get('/categories/all', getCategories);

// Update a category
routerProducts.put('/categories/update/:id', updateCategory);

// Delete a category
routerProducts.delete('/categories/delete/:id', deleteCategory);

module.exports = routerProducts;