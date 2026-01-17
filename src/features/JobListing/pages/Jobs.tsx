import { useState } from "react";
import CreateJob from "../components/CreateJob";
import JobList from "../components/JobList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { Input } from "@/components/ui/input";

const Jobs = () => {
  const [isAddJobModalOpen, setAddJobModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const isRecruiter = user?.role === "recruiter";

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-row items-center justify-end">
          {isRecruiter && (
            <Button onClick={() => setAddJobModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Job
            </Button>
          )}
          {/* Search and Filter  */}
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        <div>
          {/* Content */}
          <div className="">
            <JobList />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isAddJobModalOpen && (
        <CreateJob onClose={() => setAddJobModalOpen(false)} />
      )}
    </>
  );
};

export default Jobs;
