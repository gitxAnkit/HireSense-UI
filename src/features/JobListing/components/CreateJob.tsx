import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CreateJobProps = {
  onClose: () => void;
};

const CreateJob: React.FC<CreateJobProps> = ({ onClose }) => {
  const [jdMode, setJdMode] = useState<"upload" | "ai">("upload");
  const [jobDescription, setJobDescription] = useState("");

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <Card className="w-full bg-gray-700 max-h-[90vh] max-w-2xl overflow-y-auto animate-in fade-in zoom-in-95">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create Job</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            {/* Job Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input placeholder="Frontend Developer" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input placeholder="Acme Corp" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <Input placeholder="React, TypeScript, Tailwind" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Bangalore / Remote" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Salary</label>
                <Input placeholder="₹6–8 LPA" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input type="date" />
              </div>
            </div>

            {/* Interview Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Duration</label>
              <Select>
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

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Job</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJob;
