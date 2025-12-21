import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        <h1 className="text-xl font-bold tracking-wide">Hire Sense AI </h1>
        <div className="space-x-4">
          <button className="text-sm text-slate-300 hover:text-white">
            Features
          </button>
          <button className="text-sm text-slate-300 hover:text-white">
            About
          </button>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 text-center mt-20">
        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Setup Interviews with an
          <span className="text-indigo-400"> AI-Powered Interviewer</span>
        </h2>

        <p className="mt-6 max-w-2xl text-slate-300">
          Upload a job description, get role-specific interview questions,
          answer via voice or text, and receive instant AI feedback.
        </p>

        <div className="mt-8 flex gap-4">
          <Button onClick={() => navigate("/setInterview")}>
            Setup Interview
          </Button>
          {/* <button className="rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold hover:bg-slate-800">
            View Demo
          </button> */}
        </div>
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
      <footer className="mt-32 border-t border-slate-700 py-6 text-center text-sm text-slate-400">
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
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-indigo-500 transition">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </div>
  );
};

export default LandingPage;
