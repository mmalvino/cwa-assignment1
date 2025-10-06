"use client";

export function ThemeToggle() {
  const toggleTheme = () => {
    const html = document.documentElement;
    html.setAttribute(
      "data-theme",
      html.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
  };

  return (
    <button className="btn btn-sm" onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}
