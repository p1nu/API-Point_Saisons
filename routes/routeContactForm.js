const express = require('express');
const { getAllForms, getFormById, createForm, deleteForm } = require('../controller/controllerContactForm.js');

const routerContactForm = express.Router();

// Get all forms
routerContactForm.get('/all', getAllForms);

// Get a form
routerContactForm.get('/:id', getFormById);

// Create a new form
routerContactForm.post('/new', createForm);

// Delete a form
routerContactForm.delete('/delete/:id', deleteForm);

module.exports = routerContactForm;