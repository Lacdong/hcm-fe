import { ArrowDown, Quote } from "lucide-react";

import Button from "../common/Button";

function HeroSection() {
  return (
    <section
      id="home"
      className="bg-paper relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Background blur decorations */}
      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-red-900/10 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 rounded-full bg-yellow-600/20 blur-3xl" />

      <div className="section-container relative z-10 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-700">
            Historical Portfolio
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight text-red-950 md:text-7xl">
            Chủ tịch Hồ Chí Minh
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700 md:text-2xl">
            Cuộc đời, sự nghiệp và di sản của một vị lãnh tụ vĩ đại.
          </p>

          <p className="mt-6 max-w-2xl leading-8 text-stone-600">
            Một hành trình vì độc lập dân tộc, tự do cho nhân dân và lý tưởng
            nhân văn cao đẹp. Website trình bày theo phong cách portfolio lịch
            sử, kết hợp timeline, sơ đồ tri thức và quiz tương tác.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="#biography">Khám phá cuộc đời</Button>

            <Button href="#timeline" variant="secondary">
              Xem dòng thời gian
            </Button>
          </div>

          <div className="mt-8 flex max-w-2xl gap-4 rounded-3xl border border-yellow-700/20 bg-white/50 p-6 shadow-xl shadow-red-950/5 backdrop-blur">
            <Quote className="mt-1 shrink-0 text-yellow-700" size={28} />

            <div>
              <p className="text-xl font-semibold leading-8 text-red-950">
                “Không có gì quý hơn độc lập, tự do.”
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Một tuyên ngôn tinh thần về khát vọng độc lập của dân tộc Việt
                Nam.
              </p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-full w-full rounded-[2rem] border border-yellow-700/30" />

          <div className="relative overflow-hidden rounded-[2rem] border border-yellow-700/30 bg-white/60 p-5 shadow-2xl shadow-red-950/15 backdrop-blur">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-red-950">
              <img
                src="/images/hero/ho-chi-minh.jpg"
                alt="Chủ tịch Hồ Chí Minh"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <a
            href="#biography"
            className="absolute -bottom-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-yellow-700 text-white shadow-xl transition hover:-translate-y-1"
            aria-label="Cuộn xuống phần tiểu sử"
          >
            <ArrowDown size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
