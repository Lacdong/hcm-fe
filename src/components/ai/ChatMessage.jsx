// Parse markdown don gian: **bold**, bullet list, xuong dong
function parseMarkdown(text) {
  const lines = text.split("\n");

  return lines.map((line, i) => {
    const trimmed = line.trim();

    // Bullet line: bat dau bang - hoac *
    const isBullet = /^[-*]\s+/.test(trimmed);
    const content = isBullet ? trimmed.replace(/^[-*]\s+/, "") : line;

    // Parse **bold** trong noi dung
    const parts = content.split(/\*\*(.+?)\*\*/g);
    const rendered = parts.map((part, j) =>
      j % 2 === 1 ? (
        <strong key={j} className="font-semibold text-red-900">
          {part}
        </strong>
      ) : (
        part
      )
    );

    if (isBullet) {
      return (
        <li key={i} className="ml-2 flex gap-2">
          <span className="mt-1 shrink-0 text-red-800">•</span>
          <span>{rendered}</span>
        </li>
      );
    }

    // Dong trong → khoang cach
    if (!trimmed) return <div key={i} className="h-1" />;

    return <p key={i}>{rendered}</p>;
  });
}

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
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm">{content}</p>
        ) : (
          <ul className="flex flex-col gap-1 text-sm">{parseMarkdown(content)}</ul>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;