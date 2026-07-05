import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("appDarkMode") === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("appDarkMode", darkMode);

    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
      body.classList.add("dark-mode-asset");
      body.classList.add("dark-mode-room");
      body.classList.add("dark-mode-category");
      body.classList.add("dark-mode-maintenance");
    } else {
      body.classList.remove("dark-mode");
      body.classList.remove("dark-mode-asset");
      body.classList.remove("dark-mode-room");
      body.classList.remove("dark-mode-category");
      body.classList.remove("dark-mode-maintenance");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
