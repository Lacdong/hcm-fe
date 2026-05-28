import { X } from "lucide-react";

function NodeDetailPanel({ node, onClose }) {
  if (!node) return null;

  const nodeTypeLabel = {
    root: "Chủ đề trung tâm",
    main: "Ý chính",
    sub: "Ý phụ",
  };

  return (
    <aside className="absolute right-5 top-5 z-20 w-[320px] rounded-3xl border border-yellow-700/20 bg-[#fffaf0] p-6 shadow-2xl shadow-red-950/15">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-red-950/10 p-2 text-red-950 transition hover:bg-red-950 hover:text-white"
        aria-label="Đóng chi tiết node"
      >
        <X size={18} />
      </button>

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
        {nodeTypeLabel[node.nodeType] || "Node"}
      </p>

      <h3 className="mt-4 pr-8 text-2xl font-bold text-red-950">
        {node.label}
      </h3>

      <p className="mt-5 leading-7 text-stone-600">{node.summary}</p>
    </aside>
  );
}

export default NodeDetailPanel;
