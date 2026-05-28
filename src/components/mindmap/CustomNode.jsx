import { Handle, Position } from "reactflow";

function CustomNode({ data }) {
  const styles = {
    root: "bg-red-950 text-yellow-50 border-yellow-400 min-w-[260px] max-w-[320px]",
    main: "bg-[#fffaf0] text-red-950 border-yellow-700/40 min-w-[190px] max-w-[230px]",
    sub: "bg-white text-stone-700 border-yellow-700/25 min-w-[150px] max-w-[190px]",
  };

  const showSummary = data.nodeType === "root";

  return (
    <div
      className={`rounded-2xl border px-5 py-4 shadow-xl shadow-red-950/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        styles[data.nodeType] || styles.sub
      }`}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />

      <p
        className={`text-center font-bold leading-6 ${
          data.nodeType === "root" ? "text-base" : "text-sm"
        }`}
      >
        {data.label}
      </p>

      {showSummary && data.summary && (
        <p className="mt-3 line-clamp-3 text-center text-xs leading-5 text-yellow-100/75">
          {data.summary}
        </p>
      )}

      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

export default CustomNode;
