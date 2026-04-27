"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  UsersIcon,
  ShieldCheckIcon,
  UserIcon,
  ClockIcon,
  EnvelopeIcon,
} from "@phosphor-icons/react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui-components/controls/select";
import { Avatar, AvatarFallback } from "@/shared/ui-components/controls/avatar";
import { Badge } from "@/shared/ui-components/controls/badge";
import { Skeleton } from "@/shared/ui-components/controls/skeleton";

interface DBUser {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsersPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      toast.error("Admin access required.");
      router.push("/");
    }
  }, [authLoading, user, isAdmin, router]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load users list");
      } finally {
        setLoading(false);
      }
    }

    if (isAdmin) {
      void fetchUsers();
    }
  }, [isAdmin]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update role");
      }

      toast.success("User role updated");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: newRole as "admin" | "user" } : u,
        ),
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || !user || !isAdmin) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground">
            <UsersIcon size={32} className="text-primary" />
            User Management
          </h1>
          <p className="mt-2 text-muted">
            Manage user roles and permissions across the platform.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="h-8 px-3 py-0 text-sm font-medium"
          >
            Total Users: {users.length}
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted select-none">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Joined At</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-8 w-24 rounded-md" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Skeleton className="ml-auto h-8 w-20 rounded-md" />
                    </td>
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center grayscale opacity-50">
                      <UsersIcon size={48} className="mb-4" />
                      <p className="text-lg font-medium">No users found</p>
                      <p className="text-sm text-muted">
                        Users will appear here after they sign up.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((dbUser, index) => (
                  <motion.tr
                    key={dbUser.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border group-hover:border-primary/50 transition-colors">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {dbUser.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground truncate max-w-[200px]">
                            {dbUser.email.split("@")[0]}
                          </span>
                          <span className="text-xs text-muted flex items-center gap-1">
                            <EnvelopeIcon size={12} />
                            {dbUser.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      <span className="flex items-center gap-2">
                        <ClockIcon size={16} />
                        {new Date(dbUser.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {dbUser.role === "admin" ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20 flex w-fit items-center gap-1">
                          <ShieldCheckIcon size={14} />
                          Admin
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="flex w-fit items-center gap-1"
                        >
                          <UserIcon size={14} />
                          User
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Select
                        value={dbUser.role}
                        onValueChange={(val) =>
                          handleRoleChange(dbUser.id, val)
                        }
                        disabled={
                          updatingId === dbUser.id ||
                          dbUser.email === user.email
                        }
                      >
                        <SelectTrigger className="w-[120px] ml-auto h-9 text-xs">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border">
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      {dbUser.email === user.email && (
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          Self cannot be changed
                        </p>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
