import { env } from "../../../../config/env";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { tag, token } = body;

  if (!tag || !token) {
    return NextResponse.json(
      { error: "Missing tag or token" },
      { status: 400 }
    );
  }

  if (token !== env.CACHE_TOKEN) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  revalidateTag(tag, "general");

  return NextResponse.json({ success: true });
}
