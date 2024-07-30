"use client";

import { FileItem } from "@/components/FileItem";
import { Navbar } from "@/components/NavBar";
import useSWR from 'swr'
 
function Profile () {
  const { data, error, isLoading } = useSWR('/api/user/123', fetcher)
 
  if (error) return <div>falhou ao carregar</div>
  if (isLoading) return <div>carregando...</div>
 
  // renderizar dados
  return <div>olá {data.name}!</div>
}
import { useState } from "react";

interface FileProps {
  id: number;
  file_name: string;
  update_at: string;
}

const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function Component() {
  const { data: files, error, isLoading } = useSWR('http://localhost:5000/files', fetcher)
 
  if (error) return <div>falhou ao carregar</div>
  if (isLoading) return <div>carregando...</div>
  

  return (
    <div className="flex min-h-screen w-full">
      <Navbar />
      <div className="flex flex-1 flex-col p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">All Files</h1>
        </header>
        <div className="grid gap-4">
          {files &&
            files.map((file) => {
              return (
                <FileItem
                  key={file.id}
                  fileName={file.file_name}
                  uploadedAt={file.update_at}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
