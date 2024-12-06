const db = require('../data/db');

// Get all missions
const getAllMissions = async (req, res) => {
  try {
    const missions = await db.query('SELECT * FROM mission');
    res.status(200).json(missions[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get mission by id
const getMissionById = async (req, res) => {
  try {
    const mission = await db.query('SELECT * FROM mission WHERE id = ?', [req.params.id]);
    res.status(200).json(mission[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get mission by csr_id
const getMissionByCSRId = async (req, res) => {
  try {
    const mission = await db.query('SELECT * FROM mission WHERE csr_id = ?', [req.params.csr_id]);
    res.status(200).json(mission[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create mission
const createMission = async (req, res) => {
  try {
    const {
      description,
      image,
      video,
      csr_id,
      created_by_user_id,
    } = req.body;
    const query = 'INSERT INTO mission (description, image, video, csr_id, created_by_user_id) VALUES (?, ?, ?, ?, ?)';

    const newMission = await db.query(query, [description, image, video, csr_id, created_by_user_id]);

    res.status(201).json(newMission);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update mission
const updateMission = async (req, res) => {
  try {
    const {
      description,
      image,
      video,
      updated_by_user_id,
    } = req.body;

    const updatedMission = await db.query(
      'UPDATE mission SET description = ?, image = ?, video = ?, updated_by_user_id = ? WHERE id = ?',
      [description, image, video, updated_by_user_id, req.params.id]
    );

    res.status(201).json(updatedMission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete mission
const deleteMission = async (req, res) => {
  try {
    const deletedMission = await db.query('DELETE FROM mission WHERE id = ?', [req.params.id]);
    res.status(200).json(deletedMission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllMissions,
  getMissionById,
  getMissionByCSRId,
  createMission,
  updateMission,
  deleteMission,
};