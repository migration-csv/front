/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9d334kBY6XS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex min-h-screen w-full">
      <Navbar />
      <div className="flex flex-1 flex-col p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">All Files</h1>
        </header>
        <div className="grid gap-4">
          <div className="flex items-center justify-between rounded-md bg-background p-4 shadow">
            <div className="flex items-center gap-4">
              <FileIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <div className="font-medium">Document.pdf</div>
                <div className="text-sm text-muted-foreground">
                  Uploaded 2 days ago
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md bg-background p-4 shadow">
            <div className="flex items-center gap-4">
              <FileIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <div className="font-medium">Presentation.pptx</div>
                <div className="text-sm text-muted-foreground">
                  Uploaded 1 week ago
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md bg-background p-4 shadow">
            <div className="flex items-center gap-4">
              <FileIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <div className="font-medium">Report.xlsx</div>
                <div className="text-sm text-muted-foreground">
                  Uploaded 3 days ago
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md bg-background p-4 shadow">
            <div className="flex items-center gap-4">
              <FileIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <div className="font-medium">Image.jpg</div>
                <div className="text-sm text-muted-foreground">
                  Uploaded 1 day ago
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
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

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
