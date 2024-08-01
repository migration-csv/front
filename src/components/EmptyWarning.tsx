export default function EmptyWarning() {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-muted" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          No files found
        </h1>
        <p className="mt-4 text-muted-foreground">
          It looks like there are no files to display at the moment. You can
          upload or create new files to get started.
        </p>
      </div>
    </div>
  );
}
