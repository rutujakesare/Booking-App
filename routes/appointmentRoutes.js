const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

const { getAppointments, createAppointment, updateAppointment, deleteAppointment } = require("../controllers/appointmentController");

router.get("/appointments", getAppointments);
router.post("/appointments", createAppointment);
router.put("/appointments/:id", updateAppointment);  // Fix here
router.delete("/appointments/:id", deleteAppointment);

module.exports = router;

