# Master Plan: Isometric Smart TV App – Media & Calendar

This document outlines the high-level roadmap for creating the 3D Isometric Smart TV application.

---

## Sections

- [x] **Phase 1: Project Setup & Core Structure**
  - Initialize the monorepo structure.
  - Set up the Node.js/Express backend project.
  - Set up the React/Vite frontend project.
  - Configure basic tooling: TypeScript, ESLint, Prettier.

- [x] **Phase 2: Backend Development - Media & Calendar APIs**
  - Implement a RESTful API structure with Express.
  - Create the file upload endpoint for media content (photos/videos).
  - Implement Google OAuth2 for server-side authentication.
  - Create endpoints to fetch Google Calendar events.
  - Create endpoints to list and serve uploaded media.

- [x] **Phase 3: Frontend - 3D Isometric Scene**
  - Set up Three.js within the React application.
  - Create the basic 3D isometric room/environment.
  - Design and implement two main panels/screens in the 3D space: one for media, one for the calendar.
  - Implement camera controls and basic scene interaction.

- [x] **Phase 4: Frontend - Media Player Panel Integration**
  - Create the UI for the media player panel.
  - Implement the file upload interface.
  - Connect the UI to the backend API to upload and display media content (images and videos) on the 3D panel.

- [x] **Phase 5: Frontend - Google Calendar Panel Integration**
  - Create the UI for the calendar panel.
  - Implement the client-side Google OAuth2 login flow.
  - Connect the UI to the backend API to fetch and display calendar events on the 3D panel.

- [ ] **Phase 6: Finalization & Deployment**
  - [x] Backend hardening (token storage, error handling, input validation) complete.
  - [ ] Refine UI/UX and 3D interactions.
  - Perform end-to-end testing.
  - Prepare the application for deployment (e.g., as a web app or packaged for a specific TV OS).
  - Document the project setup and API usage.
