import { useEffect, useState } from "react";

function Portfolio() {
  const token = localStorage.getItem("token");

  const [portfolio, setPortfolio] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/portfolio", {
        headers: { Authorization: token },
      });

      const data = await res.json();

      if (res.ok) {
        setPortfolio(data);
      } else {
        console.log("Fetch error:", data);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  /* ================= ADD ================= */

  const handleAdd = async () => {
    if (!title || !description) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title,
          description,
          link,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTitle("");
        setDescription("");
        setLink("");
        fetchPortfolio(); // refresh
      } else {
        console.log("Add error:", data);
      }
    } catch (err) {
      console.log("Add error:", err);
    }

    setLoading(false);
  };

  /* ================= DELETE ================= */

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/portfolio/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    fetchPortfolio();
  };

  /* ================= STYLES ================= */

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

    btn: {
      padding: "10px 20px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg,#7f5af0,#f15bb5)",
      color: "white",
      cursor: "pointer",
      opacity: loading ? 0.6 : 1,
    },

    card: {
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Portfolio</h2>

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
          placeholder="Project Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button style={styles.btn} onClick={handleAdd}>
          {loading ? "Adding..." : "Add Project"}
        </button>
      </div>

      {portfolio.map((item) => (
        <div key={item.id} style={styles.card}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>

          {item.link && (
            <a href={item.link} target="_blank" rel="noreferrer">
              View
            </a>
          )}

          <br /><br />

          <button onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Portfolio;
