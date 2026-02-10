import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");
  if (password !== (process.env.ADMIN_PASSWORD || "admin123")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN not configured" },
        { status: 500 }
      );
    }

    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${file.name}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url, filename: file.name });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: String(error) },
      { status: 500 }
    );
  }
}
