import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleGetStarted = () => {
    if (isAuthenticated && user) {
      if (user.role === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary text-text-primary">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        <h1 className="text-xl font-bold tracking-wide">Hire Sense</h1>

        <div className="space-x-4">
          <button className="text-sm text-text-muted hover:text-text-primary transition">
            Features
          </button>
          <button className="text-sm text-text-muted hover:text-text-primary transition">
            About
          </button>

          <Button
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mt-20 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Setup Interviews with an{" "}
          <span className="text-brand-primary">AI-Powered Interviewer</span>
        </h2>

        <p className="mt-6 max-w-2xl text-text-secondary">
          Upload a job description, get role-specific interview questions,
          answer via voice or text, and receive instant AI feedback.
        </p>

        {/* <div className="mt-8 flex gap-4">
          <Button onClick={() => navigate("/jobs")}>
            Setup Interview
          </Button>
        </div> */}
        <button
          className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover transition"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="mt-28 px-8">
        <h3 className="text-center text-2xl font-semibold">
          Why Use AI Interviewer?
        </h3>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="JD-Based Questions"
            description="Questions generated directly from job descriptions using AI."
          />
          <FeatureCard
            title="Voice-Enabled Interviews"
            description="Answer questions naturally using speech recognition."
          />
          <FeatureCard
            title="Instant Feedback"
            description="Get AI feedback on clarity, relevance, and confidence."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-surface-border py-6 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} AI Interviewer. Built for practice, not
        pressure.
      </footer>
    </div>
  );
};

type FeatureCardProps = {
  title: string;
  description: string;
};
const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div
      className="
      rounded-xl
      border border-surface-border
      bg-surface-card
      p-6
      transition
      hover:border-brand-primary
    "
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
    </div>
  );
};

export default LandingPage;
