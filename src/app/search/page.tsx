/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CXqSMgMIHju
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { Navbar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

type File = {
  name: string;
  uploaded: string;
  size: string;
  rows: number;
  columns: number;
  genre: string;
  launchDate: string;
  quantityRating: number;
  userId: number;
  gender: string;
};

export default function Component() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [genre, setGenre] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [quantityRating, setQuantityRating] = useState("");
  const [userId, setUserId] = useState("");
  const [gender, setGender] = useState("");
  const files = [
    {
      name: "Action.csv",
      uploaded: "2 days ago",
      size: "1.2 MB",
      rows: 5000,
      columns: 12,
      genre: "Action",
      launchDate: "2022-01-01",
      quantityRating: 4,
      userId: 1,
      gender: "Male",
    },
    {
      name: "Comedy.csv",
      uploaded: "1 week ago",
      size: "3.4 MB",
      rows: 10000,
      columns: 8,
      genre: "Comedy",
      launchDate: "2021-06-15",
      quantityRating: 5,
      userId: 2,
      gender: "Female",
    },
    {
      name: "Horror.csv",
      uploaded: "3 days ago",
      size: "800 KB",
      rows: 2500,
      columns: 6,
      genre: "Horror",
      launchDate: "2023-03-01",
      quantityRating: 3,
      userId: 3,
      gender: "Male",
    },
    {
      name: "Drama.csv",
      uploaded: "1 day ago",
      size: "2.1 MB",
      rows: 7500,
      columns: 10,
      genre: "Drama",
      launchDate: "2022-11-20",
      quantityRating: 4,
      userId: 4,
      gender: "Female",
    },
  ];
  const filteredFiles = files.filter((file) => {
    return (
      file.name.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "" || file.genre === genre) &&
      (launchDate === "" || file.launchDate === launchDate) &&
      (quantityRating === "" ||
        file.quantityRating === parseInt(quantityRating)) &&
      (userId === "" || file.userId === parseInt(userId)) &&
      (gender === "" || file.gender === gender)
    );
  });
  const sortedFiles = filteredFiles.sort((a, b) => {
    const column = sortColumn as keyof File;

    if (a[column] < b[column]) return sortOrder === "asc" ? -1 : 1;
    if (a[column] > b[column]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(sortedFiles.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex min-h-screen w-full">
      <Navbar />
      <div className="flex flex-1 flex-col p-6">
        <div className="grid gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Filters</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label htmlFor="launchDate" className="text-muted-foreground">
                  Launch Date
                </label>
                <Input
                  id="launchDate"
                  type="date"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="quantityRating"
                  className="text-muted-foreground"
                >
                  Quantity Rating
                </label>
                <Input
                  id="quantityRating"
                  type="number"
                  min="1"
                  max="5"
                  value={quantityRating}
                  onChange={(e) => setQuantityRating(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="userId" className="text-muted-foreground">
                  User ID
                </label>
                <Input
                  id="userId"
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="gender" className="text-muted-foreground">
                  Gender
                </label>
                <Input
                  id="gender"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Search Results</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Rows</TableHead>
                  <TableHead>Columns</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Launch Date</TableHead>
                  <TableHead>Quantity Rating</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Gender</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.uploaded}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.rows}</TableCell>
                    <TableCell>{item.columns}</TableCell>
                    <TableCell>{item.genre}</TableCell>
                    <TableCell>{item.launchDate}</TableCell>
                    <TableCell>{item.quantityRating}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(sortedFiles.length / itemsPerPage)
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
