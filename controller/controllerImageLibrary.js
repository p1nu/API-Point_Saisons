const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('../data/db'); 

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Upload image to folder
const uploadImage = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('No file uploaded');
    }

    const imagesPath = files.map(file => file.filename);

    res.status(200).send({ message: 'File uploaded successfully', filename: imagesPath });
  } catch (error) {
    console.error(error);
  }
}

//Delete image from folder
const deleteImages = async (req, res) => {
  try {
    const { il_path } = req.body;
    const imagePath = path.join(__dirname, '../uploads', il_path);
    fs.unlinkSync(imagePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.status(200).send({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
} 

// Get all images from database
const getImages = async (req, res) => {
  try {
    const query = 'SELECT * FROM image_library';
    const result = await db.query(query);
    res.status(200).send(result[0]);
  } catch (error) {
    console.error(error);
  }
}

// Get image by id
const getImage = async (req, res) => {
  try {
    const { il_id } = req.params;
    const query = 'SELECT * FROM image_library WHERE il_id = ?';
    const result = await db.query(query, [il_id]);
    res.status(200).send(result[0]);
  } catch (error) {
    console.error(error);
  }
}

//Add image to database
const addImage = async (req, res) => {
  try {
    const { il_name, il_desc, il_path, il_company_id } = req.body;
    const il_create_date = new Date();

    const query = 'INSERT INTO image_library (il_name, il_desc, il_path, il_company_id, il_create_date) VALUES (?, ?, ?, ?, ?)';

    const result = await db.query(query, [il_name, il_desc, il_path, il_company_id, il_create_date]);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
  }
}

// Update image details
const updateImage = async (req, res) => {
  try {
    const { il_id, il_name, il_desc, il_path } = req.body;
    const il_update_date = new Date();
    const query = 'UPDATE image_library SET il_name = ?, il_desc = ?, il_path = ?, il_update_date = ? WHERE il_id = ?';
    const result = await db.query(query, [il_name, il_desc, il_path, il_update_date, il_id]);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
}

// Delete image from database
const deleteImage = async (req, res) => {
  try {
    const { il_id } = req.body;
    const query = 'DELETE FROM image_library WHERE il_id = ?';
    const result = await db.query(query, [il_id]);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  upload,
  uploadImage,
  deleteImages,
  addImage,
  updateImage,
  deleteImage,
  getImages,
  getImage
};