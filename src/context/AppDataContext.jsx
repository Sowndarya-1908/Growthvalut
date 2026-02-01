import { createContext, useState, useEffect } from "react";

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const user = localStorage.getItem("loggedUser");

  const getInitialData = () => {
    if (!user) return {
      skills: [],
      courses: [],
      projects: [],
      certificates: [],
      goals: []
    };

    const saved = localStorage.getItem("data_" + user);
    return saved
      ? JSON.parse(saved)
      : {
          skills: [],
          courses: [],
          projects: [],
          certificates: [],
          goals: []
        };
  };

  const [data, setData] = useState(getInitialData);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "data_" + user,
        JSON.stringify(data)
      );
    }
  }, [data]);

  return (
    <AppDataContext.Provider value={{ data, setData }}>
      {children}
    </AppDataContext.Provider>
  );
};
