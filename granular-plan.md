# Granular Plan: Phase 6 - UI Debugging & End-to-End Testing

This plan details the tasks for debugging remaining UI issues and then performing end-to-end testing of the application, as part of **Phase 6: Finalization & Deployment** from `master-plan.md`.

---

## Tasks for Next Session

- **1. UI Error Debugging:**
  - Review the current UI and identify the specific error(s) occurring.
  - Inspect browser console logs and network requests for clues.
  - Examine relevant frontend component code (`Dashboard.tsx`, `App.tsx`, panel components, CSS files) to find the root cause.
  - Implement necessary fixes to resolve the UI errors.
  - Verify the UI displays correctly without errors.

- **2. Backend Testing:**
  - Verify all API endpoints are functioning as expected (media uploads, media listing, calendar auth, calendar events).
  - Test token persistence and refresh mechanisms for Google OAuth.
  - Confirm error handling and input validation are robust.

- **2. Frontend Testing:**
  - Test the dashboard layout and responsiveness (if applicable).
  - Verify media player functionality: upload, display images, play videos.
  - Test calendar panel: Google login, event fetching, and display.
  - Test any functionality in the 'New Feature' panel (if implemented).
  - Check for console errors or warnings in the browser.

- **3. Integrated Testing (Frontend + Backend):**
  - Perform full user flows (e.g., login, upload media, view media, view calendar).
  - Test interactions between frontend panels and backend services.
  - Verify data consistency between frontend and backend.

- **4. Cross-Browser/Device Testing (Optional, if applicable):**
  - If targeting specific browsers or devices, test compatibility.

- **5. Bug Reporting and Fixing:**
  - Document any bugs found with clear steps to reproduce.
  - Prioritize and address critical bugs.


We are in Phase 6: Finalization & Deployment. Before proceeding to end-to-end testing, we need to address a lingering UI error. The [granular-plan.md](cci:7://file:///c:/Users/justi/projects/Content_Creator/granular-plan.md:0:0-0:0) has been updated to reflect this.

Please start by helping me debug the UI. We need to:
1. Review the current UI and identify the specific error(s) occurring.
2. Inspect browser console logs and network requests for clues.
3. Examine relevant frontend component code ([Dashboard.tsx](cci:7://file:///c:/Users/justi/projects/Content_Creator/frontend/src/components/Dashboard.tsx:0:0-0:0), [App.tsx](cci:7://file:///c:/Users/justi/projects/Content_Creator/frontend/src/App.tsx:0:0-0:0), panel components, CSS files) to find the root cause.
4. Implement necessary fixes to resolve the UI errors.
5. Verify the UI displays correctly without errors.

Once the UI error is resolved, we will move on to backend testing as previously planned.

---

## 🔄 Next Session Focus – UI Enhancements (Media Selector & Calendar Header)

**Context**
The user wants to:
1. Introduce a *media selector* screen shown immediately after login so that the main dashboard real-estate is not consumed by media thumbnails.
2. Change the *Calendar* panel header so it shows **today’s date** in **Central Time (CT)** rather than the static "Calendar" text.

**Sub-tasks**
1. Media Selector Screen
   1.1 Analyse existing auth/login flow to identify best insertion point for selector component/modal.
   1.2 Design lightweight selector UI (thumbnail grid or list) that overlays or precedes dashboard.
   1.3 Hook selector up to existing media-list endpoint.
   1.4 Emit selected media back to dashboard/media player panel.
2. Calendar Header Update
   2.1 Add utility to get current date formatted as `MMMM D, YYYY – h:mm A CT`.
   2.2 Replace hard-coded "Calendar" header text with computed date string.
   2.3 Ensure header updates on page load and stays static (no ticking clock needed).
3. Regression Check
   3.1 Build & run app, verify selector appears post-login.
   3.2 Ensure dashboard layout unaffected once media chosen.
   3.3 Confirm Calendar panel header shows correct Central Time date.

**Dependencies / Notes**
- Utilise existing media API; no backend change expected.
- Central Time can be derived with `Intl.DateTimeFormat` and `America/Chicago` timezone.
- Keep styles consistent with current glass-morphism theme.

---

*Prepared for next conversation.*