import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Card, { CardContent } from "@/components/ui/card";
import { getJobs } from "@/api/jobs";
import type { Job } from "../types";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const JobList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
  console.log(jobs, "Jobs data");

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

  // ── Pagination logic ─────────────────────────────────────────
  const totalItems = jobs?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalItems);
  const paginatedJobs = jobs?.slice(startIdx, endIdx) ?? [];

  const goTo = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
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
                paginatedJobs.map((job: Job, index: number) => (
                  <TableRow key={job.id} className="hover:bg-gray-800 transition-colors">
                    <TableCell>{startIdx + index + 1}</TableCell>
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

        {/* ── Pagination Bar ───────────────────────────────────── */}
        {!isLoading && !error && totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-800">
            {/* Info + page size */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>
                Showing <span className="font-medium text-white">{startIdx + 1}–{endIdx}</span> of{" "}
                <span className="font-medium text-white">{totalItems}</span> jobs
              </span>
              <span className="hidden sm:block text-gray-700">|</span>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-xs text-gray-500">Rows per page:</span>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    onClick={() => handlePageSizeChange(size)}
                    className={`h-6 min-w-[28px] rounded px-1.5 text-xs font-medium transition-colors ${
                      pageSize === size
                        ? "bg-indigo-600 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Page controls */}
            <div className="flex items-center gap-1">
              {/* First */}
              <button
                onClick={() => goTo(1)}
                disabled={safePage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-700 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                aria-label="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              {/* Prev */}
              <button
                onClick={() => goTo(safePage - 1)}
                disabled={safePage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-700 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Page number pills */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="flex h-8 w-6 items-center justify-center text-xs text-gray-600">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goTo(p as number)}
                      className={`flex h-8 min-w-[32px] items-center justify-center rounded-md px-2 text-xs font-medium transition-colors ${
                        safePage === p
                          ? "bg-indigo-600 text-white"
                          : "text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              {/* Next */}
              <button
                onClick={() => goTo(safePage + 1)}
                disabled={safePage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-700 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              {/* Last */}
              <button
                onClick={() => goTo(totalPages)}
                disabled={safePage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-700 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                aria-label="Last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobList;
