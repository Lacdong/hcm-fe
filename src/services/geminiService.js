import { GoogleGenAI } from "@google/genai";

import { aiSystemContext } from "../data/aiContextData";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey,
});

export async function askGemini(userQuestion) {
  if (!apiKey) {
    throw new Error("Thiếu VITE_GEMINI_API_KEY trong file .env");
  }

  const prompt = `
${aiSystemContext}

Câu hỏi của người dùng:
${userQuestion}

Yêu cầu trả lời:
- Trả lời bằng tiếng Việt.
- Trình bày ngắn gọn, rõ ý.
- Ưu tiên gạch đầu dòng nếu câu trả lời có nhiều ý.
- Không trả lời lan man.
- Nếu không chắc chắn, hãy nói cần kiểm chứng thêm từ nguồn chính thống.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}