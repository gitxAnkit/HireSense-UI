import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ApplicationList from "../components/ApplicationList";

const Applications: React.FC = () => {
  return (
    <>
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        <div>
          {/* Content */}
          <div className="">
            <ApplicationList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
