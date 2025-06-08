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

---

## ⚙️ Technologies

| Layer        | Stack                                      |
| ------------ | ------------------------------------------ |
| Frontend     | React, Zustand, Tailwind, Socket.IO-client |
| Backend      | Node.js, Express, Socket.IO, JWT           |
| Auth         | JWT stored in HTTP-only cookies            |
| DB (planned) | (Optionally) PostgreSQL or SQLite          |

---

## 🏗 Project Architecture

### Backend (`/backend/src`)

| Path                 | Responsibility                                                    |
| -------------------- | ----------------------------------------------------------------- |
| `routes/users.ts`    | Register and fetch users                                          |
| `routes/messages.ts` | (Optional) Persist/fetch message history                          |
| `routes/me.ts`       | Returns logged-in user via JWT                                    |
| `middleware/auth.ts` | Extract and validate JWT cookie                                   |
| `lib/jwt.ts`         | Sign/verify JWT                                                   |
| `socket.ts`          | Handle real-time events (connect, message, typing, user presence) |
| `types.ts`           | Shared types like `Message`, `User`                               |
| `index.ts`           | Express app + HTTP + Socket.IO init                               |

### Frontend (expected)

- `useChat()` custom hook: manages socket, state, and user
- Zustand slices: `userSlice.ts`, `chatSlice.ts`
- UI Components: Header, ChatSection, MessageInput, Sidebar
- `sendMessage()`, `addMessage()`, `markMessagesSeen()`, etc.

---

## 🔐 Authentication Flow

- Login/Register via `/api/users`
- JWT issued, stored in **secure HTTP-only cookie**
- On page load, `/api/me` checks user session
- Socket connects **after auth check**, emits `user:register`

---

## 🔁 Socket Events

| Event             | Direction        | Payload      |
| ----------------- | ---------------- | ------------ |
| `user:register`   | client → server  | `{ userId }` |
| `user:joined`     | server → clients | `{ userId }` |
| `user:left`       | server → clients | `{ userId }` |
| `users:online`    | server → clients | `userId[]`   |
| `message:send`    | client → server  | `Message`    |
| `message:receive` | server → client  | `Message`    |

---

## 💬 Unseen Message Tracking

- Zustand store keeps `unseenCounts: Record<userId, number>`
- If the chat window is **not open**, unseen count increments
- When a user is selected (`setActiveUser(userId)`), unseen count resets

---

## 📁 Suggested Folder Structure
