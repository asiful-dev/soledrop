"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type User } from "firebase/auth";
import { onAuthChange } from "@/lib/firebase/auth";
import type { UserRole } from "@/lib/db/schema";

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAdmin: false,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthChange((firebaseUser) => {
      const syncSession = async () => {
        try {
          if (firebaseUser) {
            const token = await firebaseUser.getIdToken();
            await fetch("/api/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });

            const syncResponse = await fetch("/api/users/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
              }),
            });

            const syncBody = (await syncResponse.json().catch(() => null)) as {
              role?: UserRole;
            } | null;

            setRole(syncBody?.role ?? "user");
          } else {
            await fetch("/api/session", { method: "DELETE" });
            setRole(null);
          }
        } catch (error) {
          console.error("SESSION_SYNC_ERROR:", error);
          if (!firebaseUser) {
            setRole(null);
          }
        } finally {
          if (!isMounted) {
            return;
          }

          setUser(firebaseUser);
          setLoading(false);
        }
      };

      void syncSession();
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, isAdmin: role === "admin", loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
