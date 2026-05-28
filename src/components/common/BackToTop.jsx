import { ArrowUp } from "lucide-react";

function BackToTop() {
  return (
    <a
      href="#home"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-900 text-white shadow-xl shadow-red-950/25 transition hover:-translate-y-1 hover:bg-red-800"
      aria-label="Quay lại đầu trang"
    >
      <ArrowUp size={20} />
    </a>
  );
}

export default BackToTop;