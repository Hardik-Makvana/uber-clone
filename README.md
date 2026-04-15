# 🚗 Uber Clone

A full-stack ride-hailing web application inspired by Uber, built with **React.js** and **Node.js**. This project replicates core features like user/driver authentication, ride booking, and real-time Google Maps tracking.

> ⚠️ **Status: Work In Progress** — Active development ongoing. Some features may be incomplete or subject to change.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔐 **User & Driver Authentication** — Secure login and registration for both riders and drivers
- 🗺️ **Google Maps Integration** — Live location tracking with real-time map rendering
- 🚕 **Ride Booking** — Users can request rides by entering pickup and drop-off locations
- 📍 **Live Tracking** — Real-time location updates during an active ride
- 🧭 **Route Visualization** — Display of route directions on the map

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Frontend   | React.js            |
| Backend    | Node.js / Express.js|
| Maps       | Google Maps API     |
| Auth       | JWT / Session-based |
| Database   | MongoDB  |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Google Maps API Key](https://console.cloud.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hardik-Makvana/uber-clone.git
   cd uber-clone
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables** *(see below)*

5. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

6. **Start the frontend app**
   ```bash
   cd client
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

---

## 🔑 Environment Variables

Create a `.env` file in both the `client/` and `server/` directories.

**`client/.env`**
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_API_BASE_URL=http://localhost:5000
```

**`server/.env`**
```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```

> ⚠️ Never commit `.env` files to version control. They are listed in `.gitignore`.

---

## 📁 Project Structure

```
uber-clone/
├── client/                  # React.js Frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages
│       ├── context/         # State management
│       └── App.js
│
├── server/                  # Node.js Backend
│   ├── controllers/         # Route logic
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── index.js
│
└── README.md
```

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

```
Coming soon...
```

---

## 🗺️ Roadmap

- [x] User authentication (login/register)
- [x] Driver authentication
- [x] Google Maps integration
- [x] Ride booking flow
- [ ] Real-time driver-rider matching
- [ ] Payment integration
- [ ] Ride history
- [ ] Push notifications
- [ ] Admin dashboard

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Hardik Makvana**  
GitHub: [@Hardik-Makvana](https://github.com/Hardik-Makvana)

---

> ⭐ If you found this project helpful, consider giving it a star!
