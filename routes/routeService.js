const express = require('express');
const {getServices, getService, getServiceByCompany, createService, updateService, deleteService} = require('../controller/controllerService.js');

const routerService = express.Router();


// Get all services
routerService.get('/all', getServices);

// Get a service
routerService.get('/:id', getService);

// Get service by company
routerService.get('/company/:id', getServiceByCompany);

// Create a new service
routerService.post('/new', createService);

// Update a service
routerService.put('/update/:id', updateService);

// Delete a service
routerService.put('/delete/:id', deleteService);

module.exports = routerService;