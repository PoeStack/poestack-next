import { createContext, useContext, useEffect, useState } from "react";

const initalContext: {
  theme: string;
  setTheme: any;
} = {
  theme: "Dark",
  setTheme: (theme: string) => {},
};

export const Profile_Themes = ["Dark", "Light", "Vaal"];

export const ProfileThemeContext = createContext(initalContext);

export function PoeStackThemeProvider({ children }) {
  const [theme, setTheme] = useState(Profile_Themes[0]);

  const value = {
    theme: theme,
    setTheme: setTheme,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("selected-theme") ?? Profile_Themes[0]);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("selected-theme", theme);
    }
  }, [theme]);

  return (
    <ProfileThemeContext.Provider value={value}>
      {children}
    </ProfileThemeContext.Provider>
  );
}

export const useProfileThemeContext = () => useContext(ProfileThemeContext);
