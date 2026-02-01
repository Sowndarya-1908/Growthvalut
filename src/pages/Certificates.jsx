import { useEffect, useState } from "react";

function Certificates() {
  const token = localStorage.getItem("token");

  const [certificates, setCertificates] = useState([]);
  const [title, setTitle] = useState("");
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState("");

  /* ================= FETCH ================= */

  const fetchCertificates = async () => {
    const res = await fetch("http://localhost:5000/api/certificates", {
      headers: { Authorization: token },
    });

    const data = await res.json();
    if (res.ok) setCertificates(data);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  /* ================= FILE HANDLING ================= */

  const handleFile = (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileData(reader.result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  /* ================= ADD ================= */

  const handleSubmit = async () => {
    if (!title || !fileData) return;

    const res = await fetch(
      "http://localhost:5000/api/certificates",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title,
          file: fileData,
          fileName,
        }),
      }
    );

    if (res.ok) {
      setTitle("");
      setFileData(null);
      setFileName("");
      fetchCertificates();
    } else {
      const err = await res.json();
      console.log("Add error:", err);
    }
  };

  /* ================= DELETE ================= */

  const deleteCertificate = async (id) => {
    await fetch(
      `http://localhost:5000/api/certificates/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: token },
      }
    );

    fetchCertificates();
  };

  /* ================= STYLES ================= */

  const styles = {
    container: { padding: "30px" },

    form: {
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      marginBottom: "25px",
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
      <h2>Certificates (PDF Upload)</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Certificate Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {fileName && <p>Selected: {fileName}</p>}

        <button style={styles.btn} onClick={handleSubmit}>
          Add Certificate
        </button>
      </div>

      {certificates.map((cert) => (
        <div key={cert.id} style={styles.card}>
          <h4>{cert.title}</h4>
          <p>{cert.fileName}</p>

          <a
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>

          <br /><br />

          <button onClick={() => deleteCertificate(cert.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Certificates;
