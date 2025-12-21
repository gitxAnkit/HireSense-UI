import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const InterviewSetup: React.FC = () => {
  return (
    <>
      <Card className="w-full max-w-[600px] mx-auto mt-2">
        <Card.Title className="text-center mx-2 text-3xl font-bold">
          Setup Interview
        </Card.Title>

        <form className="space-y-4">
          <Input.Text label="Job Title" placeholder="Enter job title" />

          <Input.File label="Upload Job Description" accept=".pdf,.doc,.docx" />

          <Input.Select label="Experience">
            <option value="">Select Experience</option>
            <option>Fresher</option>
            <option>1-3 Years</option>
            <option>3-5 Years</option>
            <option>5+ Years</option>
          </Input.Select>
          <Input.Select label="Duration">
            <option>Select Duration</option>
            <option>15 Minutes</option>
            <option>30 Minutes</option>
            <option>45 Minutes</option>
            <option>60 Minutes</option>
          </Input.Select>

          <Button type="submit" fullWidth>
            Generate Interview
          </Button>
        </form>
      </Card>
    </>
  );
};

export default InterviewSetup;
