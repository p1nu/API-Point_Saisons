const db = require("../data/db.js");

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const [contacts] = await db.query(
      "SELECT * FROM contacts JOIN company ON contacts.contact_company_id = company.company_id LEFT JOIN services ON contacts.contact_service_id = services.service_id"
    );
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a contact by id
const getContactById = async (req, res) => {
  const id = req.params.id;
  try {
    const [contact] = await db.query(
      "SELECT * FROM contacts WHERE contact_id = ?",
      [id]
    );
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a contact by company id
const getContactByCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const [contact] = await db.query(
      "SELECT * FROM contacts JOIN company ON contacts.contact_company_id = company.company_id WHERE contact_company_id = ?",
      [id]
    );
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a contact by service id
const getContactByService = async (req, res) => {
  const id = req.params.id;
  try {
    const [contact] = await db.query(
      "SELECT * FROM contacts JOIN services ON contacts.contact_service_id = services.service_id WHERE contact_service_id = ?",
      [id]
    );
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const {
      contact_phonenumber,
      contact_address,
      contact_email,
      contact_telegram,
      contact_website,
      contact_company_id,
      contact_service_id,
      contact_created_by_user_id,
    } = req.body;

    const contact_create_date = new Date();

    // Validate that at least one of contact_company_id or contact_service_id is provided
    if (!contact_company_id && !contact_service_id) {
      return res.status(400).json({
        message:
          "Either contact_company_id or contact_service_id must be provided.",
      });
    }

    // Validate contact_company_id if provided
    if (contact_company_id && isNaN(parseInt(contact_company_id, 10))) {
      return res
        .status(400)
        .json({ message: "Invalid contact_company_id. It must be a number." });
    }

    // Validate contact_service_id if provided
    if (contact_service_id && isNaN(parseInt(contact_service_id, 10))) {
      return res
        .status(400)
        .json({ message: "Invalid contact_service_id. It must be a number." });
    }

    // Set the unused ID to null
    const final_company_id = contact_company_id || null;
    const final_service_id = contact_service_id || null;

    // Optional: Verify that the provided company_id exists
    if (final_company_id) {
      const [company] = await db.query(
        "SELECT * FROM company WHERE company_id = ?",
        [final_company_id]
      );
      if (company.length === 0) {
        return res.status(404).json({ message: "Contact Company not found." });
      }
    }

    // Optional: Verify that the provided service_id exists
    if (final_service_id) {
      const [service] = await db.query(
        "SELECT * FROM services WHERE service_id = ?",
        [final_service_id]
      );
      if (service.length === 0) {
        return res.status(404).json({ message: "Contact Service not found." });
      }
    }

    // Insert the contact into the database
    const insertQuery =
      "INSERT INTO contacts (contact_phonenumber, contact_address, contact_email, contact_telegram, contact_website, contact_company_id, contact_service_id, contact_create_date, contact_created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const insertValues = [
      contact_phonenumber || null,
      contact_address || null,
      contact_email || null,
      contact_telegram || null,
      contact_website || null,
      final_company_id,
      final_service_id,
      contact_create_date,
      contact_created_by_user_id,
    ];

    const [result] = await db.query(insertQuery, insertValues);

    res.status(201).json({
      message: "Contact created successfully.",
      contact_id: result.insertId,
    });

    console.log(`Contact created with ID: ${result.insertId}`);
  } catch (error) {
    console.error("Error creating contact:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while creating the contact.",
        error: error.message,
      });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const {
      contact_id,
      contact_phonenumber,
      contact_address,
      contact_email,
      contact_telegram,
      contact_website,
      contact_company_id,
      contact_service_id,
    } = req.body;
    const contact_update_date = new Date();
    const query =
      "UPDATE contacts SET contact_phonenumber = ?, contact_address = ?, contact_email = ?, contact_telegram = ?, contact_website = ?, contact_company_id = ?, contact_service_id = null, contact_update_date = ? WHERE contact_id = ?";

    await db.query(query, [
      contact_phonenumber,
      contact_address,
      contact_email,
      contact_telegram,
      contact_website,
      contact_company_id,
      // contact_service_id,
      contact_update_date,
      contact_id,
    ]);
    res.status(201).json({ message: "Contact updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM contacts WHERE contact_id = ?", [id]);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  getContactById,
  getContactByCompany,
  getContactByService,
  createContact,
  updateContact,
  deleteContact,
};
