import {handleDownload} from "@/lib/functions";
import Link from "next/link";
import React, {useCallback} from "react";
import {Button} from "./ui/button";

interface FileItemProps {
    fileName: string;
    uploadedAt: string;
    executionTime: string;
    onDelete?: () => void;
}

export function FileItem({fileName, uploadedAt, onDelete, executionTime}: FileItemProps) {
    const onDownload = useCallback(() => handleDownload(fileName), [fileName]);
    return (
        <div className="flex items-center justify-between rounded-md bg-background p-4 shadow ">
            <Link href={`/detail-file/${fileName}`}>
                <div className="flex items-center gap-4">
                    <FileIcon className="h-8 w-8 text-muted-foreground"/>
                    <div>
                        <div className="font-medium">{fileName}</div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">Update_at: {uploadedAt}</div>
                            <div>Execution_time: {executionTime}</div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={onDownload}>
                    <DownloadIcon className="h-5 w-5"/>
                </Button>
                <Button variant="ghost" size="icon" onClick={onDelete}>
                    <TrashIcon className="h-5 w-5"/>
                </Button>
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" x2="12" y1="15" y2="3"/>
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
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
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
    );
}
