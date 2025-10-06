import React from 'react';

interface FooterProps {
  name: string;
  number: string;
  year: number;
}

{/* Footer with Copyright, name, id, date */}
export function Footer({ name, number, year }: FooterProps) {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-4 mt-12 shadow-inner">
      <div className="container mx-auto px-4 md:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          &copy; {year} Copyright 
        </p>
        <p>
          <span className="font-semibold">{name}</span> | <span className="font-semibold">{number}</span> | {new Date().toLocaleDateString()}
        </p>
      </div>
    </footer>
  );
}
