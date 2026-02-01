import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const token = localStorage.getItem("token");

  const [skills, setSkills] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const headers = { Authorization: token };

      const [
        skillsRes,
        coursesRes,
        projectsRes,
        certRes,
        portfolioRes,
      ] = await Promise.all([
        fetch("http://localhost:5000/api/skills", { headers }),
        fetch("http://localhost:5000/api/courses", { headers }),
        fetch("http://localhost:5000/api/projects", { headers }),
        fetch("http://localhost:5000/api/certificates", { headers }),
        fetch("http://localhost:5000/api/portfolio", { headers }),
      ]);

      setSkills(await skillsRes.json());
      setCourses(await coursesRes.json());
      setProjects(await projectsRes.json());
      setCertificates(await certRes.json());
      setPortfolio(await portfolioRes.json());

    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  // ================= CALCULATIONS =================

  const totalItems =
    skills.length +
    courses.length +
    projects.length +
    certificates.length +
    portfolio.length;

  const progress =
    totalItems === 0 ? 0 : Math.min(totalItems * 10, 100);

  const chartData = {
    labels: [
      "Skills",
      "Courses",
      "Projects",
      "Certificates",
      "Portfolio",
    ],
    datasets: [
      {
        label: "Growth Activity",
        data: [
          skills.length,
          courses.length,
          projects.length,
          certificates.length,
          portfolio.length,
        ],
        backgroundColor: "#7f5af0",
      },
    ],
  };

  const styles = {
    container: { padding: "30px" },

    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },

    progressBox: {
      marginTop: "30px",
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Dashboard Overview</h2>

      {/* Stat Cards */}
      <div style={styles.cards}>
        <StatCard title="Skills" value={skills.length} />
        <StatCard title="Courses" value={courses.length} />
        <StatCard title="Projects" value={projects.length} />
        <StatCard title="Certificates" value={certificates.length} />
        <StatCard title="Portfolio" value={portfolio.length} />
      </div>

      {/* Overall Progress */}
      <div style={styles.progressBox}>
        <h3>Overall Progress</h3>
        <h2>{progress}%</h2>
        <p>Based on total activity growth</p>
      </div>

      {/* Activity Graph */}
      <div style={{ marginTop: "30px" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        textAlign: "center",
      }}
    >
      <h4>{title}</h4>
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          background: "linear-gradient(90deg,#7f5af0,#f15bb5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default Dashboard;
