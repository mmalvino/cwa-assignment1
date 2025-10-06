"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pre-lab Questions", path: "/pre-lab-questions" },
    { name: "Escape Room", path: "/escape-room" },
    { name: "Coding Races", path: "/coding-races" },
  ];

  return (
    <header className="w-full border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Title, Student ID */}
        <div>
          <h1 className="text-2xl font-bold">Micky Malvino Kusandiwinata</h1>
          <p className="text-lg font-semibold">22586472</p>
        </div>

        {/* Theme Toggle, Hamburger menu */}
        <div className="flex items-center space-x-4">
          <div className="scale-125">
            <ThemeToggle />
          </div>
          <button
            className="text-3xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="flex justify-end px-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg z-50 w-48 mt-2">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Nav Bar */}
      <nav className="flex space-x-6 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="text-base font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}