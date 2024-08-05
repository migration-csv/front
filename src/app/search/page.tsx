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
import { apiBase, fetcher } from "@/lib/functions";
import { useCallback, useEffect, useState } from "react";
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
  const [tmdbId, setTmdbId] = useState(0);

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

  const handleGetTmdbId = useCallback(async (movieId: number) => {
    const response = await fetch(`${apiBase}/movie/get-tmd-id/${movieId}`);
    const data = await response.json();
    console.log(data.tmdbId);
    setTmdbId(data.tmdbId);
  }, []);

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

  useEffect(() => {
    // console.log(data);
  }, [data]);

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
                      <button onClick={() => handleGetTmdbId(file.movie_id)}>
                        <TableCell>{file.title}</TableCell>
                      </button>
                      <TableCell>{file.genres}</TableCell>
                      <TableCell>{file.movie_id}</TableCell>
                      <TableCell>{file.rating}</TableCell>
                      <TableCell>{file.total_ratings}</TableCell>
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
