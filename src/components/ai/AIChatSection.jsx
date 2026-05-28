import { useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";

import { askGemini } from "../../services/geminiService";

import SectionTitle from "../common/SectionTitle";
import ChatMessage from "./ChatMessage";

function AIChatSection() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Xin chào! Mình là trợ lý AI hỗ trợ tìm hiểu về cuộc đời, sự nghiệp, tư tưởng và di sản của Chủ tịch Hồ Chí Minh. Bạn muốn hỏi nội dung nào?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    "Tóm tắt hành trình tìm đường cứu nước của Bác Hồ",
    "Vì sao Bác không đi theo con đường của Phan Bội Châu?",
    "Giải thích tư tưởng đại đoàn kết toàn dân",
    "Kể tên các tác phẩm tiêu biểu của Bác Hồ",
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const question = input.trim();

    if (!question || isLoading) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
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

  function handleSuggestionClick(suggestion) {
    setInput(suggestion);
  }

  return (
    <section id="ai-assistant" className="bg-[#f7f1e5] section-padding">
      <div className="section-container">
        <SectionTitle
          label="AI Assistant"
          title="Trợ lý AI học tập"
          description="Đặt câu hỏi để được hỗ trợ tìm hiểu về tiểu sử, dòng thời gian, tư tưởng, tác phẩm và di sản của Chủ tịch Hồ Chí Minh."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-red-950 p-8 text-yellow-50 shadow-2xl shadow-red-950/15">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-100 text-red-950">
              <Bot size={34} />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Hỏi đáp nội dung lịch sử
            </h3>

            <p className="mt-4 leading-8 text-yellow-100/75">
              AI hỗ trợ giải thích nội dung theo cách dễ hiểu, phù hợp để ôn
              tập, thuyết trình hoặc khám phá nhanh các phần trong website.
            </p>

            <div className="mt-8 space-y-3">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full rounded-2xl border border-yellow-100/15 bg-yellow-50/5 px-5 py-4 text-left text-sm text-yellow-100/85 transition hover:bg-yellow-50/10"
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="mt-6 rounded-2xl border border-yellow-100/15 bg-yellow-50/5 p-4 text-sm leading-6 text-yellow-100/70">
              Lưu ý: AI chỉ hỗ trợ học tập. Các thông tin quan trọng nên được
              đối chiếu với tài liệu lịch sử chính thống.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-red-950/5 md:p-8">
            <div className="flex h-[460px] flex-col gap-5 overflow-y-auto rounded-3xl bg-[#f7f1e5] p-5">
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

            <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
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
        </div>
      </div>
    </section>
  );
}

export default AIChatSection;