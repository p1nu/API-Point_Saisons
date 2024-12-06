const express = require('express');
const routerMission = express.Router();

const { getAllMissions, getMissionById, getMissionByCSRId, createMission, updateMission, deleteMission } = require('../controller/controllerMission');

// Get all missions
routerMission.get('/all', getAllMissions);

// Get a mission
routerMission.get('/:id', getMissionById);

// Get a mission by csr_id
routerMission.get('/csr/:csr_id', getMissionByCSRId);

// Create a new mission
routerMission.post('/new', createMission);

// Update a mission
routerMission.put('/update/:id', updateMission);

// Delete a mission
routerMission.delete('/delete/:id', deleteMission);

module.exports = routerMission;