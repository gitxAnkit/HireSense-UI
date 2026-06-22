# Implementation Plan - ATS-Style Job Creation Workspace

This plan outlines the refactoring of `NewJobForm.tsx` to transform it from a modal into a high-fidelity, full-page ATS (Applicant Tracking System) recruiter workflow.

## User Review Required

> [!IMPORTANT]
> The layout will adapt to a dual-column workspace on desktop:
> - **Left Column (2/3 width)**: Structured form sections (Basic Info, Compensation, Interview Settings, Job Description) separated into cards.
> - **Right Column (1/3 width)**: A sticky candidate-facing live preview panel displaying in real-time how the job post will appear to job seekers.
>
> The "Save Draft" and "Create Job" buttons will be located at the top-right header, updating the status accordingly ("draft" vs "open") and triggering form submission.

## Proposed Changes

### Job Listing Feature

#### [MODIFY] [NewJobForm.tsx](file:///home/myubuntu/personal/projects/hiresense/HireSense-UI/src/features/JobListing/pages/NewJobForm.tsx)

1. **Header Layout**:
   - Add a "Back to Jobs" navigation link using `react-router-dom`'s `Link` or `useNavigate`.
   - Title: "Create New Job Posting"
   - Subtitle: "Fill in the details to publish your job listing or save it as a draft."
   - Action buttons: "Save Draft" (submits with status `draft`) and "Create Job" (submits with status `open` or the selected status).

2. **Form Layout**:
   - Max-width structure `max-w-[1200px] mx-auto p-6`.
   - Grid layout: Form (left) + Candidate Live Preview (right).

3. **Section 1: Basic Information**:
   - Inputs: Job Title, Company Name, Location, Experience Required, Status.
   - **Skills Chip Input**: A custom input that allows typing a skill and pressing `Enter` or `,` to add chips. Includes remove functionality.

4. **Section 2: Compensation**:
   - Inputs: Min Salary, Max Salary.
   - Live Salary Range Preview: Formatted currency representation (e.g., `$100,000 - $140,050 / year`).

5. **Section 3: Interview Settings**:
   - **Duration Radio Cards**: Group of 4 styled clickable cards (15, 30, 45, 60 minutes) instead of a select dropdown.
   - Input: Expiry Date.

6. **Section 4: Job Description**:
   - Tab toggles: "Import JD (File)" and "Generate with AI".
   - Drag-and-drop file upload zone for PDF/Word files.
   - Textarea for editing the job description, supporting live sync with the preview.

7. **Live Preview Panel (Sticky)**:
   - Sticky card that mirrors all form fields (Title, Company, Location, Salary, Duration, Skills, JD) in a premium candidate-facing UI.

## Verification Plan

### Manual Verification
- **Header Actions**: Verify clicking "Back" or "Cancel" goes to `/recruiter/jobs`. Verify "Save Draft" sets status to `draft` and redirects. Verify "Create Job" sets status to `open` and redirects.
- **Form Controls**:
  - Test the Skills Chip Input: add and delete chips.
  - Test the Interview Duration radio cards: click different durations and check the selection change.
- **JD Upload & AI**:
  - Verify toggling between Import and AI modes.
  - Verify clicking "Generate with AI" inserts template text.
- **Live Preview**:
  - Verify typing in any form field updates the preview card in real-time.
- **API validation**: Verify that submitting creates the job correctly using the `/job` endpoint.
