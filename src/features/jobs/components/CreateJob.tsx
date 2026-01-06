import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

type CreateJobProps = {
  onClose: () => void;
};

const CreateJob: React.FC<CreateJobProps> = ({ onClose }) => {
  return (
    <form className="space-y-5">
      {/* Job Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Job Title</label>
        <Input placeholder="Enter job title" />
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Job Description</label>
        <Input type="file" accept=".pdf,.doc,.docx" />
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Experience</label>
        <select
          className="
            flex h-9 w-full rounded-md
            border border-input
            bg-background px-3 py-1 text-sm
            shadow-sm transition-colors
            focus-visible:outline-none
            focus-visible:ring-1 focus-visible:ring-ring
          "
        >
          <option value="">Select Experience</option>
          <option>Fresher</option>
          <option>1–3 Years</option>
          <option>3–5 Years</option>
          <option>5+ Years</option>
        </select>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Duration</label>
        <select
          className="
            flex h-9 w-full rounded-md
            border border-input
            bg-background px-3 py-1 text-sm
            shadow-sm transition-colors
            focus-visible:outline-none
            focus-visible:ring-1 focus-visible:ring-ring
          "
        >
          <option value="">Select Duration</option>
          <option>15 Minutes</option>
          <option>30 Minutes</option>
          <option>45 Minutes</option>
          <option>60 Minutes</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Job</Button>
      </div>
    </form>
  );
};

export default CreateJob;
