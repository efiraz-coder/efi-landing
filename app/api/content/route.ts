import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_CONTENT } from "@/lib/content";

// Simple KV-like storage using Vercel's built-in mechanisms
// We store content as a single JSON string in a server-side cache
// Since Vercel serverless functions are stateless, we use fetch-based persistence

// Use a simple external JSON store (jsonbin.io-like) or fallback to edge-compatible approach
// For now, we use Vercel Edge Config if available, or the Vercel Blob API directly

let cachedContent: string | null = null;
const STORE_KEY = "site-content-v1";

async function loadFromBlob(): Promise<typeof DEFAULT_CONTENT | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: STORE_KEY, token });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      return await res.json();
    }
  } catch {
    // Blob not available
  }
  return null;
}

async function saveToBlob(content: unknown): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  
  try {
    const { put, list, del } = await import("@vercel/blob");
    // Delete old
    const { blobs } = await list({ prefix: STORE_KEY, token });
    for (const blob of blobs) {
      await del(blob.url, { token });
    }
    // Save new
    await put(STORE_KEY, JSON.stringify(content), {
      access: "public",
      token,
      addRandomSuffix: false,
    });
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  // Try blob storage first
  const blobContent = await loadFromBlob();
  if (blobContent) {
    return NextResponse.json(blobContent);
  }
  
  // Try in-memory cache
  if (cachedContent) {
    try {
      return NextResponse.json(JSON.parse(cachedContent));
    } catch {
      // Invalid cache
    }
  }
  
  return NextResponse.json(DEFAULT_CONTENT);
}

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  
  // Trim whitespace/newlines from both
  if (password?.trim() !== adminPass.trim()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await request.json();
    const contentStr = JSON.stringify(content);
    
    // Save to blob if available
    const savedToBlob = await saveToBlob(content);
    
    // Always cache in memory too
    cachedContent = contentStr;
    
    if (savedToBlob) {
      return NextResponse.json({ success: true, storage: "blob" });
    }
    
    // If no blob, still return success with in-memory note
    return NextResponse.json({ 
      success: true, 
      storage: "memory",
      note: "Changes saved in memory. Connect Vercel Blob for persistent storage."
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save", details: String(error) },
      { status: 500 }
    );
  }
}
