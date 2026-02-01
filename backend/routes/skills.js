const express = require("express");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔐 Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = decoded.id;
    next();
  });
};


// ✅ GET all skills for logged user
router.get("/", verifyToken, (req, res) => {
  db.query(
    "SELECT * FROM skills WHERE user_id = ?",
    [req.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});


// ✅ ADD skill
router.post("/", verifyToken, (req, res) => {
  const { name, level } = req.body;

  db.query(
    "INSERT INTO skills (user_id, name, level) VALUES (?, ?, ?)",
    [req.userId, name, level],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Skill added successfully" });
    }
  );
});


// ✅ UPDATE skill
router.put("/:id", verifyToken, (req, res) => {
  const { name, level } = req.body;
  const skillId = req.params.id;

  db.query(
    "UPDATE skills SET name = ?, level = ? WHERE id = ? AND user_id = ?",
    [name, level, skillId, req.userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Skill updated successfully" });
    }
  );
});


// ✅ DELETE skill
router.delete("/:id", verifyToken, (req, res) => {
  const skillId = req.params.id;

  db.query(
    "DELETE FROM skills WHERE id = ? AND user_id = ?",
    [skillId, req.userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Skill deleted successfully" });
    }
  );
});

module.exports = router;
