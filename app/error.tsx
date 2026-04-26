"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui-components/controls/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-6xl">💀</div>
      <h1 className="text-3xl font-bold text-foreground">Something bricked</h1>
      <p className="max-w-sm text-muted">
        That page caught an L. Hit refresh or go back and try again.
      </p>
      <Button onClick={reset} className="bg-primary hover:bg-primary-hover">
        Try again
      </Button>
    </div>
  );
}
