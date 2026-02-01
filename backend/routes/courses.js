const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

// 🔥 GET Courses
router.get("/", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM courses WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// 🔥 ADD Course
router.post("/", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { title, status } = req.body;

  db.query(
    "INSERT INTO courses (user_id, title, status) VALUES (?, ?, ?)",
    [userId, title, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Course added" });
    }
  );
});

// 🔥 DELETE Course
router.delete("/:id", verifyToken, (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.id;

  db.query(
    "DELETE FROM courses WHERE id = ? AND user_id = ?",
    [courseId, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Course deleted" });
    }
  );
});

module.exports = router;
