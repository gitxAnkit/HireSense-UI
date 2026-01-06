import { Button } from "@/components/ui/button";
import JobList from "../components/JobList";
import { useState } from "react";
import CreateJob from "../components/CreateJob";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Jobs: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Job</Button>

      <JobList />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
          </DialogHeader>

          <CreateJob onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Jobs;
