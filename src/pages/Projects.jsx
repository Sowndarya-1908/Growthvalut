import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [status, setStatus] = useState("Completed");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH PROJECTS =================
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= ADD PROJECT =================
  const handleSubmit = async () => {
    if (!title || !description) return;

    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        description,
        tech,
        status,
        github,
        live,
      }),
    });

    setTitle("");
    setDescription("");
    setTech("");
    setStatus("Completed");
    setGithub("");
    setLive("");

    fetchProjects(); // refresh
  };

  // ================= DELETE =================
  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    fetchProjects();
  };

  const styles = {
    container: { padding: "30px" },

    form: {
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      marginBottom: "30px",
    },

    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      marginBottom: "15px",
    },

    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      marginBottom: "15px",
    },

    btn: {
      padding: "10px 20px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg,#7f5af0,#f15bb5)",
      color: "white",
      cursor: "pointer",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "25px",
    },

    card: {
      background: "white",
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    },

    deleteBtn: {
      marginTop: "10px",
      padding: "6px 12px",
      borderRadius: "8px",
      border: "none",
      background: "#e53935",
      color: "white",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Projects</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Tech Stack (React, Node)"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />

        <select
          style={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Completed</option>
          <option>Ongoing</option>
        </select>

        <input
          style={styles.input}
          placeholder="GitHub URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Live URL"
          value={live}
          onChange={(e) => setLive(e.target.value)}
        />

        <button style={styles.btn} onClick={handleSubmit}>
          Add Project
        </button>
      </div>

      {/* PROJECT LIST */}
      <div style={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} style={styles.card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Tech:</strong> {project.tech}</p>

            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}

            <br />

            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer">
                Live
              </a>
            )}

            <br />

            <button
              style={styles.deleteBtn}
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
