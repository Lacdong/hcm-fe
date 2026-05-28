import { aiSystemContext } from "../src/data/aiContextData.js";

const MAX_QUESTION_LENGTH = 2000;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

function jsonResponse(status, payload) {
  return Response.json(payload, { status });
}

function getApiKey() {
  return String(process.env.OPENROUTER_API_KEY || "").trim();
}

function getApiKeyError(apiKey) {
  if (!apiKey) return "Missing OPENROUTER_API_KEY";
  if (!apiKey.startsWith("sk-or-")) return "OPENROUTER_API_KEY khong dung dinh dang";
  return "";
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return jsonResponse(405, { error: "Method not allowed" });
    }

    const apiKey = getApiKey();
    const apiKeyError = getApiKeyError(apiKey);

    if (apiKeyError) {
      return jsonResponse(500, { error: apiKeyError });
    }

    const body = await request.json().catch(() => ({}));
    const question = String(body.question || "").trim();

    if (!question) {
      return jsonResponse(400, { error: "Question is required" });
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      return jsonResponse(400, { error: "Question is too long" });
    }

    const prompt = `${aiSystemContext}

Cau hoi cua nguoi dung:
${question}

Yeu cau tra loi:
- Tra loi bang tieng Viet.
- Trinh bay ngan gon, ro y.
- Uu tien gach dau dong neu cau tra loi co nhieu y.
- Khong tra loi lan man.
- Neu khong chac chan, hay noi can kiem chung them tu nguon chinh thong.`;

    try {
      const res = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("OpenRouter error", res.status, errData);

        const errMsg = String(errData?.error?.message || "");
        if (res.status === 429 || errMsg.includes("quota") || errMsg.includes("rate limit")) {
          return jsonResponse(429, { error: "AI dang qua tai, vui long thu lai sau" });
        }
        if (res.status === 401 || res.status === 403) {
          return jsonResponse(500, { error: "API key khong hop le" });
        }
        return jsonResponse(502, { error: "AI request failed" });
      }

      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content || "";

      if (!answer) {
        return jsonResponse(502, { error: "Khong nhan duoc phan hoi tu AI" });
      }

      return jsonResponse(200, { answer });
    } catch (error) {
      console.error("OpenRouter request failed", error);
      return jsonResponse(502, { error: "Loi ket noi toi AI" });
    }
  },
};
