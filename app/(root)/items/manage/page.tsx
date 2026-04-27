"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  EyeIcon,
  PlusIcon,
  TrashIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import { useItems } from "@/features/items/hooks/useItems";
import { useAuth } from "@/features/auth/hooks/useAuth";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { Button } from "@/shared/ui-components/controls/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui-components/controls/dialog";

export default function ManageItemsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { items, loading, deleteItem } = useItems();
  const router = useRouter();
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      toast.error("Admin access required to manage products.");
      router.push("/");
    }
  }, [authLoading, user, isAdmin, router]);

  if (authLoading || !user || !isAdmin) {
    return null;
  }

  const myItems = items.filter((item) => item.authorId === user.uid);

  const handleDelete = async () => {
    if (!itemToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteItem(itemToDelete.id);
      toast.success("Drop deleted");
      setItemToDelete(null);
    } catch {
      toast.error("Failed to delete. Try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Manage Your Drops
          </h1>
          <p className="mt-1 text-sm text-muted">
            {myItems.length} items listed by you
          </p>
        </div>
        <Button asChild>
          <Link href="/items/add" className="inline-flex items-center gap-1">
            <PlusIcon className="h-4 w-4" /> Add New
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : myItems.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl">📦</div>
          <p className="mb-4 text-muted">
            No drops yet. Add your first item now.
          </p>
          <Button asChild>
            <Link href="/items/add">Create your first drop</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-160">
              <thead className="bg-surface/80">
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myItems.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border/70 text-sm last:border-b-0"
                  >
                    <td className="max-w-65 px-4 py-3 font-medium text-foreground">
                      <p className="line-clamp-1">{item.title}</p>
                      <p className="line-clamp-1 text-xs text-muted">
                        {item.brand}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted">{item.category}</td>
                    <td className="px-4 py-3 text-accent">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(String(item.createdAt)).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/items/${item.id}`}>
                            <EyeIcon className="h-4 w-4" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/items/manage/${item.id}`}>
                            <PencilSimpleIcon className="h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            setItemToDelete({ id: item.id, title: item.title })
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog
        open={Boolean(itemToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setItemToDelete(null);
          }
        }}
      >
        <DialogContent className="border-border bg-surface text-foreground">
          <DialogHeader>
            <DialogTitle>Delete this item?</DialogTitle>
            <DialogDescription>
              {itemToDelete
                ? `Delete "${itemToDelete.title}"? This action cannot be undone.`
                : "This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-border bg-surface/80">
            <Button
              variant="outline"
              onClick={() => setItemToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
