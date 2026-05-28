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

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return jsonResponse(405, { error: "Method not allowed" });
    }

    const apiKey = getGeminiApiKey();
    const apiKeyConfigError = getApiKeyConfigError(apiKey);

    if (apiKeyConfigError) {
      return jsonResponse(500, { error: apiKeyConfigError });
    }

    const body = await request.json().catch(() => ({}));
    const question = String(body.question || "").trim();

    if (!question) {
      return jsonResponse(400, { error: "Question is required" });
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      return jsonResponse(400, { error: "Question is too long" });
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

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return jsonResponse(200, { answer: result.text });
    } catch (error) {
      console.error("Gemini request failed", error);
      return jsonResponse(502, { error: getGeminiErrorMessage(error) });
    }
  },
};
