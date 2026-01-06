import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import LandingPage from "../features/LandingPage";
import IntervieweeDashboard from "../features/Dashboard/Pages/IntervieweeDashboard";
import Feedback from "../features/Feedback/pages/Feedback";
import AdminDashboard from "../features/Dashboard/Pages/AdminDashboard";
import Profile from "../features/Profile/Profile";
import InterviewRoom from "../features/Interview/pages/InterviewDetails";
import Jobs from "@/features/jobs/pages/Jobs";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard-admin" element={<IntervieweeDashboard />} />
        <Route path="/dashboard-user" element={<AdminDashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/interview" element={<InterviewRoom />} />
      </Route>
    </Routes>
  );
};

export default Router;
