require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skills");
const courseRoutes = require("./routes/courses");
const projectRoutes = require("./routes/projects");
const certificateRoutes = require("./routes/certificates");
const portfolioRoutes = require("./routes/portfolio");

// ✅ Route Usage
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/portfolio", portfolioRoutes);

// ✅ Default Route (optional but useful)
app.get("/", (req, res) => {
  res.send("GrowthVault Backend Running 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
