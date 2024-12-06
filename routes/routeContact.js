const express = require('express');
const routerContact = express.Router();

const {getContacts, getContactById, getContactByCompany, getContactByService, createContact, updateContact, deleteContact} = require('../controller/controllerContact.js');

//Get all contacts
routerContact.get('/all', getContacts);

//Get a contact by id
routerContact.get('/:id', getContactById);

//Get a contact by company id
routerContact.get('/company/:id', getContactByCompany);

//Get a contact by service id
routerContact.get('/service/:id', getContactByService);

//Create a new contact
routerContact.post('/new', createContact);

//Update a contact
routerContact.put('/update/:id', updateContact);

//Delete a contact
routerContact.delete('/delete/:id', deleteContact);

module.exports = routerContact;
