import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Card, { CardContent } from "@/components/ui/card";
// import { useEffect, useState } from "react";
import { getJobs } from "@/api/jobs";
import type { Job } from "../types";
import { useQuery } from "@tanstack/react-query";

const JobList: React.FC = () => {

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  })

  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
      case "active":
        return "text-green-500 bg-green-500/10 border border-green-500/20";
      case "closed":
      case "inactive":
        return "text-red-500 bg-red-500/10 border border-red-500/20";
      case "draft":
        return "text-yellow-500 bg-yellow-500/10 border border-yellow-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border border-gray-500/20";
    }
  };

  const getInterviewStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "text-green-500 bg-green-500/10 border border-green-500/20";
      case "pending":
        return "text-yellow-500 bg-yellow-500/10 border border-yellow-500/20";
      case "cancelled":
        return "text-red-500 bg-red-500/10 border border-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border border-gray-500/20";
    }
  };

  const formatSalary = (min: number, max: number, location?: string) => {
    if (min === undefined || max === undefined) return "N/A";
    const loc = location?.toLowerCase() || "";
    const isUSD = loc.includes("us") || loc.includes("usa") || loc.includes("united states");

    if (isUSD) {
      const minStr = min >= 1000 ? `${(min / 1000).toFixed(0)}k` : min;
      const maxStr = max >= 1000 ? `${(max / 1000).toFixed(0)}k` : max;
      return `$${minStr}–$${maxStr}`;
    } else {
      if (min >= 100000) {
        const minLPA = (min / 100000).toFixed(1).replace(/\.0$/, "");
        const maxLPA = (max / 100000).toFixed(1).replace(/\.0$/, "");
        return `₹${minLPA}–${maxLPA} LPA`;
      }
      const minStr = min >= 1000 ? `${(min / 1000).toFixed(0)}k` : min;
      const maxStr = max >= 1000 ? `${(max / 1000).toFixed(0)}k` : max;
      return `₹${minStr}–${maxStr}`;
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "No Expiry";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card className="border-none">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="border-2 border-gray-200 rounded-md">
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-900">
                <TableHead>S.No</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Job Status</TableHead>
                <TableHead>Interview Duration</TableHead>
                <TableHead>Interview Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground animate-pulse">
                    Loading jobs...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-red-500 font-medium">
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              ) : jobs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    No jobs found.
                  </TableCell>
                </TableRow>
              ) : (
                jobs?.map((job: Job, index: number) => (
                  <TableRow key={job.id} className="hover:bg-gray-800 transition-colors">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-semibold text-white">{job.title}</TableCell>
                    <TableCell>{job.companyName}</TableCell>
                    <TableCell>
                      {job.skills && job.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill) => (
                            <span key={skill.id} className="bg-gray-700 text-gray-200 text-xs px-2 py-0.5 rounded-full">
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{formatSalary(job.salaryMin, job.salaryMax, job.location)}</TableCell>
                    <TableCell>{formatDate(job.expiryDate)}</TableCell>
                    <TableCell>
                      <span className={`font-medium px-2 py-1 rounded-md text-xs ${getStatusClass(job.status)}`}>
                        {capitalize(job.status)}
                      </span>
                    </TableCell>
                    <TableCell>{job.interviewDuration}</TableCell>
                    <TableCell>
                      <span className={`font-medium px-2 py-1 rounded-md text-xs ${getInterviewStatusClass(job.interviewStatus)}`}>
                        {capitalize(job.interviewStatus)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobList;
