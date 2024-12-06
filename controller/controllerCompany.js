const db = require("../data/db.js");

// Get all companies
const getCompanies = async (req, res) => {
  try {
    const [companies] = await db.query("SELECT * FROM company");
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get a company
const getCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const [company] = await db.query("SELECT * FROM company WHERE company_id = ?", [
      id,
    ]);
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new company
const createCompany = async (req, res) => {
  const company_create_date = new Date();
  const company_status_id = 1;
  try {
    const {
      company_name,
      company_acronym,
      company_value,
      company_vision,
      company_mission,
      company_desc,
      company_logo,
      company_background,
      company_created_by_user_id,
    } = req.body;
    await db.query(
      "INSERT INTO company (company_name, company_acronym, company_value, company_vision, company_mission, company_desc, company_logo, company_background, company_create_date, company_status_id, company_created_by_user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        company_name,
        company_acronym,
        company_value,
        company_vision,
        company_mission,
        company_desc,
        company_logo,
        company_background,
        company_create_date,
        company_status_id,
        company_created_by_user_id,
      ]
    );
    res.status(201).json({ message: "Company created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company_update_date = new Date();
    const {
      company_name,
      company_acronym,
      company_value,
      company_vision,
      company_mission,
      company_desc,
      company_logo,
      company_background,
      company_status_id,
      company_updated_by_user_id,
    } = req.body;
    await db.query(
      "UPDATE company SET company_name = ?, company_acronym = ?, company_value = ?, company_vision = ?, company_mission = ?, company_desc = ?, company_logo = ?, company_background = ?, company_update_date = ?, company_status_id = ?, company_updated_by_user_id = ? WHERE company_id = ?",
      [
        company_name,
        company_acronym,
        company_value,
        company_vision,
        company_mission,
        company_desc,
        company_logo,
        company_background,
        company_update_date,
        company_status_id,
        company_updated_by_user_id,
        id,
      ]
    );
    res.json({ message: "Company updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company_delete_date = new Date();
    const company_status_id = 2;
    const { company_deleted_by_user_id } = req.body;
    await db.query(
      "UPDATE company SET company_status_id = ?, company_delete_date = ?, company_deleted_by_user_id = ? WHERE company_id = ?",
      [company_status_id, company_delete_date, company_deleted_by_user_id, id]
    );
    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCompanies, getCompany, createCompany, updateCompany, deleteCompany };
