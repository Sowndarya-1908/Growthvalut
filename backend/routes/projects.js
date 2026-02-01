const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

// 🔥 GET Projects
router.get("/", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM projects WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// 🔥 ADD Project
router.post("/", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;

  db.query(
    "INSERT INTO projects (user_id, title, description) VALUES (?, ?, ?)",
    [userId, title, description],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Project added" });
    }
  );
});

// 🔥 DELETE Project
router.delete("/:id", verifyToken, (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  db.query(
    "DELETE FROM projects WHERE id = ? AND user_id = ?",
    [projectId, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Project deleted" });
    }
  );
});

module.exports = router;
