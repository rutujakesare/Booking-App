const { Appointment } = require("../models/appointment");

// Get all appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Trim spaces from name, email, phone
        const newAppointment = await Appointment.create({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim()
        });

        console.log("Inserted Data:", newAppointment.dataValues); // Log the inserted data
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error inserting data:", error); // Log error
        res.status(500).json({ error: error.message });
    }
};


// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        await appointment.update({ name, email, phone });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        await appointment.destroy();
        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

