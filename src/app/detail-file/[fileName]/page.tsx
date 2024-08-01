"use client";

import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher, handleDelete, handleDownload } from "@/lib/functions";
import { ArrowLeftIcon, DownloadIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

export default function FileDetailPage() {
  const [isDelete, setIsDelete] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  const router = useRouter();

  const pathName = usePathname();
  const regex = /\/detail-file\/([^\/]+)\.csv$/;
  const match = pathName.match(regex);
  const fileName = match?.[1];
  const tableName = fileName?.replace(/-/g, "_");

  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/tables/${tableName}?page=${pageIndex}`,
    fetcher
  );

  const totalPages = useMemo(() => {
    return Math.ceil(data?.total_count / data?.per_page);
  }, [data?.total_count]);

  const files = data?.data;
  const firstObject = files?.[0];

  const handleNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };

  const handleNavigate = (url: string) => {
    router.push(`http://localhost:3000/${url}`);
  };

  const onDownload = useCallback(
    () => handleDownload(fileName ?? ""),
    [fileName]
  );
  const onDelete = useCallback(
    () => handleDelete(fileName + ".csv" ?? ""),
    [fileName]
  );

  return (
    <div className="flex min-h-screen w-full">
      {isDelete && (
        <DeleteModal
          onDelete={() => {
            onDelete();
            handleNavigate("all-files");
          }}
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/all-files"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-primary-foreground"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-foreground">
              {fileName}.csv
            </h1>
            <Button variant="outline" onClick={onDownload}>
              <DownloadIcon className="h-5 w-5 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsDelete(!isDelete);
              }}
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </Button>
          </div>
        </header>
        <div className="grid gap-6">
          <div className="overflow-y-scroll max-h-[calc(90vh-64px)]">
            <h2 className="text-2xl font-bold">Table Preview</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading data.</p>}
            {files && files.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(firstObject).map((key) => (
                      <TableHead key={key} className="text-lg font-bold">
                        {key}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file: Record<string, any>, index: number) => (
                    <TableRow key={index}>
                      {Object.values(file).map((value, idx) => (
                        <TableCell key={idx}>
                          {value as React.ReactNode}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              !isLoading && <p>No data available.</p>
            )}
          </div>
        </div>
        <div className="flex justify-end absolute bottom-2 right-8">
          <div className="flex items-center gap-2">
            <Button
              disabled={pageIndex <= 1 || isLoading}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <span>
              {pageIndex} ... {totalPages}
            </span>
            <Button disabled={isLoading} onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
