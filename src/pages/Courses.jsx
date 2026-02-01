import { useContext, useState, useEffect } from "react";
import { AppDataContext } from "../context/AppDataContext";

function Courses() {
  const { data, setData } = useContext(AppDataContext);
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [progress, setProgress] = useState("");
  const [editId, setEditId] = useState(null);

  /* ================= FETCH COURSES ================= */

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        headers: { Authorization: token },
      });

      const result = await res.json();

      if (res.ok) {
        setData({ ...data, courses: result });
      } else {
        console.log(result.message);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ================= ADD / UPDATE ================= */

  const handleSubmit = async () => {
    if (!title || !provider) return;

    const courseData = {
      title,
      provider,
      progress: Number(progress) || 0,
    };

    try {
      if (editId) {
        // UPDATE
        await fetch(`http://localhost:5000/api/courses/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(courseData),
        });
      } else {
        // ADD
        await fetch("http://localhost:5000/api/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(courseData),
        });
      }

      setTitle("");
      setProvider("");
      setProgress("");
      setEditId(null);

      fetchCourses();
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  /* ================= DELETE ================= */

  const deleteCourse = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      fetchCourses();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  /* ================= EDIT ================= */

  const startEdit = (course) => {
    setTitle(course.title);
    setProvider(course.provider);
    setProgress(course.progress);
    setEditId(course._id); // MongoDB
  };

  /* ================= STYLES ================= */

  const styles = {
    container: { padding: "20px" },

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
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "20px",
    },

    card: {
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      transition: "0.3s",
    },

    title: {
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "5px",
    },

    provider: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "10px",
    },

    progressBarContainer: {
      height: "8px",
      background: "#eee",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "10px",
    },

    progressBar: (value) => ({
      width: `${value}%`,
      height: "100%",
      background:
        value === 100
          ? "#00c853"
          : "linear-gradient(90deg,#7f5af0,#f15bb5)",
      transition: "width 0.5s ease",
    }),

    status: (value) => ({
      fontSize: "12px",
      fontWeight: "bold",
      color: value === 100 ? "#00c853" : "#7f5af0",
    }),

    actionBtn: {
      marginTop: "10px",
      marginRight: "5px",
      padding: "5px 10px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Courses</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Provider (Udemy, Coursera, etc)"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Progress %"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />

        <button style={styles.btn} onClick={handleSubmit}>
          {editId ? "Update Course" : "Add Course"}
        </button>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {data.courses?.map((course) => (
          <div
            key={course._id}
            style={styles.card}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={styles.title}>{course.title}</div>
            <div style={styles.provider}>{course.provider}</div>

            <div style={styles.progressBarContainer}>
              <div style={styles.progressBar(course.progress)}></div>
            </div>

            <div style={styles.status(course.progress)}>
              {course.progress === 100
                ? "Completed"
                : `In Progress (${course.progress}%)`}
            </div>

            <div>
              <button
                style={{
                  ...styles.actionBtn,
                  background: "#00bbf9",
                  color: "white",
                }}
                onClick={() => startEdit(course)}
              >
                Edit
              </button>

              <button
                style={{
                  ...styles.actionBtn,
                  background: "#e53935",
                  color: "white",
                }}
                onClick={() => deleteCourse(course._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
