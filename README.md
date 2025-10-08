# Cloud-Based Web Application Assignment 1

## Micky Malvino Kusandiwinata -  22586472  

## Project Overview

This project is a **Next.js application** that allows users to dynamically generate HTML tabs. Users can add, edit, and remove tabs, then generate the HTML code for use in their own web pages. The application also features **light/dark/other theme switching** and a navigation menu.

---

## Features

### 1. Tabs Generator
- Add up to 15 tabs.  
- Edit tab titles and content.  
- Remove tabs.  
- Generate functional HTML code with inline CSS and clickable tabs.  
- Copy the code and paste into a `.html` file, then open in a browser to see the result.  
- Tabs are stored in localStorage, so changes persist across page reloads.
- Styling for the generated HTML code uses in-line CSS.  
- The generated HTML does not rely on any CSS classes.

### 2. Hamburger Menu & Navigation
- A **hamburger menu** is available on all screen sizes (desktop and mobile).  
- Uses **CSS transform animations** for rotation when toggled.  
- Full navigation bar with links to all pages:  
  - Home (Tabs Generator)  
  - About  
  - Pre-lab Questions  
  - Escape Room  
  - Coding Races  

### 3. Theme Switching
- Users can select from multiple themes: `light` (default), `dark`, `retro`, `cyberpunk`, `valentine`, and `aqua`.  
- Theme switching uses **DaisyUI's Theme Controller dropdown component**.  
- The selected theme persists, so it is unchanged on page reload.  

### 4. About Page
- Has my name and student number.  
- Contains a short demonstration video (embed via YouTube) showing how to use the website.

### 5. Placeholder Pages
- Pages for Pre-lab Questions, Escape Room, and Coding Races are left-aligned and indicate they are under construction.  

---

## Technology Stack
- **Frontend Framework:** Next.js 15 (App Router)  
- **Styling:** Tailwind CSS v4 + DaisyUI 5 
- **Language:** TypeScript / TSX  
- **Browser Storage:** localStorage for persistence  

---

## Installation & Setup

1. Clone the repository:  
   ```
   git clone <this-repo-url>
   ```

2. Go to the project directory:  
    ```
     cd <this-repo-folder>
    ```

3. Install dependencies:
    ```
    npm install
    ```

4. Run the development server:
    ```
    npm run dev
    ```

5. Open browser and go to http://localhost:3000.

## Notes
Gen AI used mainly for **planning, coding guidance, refactoring, debugging, explaining concepts,** etc.

Gen AI used: ChatGPT, Copilot