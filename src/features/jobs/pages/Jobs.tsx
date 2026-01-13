import { useState } from "react";
import CreateJob from "../components/CreateJob";
import JobList from "../components/JobList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Jobs = () => {
  const [isAddJobModalOpen, setAddJobModalOpen] = useState(false);

  return (
    <>
      <Card className="mx-auto max-w-5xl">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Jobs</CardTitle>

          <Button onClick={() => setAddJobModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6">
          <JobList />
        </CardContent>
      </Card>

      {/* Modal */}
      {isAddJobModalOpen && (
        <CreateJob onClose={() => setAddJobModalOpen(false)} />
      )}
    </>
  );
};

export default Jobs;
