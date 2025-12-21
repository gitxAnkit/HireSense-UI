import { Routes, Route } from "react-router-dom";
import LandingPage from "../features/LandingPage";
import IntervieweeDashboard from "../features/Dashboard/Pages/IntervieweeDashboard";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/dashboard" element={<IntervieweeDashboard />} />
    </Routes>
  );
};

export default Router;
