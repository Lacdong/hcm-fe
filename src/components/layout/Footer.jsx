import { BookOpen, GraduationCap, MapPin } from "lucide-react";

const footerLinks = [
  {
    label: "Tiểu sử",
    href: "#biography",
  },
  {
    label: "Dòng thời gian",
    href: "#timeline",
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
    label: "Sơ đồ tri thức",
    href: "#mindmap",
  },
];

function Footer() {
  return (
    <footer className="bg-red-950 px-6 py-14 text-yellow-50">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-lg font-bold text-red-950">
              H
            </span>

            <div>
              <h2 className="text-xl font-bold">
                Hồ Chí Minh – Cuộc đời và Di sản
              </h2>
              <p className="mt-1 text-sm text-yellow-100/70">
                Historical Portfolio
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-xl leading-8 text-yellow-100/75">
            Website học tập lịch sử với giao diện portfolio, dòng thời gian,
            sơ đồ tri thức và quiz tương tác, hướng đến trải nghiệm trang trọng,
            tinh tế và giàu tính giáo dục.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-yellow-200">
            Điều hướng nhanh
          </h3>

          <div className="mt-5 grid gap-3 text-sm text-yellow-100/75">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-yellow-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-yellow-200">
            Thông tin project
          </h3>

          <div className="mt-5 space-y-4 text-sm text-yellow-100/75">
            <div className="flex gap-3">
              <BookOpen size={18} className="mt-1 shrink-0 text-yellow-300" />
              <p>Chủ đề: Cuộc đời, sự nghiệp và tư tưởng Hồ Chí Minh.</p>
            </div>

            <div className="flex gap-3">
              <GraduationCap
                size={18}
                className="mt-1 shrink-0 text-yellow-300"
              />
              <p>Dạng project: Website giáo dục / historical portfolio.</p>
            </div>

            <div className="flex gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-yellow-300" />
              <p>Nguồn tư liệu: tài liệu lịch sử và nguồn tham khảo chính thống.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-yellow-100/15 pt-6 text-sm text-yellow-100/55 md:flex-row md:items-center md:justify-between">
        <p>© 2026. Educational Project.</p>
        <p>Designed with respect, clarity, and historical dignity.</p>
      </div>
    </footer>
  );
}

export default Footer;