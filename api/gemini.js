import { GoogleGenAI } from "@google/genai";

import { aiSystemContext } from "../src/data/aiContextData.js";

const MAX_QUESTION_LENGTH = 2000;

function jsonResponse(status, payload) {
  return Response.json(payload, { status });
}

function getGeminiErrorMessage(error) {
  const message = String(error?.message || "");

  if (message.includes("API key not valid") || message.includes("API_KEY_INVALID")) {
    return "Gemini API key khong hop le hoac chua duoc cap quyen";
  }

  if (message.includes("high demand") || message.includes("UNAVAILABLE")) {
    return "Gemini dang qua tai, vui long thu lai sau";
  }

  return "Gemini request failed";
}

function getGeminiApiKey() {
  return String(process.env.GEMINI_API_KEY || "").trim();
}

function getApiKeyConfigError(apiKey) {
  if (!apiKey) {
    return "Missing GEMINI_API_KEY";
  }

  if (apiKey === "your_gemini_api_key_here") {
    return "GEMINI_API_KEY chua duoc cau hinh";
  }

  if (apiKey.startsWith("AQ.")) {
    return "GEMINI_API_KEY phai la Google AI Studio API key, khong phai OAuth/access token";
  }

  if (!apiKey.startsWith("AIza")) {
    return "GEMINI_API_KEY khong dung dinh dang Gemini API key";
  }

  return "";
}

async function handleGeminiRequest(apiKey, question) {
  const apiKeyConfigError = getApiKeyConfigError(apiKey);
  if (apiKeyConfigError) {
    return { status: 500, body: { error: apiKeyConfigError } };
  }

  if (!question) {
    return { status: 400, body: { error: "Question is required" } };
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return { status: 400, body: { error: "Question is too long" } };
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
${aiSystemContext}

Cau hoi cua nguoi dung:
${question}

Yeu cau tra loi:
- Tra loi bang tieng Viet.
- Trinh bay ngan gon, ro y.
- Uu tien gach dau dong neu cau tra loi co nhieu y.
- Khong tra loi lan man.
- Neu khong chac chan, hay noi can kiem chung them tu nguon chinh thong.
`;

  const FALLBACK_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ];

  let lastError = null;

  for (const model of FALLBACK_MODELS) {
    try {
      const result = await ai.models.generateContent({ model, contents: prompt });
      return { status: 200, body: { answer: result.text } };
    } catch (error) {
      lastError = error;
      const isOverloaded =
        String(error?.message || "").includes("high demand") ||
        String(error?.message || "").includes("UNAVAILABLE") ||
        error?.status === 503;

      if (isOverloaded) {
        console.warn(`Model ${model} overloaded, switching to next fallback...`);
        continue;
      }

      console.error(`Gemini request failed on model ${model}`, error);
      return { status: 502, body: { error: getGeminiErrorMessage(error) } };
    }
  }

  console.error("All Gemini models overloaded", lastError);
  return { status: 503, body: { error: "Tat ca model Gemini dang qua tai, vui long thu lai sau." } };
}

// ─── Vercel Serverless Function handler (dùng khi deploy) ───────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const question = String(req.body?.question || "").trim();
  const apiKey = getGeminiApiKey();
  const { status, body } = await handleGeminiRequest(apiKey, question);

  return res.status(status).json(body);
}

// ─── Vite dev middleware handler (dùng khi chạy localhost) ───────────────────
export const devFetch = {
  async fetch(request) {
    if (request.method !== "POST") {
      return jsonResponse(405, { error: "Method not allowed" });
    }

    const body = await request.json().catch(() => ({}));
    const question = String(body.question || "").trim();
    const apiKey = getGeminiApiKey();
    const { status, body: resBody } = await handleGeminiRequest(apiKey, question);

    return jsonResponse(status, resBody);
  },
};
