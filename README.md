# Google Calendar Clone

This is a full-stack, high-fidelity clone of Google Calendar built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. It replicates the core functionality of Google Calendar, including event creation, modification, and viewing in a responsive, dark-mode UI.

**Live Frontend (Vercel):** https://google-calendar-akshat.vercel.app

**Backend API (Render):** https://google-calendar-clone-u072.onrender.com

---

## Core Features

* **Full CRUD:** Create, read, update, and delete events.
* **Multiple Views:** Seamlessly switch between Month, Week, and Day calendar views.
* **Interactive Modals:** A single, clean modal for creating new events and editing/deleting existing ones.
* **Responsive UI:** A mobile-first design that adapts from a full 3-column layout on desktop to a clean, usable interface on smaller screens.
* **Persistent Storage:** Event data is saved to a MongoDB Atlas database.

---

## Technology Stack

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Fast, modern UI library for building the interface. |
| | Redux Toolkit | Global state management for events and API status. |
| | Tailwind CSS | Utility-first CSS for rapid, professional styling. |
| | React Big Calendar | Core library for rendering calendar grids and events. |
| | Axios | Promise-based client for making API requests. |
| **Backend** | Node.js | JavaScript runtime for the server. |
| | Express | Web framework for building the RESTful API. |
| | Mongoose | Object Data Modeling (ODM) library for MongoDB. |
| | MongoDB Atlas | Cloud-hosted database for event persistence. |
| | CORS & Dotenv | Standard middleware for security and environment config. |
| **Deployment** | Vercel | Frontend hosting, integrated with GitHub. |
| | Render | Backend hosting for the Node.js web service. |

---

## Architecture

The project is structured as a monorepo, separating the `client` and `server` applications.

### Backend (`/server`)
The backend follows a standard model-controller-route pattern.

```
/server
├── controllers/
│   └── eventController.js
├── models/
│   └── Event.js
├── routes/
│   └── events.js
├── .env
├── index.js
└── package.json
```

* `index.js`: Main server entry point, Express app initialization, middleware, and MongoDB connection.
* `models/Event.js`: Contains the Mongoose schema definition for calendar events.
* `routes/events.js`: Defines the API endpoints (e.g., `/api/events`) and maps them to controller functions.
* `controllers/eventController.js`: Contains the business logic for each CRUD operation (get, create, update, delete).

### Frontend (`/client`)
The frontend uses Vite for a modern build process and separates concerns by feature.
```
/client
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   └── MyCalendar.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   └── Sidebar/
│   │       └── Sidebar.jsx
│   ├── store/
│   │   ├── eventSlice.js
│   │   └── index.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

* `main.jsx`: The main entry point; renders the `App` and Redux `Provider`.
* `App.jsx`: Manages the core application layout (Grid) and all shared UI state (current view, current date, modal status).
* `store/`: Contains the Redux Toolkit setup. `eventSlice.js` defines the global event state and all async thunks for API communication.
* `components/`: Contains all reusable React components, organized by feature. `MyCalendar.jsx` is the core calendar grid and modal-rendering component.

---

## Business Logic and Interactions

### Event Querying
To correctly display events that span multiple days or weeks, the `GET /api/events` endpoint finds all events where:
* The event `start` date is *before* the query's end date.
* The event `end` date is *after* the query's start date.

This ensures that any event that *overlaps* with the current view is fetched.

### User Interactions
The UI is designed around a single, clean modal to handle all CRUD operations.
1.  **Create:** Clicking a blank slot in the calendar, or the "Create" button, lifts state to `App.jsx`. This opens the modal in "create" mode, pre-filled with the selected date (or the current date).
2.  **Edit:** Clicking an existing event on the grid opens the *same* modal, but in "edit" mode, populating the input with the event's current title.
3.  **Delete:** The "Delete" button is only visible when the modal is in "edit" mode.

This state-driven approach keeps the `MyCalendar` component clean, as `App.jsx` simply passes down the correct state to render.

---

## Setup and Local Installation

### Prerequisites
* Node.js (v18+)
* npm
* A MongoDB Atlas account (for the `MONGO_URI` string)

### 1. Clone the Repository
Clone the repository to your local machine:

git clone https://github.com/fiercfly/google-calendar-clone.git
cd google-calendar-clone

### 2. Backend Setup (`/server`)

1.  Navigate to the server directory:
```
cd server
```

2.  Install dependencies:

```
npm install
```

3.  Create a `.env` file in the `/server` root and add your database URI:
```
MONGO_URI=your_mongodb_connection_string
```

4.  Start the server:
```
npm run dev
```

The server will be running on `http://127.0.0.1:5001`.

### 3. Frontend Setup (`/client`)

1.  Open a new terminal and navigate to the client directory:
```
cd client
```

2.  Install dependencies:
```
npm install
```

3.  Start the Vite development server:
```
npm run dev
```

The app will open at `http://localhost:5173`.

---

## Future Enhancements

* **Drag & Drop:** Implement `react-big-calendar`'s drag-and-drop addon to move and resize events.
* **User Authentication:** Add user accounts (e.g., JWT) so that each user has their own private calendar.
* **Recurring Events:** Implement logic (using a library like `rrule.js`) to handle the creation of recurring events.
* **Mini-Calendar:** Add the small month-view calendar to the sidebar for quick date navigation.
