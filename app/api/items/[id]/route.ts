import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { items } from "@/lib/db/schema";
import { itemSchema } from "@/lib/validations/item";
import { requireAdmin } from "@/lib/auth/server-user";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;

    const item = await db.select().from(items).where(eq(items.id, id)).limit(1);

    if (!item.length) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, ctx: RouteContext) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const { id } = await ctx.params;

    const deleted = await db.delete(items).where(eq(items.id, id)).returning();

    if (!deleted.length) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, ctx: RouteContext) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  const { appUser } = adminCheck;

  try {
    const { id } = await ctx.params;
    const body = await request.json();
    const parsed = itemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const existing = await db
      .select()
      .from(items)
      .where(eq(items.id, id))
      .limit(1);

    if (!existing.length) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const updated = await db
      .update(items)
      .set({
        ...parsed.data,
        price: parsed.data.price.toString(),
        authorId: appUser.firebaseUid,
        authorEmail: appUser.email,
        updatedAt: new Date(),
      })
      .where(eq(items.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 },
    );
  }
}
