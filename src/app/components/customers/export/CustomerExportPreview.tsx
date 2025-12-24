"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";
import { Check } from "lucide-react";
import { IoMdClose } from "react-icons/io";

const customers = [
  {
    name: "Stacy Clark",
    email: "stacy.clark@xylem.com",
    phone: "12244960842",
    joinDate: "19 hours ago",
  },
  {
    name: "jane malaise",
    email: "janembears68@yahoo.com",
    phone: "9795743063",
    joinDate: "21 hours ago",
  },
  {
    name: "Kathleen OMara",
    email: "katieomara63@gmail.com",
    phone: "6462390919",
    joinDate: "22 hours ago",
  },
  {
    name: "David Lebov",
    email: "davidl@sourcecode.com",
    phone: "781-367-9802",
    joinDate: "Tuesday at 04:28pm",
  },
  {
    name: "Tierney Becho",
    email: "tierney.becho@pnnl.gov",
    phone: "509-372-5920",
    joinDate: "Monday at 02:22pm",
  },
  {
    name: "Rena Prato",
    email: "dannyfr22@yahoo.com",
    phone: "2672962223",
    joinDate: "Jul 25th, 2025",
  },
  {
    name: "Elisabeth Koponick",
    email: "elisabeth.koponick@churchofjes...",
    phone: "484-653-9454",
    joinDate: "Jul 24th, 2025",
  },
];

export default function CustomerExportPreview() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 200;
  const totalPages = Math.ceil(totalItems / 10);
  const [perPage, setPerPage] = useState("20");

  return (
    <div>
      <p className=" text-muted-foreground 2xl:!text-2xl">
        The <strong>{totalItems.toLocaleString()}</strong> customers shown below
        will be exported when you click the continue button.
      </p>
      <div className="bg-white p-6 rounded-md border shadow-sm space-y-4">
        <div className="flex justify-end my-2">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
        <div className="overflow-auto border rounded">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="2xl:!text-[1.6rem] !py-4">ID</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Name</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Email</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Phone</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Date Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{index}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item.name}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item.email}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item.phone}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item.joinDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end my-6">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>
    </div>
  );
}
