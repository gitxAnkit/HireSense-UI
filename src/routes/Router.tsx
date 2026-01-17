import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import LandingPage from "../features/LandingPage";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

// Dashboard
import CandidateDashboard from "../features/Dashboard/pages/CandidateDashboard";
import RecruiterDashboard from "../features/Dashboard/pages/RecruiterDashboard";

// Applications
import Applications from "../features/Applications/pages/Applications";
import InterviewDetails from "../features/Applications/pages/InterviewDetails";
import InterviewRoom from "../features/Applications/pages/InterviewRoom";
import Feedback from "../features/Applications/pages/Feedback";

// Jobs
import Jobs from "@/features/JobListing/pages/Jobs";

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        {/* Candidate Routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["candidate", "recruiter"]} />}
        >
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/jobs" element={<Jobs />} />
          <Route path="/candidate/applications" element={<Applications />} />
          <Route
            path="/candidate/interview/:id"
            element={<InterviewDetails />}
          />
          <Route path="/candidate/room/:id" element={<InterviewRoom />} />
        </Route>

        {/* Recruiter Routes */}
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/jobs" element={<Jobs />} />
          <Route path="/recruiter/applications" element={<Applications />} />
          <Route path="/recruiter/feedback" element={<Feedback />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
