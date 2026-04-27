import { NextRequest, NextResponse } from "next/server";
import { upsertAppUser, getSessionUser } from "@/lib/auth/server-user";

interface SyncBody {
  uid?: string;
  email?: string;
}

export async function POST(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser(request);

    if (sessionUser) {
      const appUser = await upsertAppUser(sessionUser);
      return NextResponse.json({ role: appUser.role, user: appUser });
    }

    const body = (await request.json().catch(() => null)) as SyncBody | null;

    if (!body?.uid || !body?.email) {
      return NextResponse.json(
        { error: "User identity is required" },
        { status: 400 },
      );
    }

    const appUser = await upsertAppUser({ uid: body.uid, email: body.email });
    return NextResponse.json({ role: appUser.role, user: appUser });
  } catch {
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
