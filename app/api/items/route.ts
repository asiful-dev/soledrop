import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { items } from "@/lib/db/schema";
import { itemSchema } from "@/lib/validations/item";
import { applyRateLimit } from "@/lib/rate-limit";

export async function GET() {
  try {
    const allItems = await db
      .select()
      .from(items)
      .orderBy(desc(items.createdAt));
    return NextResponse.json(allItems);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "anonymous";
  const rateCheck = await applyRateLimit(ip);

  if (rateCheck.error) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateCheck.headers },
    );
  }

  try {
    const body = await request.json();
    const parsed = itemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const newItem = await db
      .insert(items)
      .values({
        ...parsed.data,
        price: parsed.data.price.toString(),
        authorId: body.authorId,
        authorEmail: body.authorEmail,
      })
      .returning();

    return NextResponse.json(newItem[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 },
    );
  }
}
