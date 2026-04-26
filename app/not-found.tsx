import Link from "next/link";
import { Button } from "@/shared/ui-components/controls/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="bg-linear-to-r from-primary to-accent bg-clip-text text-8xl font-black text-transparent">
        404
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        No drop here bestie 😭
      </h1>
      <p className="max-w-sm text-muted">
        This page doesn&apos;t exist. Maybe the collab got cancelled.
      </p>
      <Button className="bg-primary hover:bg-primary-hover" asChild>
        <Link href="/">Back to drops</Link>
      </Button>
    </div>
  );
}
