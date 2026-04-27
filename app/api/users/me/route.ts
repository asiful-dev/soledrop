import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, upsertAppUser } from "@/lib/auth/server-user";

export async function GET(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser(request);

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const appUser = await upsertAppUser(sessionUser);
    return NextResponse.json({ role: appUser.role, user: appUser });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch current user" },
      { status: 500 },
    );
  }
}
