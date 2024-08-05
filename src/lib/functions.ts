export const apiBase = process.env.NEXT_PUBLIC_API_BASE;
export const apiBaseTmdb = process.env.NEXT_PUBLIC_API_BASE_TMDB;
export const apiKeyTmdb = process.env.NEXT_PUBLIC_API_KEY_TMDB;

export const handleDownload = (fileName: string) => {
  fetch(`${apiBase}/download/${fileName}`)
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
  await fetch(`${apiBase}/files/${fileName}`, {
    method: "DELETE",
  });
  if (mutate) {
    mutate();
  }
};

export const fetcher = async (
  path: string,
  options?: RequestInit
): Promise<any> => {
  try {
    const response = await fetch(`${apiBase}${path}`, options);
    const data = await response.json();
    console.log(apiBase, path);
    console.log(data);
    return data;
  } catch (error) {}
};
