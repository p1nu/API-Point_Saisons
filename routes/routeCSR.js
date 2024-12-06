const express = require('express');
const { getAllCSR, getCSRById, createCSR, updateCSR, deleteCSR } = require('../controller/controllerCSR');

const routerCSR = express.Router();

// Get all CSR
routerCSR.get('/all', getAllCSR);

// Get a CSR
routerCSR.get('/:id', getCSRById);

// Create a new CSR
routerCSR.post('/new', createCSR);

// Update a CSR
routerCSR.put('/update/:id', updateCSR);

// Delete a CSR
routerCSR.delete('/delete/:id', deleteCSR);

module.exports = routerCSR;