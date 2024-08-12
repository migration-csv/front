"use client";

import DeleteModal from "@/components/DeleteModal";
import EmptyWarning from "@/components/EmptyWarning";
import { FileItem } from "@/components/FileItem";
import { Navbar } from "@/components/NavBar";
import { fetcher, handleDelete } from "@/lib/functions";
import { useState } from "react";
import useSWR from "swr";

interface FileProps {
    id: number;
    file_name: string;
    update_at: string;
    execution_time: string;
}

export default function Component() {
    const [isDelete, setIsDelete] = useState(false);
    const [fileName, setFileName] = useState("");
    const {
        data: files,
        error,
        mutate,
    } = useSWR<FileProps[]>("/files", fetcher);

    const onDelete = async () => {
        await handleDelete(fileName, mutate);
        setIsDelete(false);
    };

    if (error) return <div>Failed to load files</div>;
    if (!files) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen w-full">
            <Navbar />
            {isDelete && (
                <DeleteModal onDelete={onDelete} onCancel={() => setIsDelete(false)} />
            )}
            <div className="flex flex-1 flex-col p-6">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-foreground">All Files</h1>
                </header>
                <div className="grid gap-4">
                    {files.length > 0 ? (
                        files.map(({ id, file_name, update_at, execution_time }) => (
                            <FileItem
                                key={id}
                                fileName={file_name}
                                uploadedAt={update_at}
                                executionTime={execution_time}
                                onDelete={() => {
                                    setIsDelete(true);
                                    setFileName(file_name);
                                }}
                            />
                        ))
                    ) : (
                        <EmptyWarning />
                    )}
                </div>
            </div>
        </div>
    );
}
