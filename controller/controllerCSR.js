const db = require('../data/db');

// Get all CSR
const getAllCSR = async (req, res) => {
  try {
    const [csr] = await db.query(
      "SELECT csr.*, image_library.il_path AS image_path FROM csr LEFT JOIN image_library ON csr.csr_thumbnail = image_library.il_id"
    );
    res.status(200).json(csr);
  } catch (err) {
    console.error('Error fetching CSR:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get CSR by id
const getCSRById = async (req, res) => {
  try {
    const query = `
      SELECT 
        csr.*, 
        image_library.il_path AS image_path 
      FROM 
        csr 
      LEFT JOIN 
        image_library 
      ON 
        csr.csr_thumbnail = image_library.il_id 
      WHERE 
        csr.csr_id = ?
    `;

    const [csr] = await db.query(query, [req.params.id]);

    if (csr.length === 0) {
      return res.status(404).json({ message: 'CSR not found' });
    }

    res.status(200).json(csr[0]);
  } catch (err) {
    console.error('Error fetching CSR by ID:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create CSR
const createCSR = async (req, res) => {
  try {
    const {
      csr_name,
      csr_desc,
      csr_article,
      csr_thumbnail,
      csr_created_by_user_id,
    } = req.body;

    // Validate required fields
    if (!csr_name || !csr_desc || !csr_article || !csr_thumbnail || !csr_created_by_user_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const csr_status_id = 1; // Assuming 1 is the default status
    const csr_create_date = new Date();

    const [newCSR] = await db.query(
      'INSERT INTO csr (csr_name, csr_desc, csr_article, csr_thumbnail, csr_status_id, csr_create_date, csr_created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [csr_name, csr_desc, csr_article, csr_thumbnail, csr_status_id, csr_create_date, csr_created_by_user_id]
    );

    res.status(201).json({ message: 'CSR created successfully', csrId: newCSR.insertId });
  } catch (err) {
    console.error('Error creating CSR:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update CSR
const updateCSR = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      csr_name,
      csr_desc,
      csr_article,
      csr_thumbnail,
      csr_status_id,
      csr_updated_by_user_id,
    } = req.body;

    // Validate required fields
    if (!csr_name || !csr_desc || !csr_article || !csr_thumbnail || !csr_status_id || !csr_updated_by_user_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const csr_update_date = new Date();

    const [result] = await db.query(
      'UPDATE csr SET csr_name = ?, csr_desc = ?, csr_article = ?, csr_thumbnail = ?, csr_status_id = ?, csr_update_date = ?, csr_updated_by_user_id = ? WHERE csr_id = ?',
      [csr_name, csr_desc, csr_article, csr_thumbnail, csr_status_id, csr_update_date, csr_updated_by_user_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'CSR not found' });
    }

    res.status(200).json({ message: 'CSR updated successfully' });
  } catch (err) {
    console.error('Error updating CSR:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete CSR
const deleteCSR = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query('DELETE FROM csr WHERE csr_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'CSR not found' });
    }

    res.status(200).json({ message: 'CSR deleted successfully' });
  } catch (err) {
    console.error('Error deleting CSR:', err);
    res.status(500).json({ message: err.message });
  }
};

// Export all controller functions
module.exports = {
  getAllCSR,
  getCSRById,
  createCSR,
  updateCSR,
  deleteCSR,
};
