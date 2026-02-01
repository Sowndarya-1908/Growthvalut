import { useContext, useState } from "react";
import { AppDataContext } from "../context/AppDataContext";

function Goals() {
  const { data, setData } = useContext(AppDataContext);
  const [goal, setGoal] = useState("");

  const addGoal = () => {
    if (!goal.trim()) return;

    setData({
      ...data,
      goals: [...data.goals, goal],
    });

    setGoal("");
  };

  const styles = {
    container: { padding: "20px" },

    input: {
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      marginRight: "10px",
    },

    btn: {
      padding: "10px 20px",
      borderRadius: "10px",
      border: "none",
      background: "#7f5af0",
      color: "white",
      cursor: "pointer",
    },

    card: {
      marginTop: "10px",
      padding: "15px",
      borderRadius: "12px",
      background: "white",
      boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Goals</h2>

      <input
        style={styles.input}
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter Goal"
      />

      <button style={styles.btn} onClick={addGoal}>
        Add
      </button>

      {data.goals.map((g, i) => (
        <div key={i} style={styles.card}>
          {g}
        </div>
      ))}
    </div>
  );
}

export default Goals;
