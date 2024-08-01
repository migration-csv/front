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

export const handleDelete = (fileName: string) => {
  fetch(`http://localhost:5000/files/${fileName}`, {
    method: "DELETE",
  });
};

export const fetcher = async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return Array.isArray(data) ? data : data.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
