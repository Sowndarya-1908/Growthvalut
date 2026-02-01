import { useState, useEffect } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 Fetch Skills from Backend
  const fetchSkills = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/skills", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // 🔥 Add Skill
  const handleAddSkill = async () => {
    if (!name || !level) return alert("Fill all fields");

    try {
      await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ name, level }),
      });

      setName("");
      setLevel("");
      fetchSkills(); // Refresh list
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  // 🔥 Delete Skill
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const styles = {
    container: {
      padding: "30px",
    },

    form: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },

    input: {
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },

    button: {
      padding: "8px 15px",
      background: "linear-gradient(90deg,#7f5af0,#f15bb5)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },

    card: {
      background: "white",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h2>My Skills</h2>

      {/* Add Skill Form */}
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Level (Beginner / Advanced)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <button style={styles.button} onClick={handleAddSkill}>
          Add
        </button>
      </div>

      {/* Skills List */}
      {skills.map((skill) => (
        <div key={skill.id} style={styles.card}>
          <div>
            <strong>{skill.name}</strong> — {skill.level}
          </div>

          <button
            style={styles.button}
            onClick={() => handleDelete(skill.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Skills;
