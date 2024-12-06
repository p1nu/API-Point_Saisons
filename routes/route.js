const express = require('express');
const router = express.Router();
const {getImages, getImage, uploadImage, deleteImages, updateImage, deleteImage, upload, addImage} = require('../controller/controllerImageLibrary.js');






//Get all image
router.get('/all-images', getImages);

//Get an image
router.get('/image/:id', getImage);

//Upload images to folder
router.post('/upload-image', upload.array('images', 10), uploadImage);

//Delete images from folder
router.delete('/delete-images', deleteImages);

//Add image to database
router.post('/new-image', addImage);

//Update image details
router.put('/update-image/:id', updateImage);

//Delete an image
router.delete('/delete-image/:id', deleteImage);

module.exports = router;