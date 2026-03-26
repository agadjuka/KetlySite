import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false });

  const { level = "info", msg = "" } = body;

  const colors: Record<string, string> = {
    ok:  "\x1b[32m",
    err: "\x1b[31m",
    inf: "\x1b[36m",
  };
  const reset = "\x1b[0m";
  const prefix = "\x1b[35m[AR-PHONE]\x1b[0m";
  const color  = colors[level] ?? colors.inf;

  process.stdout.write(`${prefix} ${color}${msg}${reset}\n`);

  return NextResponse.json({ ok: true });
}
