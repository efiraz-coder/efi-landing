import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_CONTENT } from "@/lib/content";

// In-memory + Vercel KV approach: We use Vercel Blob to store a single JSON
// For simplicity without extra services, we use a file-based approach via Blob
// If BLOB_READ_WRITE_TOKEN is not set, falls back to default content

const CONTENT_BLOB_KEY = "site-content.json";

async function getBlobUrl(): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: CONTENT_BLOB_KEY, token: process.env.BLOB_READ_WRITE_TOKEN });
    return blobs.length > 0 ? blobs[0].url : null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const blobUrl = await getBlobUrl();
    if (blobUrl) {
      const res = await fetch(blobUrl, { cache: "no-store" });
      const content = await res.json();
      return NextResponse.json(content);
    }
  } catch {
    // Fall through to default
  }
  return NextResponse.json(DEFAULT_CONTENT);
}

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");
  if (password !== (process.env.ADMIN_PASSWORD || "admin123")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await request.json();

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      // Delete old blob first
      const blobUrl = await getBlobUrl();
      if (blobUrl) {
        const { del } = await import("@vercel/blob");
        await del(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
      }
      await put(CONTENT_BLOB_KEY, JSON.stringify(content), {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save content", details: String(error) },
      { status: 500 }
    );
  }
}
