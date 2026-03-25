import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

const ENGINE_DIR = path.resolve(process.cwd(), "engine");
const ALLOWED_MODEL_BASENAME = "plaggy_cc0-pizza-572.glb";

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".glb") return "model/gltf-binary";
  return "application/octet-stream";
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: pathParts } = await context.params;
  const rel = pathParts.join("/");

  // Пускаем только конкретную GLB.
  if (path.basename(rel) !== ALLOWED_MODEL_BASENAME) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const abs = path.resolve(ENGINE_DIR, rel);
  if (!abs.startsWith(ENGINE_DIR + path.sep) && abs !== ENGINE_DIR) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  try {
    const stat = await fs.stat(abs);
    if (!stat.isFile()) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const headers = new Headers();
    headers.set("Content-Type", getContentType(abs));
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(createReadStream(abs) as unknown as BodyInit, {
      headers,
    });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}

