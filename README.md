# 💬 Chat App – System Design & Architecture

A real-time 1-on-1 chat application built with **React, Zustand, Socket.IO, and Node.js**, featuring online presence, unseen message counts, and JWT-based authentication.

<!-- Works in GitHub -->
<p align="center">
  <a href="https://www.youtube.com/watch?v=EJgRzUraV48" target="_blank">
    <img src="https://img.youtube.com/vi/EJgRzUraV48/0.jpg" alt="Watch Demo" width="600" />
  </a>
</p>

---

## 🧠 System Design Overview

### 📦 Architecture Diagram

[ React + Zustand + Socket.IO-client ]
│
▼
[ Node.js + Express + Socket.IO ]
│
▼
[ In-memory Map<userId, socketId> ]

---

## ⚙️ Tech Stack

| Layer      | Stack                                        |
| ---------- | -------------------------------------------- |
| Frontend   | React, Zustand, Vite, Tailwind, Lucide Icons |
| Backend    | Node.js, Express, Socket.IO, JWT             |
| Auth       | JWT (signed, stored in HTTP-only cookies)    |
| State Mgmt | Zustand with persisted auth & chat slices    |
| Realtime   | WebSocket via Socket.IO                      |
| Deployment | Vercel (FE) + Render/Railway (BE)            |

---

## 🏗 Folder Architecture

### 🖥 Frontend `/frontend/src`

src/
├── components/
│ ├── auth-modal/ → Login modal
│ └── chat-section/
│ ├── ChatWindow/ → ChatForm, ChatHeader, ChatThread
│ ├── ChatSidebar.tsx → User list, presence, unseen count
├── hooks/
│ └── useChat.ts → Socket events + state integration
├── store/
│ ├── chatSlice.ts → Messages + unseen counts
│ ├── userSlice.ts → Active user, online users
│ └── profileSlice.ts → Authenticated user info
├── lib/
│ ├── socket.ts → Socket.IO connection logic
│ └── utils.ts → Utility functions
├── App.tsx → Root layout
├── main.tsx → App entry

---

### 🖥 Backend `/backend/src`

src/
├── routes/
│ ├── users.ts → Create & fetch users
│ ├── messages.ts → (Future) persist message history
│ └── me.ts → Return logged-in user via JWT
├── middleware/
│ └── auth.ts → JWT authentication middleware
├── lib/
│ └── jwt.ts → Sign/verify JWT tokens
├── socket.ts → All real-time WebSocket events
├── types.ts → Shared interfaces (User, Message)
└── index.ts → Create HTTP + bind Socket.IO server

---

## 🔐 Authentication Flow

- Login via `/api/users` → sets JWT cookie
- JWT stored in **HTTP-only secure cookie**
- On app load → `/api/me` validates session
- After auth, socket connects and emits `user:register`

---

## 🔁 WebSocket Events

| Event             | Direction       | Description                              |
| ----------------- | --------------- | ---------------------------------------- |
| `user:register`   | client → server | Attach socket to user ID                 |
| `users:online`    | server → client | Sends array of currently online user IDs |
| `user:joined`     | server → client | Notify other clients of new user         |
| `user:left`       | server → client | Notify others when a user disconnects    |
| `message:send`    | client → server | Send message with sender/receiver info   |
| `message:receive` | server → client | Broadcast received message               |

---

## 💬 Chat Logic Features

### ✅ Unseen Message Count

- `chatSlice` tracks unseen counts by user ID
- `addMessage()` increments count unless chat window is active
- `markMessagesSeen()` resets count when user is selected

### ✅ Online Presence

- `Map<userId, socketId>` on backend
- `users:online` event sent to all clients
- Online dots and counts shown in `ChatSidebar`

---

## 📚 Future Enhancements

- ✅ Message thread by user
- ✅ Per-user unseen message tracking
- ⬜ Message persistence with PostgreSQL
- ⬜ Media support (images, audio)
- ⬜ Group chat support
- ⬜ Typing indicators
- ⬜ Redis Pub/Sub for horizontal socket scaling

---

## 🧑‍💻 Author

Crafted by [@winit30](https://github.com/winit30)  
Full-stack scalable chat with clean system design & realtime UX.
