# Granular Plan: Phase 6 - Finalization & Deployment (Backend Focus)

This plan details the next set of tasks for the backend, as part of **Phase 6: Finalization & Deployment** from `master-plan.md`.

---

## Tasks for Next Session

- [ ] **1. Implement Persistent Token Storage (SQLite):**
  - Confirm `better-sqlite3` and `@types/better-sqlite3` are installed in `backend/package.json`.
  - Create a new directory `backend/src/db`.
  - Create `backend/src/db/index.ts` to initialize the SQLite database connection (e.g., `app_tokens.db`) and schema.
    - Define a table (e.g., `google_tokens`) with columns for `id` (e.g., a fixed ID for a single-user setup for now), `access_token`, `refresh_token`, `expiry_date`, `scope`, `token_type`.
  - Create `backend/src/services/tokenService.ts` (or similar) with functions:
    - `saveTokens(tokens: Credentials)`: Upserts tokens into the database.
    - `getTokens(): Credentials | null`: Retrieves tokens from the database.
    - `clearTokens()`: Deletes tokens from the database.
  - Update `backend/src/routes/api/calendar.ts`:
    - Replace in-memory `let tokens` variable with calls to `tokenService.getTokens()`.
    - In `/auth/callback`, use `tokenService.saveTokens()` after acquiring tokens.
    - In the `oAuth2Client.on('tokens', ...)` event listener, use `tokenService.saveTokens()` to update refreshed tokens.
    - If an API call results in a 401 error suggesting token invalidity (and refresh fails), use `tokenService.clearTokens()`.

- [ ] **2. Add Comprehensive Error Handling and Validation:**
  - Review all routes in `backend/src/routes/api/calendar.ts` and `backend/src/routes/api/media.ts`.
  - Ensure consistent `try...catch` blocks for all asynchronous operations and external API calls.
  - Standardize error responses (e.g., `{ success: false, message: '...', error: 'optional_error_details' }`).
  - Add input validation (e.g., for query parameters, request bodies, file uploads).
    - For file uploads in `media.ts`, ensure `req.file` exists and has expected properties before processing.

- [ ] **3. Add Typings/Validation for File Uploads (Multer):**
  - In `backend/src/routes/api/media.ts`:
    - Define a clear type or interface for the `req.file` object provided by Multer, reflecting its properties (e.g., `fieldname`, `originalname`, `encoding`, `mimetype`, `destination`, `filename`, `path`, `size`).
    - Use this type for `req.file` in route handlers.
    - Consider adding server-side validation for file types and sizes if not already robustly handled by Multer's configuration.

- [ ] **4. Refine UI/UX and 3D Interactions (Placeholder for broader Phase 6 task):**
  - This will be addressed more fully after backend stabilization and frontend integration updates.

- [ ] **5. Perform End-to-End Testing (Placeholder for broader Phase 6 task):**
  - This will be addressed more fully after backend stabilization and frontend integration updates.

- [ ] **6. Prepare for Deployment (Placeholder for broader Phase 6 task):**
  - This will be addressed more fully after backend stabilization and frontend integration updates.

- [ ] **7. Document Project Setup and API Usage (Placeholder for broader Phase 6 task):**
  - This will be addressed more fully after backend stabilization and frontend integration updates.
