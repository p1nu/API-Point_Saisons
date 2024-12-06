const db = require('../data/db.js');

// Get all job
const getAllJobs = async (req, res) => {
  try {
    const [job] = await db.query('SELECT * FROM jobs');
    res.status(200).json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get Job by ID
const getJobById = async (req, res) => {
  try {
    const [job] = await db.query('SELECT * FROM jobs WHERE job_id = ?', [req.params.id]);

    if (job.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job[0]);
  } catch (err) {
    console.error('Error fetching job by ID:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      job_name,
      job_desc,
      job_schedule,
      job_start_date,
      job_end_date,
      job_created_by_user_id,
    } = req.body;

    // Validate required fields
    if (
      !job_name ||
      !job_desc ||
      !job_schedule ||
      !job_start_date ||
      !job_end_date ||
      !job_created_by_user_id
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const job_status_id = 1; // Assuming 1 is the default status
    const job_create_date = new Date();

    const [newJob] = await db.query(
      `INSERT INTO jobs
        (job_name, job_desc, job_schedule, job_start_date, job_end_date, job_status_id, job_create_date, job_created_by_user_id) 
       VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job_name,
        job_desc,
        job_schedule,
        job_start_date,
        job_end_date,
        job_status_id,
        job_create_date,
        job_created_by_user_id,
      ]
    );

    res.status(201).json({ message: 'Job created successfully', jobId: newJob.insertId });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      job_name,
      job_desc,
      job_schedule,
      job_start_date,
      job_end_date,
      job_status_id,
      job_updated_by_user_id,
    } = req.body;

    const job_update_date = new Date();

    const [result] = await db.query(
      `UPDATE jobs SET 
         job_name = ?, 
         job_desc = ?, 
         job_schedule = ?, 
         job_start_date = ?, 
         job_end_date = ?, 
         job_status_id = ?, 
         job_update_date = ?, 
         job_updated_by_user_id = ?
       WHERE 
         job_id = ?`,
      [
        job_name,
        job_desc,
        job_schedule,
        job_start_date,
        job_end_date,
        job_status_id,
        job_update_date,
        job_updated_by_user_id,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully' });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query('DELETE FROM jobs WHERE job_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: err.message });
  }
};

// Export all controller functions
module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};