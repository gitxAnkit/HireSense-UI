import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, type UserRole } from "../../../store/slices/authSlice";
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

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("candidate");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup logic
    const user = {
      id: "2",
      name,
      email,
      role,
    };
    dispatch(signup(user));

    if (role === "candidate") {
      navigate("/candidate/dashboard");
    } else {
      navigate("/recruiter/dashboard");
    }
  };

  return (
    <div className="flex bg-blue-700 items-center justify-center min-h-screen">
      <Card className="w-[400px] bg-gray-300 border-2 border-gray-400">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password">Password</label>
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
                <label>Role</label>
                <div className="flex space-x-4">
                  <Button
                    className={`cursor-pointer px-4 py-2 border rounded-md ${
                      role === "candidate"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => setRole("candidate")}
                  >
                    Candidate
                  </Button>
                  <Button
                    className={`cursor-pointer px-4 py-2 border rounded-md ${
                      role === "recruiter"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => setRole("recruiter")}
                  >
                    Recruiter
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>
          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
