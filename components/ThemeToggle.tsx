"use client";

import { useEffect } from "react";

export function ThemeToggle() {
  // Load the saved theme on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // Save theme whenever a radio is clicked
  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 text-base-content rounded-box z-1 w-52 p-2 shadow-2xl"
      >
        {["light", "dark", "retro", "cyberpunk", "valentine", "aqua"].map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
              value={theme}
              onChange={() => handleThemeChange(theme)}
              defaultChecked={
                typeof window !== "undefined" &&
                document.documentElement.getAttribute("data-theme") === theme
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
