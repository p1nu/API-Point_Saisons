const express = require('express');
const { getNews, getNew, createNews, updateNews, deleteNews } = require('../controller/controllerNews.js');

const routerNews = express.Router();

// Get all news
routerNews.get('/all', getNews);

// Get a news
routerNews.get('/:id', getNew);

// Create a new news
routerNews.post('/new', createNews);

// Update a news
routerNews.put('/update/:id', updateNews);

// Delete a news
routerNews.put('/delete/:id', deleteNews);

module.exports = routerNews;