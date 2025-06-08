# React + TypeScript + Vite + Express + socket IO

<!-- Works in GitHub -->
<p align="center">
  <a href="https://www.youtube.com/watch?v=EJgRzUraV48" target="_blank">
    <img src="https://img.youtube.com/vi/EJgRzUraV48/0.jpg" alt="Watch Demo" width="600" />
  </a>
</p>

# 💬 Real-Time Chat App – System Design & Architecture

A scalable real-time chat application built with **React + Zustand + Socket.IO** on the frontend and **Node.js + Express + Socket.IO + JWT + PostgreSQL** on the backend.

---

## 🧩 System Design Overview

### 🏛 Architecture Diagram

[Client (React)] <---> [Socket.IO (WebSocket)] <---> [Node.js Server]
↑ ↑
| |
REST APIs PostgreSQL
(Auth, Profile, Users) (Users, Messages)

---

## ⚙️ Technologies Used

| Layer      | Stack                                        |
| ---------- | -------------------------------------------- |
| Frontend   | React, Zustand, Tailwind, Socket.IO-client   |
| Backend    | Node.js, Express, Socket.IO, JWT, bcrypt     |
| Database   | PostgreSQL with Knex.js or Prisma ORM        |
| Realtime   | WebSocket via Socket.IO                      |
| Auth       | JWT (stored in HTTP-only secure cookie)      |
| Deployment | Vercel / Netlify (FE), Render / Railway (BE) |

---

## 🏗 Application Architecture

### 1. **Frontend (React + Zustand)**

- `Zustand Store Slices` for:
  - `UserSlice`: Tracks logged-in user, active user, and online status
  - `ChatSlice`: Stores per-user messages, unseen message counts
- `Socket.IO client` connects on login
- `REST API calls` for:
  - `/api/users`: Create & fetch users
  - `/api/messages`: Optional, for syncing messages

### 2. **Backend (Node.js + Socket.IO)**

#### Express HTTP Server

- `/api/login`: Creates user + sets signed JWT cookie
- `/api/me`: Returns logged-in user from JWT
- `/api/users`: Returns all users
- Middleware:
  - `authMiddleware`: Extracts and verifies JWT from cookie

#### Socket.IO Server

- `user:register`: Maps socket ID to user ID
- `message:send`: Emits message to receiver socket (via in-memory map)
- `user:joined/left`: Broadcast online status
- `typing`: Optional typing indicators

### 3. **Database (PostgreSQL)**

| Table      | Fields                                                |
| ---------- | ----------------------------------------------------- |
| `users`    | `id`, `name`, `email`, `avatar`, `created_at`         |
| `messages` | `id`, `sender_id`, `receiver_id`, `text`, `timestamp` |

---

## 🧠 Realtime Strategy

- **Each user has one active socket ID**
- Maintain a `Map<userId, socketId>` in memory
- Broadcast `users:online` and `user:joined/left` updates
- Deliver messages using `io.to(socketId).emit(...)`

---

## 🧪 Optimizations

- **Debounced user fetch** on "user:joined"
- **Unseen message count** tracked client-side
- Use `Redis` Pub/Sub for cross-instance socket scaling (optional)

---

## 🔐 Authentication

- JWT stored in HTTP-only cookie
- Auth middleware validates every `/api/*` route
- Socket auth via emitting `user:register` after page load

---

## 🚀 Future Improvements

- ✅ Message history persistence
- ✅ Message delivery status (sent/read)
- ⬜ Media support (images, voice)
- ⬜ Group chats
- ⬜ Notifications via service workers
- ⬜ Redis + Socket.IO adapter for horizontal scaling

---

## 📂 Folder Structure
