import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeController = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "business" : "cupcake";
    }
    return "cupcake";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "business" ? "cupcake" : "business"));
  };

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input
        type="checkbox"
        className="theme-controller"
        onChange={toggleTheme}
        checked={theme === "business"}
      />

      <Sun className="swap-on" size={30} />
      <Moon className="swap-off" size={30} />
    </label>
  );
};
