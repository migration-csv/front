"use client";

import { MultiSelectorComponent } from "@/components/MultiSelectorComponent";
import { Navbar } from "@/components/NavBar";
import { PaginationButtons } from "@/components/PaginationButton";
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
import { fetcher } from "@/lib/functions";
import Link from "next/link";
import { SVGProps, useState } from "react";
import useSWR from "swr";

type File = {
  genres: string;
  movie_id: number;
  rating: number;
  title: string;
  total_ratings: number;
};

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1);
  const [launchDate, setLaunchDate] = useState("");
  const [quantityRating, setQuantityRating] = useState("");
  const [totalRatings, setTotalRatings] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const { data, error, isLoading } = useSWR(
    searchKey
      ? `/search?${searchKey}&page=${currentPage}`
      : `/search?page=${currentPage}`,
    fetcher
  );

  const files = Array.isArray(data?.data) ? data?.data : [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleValuesChange = (values: string[]) => {
    setSelectedValues(values);
  };

  const formatSelectedValues = (): string => {
    return selectedValues.join(",");
  };

  const formattedValues = formatSelectedValues();

  const handleSearch = () => {
    let searchKeyConstructor = "";
    if (formattedValues !== "")
      searchKeyConstructor += `genres=${formattedValues}&`;
    if (launchDate !== "") searchKeyConstructor += `year=${launchDate}&`;
    if (quantityRating !== "")
      searchKeyConstructor += `min_rating=${quantityRating}&`;
    if (totalRatings !== "")
      searchKeyConstructor += `total_ratings=${totalRatings}&`;

    setSearchKey(searchKeyConstructor.slice(0, -1));
    setCurrentPage(1);
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
                  Launch Year
                </label>
                <Input
                  id="launchDate"
                  type="text"
                  pattern="\d{4}"
                  placeholder="YYYY"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  maxLength={4}
                />
              </div>
              <div>
                <label
                  htmlFor="quantityRating"
                  className="text-muted-foreground"
                >
                  Min Quantity Rating
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
                <label htmlFor="totalRatings" className="text-muted-foreground">
                  Total Ratings
                </label>
                <Input
                  id="totalRatings"
                  type="number"
                  value={totalRatings}
                  onChange={(e) => setTotalRatings(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="gender" className="text-muted-foreground">
                  Gender
                </label>
                <MultiSelectorComponent onValuesChange={handleValuesChange} />
              </div>
            </div>
            <div className="flex w-full">
              <Button
                className="ml-auto btn-primary justify-end mt-4"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          <div className="overflow-y-scroll max-h-[calc(60vh-70px)]">
            <h2 className="text-lg font-semibold">Search Results</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Genres</TableHead>
                  <TableHead>Movie ID</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Total Ratings</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5}>Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={5}>Error: {error.message}</TableCell>
                  </TableRow>
                ) : files.length > 0 ? (
                  files.map((file: File, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{file.title}</TableCell>
                      <TableCell>{file.genres}</TableCell>
                      <TableCell>{file.movie_id}</TableCell>
                      <TableCell>{file.rating}</TableCell>
                      <TableCell>{file.total_ratings}</TableCell>
                      <Link href={`/detail-movie/${file.movie_id}`}>
                        <TableCell>
                          <ExternalLinkIcon />
                        </TableCell>
                      </Link>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No data available.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <PaginationButtons
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePrevPage}
          pageIndex={currentPage}
          isLoading={isLoading}
          totalCount={data?.total_count}
          perPage={data?.per_page}
        />
      </div>
    </div>
  );
}

function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
