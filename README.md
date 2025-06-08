# 💬 Chat App – Design & Architecture

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

- frontend/
  - src/
    - assets/
    - components/
      - auth-modal/
      - chat-section/
        - ChatWindow/
          - ChatForm.tsx
          - ChatHeader.tsx
          - ChatThread.tsx
        - ChatSidebar.tsx
        - index.tsx
    - common/
      - Header.tsx
    - hooks/
      - useChat.ts
    - lib/
      - socket.ts
      - utils.ts
    - store/
      - chatSlice.ts
      - userSlice.ts
      - profileSlice.ts
      - index.ts
    - App.tsx
    - main.tsx
    - route.ts

---

### 🖥 Backend `/backend/src`

- backend/
  - src/
    - routes/
      - users.ts
      - messages.ts
      - me.ts
    - middleware/
      - auth.ts
    - lib/
      - jwt.ts
    - socket.ts
    - types.ts
    - index.ts

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

---

### ✅ Online Presence

- `Map<userId, socketId>` on backend
- `users:online` event sent to all clients
- Online dots and counts shown in `ChatSidebar`

---

#### Socket.IO Server

- `user:register`: Maps socket ID to user ID
- `message:send`: Emits message to receiver socket (via in-memory map)
- `user:joined/left`: Broadcast online status
- `typing`: Optional typing indicators

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
