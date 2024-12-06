const express = require('express');
const routerCompany = express.Router();

const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = require('../controller/controllerCompany.js');

//Get all companies
routerCompany.get('/all', getCompanies);

//Get a company
routerCompany.get('/:id', getCompany);

//Create a new company
routerCompany.post('/new', createCompany);

//Update a company
routerCompany.put('/update/:id', updateCompany);

//Delete a company
routerCompany.put('/delete/:id', deleteCompany);

module.exports = routerCompany;