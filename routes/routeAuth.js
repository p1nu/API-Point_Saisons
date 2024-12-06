const express = require('express');
const { register, login } = require('../controller/controllerAuth');

const routerAuth = express.Router();

// Register a new user
routerAuth.post('/register', register);

// Login a user
routerAuth.post('/login', login);

module.exports = routerAuth;