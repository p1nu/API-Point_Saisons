const express = require('express');
const routerImage = express.Router();

const { getImages, getImage, uploadImage, uploadImages, deleteImage, updateImage, upload } = require('../controller/controllerImage.js');

//Get all images
routerImage.get('/all', getImages);

//Get an image
routerImage.get('/:id', getImage);

//Upload images
routerImage.post('/upload', upload.array('images', 10), uploadImages);

//Upload an image
routerImage.post('/upload/single', upload.single('file'), uploadImage);

//Delete an image
routerImage.delete('/delete/:id', deleteImage);

//Update an image
routerImage.put('/update/:id', updateImage);

module.exports = routerImage;