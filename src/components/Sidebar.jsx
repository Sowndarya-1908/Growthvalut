import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const styles = {
    sidebar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "260px",
      height: "100vh",
      background: "linear-gradient(180deg, #7f5af0, #f15bb5)",
      color: "white",
      padding: "30px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      overflowY: "auto",
    },

    logo: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "40px",
    },

    menu: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },

    link: (path) => ({
      textDecoration: "none",
      color: "white",
      padding: "10px 15px",
      borderRadius: "12px",
      background:
        location.pathname === path
          ? "rgba(255,255,255,0.2)"
          : "transparent",
      transition: "0.3s",
    }),

    footer: {
      fontSize: "12px",
      opacity: 0.8,
      marginTop: "40px",
    },
  };

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.logo}>GrowthVault</div>

        <div style={styles.menu}>
          {/* REMOVE to="/" completely */}
          <Link to="/home" style={styles.link("/home")}>Home</Link>
          <Link to="/dashboard" style={styles.link("/dashboard")}>Dashboard</Link>
          <Link to="/skills" style={styles.link("/skills")}>Skills</Link>
          <Link to="/courses" style={styles.link("/courses")}>Courses</Link>
          <Link to="/certificates" style={styles.link("/certificates")}>Certificates</Link>
          <Link to="/portfolio" style={styles.link("/portfolio")}>Portfolio</Link>
          <Link to="/projects" style={styles.link("/projects")}>Projects</Link>
         
        </div>
      </div>

      <div style={styles.footer}>© 2026 GrowthVault</div>
    </div>
  );
}

export default Sidebar;
