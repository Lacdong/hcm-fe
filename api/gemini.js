import { GoogleGenAI } from "@google/genai";
import { aiSystemContext } from "../src/data/aiContextData.js";

const MAX_QUESTION_LENGTH = 2000;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Gemini models thu lan luot khi bi loi
const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

// OpenRouter models thu lan luot khi Gemini that bai hoan toan
const OPENROUTER_MODELS = [
  "qwen/qwen3-8b:free",
  "mistralai/mistral-7b-instruct:free",
];

function jsonResponse(status, payload) {
  return Response.json(payload, { status });
}

// Loai bo ky tu la: chi giu lai Unicode Latin, tieng Viet, dau cau, so, xuat dong
function sanitizeAnswer(text) {
  return text
    // Giu: Latin + dau viet + cac dau cau pho bien + khoang trang + so
    .replace(/[^\u0000-\u007F\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\n\r\t !"#%&'()*+,\-./:;<=>?@[\\\]^_`{|}~0-9]/g, "")
    .replace(/\n{3,}/g, "\n\n") // gop nhieu dong trong lai
    .trim();
}

function isTransientError(error, httpStatus) {
  const msg = String(error?.message || "");
  return (
    msg.includes("high demand") ||
    msg.includes("UNAVAILABLE") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("quota") ||
    msg.includes("rate limit") ||
    httpStatus === 503 ||
    httpStatus === 429 ||
    error?.status === 503 ||
    error?.status === 429
  );
}

// ── 1. Thu Gemini ────────────────────────────────────────────────────────────
async function tryGemini(geminiApiKey, prompt) {
  if (!geminiApiKey || !geminiApiKey.startsWith("AIza")) return null;

  const ai = new GoogleGenAI({ apiKey: geminiApiKey });

  for (const model of GEMINI_MODELS) {
    try {
      console.log(`[Gemini] Trying ${model}...`);
      const result = await ai.models.generateContent({ model, contents: prompt });
      console.log(`[Gemini] Success with ${model}`);
      return result.text;
    } catch (error) {
      if (isTransientError(error, error?.status)) {
        console.warn(`[Gemini] ${model} unavailable (${error?.status}), trying next...`);
        continue;
      }
      // Loi nghiem trong (key sai,...) → dung luon, khong thu model khac
      console.error(`[Gemini] Fatal error on ${model}`, error);
      return null;
    }
  }

  console.warn("[Gemini] All models exhausted, falling back to OpenRouter...");
  return null;
}

// ── 2. Thu OpenRouter ────────────────────────────────────────────────────────
async function tryOpenRouter(openRouterKey, prompt) {
  if (!openRouterKey || !openRouterKey.startsWith("sk-or-")) return null;

  for (const model of OPENROUTER_MODELS) {
    try {
      console.log(`[OpenRouter] Trying ${model}...`);
      const res = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.warn(`[OpenRouter] ${model} error ${res.status}`, errData);
        if (isTransientError(errData?.error, res.status)) continue;
        return null;
      }

      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content || "";
      if (answer) {
        console.log(`[OpenRouter] Success with ${model}`);
        return answer;
      }
    } catch (error) {
      console.warn(`[OpenRouter] ${model} failed`, error);
      continue;
    }
  }

  console.error("[OpenRouter] All models failed");
  return null;
}

// ── Handler chính ────────────────────────────────────────────────────────────
export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return jsonResponse(405, { error: "Method not allowed" });
    }

    const body = await request.json().catch(() => ({}));
    const question = String(body.question || "").trim();

    if (!question) return jsonResponse(400, { error: "Question is required" });
    if (question.length > MAX_QUESTION_LENGTH) return jsonResponse(400, { error: "Question is too long" });

    const geminiKey = String(process.env.GEMINI_API_KEY || "").trim();
    const openRouterKey = String(process.env.OPENROUTER_API_KEY || "").trim();

    const prompt = `${aiSystemContext}

QUAN TRONG: Ban PHAI tra loi HOAN TOAN bang TIENG VIET. Tuyet doi khong dung tieng Anh hay bat ky ngon ngu nao khac.

Cau hoi cua nguoi dung:
${question}

Yeu cau tra loi (bat buoc):
- Ngon ngu: TIENG VIET (bat buoc, khong duoc dung tieng Anh, tieng trung, tieng nhat v.v).
- Trinh bay ngan gon, ro y.
- Uu tien gach dau dong neu cau tra loi co nhieu y.
- Khong tra loi lan man.
- Neu khong chac chan, hay noi can kiem chung them tu nguon chinh thong.`;

    // Uu tien Gemini, fallback sang OpenRouter
    const answer =
      (await tryGemini(geminiKey, prompt)) ??
      (await tryOpenRouter(openRouterKey, prompt));

    if (!answer) {
      return jsonResponse(503, { error: "Tat ca AI dang qua tai hoac gap loi, vui long thu lai sau." });
    }

    return jsonResponse(200, { answer: sanitizeAnswer(answer) });
  },
};
