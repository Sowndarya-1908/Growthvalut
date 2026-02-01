import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const defaultProfile = {
    name: "Olivia Rhye",
    role: "Product Designer based in Melbourne.",
    about: "I’m a Product Designer based in Melbourne.",
    location: "Melbourne, Australia",
    portfolio: "oliviarhye.com",
    email: "olivia@email.com",
    github: "github.com/olivia",
    linkedin: "linkedin.com/in/olivia",
    skills: "UX Design, Product Strategy",
    photo: "https://i.pravatar.cc/150",
    education: [{ degree: "B.Des in Design", year: "2015 – 2018" }],
    customSections: [
      { title: "Achievements", content: "Top Designer Award 2022" },
    ],
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [formData, setFormData] = useState(defaultProfile);

  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showEduEdit, setShowEduEdit] = useState(false);
  const [showCustomEdit, setShowCustomEdit] = useState(false);
  const [editingCustomIndex, setEditingCustomIndex] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    if (!user) return;

    const saved = localStorage.getItem("profile_" + user);
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setFormData(parsed);
    }
  }, []);

  const saveProfile = (updatedData) => {
    setProfile(updatedData);
    setFormData(updatedData);

    const user = localStorage.getItem("loggedUser");
    if (user) {
      localStorage.setItem(
        "profile_" + user,
        JSON.stringify(updatedData)
      );
    }
  };

  const styles = {
    container: {
      padding: "30px",
      background: "#f9fafc",
      fontFamily: "Arial",
    },
    cover: {
      height: "160px",
      borderRadius: "20px",
      background:
        "linear-gradient(120deg,#d8b4fe,#a5b4fc,#fbcfe8)",
    },
    profileWrapper: {
      display: "flex",
      gap: "30px",
      marginTop: "-60px",
      flexWrap: "wrap",
    },
    mainCard: {
      flex: 2,
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    },
    sideCard: {
      flex: 1,
      background: "white",
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      minWidth: "250px",
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      border: "5px solid white",
      marginTop: "-60px",
    },
    editBtn: {
      padding: "6px 12px",
      borderRadius: "8px",
      border: "none",
      background: "#7f5af0",
      color: "white",
      cursor: "pointer",
      marginLeft: "10px",
    },
    deleteBtn: {
      padding: "6px 12px",
      borderRadius: "8px",
      border: "none",
      background: "#e53935",
      color: "white",
      cursor: "pointer",
      marginLeft: "10px",
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      width: "450px",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.cover}></div>

        <div style={styles.profileWrapper}>
          <div style={styles.mainCard}>
            <img src={profile.photo} style={styles.avatar} alt="" />

            <h2>
              {profile.name}
              <button
                style={styles.editBtn}
                onClick={() => {
                  setFormData(profile);
                  setShowProfileEdit(true);
                }}
              >
                ✏️
              </button>
            </h2>

            <p>{profile.role}</p>

            <hr />

            <h4>About</h4>
            <p>{profile.about}</p>

            {/* EDUCATION */}
            <h4>
              Education
              <button
                style={styles.editBtn}
                onClick={() => {
                  setFormData(profile);
                  setShowEduEdit(true);
                }}
              >
                ✏️
              </button>
            </h4>

            {profile.education.map((edu, i) => (
              <p key={i}>
                <strong>{edu.degree}</strong> ({edu.year})
              </p>
            ))}

            {/* CUSTOM SECTIONS */}
            {profile.customSections.map((sec, i) => (
              <div key={i}>
                <h4>
                  {sec.title}
                  <button
                    style={styles.editBtn}
                    onClick={() => {
                      setFormData(profile);
                      setEditingCustomIndex(i);
                      setShowCustomEdit(true);
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => {
                      const updated = {
                        ...profile,
                        customSections: profile.customSections.filter(
                          (_, index) => index !== i
                        ),
                      };
                      saveProfile(updated);
                    }}
                  >
                    🗑
                  </button>
                </h4>
                <p>{sec.content}</p>
              </div>
            ))}

            <button
              style={{ ...styles.editBtn, marginTop: "10px" }}
              onClick={() => {
                const updated = {
                  ...profile,
                  customSections: [
                    ...profile.customSections,
                    { title: "New Section", content: "" },
                  ],
                };
                saveProfile(updated);
              }}
            >
              + Add New Section
            </button>
          </div>

          <div style={styles.sideCard}>
            <h4>Location</h4>
            <p>{profile.location}</p>

            <h4>Email</h4>
            <p>{profile.email}</p>

            <h4>Portfolio</h4>
            <p>{profile.portfolio}</p>

            <h4>GitHub</h4>
            <p>{profile.github}</p>

            <h4>LinkedIn</h4>
            <p>{profile.linkedin}</p>

            <h4>Skills</h4>
            <p>{profile.skills}</p>
          </div>
        </div>
      </div>

      {/* EDUCATION MODAL */}
      {showEduEdit && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Edit Education</h2>

            {formData.education.map((edu, i) => (
              <div key={i}>
                <input
                  style={styles.input}
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...formData.education];
                    updated[i].degree = e.target.value;
                    setFormData({ ...formData, education: updated });
                  }}
                />
                <input
                  style={styles.input}
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...formData.education];
                    updated[i].year = e.target.value;
                    setFormData({ ...formData, education: updated });
                  }}
                />
              </div>
            ))}

            <button
              style={styles.editBtn}
              onClick={() => {
                saveProfile(formData);
                setShowEduEdit(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* CUSTOM EDIT MODAL */}
      {showCustomEdit && editingCustomIndex !== null && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Edit Section</h2>

            <input
              style={styles.input}
              value={
                formData.customSections[editingCustomIndex].title
              }
              onChange={(e) => {
                const updated = [...formData.customSections];
                updated[editingCustomIndex].title = e.target.value;
                setFormData({ ...formData, customSections: updated });
              }}
            />

            <textarea
              style={styles.input}
              value={
                formData.customSections[editingCustomIndex].content
              }
              onChange={(e) => {
                const updated = [...formData.customSections];
                updated[editingCustomIndex].content = e.target.value;
                setFormData({ ...formData, customSections: updated });
              }}
            />

            <button
              style={styles.editBtn}
              onClick={() => {
                saveProfile(formData);
                setShowCustomEdit(false);
                setEditingCustomIndex(null);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
