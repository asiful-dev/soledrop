import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userRoleEnum, users } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/server-user";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, ctx: RouteContext) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const { id } = await ctx.params;
    const body = (await request.json().catch(() => null)) as {
      role?: string;
    } | null;

    if (!body?.role || !userRoleEnum.enumValues.includes(body.role as never)) {
      return NextResponse.json(
        { error: "Valid role is required" },
        { status: 400 },
      );
    }

    const updated = await db
      .update(users)
      .set({
        role: body.role as (typeof userRoleEnum.enumValues)[number],
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 },
    );
  }
}
