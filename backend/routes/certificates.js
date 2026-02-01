const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= GET ================= */

router.get("/", authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM certificates WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

/* ================= ADD ================= */

router.post("/", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { title, file, fileName } = req.body;

  if (!title || !file) {
    return res.status(400).json({ message: "Missing data" });
  }

  db.query(
    "INSERT INTO certificates (title, file, fileName, user_id) VALUES (?, ?, ?, ?)",
    [title, file, fileName, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Certificate added successfully" });
    }
  );
});

/* ================= DELETE ================= */

router.delete("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM certificates WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted successfully" });
    }
  );
});

module.exports = router;
