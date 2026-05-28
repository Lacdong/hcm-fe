import { useState } from "react";
import { Bot, Loader2, Send, X } from "lucide-react";

import { askGemini } from "../../services/geminiService";

import ChatMessage from "./ChatMessage";

function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Xin chào! Mình là trợ lý AI hỗ trợ tìm hiểu về cuộc đời, sự nghiệp, tư tưởng và di sản của Chủ tịch Hồ Chí Minh. Bạn muốn hỏi gì?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const question = input.trim();

    if (!question || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const answer = await askGemini(question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hiện tại AI chưa thể trả lời. Bạn hãy kiểm tra API key Gemini, file .env hoặc kết nối mạng.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-[90]">
      {isOpen && (
        <div className="mb-4 w-[360px] overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-white shadow-2xl shadow-red-950/25 md:w-[420px]">
          <div className="flex items-center justify-between bg-red-950 px-5 py-4 text-yellow-50">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100 text-red-950">
                <Bot size={24} />
              </div>

              <div>
                <p className="font-bold">Trợ lý AI học tập</p>
                <p className="text-xs text-yellow-100/70">
                  Hỏi đáp về Chủ tịch Hồ Chí Minh
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-yellow-50/10 p-2 transition hover:bg-yellow-50/20"
              aria-label="Đóng AI chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex h-[420px] flex-col gap-4 overflow-y-auto bg-[#f7f1e5] p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={`${message.role}-${index}`}
                role={message.role}
                content={message.content}
              />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-3xl border border-yellow-700/20 bg-[#fffaf0] px-5 py-4 text-sm font-semibold text-stone-600">
                  <Loader2 size={18} className="animate-spin" />
                  AI đang suy nghĩ...
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-3 border-t border-yellow-700/20 bg-white p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              className="min-w-0 flex-1 rounded-full border border-yellow-700/20 bg-[#fffaf0] px-5 py-3 text-sm outline-none transition focus:border-red-900"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-900 text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-stone-400"
              aria-label="Gửi câu hỏi"
            >
              <Send size={19} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-red-950 text-yellow-100 shadow-2xl shadow-red-950/30 transition hover:scale-105 hover:bg-red-900"
        aria-label="Mở trợ lý AI"
      >
        {isOpen ? <X size={28} /> : <Bot size={30} />}

        {!isOpen && (
          <span className="absolute left-20 hidden whitespace-nowrap rounded-full bg-[#fffaf0] px-4 py-2 text-sm font-semibold text-red-950 shadow-lg md:block">
            Hỏi AI
          </span>
        )}
      </button>
    </div>
  );
}

export default AIChatBubble;