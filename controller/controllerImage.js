const multer = require("multer");
const db = require("../data/db");
const fs = require("fs");
const path = require("path");

const IMAGE_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Implement file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (IMAGE_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only image files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

//Upload image 
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    // Construct the URL to access the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    // Respond with the image URL in the format TinyMCE expects
    res.status(200).json({
      location: imageUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
    console.error(error);
  }
};

//Upload images
const uploadImages = async (req, res) => {
  try {
    const files = req.files;
    const il_create_date = new Date();
    const { il_company_id, il_created_by_user_id }  = req.body;

    if (!files || files.length === 0) {
      return res.status(400).send("No file uploaded");
    }

    const imagesData = files.map((file) => [
      file.originalname,
      file.filename,
      il_company_id,
      il_create_date,
      il_created_by_user_id,
    ]);

    const query =
      "INSERT INTO image_library (il_name, il_path, il_company_id, il_create_date, il_created_by_user_id) VALUES ?";

    const result = await db.query(query, [imagesData]);

    res
      .status(200)
      .send({
        message: "Files uploaded successfully",
        filenames: files.map((file) => file.filename),
      });
    console.log(result);
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
    console.error(error);
  }
};

//Delete image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the image path from the database
    const [rows] = await db.query(
      "SELECT il_path FROM image_library WHERE il_id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).send({ message: "Image not found" });
    }

    const imagePath = path.join(__dirname, "../uploads", rows[0].il_path);

    // Delete the image file from the folder
    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ message: "Failed to delete file from folder" });
      }

      // Delete the image record from the database
      const query = "DELETE FROM image_library WHERE il_id = ?";
      await db.query(query, [id]);

      res.status(200).send({ message: "File deleted successfully" });
    });
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
    console.error(error);
  }
};

//Delete images
const deleteImages = async (req, res) => {
  try {
    const { il_path } = req.body;
    const query = "DELETE FROM image_library WHERE il_path = ?";

    const result = await db.query(query, il_path);

    res.status(200).send({ message: "File deleted successfully" });
    console.log(result);
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
    console.error(error);
  }
};

//Get all images
const getImages = async (req, res) => {
  try {
    const query = "SELECT * FROM image_library";

    const result = await db.query(query);

    res.status(200).send(result[0]);
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
    console.error(error);
  }
};

//Get image by id
const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM image_library WHERE il_id = ?";

    const result = await db.query(query, id);

    res.status(200).send(result[0]);
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
    console.error(error);
  }
};

//Update image
const updateImage = async (req, res) => {
  try {
    const { il_id, il_name, il_path, il_company_id } = req.body;
    const il_update_date = new Date();
    const query =
      "UPDATE image_library SET il_name = ?, il_path = ?, il_company_id = ?, il_update_date = ? WHERE il_id = ?";

    const result = await db.query(query, [
      il_name,
      il_path,
      il_company_id,
      il_update_date,
      il_id,
    ]);
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
    console.error(error);
  }
};

module.exports = {
  getImages,
  getImage,
  uploadImage,
  uploadImages,
  deleteImages,
  updateImage,
  deleteImage,
  upload,
};
