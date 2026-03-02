import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import * as fs from "node:fs";
import path from "node:path";
import os from "node:os";

const VYON_LOG_FILE = path.join(os.tmpdir(), "vyon-proxy.log");

const EXTERNAL_API_URL = process.env.VYON_EXTERNAL_API_URL;
const EXTERNAL_API_KEY = process.env.VYON_EXTERNAL_API_KEY;

function logProxy(msg) {
  try {
    fs.appendFileSync(VYON_LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
  } catch (e) {
    process.stderr.write("[VYON] Ошибка записи лога: " + (e?.message || e) + "\n");
  }
}

// POST /apps/vyon-api/api/proxy
export async function action({ request }) {
  try {
    if (!EXTERNAL_API_URL || !EXTERNAL_API_KEY) {
      return json(
        { error: "VYON_EXTERNAL_API_URL и VYON_EXTERNAL_API_KEY должны быть заданы в переменных окружения" },
        { status: 500 },
      );
    }
    await authenticate.public.appProxy(request);

    const formData = await request.formData();

    const garmentUrls = [];
    for (let i = 1; i <= 5; i++) {
      const val = formData.get("garment_url_" + i);
      if (val) garmentUrls.push(val);
    }

    const externalFormData = new FormData();
    externalFormData.append("model", formData.get("model"));
    garmentUrls.forEach((url, idx) => {
      externalFormData.append("garment_url_" + (idx + 1), url);
    });

    const externalResponse = await fetch(EXTERNAL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${EXTERNAL_API_KEY}`,
      },
      body: externalFormData,
    });

    const text = await externalResponse.text();

    if (externalResponse.status >= 400) {
      const preview = text.length > 500 ? text.slice(0, 500) + "..." : text;
      logProxy("POST: ответ ошибка " + externalResponse.status + " — " + preview.replace(/\n/g, " "));
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return json(data, { status: externalResponse.status });
  } catch (error) {
    logProxy("POST error: " + (error instanceof Error ? error.message : String(error)));
    return json(
      {
        error: "Ошибка при создании задачи",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// GET /apps/vyon-api/api/proxy?task_id=...
export async function loader({ request }) {
  try {
    if (!EXTERNAL_API_URL || !EXTERNAL_API_KEY) {
      return json(
        { error: "VYON_EXTERNAL_API_URL и VYON_EXTERNAL_API_KEY должны быть заданы в переменных окружения" },
        { status: 500 },
      );
    }
    await authenticate.public.appProxy(request);

    const url = new URL(request.url);
    const taskId = url.searchParams.get("task_id");

    if (!taskId) {
      return json(
        { error: "Параметр task_id обязателен" },
        { status: 400 },
      );
    }

    const externalResponse = await fetch(
      `${EXTERNAL_API_URL}/${encodeURIComponent(taskId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${EXTERNAL_API_KEY}`,
        },
      },
    );

    const text = await externalResponse.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return json(data, { status: externalResponse.status });
  } catch (error) {
    logProxy("GET poll error: " + (error instanceof Error ? error.message : String(error)));
    return json(
      {
        error: "Ошибка при получении статуса задачи",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}