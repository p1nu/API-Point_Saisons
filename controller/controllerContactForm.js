const db = require('../data/db.js');

// Get all Form
const getAllForms = async (req, res) => {
  try {
    const [form] = await db.query('SELECT * FROM contact_form');
    res.status(200).json(form);
  } catch (err) {
    console.error('Error fetching form:', err);
    res.status(500).json({ message: err.message });
  }
}

// Get Form by ID
const getFormById = async (req, res) => {
  try {
    const [form] = await db.query('SELECT * FROM contact_form WHERE id = ?', [req.params.id]);

    if (form.length === 0) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form[0]);
  } catch (err) {
    console.error('Error fetching form by ID:', err);
    res.status(500).json({ message: err.message });
  }
}

// Create Form
const createForm = async (req, res) => {
  try {
    const {
      name,
      email,
      company_name,
      subject,
      message
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !company_name ||
      !subject ||
      !message
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const create_date = new Date();

    const [newForm] = await db.query(
      `INSERT INTO contact_form
        (name, email, company_name, subject, message, create_date) 
       VALUES 
        (?, ?, ?, ?, ?, ?)`,
      [name, email, company_name, subject, message, create_date]
    );

    res.status(201).json({ id: newForm.insertId, message: 'Form created' });
  } catch (err) {
    console.error('Error creating form:', err);
    res.status(500).json({ message: err.message });
  }
}

// Update Form
const updateForm = async (req, res) => {
  try {
    const {
      name,
      email,
      company_name,
      subject,
      message
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !company_name ||
      !subject ||
      !message
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const update_date = new Date();

    const [updatedForm] = await db.query(
      `UPDATE contact_form
       SET name = ?, email = ?, company_name = ?, subject = ?, message = ?, update_date = ?
       WHERE id = ?`,
      [name, email, company_name, subject, message, update_date, req.params.id]
    );

    if (updatedForm.affectedRows === 0) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form updated successfully' });
  } catch (err) {
    console.error('Error updating form:', err);
    res.status(500).json({ message: err.message });
  }
}

// Delete Form
const deleteForm = async (req, res) => {
  try {
    const [deletedForm] = await db.query('DELETE FROM contact_form WHERE id = ?', [req.params.id]);

    if (deletedForm.affectedRows === 0) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (err) {
    console.error('Error deleting form:', err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm
};
