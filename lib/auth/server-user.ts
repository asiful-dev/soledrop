import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, type AppUser } from "@/lib/db/schema";

export interface SessionUser {
  uid: string;
  email: string;
}

interface FirebaseAccountsLookupResponse {
  users?: Array<{
    localId?: string;
    email?: string;
  }>;
  error?: {
    message?: string;
  };
}

export async function getSessionUser(
  request: NextRequest,
): Promise<SessionUser | null> {
  const idToken = request.cookies.get("__session")?.value;
  const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!idToken || !firebaseApiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      },
    );

    const data = (await response
      .json()
      .catch(() => null)) as FirebaseAccountsLookupResponse | null;

    if (!response.ok) {
      return null;
    }

    const account = data?.users?.[0];
    if (!account?.localId || !account?.email) {
      return null;
    }

    return { uid: account.localId, email: account.email };
  } catch {
    return null;
  }
}

export async function upsertAppUser(
  sessionUser: SessionUser,
): Promise<AppUser> {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.firebaseUid, sessionUser.uid))
    .limit(1);

  if (!existing.length) {
    const inserted = await db
      .insert(users)
      .values({
        firebaseUid: sessionUser.uid,
        email: sessionUser.email,
      })
      .returning();

    return inserted[0];
  }

  if (existing[0].email !== sessionUser.email) {
    const updated = await db
      .update(users)
      .set({ email: sessionUser.email, updatedAt: new Date() })
      .where(eq(users.id, existing[0].id))
      .returning();

    return updated[0];
  }

  return existing[0];
}

export async function requireAdmin(
  request: NextRequest,
): Promise<{ user: SessionUser; appUser: AppUser } | NextResponse> {
  const sessionUser = await getSessionUser(request);

  if (!sessionUser) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  const appUser = await upsertAppUser(sessionUser);

  if (appUser.role !== "admin") {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 },
    );
  }

  return { user: sessionUser, appUser };
}
