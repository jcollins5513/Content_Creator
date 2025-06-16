---
description: To begin the project with
---

# 🚀 Windsurf Start of Project Prompt

## 🏁 Project Title
**Isometric Smart TV App – Media & Calendar**

---

## 🧭 Instructions to Windsurf

### Step 1: Create the `master-plan.md`
- This file will act as the high-level roadmap.
- It must not be changed after creation unless I explicitly instruct you to.
- It defines the core features and structure of the project.

### Step 2: Generate `granular-plan.md`
- Based strictly on the `master-plan.md`.
- Break each task into actionable, session-level steps.
- Use this to track progress only for the current conversation.
- Update it only at the end of the session by checking off completed tasks.
- Do not modify `master-plan.md` when checking off granular items.

---

## 🎯 Objective
Create a 3D isometric Smart TV application with:
- A **Media Player Panel** that allows uploading and displaying video/photo content.
- A **Google Calendar Panel** that fetches and displays upcoming appointments.

This app will run as a fullscreen experience on a Smart TV (tvOS, Firestick, or web-based Smart TVs).

---

## 🛠️ Tech Stack

### Frontend
- React (with functional components)
- Three.js or Babylon.js for 3D isometric environment
- TailwindCSS for UI styling
- OAuth2 Google integration (Calendar API)
- TV/WebOS compatibility considerations

### Backend
- Node.js with Express or Fastify
- File upload handler (Multer or Cloudinary integration)
- Google OAuth2 service for calendar access
- RESTful API for fetching calendar data & uploaded content
- Optional: Firebase or Supabase for real-time capabilities

---

## 📁 Project Structure (Suggested)

/tv-app-3d-isometric
├── frontend/
│ ├── components/
│ ├── scenes/
│ ├── utils/
│ └── App.tsx
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── services/
│ └── index.ts
├── public/
├── master-plan.md
├── granular-plan.md
└── package.json