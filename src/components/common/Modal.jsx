import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-red-950/60 px-4 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#fffaf0] p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-red-950/10 p-2 text-red-950 transition hover:bg-red-950 hover:text-white"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        {title && (
          <h3 className="pr-10 text-2xl font-bold text-red-950">{title}</h3>
        )}

        <div className="mt-6 text-stone-700">{children}</div>
      </div>
    </div>
  );
}

export default Modal;