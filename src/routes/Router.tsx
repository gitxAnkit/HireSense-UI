import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import LandingPage from "../features/LandingPage";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

// Candidate Pages
import CandidateDashboard from "../features/candidate/pages/Dashboard";
import InterviewDetails from "../features/candidate/pages/InterviewDetails";
import InterviewRoom from "../features/candidate/pages/InterviewRoom"; // Assuming this file exists/moved

// Interviewer Pages
import InterviewerDashboard from "../features/interviewer/pages/Dashboard";
// import Jobs from "../features/interviewer/pages/Jobs";
import Feedback from "../features/interviewer/pages/Feedback";
import Profile from "../features/Profile/Profile"; // Keep Profile here for now
import Jobs from "@/features/jobs/pages/Jobs";

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
          element={
            <ProtectedRoute allowedRoles={["candidate", "interviewer"]} />
          }
        >
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route
            path="/candidate/interview/:id"
            element={<InterviewDetails />}
          />
          <Route path="/candidate/room/:id" element={<InterviewRoom />} />
          {/* Add more candidate routes here */}
        </Route>

        {/* Interviewer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["interviewer"]} />}>
          <Route
            path="/interviewer/dashboard"
            element={<InterviewerDashboard />}
          />
          <Route path="/interviewer/jobs" element={<Jobs />} />
          <Route path="/interviewer/feedback" element={<Feedback />} />
        </Route>

        {/* Shared or Other Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
