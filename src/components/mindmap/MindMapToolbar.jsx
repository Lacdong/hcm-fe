import { Download, RotateCcw, ZoomIn } from "lucide-react";

function MindMapToolbar({ onResetView, onExport }) {
  return (
    <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onResetView}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-950 shadow-lg transition hover:bg-red-50"
      >
        <RotateCcw size={16} />
        Reset view
      </button>

      <button
        type="button"
        onClick={onResetView}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-950 shadow-lg transition hover:bg-red-50"
      >
        <ZoomIn size={16} />
        Fit graph
      </button>

      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center gap-2 rounded-full bg-red-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-red-800"
      >
        <Download size={16} />
        Export PNG
      </button>
    </div>
  );
}

export default MindMapToolbar;
