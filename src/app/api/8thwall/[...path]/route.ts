import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

const XR_STANDALONE_DIR = path.resolve(process.cwd(), "engine", "xr-standalone");

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".mjs") return "application/javascript; charset=utf-8";
  if (ext === ".wasm") return "application/wasm";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".png") return "image/png";
  if (ext === ".tflite") return "application/octet-stream";
  return "application/octet-stream";
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: pathParts } = await context.params;
  const rel = pathParts.join("/");
  const abs = path.resolve(XR_STANDALONE_DIR, rel);

  // Защита от path traversal.
  if (!(abs === XR_STANDALONE_DIR || abs.startsWith(XR_STANDALONE_DIR + path.sep))) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  try {
    const stat = await fs.stat(abs);
    if (!stat.isFile()) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const headers = new Headers();
    headers.set("Content-Type", getContentType(abs));
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    // Потоковая отдача, чтобы не грузить tflite-модели целиком в память.
    return new NextResponse(createReadStream(abs) as unknown as BodyInit, {
      headers,
    });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}

