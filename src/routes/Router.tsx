import { Routes, Route } from "react-router-dom";
import LandingPage from "../features/LandingPage";
import IntervieweeDashboard from "../features/Dashboard/Pages/IntervieweeDashboard";
import Feedback from "../features/Feedback/pages/Feedback";
import AdminDashboard from "../features/Dashboard/Pages/AdminDashboard";
import Profile from "../features/Profile/Profile";
import InterviewSetup from "../features/Interview/pages/InterviewSetup";
import InterviewRoom from "../features/Interview/pages/InterviewRoom";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/dashboard-admin" element={<IntervieweeDashboard />} />
      <Route path="/dashboard-user" element={<AdminDashboard />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/setInterview" element={<InterviewSetup />} />
      <Route path="/interview" element={<InterviewRoom />} />
    </Routes>
  );
};

export default Router;
