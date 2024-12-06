const express = require('express');
const routerUser = express.Router();

const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controller/controllerUser.js');

const authenticateToken = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');

// Authenticate all user routes
routerUser.use(authenticateToken);

//Get all users
routerUser.get('/all', roleMiddleware(1), getUsers);

//Create a new user
routerUser.post('/new', roleMiddleware(1), createUser);

//Update a user
routerUser.put('/update/:id', roleMiddleware(1), updateUser);

//Delete a user
routerUser.delete('/delete/:id', roleMiddleware(1), deleteUser);

//Get a user
routerUser.get('/:id', roleMiddleware(1), getUser);

module.exports = routerUser;