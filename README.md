# Cloud-Based Web Application Assignment 1 & 2

## Micky Malvino Kusandiwinata -  22586472  

## Project Overview

This project is a cloud-based interactive application. It is a **Next.js application** that allows users to dynamically generate HTML tabs (assignment 1). Users can add, edit, and remove tabs, then generate the HTML code for use in their own web pages. The application also features **light/dark/other theme switching** and a navigation menu. Added functionality of escape room game (assignment 2) featuring gameplay with timer countdown, multiple option generation, full CRUD backend, automated testing, instrumentation, dockerization, and cloud deployment.

---

## Features (assignment 1)

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
- Pages for Pre-lab Questions and Coding Races are are under construction.  

---

## Newly Added Features (assignment 2)

### 1. Escape Room
- Escape Room gameplay implemented
- Adjustable timer functionality
- Visually pleasing Map background
- <span style="color:skyblue;">"!"</span> symbol as hotspots
- Interactive game mechanics (solve the hotspot challenges to win)
- Application output is fully operational
- Users can generate multiple gameplay options

#### Save Button Functionality
The application includes a Save button as required by the assignment specification.  
The Save button is used when creating or editing a hotspot (inside the popup). It performs the following actions:

- Saves hotspot details such as the filled in Question, coordinates, and solution.
- Writes these values into the SQLite database via Prisma including "created at" information and "updated at".
- Triggers the appropriate CRUD API route (POST for creation, PUT for updates).

This ensures that hotspot data persists across refreshes and restarts.  
Without the Save button, changes would not be stored in the database and gameplay would not remain consistent.


### 2.Dockerization 
- Application is fully Dockerized
- Multi-stage Dockerfile used for build and production
- Application runs successfully inside a Docker container locally and in the cloud

Docker image:
```
cwa-assignment1-escape-room-app:latest
```

### 3.APIs, CRUD and Database 
- Database schema designed using Prisma
- SQLite database used for data persistence
- Full CRUD APIs implemented (Create, Read, Update, Delete)
- APIs are consumed by the frontend gameplay system

#### Seed File
The project includes a Prisma seed file (`seedRoom.ts`) used to initialize the database with required starting data.  
This seed file is needed because:

- A fresh environment (Docker container or Railway deployment) may begin with an empty SQLite database.
- The Escape Room game requires an initial room or hotspot structure in order to function immediately.
- Seeding ensures consistent behaviour across different machines and deployments.

To put it simply, the seed file populates the database with initial demo data using `npx prisma db seed`. This guarantees that gameplay is functional even in a newly deployed environment.



### 4.Instrumentation and Testing 
- Application instrumented for testing and monitoring
- Playwright end-to-end tests implemented
- Four Playwright tests demonstrated in the submission video
- Lighthouse performance report generated and demonstrated

To see the visual process of the test, use the command:
```
npx playwright test --ui
```


<span style="color:green;">Confirmed that all tests were able to pass successfully</span>


### 5.Cloud Deployment
- Application deployed on the cloud using Railway
- Public deployment URL is accessible @ https://cwa-assignment1-production.up.railway.app/

#### Why Railway Was Used for Deployment
Railway was selected as the deployment platform for the following reasons:

- Reliable support for Docker containers, matching the requirements for this assignment .
- Deployment pipeline works with Next.js, Prisma, and SQLite.
- Simple environment variable management, critical for Prisma’s `DATABASE_URL`.
- Supports persistent filesystem access suitable for SQLite databases.
- Provides a public HTTPS domain without additional configuration.
- Fast to deploy and integrated with GitHub.

---

## Technology Stack
- **Frontend Framework:** Next.js 15 (App Router)  
- **Styling:** Tailwind CSS v4 + DaisyUI 5 
- **Language:** TypeScript / TSX  
- **Database:** SQLite
- **ORM:** Prisma
- **Testing:** Playwright
- **Containerization:** Docker
- **Cloud Platform:** Railway

---

## Running the Application Locally

### Without Docker
 
   ```
   git clone <repository-url>
    cd cwa-assignment1
    npm install
    npm run dev
   ```
Open a browser and navigate to http://localhost:3000

### With Docker
    ```
     docker build -t cwa-assignment2 .
    docker run -p 3000:3000 cwa-assignment2
    ```

### Cloud Deployment

Application deployed on the cloud using Railway

Public deployment URL is accessible @ https://cwa-assignment1-production.up.railway.app/

## Notes
Gen AI used carefully for **planning, generating code, give coding guidance, refactoring, debugging, explaining concepts,** etc.

Gen AI used: ChatGPT, Copilot, Gemini