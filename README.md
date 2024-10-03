# Ensayador
*A Google Forms type application.*

Ensayador is a simple project I built primarily as a learning exercise. The main focus of this project was to develop both a custom backend and frontend, simulating popular frameworks like Laravel and React. The backend was developed in an MVC (Model-View-Controller) style, similar to Laravel, while the frontend was built as a single-page application (SPA), inspired by React.

This project was a way for me to dive deeper into building a full-stack web application from scratch while using best practices in software architecture. Below, I detail the core features of the application as well as the steps required to run it locally.

## __Features__
1. Authentication and authorization for both companies and testers, handled in both frontend and backend.
2. Companies can create and manage surveys.
3. Testers can participate in and fill out surveys.
4. Companies can manage testers (register and remove).
5. Surveys are illustrated with charts using the Google Charts API to visualize responses.

## __Steps for Running on Your Local Machine__

### Prerequisites
- **XAMPP** (for running Apache and MySQL servers)
- **npm** (for managing frontend dependencies)

### 1. Set Up XAMPP
1. Set up XAMPP if you haven't already.
2. Place this project folder inside the `htdocs` directory.
3. Start Apache and MySQL from the XAMPP control panel.

### 2. Database Setup
1. Locate the `.sql` file included in the project folder.
2. Open your browser and go to `http://localhost/phpmyadmin/`.
3. Create a new database.
4. Run the `.sql` script inside the newly created database.

### 3. Client Setup
1. Install npm if you haven't done so already.
2. Navigate to the `client` folder.
3. Run `npm install` to install all dependencies.
4. Run `npm start` to start the client (by default, it runs on port 3000).

### 4. Server Setup
1. Navigate to the `server` folder.
2. Set the environment variables in the `.env` file.

### __Now, you should be able to use the application. Enjoy!__
