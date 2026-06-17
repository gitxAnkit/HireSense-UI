import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJobListing } from "@/api/jobs";
import type { CreateJobPayload, JobStatus } from "../types";

type CreateJobProps = {
  onClose: () => void;
};

const CreateJob: React.FC<CreateJobProps> = ({ onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [jdMode, setJdMode] = useState<"upload" | "ai">("upload");
  const [jobDescription, setJobDescription] = useState("");

  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [status, setStatus] = useState<JobStatus>("open");
  const [interviewDuration, setInterviewDuration] = useState("30");

  const handleGenerateJD = () => {
    // Stub — replace with real AI call later
    setJobDescription(
      `We are looking for a skilled Frontend Developer to join our team.

Responsibilities:
- Build responsive web interfaces
- Collaborate with backend and design teams
- Write clean, maintainable code

Requirements:
- Experience with React
- Strong understanding of JavaScript and CSS`
    );
  };

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addJobListing,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateJobPayload = {
      title,
      description: jobDescription,
      location,
      salary_min: Number(salaryMin) || 0,
      salary_max: Number(salaryMax) || 0,
      experience_required: Number(experienceRequired) || 0,
      status,
      expiry_date: expiryDate ? new Date(expiryDate).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      company_id: 1, // Fallback company_id
      created_by: user?.id ? parseInt(user.id) || 1 : 1, // Parse recruiter user id or default to 1
    };
    mutate(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <Card className="w-full max-h-[90vh] max-w-2xl overflow-y-auto animate-in fade-in zoom-in-95">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create Job</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input
                  placeholder="Enter Job Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  placeholder="Enter Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <Input
                  placeholder="Add your skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="Enter job location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Required (Years)</label>
                <Input
                  type="number"
                  placeholder="e.g. 2"
                  value={experienceRequired}
                  onChange={(e) => setExperienceRequired(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Min Salary</label>
                <Input
                  type="number"
                  placeholder="Min Salary (e.g. 600000)"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Max Salary</label>
                <Input
                  type="number"
                  placeholder="Max Salary (e.g. 800000)"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Job Status</label>
                <Select value={status} onValueChange={(val: JobStatus) => setStatus(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interview Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Duration</label>
              <Select value={interviewDuration} onValueChange={setInterviewDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                  <SelectItem value="45">45 Minutes</SelectItem>
                  <SelectItem value="60">60 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Description Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Job Description</label>

              {/* Mode Switch */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={jdMode === "upload" ? "default" : "outline"}
                  onClick={() => setJdMode("upload")}
                >
                  Upload JD
                </Button>
                <Button
                  type="button"
                  variant={jdMode === "ai" ? "default" : "outline"}
                  onClick={() => setJdMode("ai")}
                >
                  Generate with AI
                </Button>
              </div>

              {/* Upload Mode */}
              {jdMode === "upload" && (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/40 bg-muted/40 px-6 py-8 text-center transition-colors hover:bg-muted">
                  <p className="text-sm font-medium">Upload job description</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    PDF, DOC, or DOCX (max 5MB)
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
              )}

              {/* AI Mode */}
              {jdMode === "ai" && (
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleGenerateJD}
                  >
                    Generate Job Description
                  </Button>

                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Generated job description will appear here. You can edit it freely."
                    className="min-h-[180px]"
                  />
                </div>
              )}
            </div>

            {isError && (
              <div className="text-sm text-red-500 font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-md animate-in fade-in duration-200">
                Error creating job: {error instanceof Error ? error.message : "An error occurred"}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" type="button" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Job"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJob;
