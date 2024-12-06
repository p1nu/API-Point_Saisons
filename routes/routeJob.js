const express = require('express');
const { getAllJobs, getJobById, createJob, updateJob, deleteJob } = require('../controller/controllerJob.js');

const routerJob = express.Router();

// Get all jobs
routerJob.get('/all', getAllJobs);

// Get a job
routerJob.get('/:id', getJobById);

// Create a new job
routerJob.post('/new', createJob);

// Update a job
routerJob.put('/update/:id', updateJob);

// Delete a job
routerJob.put('/delete/:id', deleteJob);

module.exports = routerJob;