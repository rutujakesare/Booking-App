const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", appointmentRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log(err));
