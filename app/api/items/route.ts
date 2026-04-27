import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { items } from "@/lib/db/schema";
import { itemSchema } from "@/lib/validations/item";
import { applyRateLimit } from "@/lib/rate-limit";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to create item";
}

export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : null;
    const safeLimit =
      parsedLimit && Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 100)
        : null;

    const baseQuery = db.select().from(items).orderBy(desc(items.createdAt));
    const allItems = safeLimit
      ? await baseQuery.limit(safeLimit)
      : await baseQuery;
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
    console.log("CREATE_ITEM_BODY:", body);
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
  } catch (error: unknown) {
    console.error("CREATE_ITEM_ERROR:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
