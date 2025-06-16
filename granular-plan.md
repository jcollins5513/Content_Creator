# Granular Plan: Phase 1 - Project Setup & Core Structure

This plan details the initial setup for the project, corresponding to Phase 1 of the `master-plan.md`.

---

## Tasks

- [ ] **1. Create Project Directory Structure:**
  - Create the root directory `tv-app-3d-isometric` (Note: We are already in `Content_Creator`, so we will build within this workspace).
  - Create `frontend/`, `backend/` directories.

- [ ] **2. Initialize Backend:**
  - Navigate to the `backend/` directory.
  - Initialize a new Node.js project (`npm init -y`).
  - Install core dependencies: `express`, `cors`, `dotenv`.
  - Install dev dependencies: `typescript`, `@types/express`, `@types/node`, `nodemon`, `ts-node`.
  - Create a basic `tsconfig.json`.
  - Create a starting `src/index.ts` file with a simple Express server.

- [ ] **3. Initialize Frontend:**
  - Navigate to the `frontend/` directory.
  - Initialize a new React project using Vite with the TypeScript template (`npm create vite@latest . -- --template react-ts`).
  - Install 3D and styling dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `tailwindcss`, `postcss`, `autoprefixer`.
  - Initialize TailwindCSS configuration (`npx tailwindcss init -p`).
  - Configure `tailwind.config.js` to scan component files.

- [ ] **4. Root-level Configuration:**
  - Create a root `package.json` to manage both workspaces.
  - Add scripts to the root `package.json` to run backend and frontend concurrently.
