const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;


// MIDDLEWARE (VERY IMPORTANT)
app.use(cors());
app.use(express.json());

// In-memory storage
const attendanceData = {};

// Health check route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Attendance route
app.post("/mark-attendance", (req, res) => {
    const { sessionId, studentId, locationStatus } = req.body;

    // Safety check
    if (!sessionId || !studentId || !locationStatus) {
        return res.status(400).json({
            message: "Invalid request data"
        });
    }

    if (!attendanceData[sessionId]) {
        attendanceData[sessionId] = [];
    }

    if (attendanceData[sessionId].includes(studentId)) {
        return res.json({
            message: "Attendance already marked"
        });
    }

    attendanceData[sessionId].push(studentId);

    return res.json({
        message: "Attendance marked successfully",
        data: attendanceData
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


