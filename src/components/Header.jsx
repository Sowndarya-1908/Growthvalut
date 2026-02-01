import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      background: "white",
      borderBottom: "1px solid #eee",
    },

    buttons: {
      display: "flex",
      gap: "15px",
    },

    btn: {
      padding: "8px 15px",
      background: "linear-gradient(90deg, #7f5af0, #f15bb5)",
      color: "white",
      borderRadius: "20px",
      fontSize: "14px",
      cursor: "pointer",
      border: "none",
    },
  };

  return (
    <div style={styles.header}>
      <h3>GrowthVault</h3>

      <div style={styles.buttons}>
        {!token ? (
          <>
            <button
              style={styles.btn}
              onClick={() => navigate("/")}
            >
              Login
            </button>

            <button
              style={styles.btn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <button
            style={styles.btn}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
