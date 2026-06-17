# Goal Description

Complete the `CreateJob` form component to manage local states for all fields, validate inputs, construct the appropriate payload matching the backend expectations, invoke the `addJobListing` mutation, and manage the loading/success/error flow.

## Proposed Changes

### Components

#### [MODIFY] [CreateJob.tsx](file:///home/myubuntu/personal/projects/hiresense/HireSense-UI/src/features/JobListing/components/CreateJob.tsx)
- Import `useSelector` and `RootState` to retrieve user information from Redux.
- Introduce React state hooks to track the following input fields:
  - `title` (string)
  - `companyName` (string, local display)
  - `skills` (string, local display)
  - `location` (string)
  - `salaryMin` (number)
  - `salaryMax` (number)
  - `experienceRequired` (number)
  - `expiryDate` (string, ISO)
  - `status` (JobStatus)
- Update form inputs to bind to state variables and trigger updates.
- Refactor the `handleSubmit` event handler:
  - Prevent default browser form submission.
  - Parse inputs (converting salary and experience strings to numbers).
  - Construct a valid `CreateJobPayload` object.
  - Call the mutate function.
- Manage UX feedback:
  - Close the modal on successful mutation (`onSuccess` handler in `useMutation`).
  - Disable buttons during submission.
  - Render submission errors if any.

## Verification Plan

### Automated Tests
- Build verification using compilation check.

### Manual Verification
- Test opening the "Add Job" modal as a recruiter, filling in the metadata, and clicking "Create Job".
- Verify that the modal closes automatically upon completion and the job is displayed in the Jobs List table without needing a manual refresh.
