function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-5 py-4 leading-7 shadow-sm ${
          isUser
            ? "bg-red-900 text-white"
            : "border border-yellow-700/20 bg-[#fffaf0] text-stone-700"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm">{content}</p>
      </div>
    </div>
  );
}

export default ChatMessage;