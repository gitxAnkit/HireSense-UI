import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CreateJobProps = {
  onClose: () => void;
};

const CreateJob: React.FC<CreateJobProps> = ({ onClose }) => {
  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Card */}
      <Card className="w-full max-w-lg animate-in fade-in zoom-in-95 bg-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create Job</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            {/* Job Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <Input placeholder="Frontend Developer, SDE-1…" />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label
                htmlFor="job-description"
                className="
    flex cursor-pointer flex-col items-center justify-center
    rounded-lg border border-dashed border-muted-foreground/40
    bg-muted/40 px-6 py-8 text-center
    transition-colors hover:bg-muted
  "
              >
                <p className="text-sm font-medium">Upload job description</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PDF, DOC, or DOCX (max 5MB)
                </p>

                <Input
                  id="job-description"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </label>
            </div>

            {/* Experience + Duration */}
            <div className="grid grid-cols-2 gap-4">
              {/* Experience */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Experience</label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="1-3">1–3 Years</SelectItem>
                    <SelectItem value="3-5">3–5 Years</SelectItem>
                    <SelectItem value="5+">5+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem className="" value="15">
                      15 Minutes
                    </SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="45">45 Minutes</SelectItem>
                    <SelectItem value="60">60 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
