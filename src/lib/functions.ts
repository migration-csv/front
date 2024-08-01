// fileHandlers.ts

export const handleDownload = (fileName: string) => {
  fetch(`http://localhost:5000/download/${fileName}`)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
};

export const handleDelete = async (fileName: string, mutate?: () => void) => {
  await fetch(`http://localhost:5000/files/${fileName}`, {
    method: "DELETE",
  });
  if (mutate) {
    mutate();
  }
};

export const fetcher = async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
