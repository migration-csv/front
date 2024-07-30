"use client";

import { Navbar } from "@/components/NavBar";
import { useCallback, useState } from "react";

export default function Component() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = useCallback(() => {
    if (!file) return;
    setLoading(true);
    const tableName = file.name.split(".")[0].replace("-", "_");
    const formData = new FormData();
    formData.append("file", file);

    fetch(`http://localhost:5000/files/${tableName}`, {
      method: "POST",
      body: formData,
    })
      .catch((error) => {
        console.error("Error uploading file:", error);
      }).finally(() => {
        setLoading(false);
      });
  }, [file]);

  return (
    <div className="flex min-h-screen w-full">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center bg-background">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            File Upload Page
          </h1>
        </header>
        <div className="w-full max-w-md space-y-4">
          <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-muted border-dashed rounded-md cursor-pointer hover:bg-muted/5">
            <label
              htmlFor="file-input"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <svg
                className="w-8 h-8 mb-3 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0zm9.414 0a1 1 0 01-1.414 1.414l-4-4a1 1 0 011.414-1.414l4 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium text-muted-foreground">
                Click to upload a file
              </span>
              <input
                id="file-input"
                type="file"
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleFileUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
}
