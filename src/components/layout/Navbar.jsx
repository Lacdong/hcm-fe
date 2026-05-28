import { Menu } from "lucide-react";

const navItems = [
  {
    label: "Trang chủ",
    href: "#home",
  },
  {
    label: "Tiểu sử",
    href: "#biography",
  },
  {
    label: "Timeline",
    href: "#timeline",
  },
  {
    label: "Hành trình",
    href: "#journey",
  },
  {
    label: "Triết học",
    href: "#philosophy",
  },
  {
    label: "Tư tưởng",
    href: "#ideology",
  },
  {
    label: "Tác phẩm",
    href: "#works",
  },
  {
    label: "Mindmap",
    href: "#mindmap",
  },
  {
    label: "Quiz",
    href: "#quiz",
  },
];

function Navbar() {
  return (
    <nav className="border-b border-yellow-700/20 bg-[#f7f1e5]/90 backdrop-blur-xl">
      <div className="section-container flex items-center justify-between py-4">
        <a href="#home" className="group inline-flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-950 text-lg font-bold text-yellow-100 shadow-lg shadow-red-950/20">
            H
          </span>

          <div>
            <p className="text-base font-bold leading-none text-red-950">
              Hồ Chí Minh
            </p>
            <p className="mt-1 text-xs font-medium text-stone-500">
              Cuộc đời và Di sản
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-7 text-sm font-semibold text-stone-700 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition duration-300 hover:text-red-900"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-yellow-700 transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-700/30 text-red-950 lg:hidden"
          aria-label="Mở menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
