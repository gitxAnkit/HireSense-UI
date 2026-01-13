import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, type UserRole } from "../../../store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("candidate");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const interviewerUser = {
      id: "1",
      name: "Interviewer",
      email: "interviewer@gmail.com",
      role: "interviewer" as UserRole,
      password: "password",
    };

    const candidateUser = {
      id: "2",
      name: "Candidate",
      email: "candidate@gmail.com",
      role: "candidate" as UserRole,
      password: "password",
    };

    // Check credentials matching the selected role or just credentials
    if (role === "interviewer") {
      if (
        email === interviewerUser.email &&
        password === interviewerUser.password
      ) {
        dispatch(login(interviewerUser));
        navigate("/interviewer/dashboard");
        return;
      }
    } else {
      if (
        email === candidateUser.email &&
        password === candidateUser.password
      ) {
        dispatch(login(candidateUser));
        navigate("/candidate/dashboard");
        return;
      }
    }

    // Fallback/Testing convenience: If fields are empty or mismatched but intended for testing,
    // we strictly follow the user request "add these mock user... fix... to test".
    // If the user ignores the input, we can do what the user had before, BUT logic says we should likely validating.
    // However, I will support "Auto Login" if inputs match the defaults or if inputs are empty for convenience?
    // Let's stick to strict matching to be "fixed".
    // If they fail, alert?
    alert(
      "Invalid credentials. Use candidate@gmail.com / password or interviewer@gmail.com / password"
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <Card className="w-[400px] bg-gray-300 border-4 border-gray-400">
        <CardHeader>
          <CardTitle className="text-gray-900 font-bold text-center">
            Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <Input
                  id="email"
                  className="border-gray-400"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="font-semibold">Role</label>
                <div className="flex space-x-4">
                  <Button
                    className={`cursor-pointer px-4 py-2 border rounded-md ${
                      role === "candidate" ? "bg-blu  e-300 text-gray-700" : ""
                    }`}
                    onClick={() => setRole("candidate")}
                  >
                    Candidate
                  </Button>
                  <Button
                    className={`cursor-pointer px-4 py-2 border rounded-md ${
                      role === "interviewer" ? "bg-blue-300 text-gray-700" : ""
                    }`}
                    onClick={() => setRole("interviewer")}
                  >
                    Interviewer
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full font-semibold" onClick={handleLogin}>
            Login
          </Button>
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
