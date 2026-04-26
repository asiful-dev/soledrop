import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("__session", token, {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("__session", "", {
    path: "/",
    maxAge: 0,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });

  return response;
}
