const db = require("../data/db.js");

// Get all services
const getServices = async (req, res) => {
  try {
    const [services] = await db.query("SELECT * FROM services");
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a service
const getService = async (req, res) => {
  try {
    const id = req.params.id;
    const [service] = await db.query("SELECT * FROM services WHERE service_id = ?", [
      id,
    ]);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get service by company
const getServiceByCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const [service] = await db.query("SELECT * FROM services WHERE service_company_id = ?", [
      id,
    ]);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const service_create_date = new Date();
    const {
      service_name,
      service_desc,
      service_value,
      service_vision,
      service_mission,
      service_link,
      service_logo,
      service_company_id,
      service_status_id,
      service_created_by_user_id,
    } = req.body;
    await db.query(
      "INSERT INTO services (service_name, service_desc, service_value, service_vision, service_mission, service_link, service_logo, service_company_id, service_status_id, service_create_date, service_created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        service_name,
        service_desc,
        service_value,
        service_vision,
        service_mission,
        service_link,
        service_logo,
        service_company_id,
        service_status_id,
        service_create_date,
        service_created_by_user_id,
      ]
    );
    res.status(201).json({ message: "Service created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const service_update_date = new Date();
    const {
      service_name,
      service_desc,
      service_value,
      service_vision,
      service_mission,
      service_link,
      service_logo,
      service_company_id,
      service_status_id,
      service_updated_by_user_id,
    } = req.body;
    await db.query(
      "UPDATE services SET service_name = ?, service_desc = ?, service_value = ?, service_vision = ?, service_mission = ?, service_link = ?, service_logo = ?, service_company_id = ?, service_status_id = ?, service_update_date = ?, service_updated_by_user_id = ? WHERE service_id = ?",
      [
        service_name,
        service_desc,
        service_value,
        service_vision,
        service_mission,
        service_link,
        service_logo,
        service_company_id,
        service_status_id,
        service_update_date,
        service_updated_by_user_id,
        id,
      ]
    );
    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const service_delete_date = new Date();
    const service_status_id = 2;
    const { service_deleted_by_user_id } = req.body;
    await db.query(
      "UPDATE services SET service_status_id = ?, service_delete_date = ?, service_deleted_by_user_id = ? WHERE service_id = ?",
      [service_status_id, service_delete_date, service_deleted_by_user_id, id]
    );
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getServices,
  getService,
  getServiceByCompany,
  createService,
  updateService,
  deleteService,
};