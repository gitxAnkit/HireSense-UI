import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobList: React.FC = () => {
  return (
    <Card className="border-none">
      {/* <CardHeader><CardTitle>Job List</CardTitle></CardHeader> */}

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
              {/* Row 1 */}
              <TableRow className="hover:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>Frontend Developer</TableCell>
                <TableCell>TechNova Pvt Ltd</TableCell>
                <TableCell>React, TypeScript, Tailwind</TableCell>
                <TableCell>Bangalore</TableCell>
                <TableCell>₹6–8 LPA</TableCell>
                <TableCell>31 Mar 2026</TableCell>
                <TableCell className="text-green-600 font-medium">
                  Open
                </TableCell>
                <TableCell>30 Minutes</TableCell>
                <TableCell className="text-yellow-600 font-medium">
                  Pending
                </TableCell>
              </TableRow>

              {/* Row 2 */}
              <TableRow className="hover:bg-gray-800">
                <TableCell>2</TableCell>
                <TableCell>Backend Engineer</TableCell>
                <TableCell>InnoSoft Solutions</TableCell>
                <TableCell>Node.js, NestJS, PostgreSQL</TableCell>
                <TableCell>Remote</TableCell>
                <TableCell>₹8–10 LPA</TableCell>
                <TableCell>15 Apr 2026</TableCell>
                <TableCell className="text-red-600 font-medium">
                  Closed
                </TableCell>
                <TableCell>45 Minutes</TableCell>
                <TableCell className="text-green-600 font-medium">
                  Scheduled
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobList;
