import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { items } from "@/lib/db/schema";

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

export async function DELETE(_request: NextRequest, ctx: RouteContext) {
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
