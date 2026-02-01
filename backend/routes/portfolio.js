const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// ================= GET ALL =================
router.get("/", authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM portfolio WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// ================= ADD =================
router.post("/", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { title, description, link } = req.body;

  db.query(
    "INSERT INTO portfolio (title, description, link, user_id) VALUES (?, ?, ?, ?)",
    [title, description, link, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Portfolio added" });
    }
  );
});

// ================= DELETE =================
router.delete("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM portfolio WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted successfully" });
    }
  );
});

module.exports = router;
