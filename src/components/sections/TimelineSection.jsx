import { timelineData } from "../../data/timelineData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function TimelineSection() {
  return (
    <section id="timeline" className="bg-[#f7f1e5] section-padding">
      <div className="section-container">
        <SectionTitle
          label="Timeline"
          title="Dòng thời gian"
          description="Các mốc quan trọng trong cuộc đời, hành trình tìm đường cứu nước, hoạt động cách mạng và di sản của Chủ tịch Hồ Chí Minh."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-yellow-700/20 bg-white/70 p-6 shadow-xl shadow-red-950/5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                Periods
              </p>

              <div className="mt-5 space-y-3 text-sm font-medium text-stone-600">
                <a href="#period-1890-1910" className="block hover:text-red-900">
                  1890 - 1910
                </a>
                <a href="#period-1911-1920" className="block hover:text-red-900">
                  1911 - 1920
                </a>
                <a href="#period-1921-1930" className="block hover:text-red-900">
                  1921 - 1930
                </a>
                <a href="#period-1931-1945" className="block hover:text-red-900">
                  1931 - 1945
                </a>
                <a href="#period-1946-1969" className="block hover:text-red-900">
                  1946 - 1969
                </a>
              </div>
            </div>
          </aside>

          <div className="relative border-l-2 border-yellow-700/30 pl-7 md:pl-10">
            {timelineData.map((item) => (
              <div
                key={item.id}
                id={`period-${item.period.replaceAll(" ", "").replace("–", "-")}`}
                className="relative mb-7"
              >
                <span className="absolute -left-[39px] top-7 h-4 w-4 rounded-full border-4 border-[#f7f1e5] bg-red-900 md:-left-[47px]" />

                <Card className="bg-white">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-red-900 px-4 py-1 text-sm font-bold text-white">
                          {item.year}
                        </span>

                        <span className="rounded-full bg-yellow-700/10 px-4 py-1 text-sm font-semibold text-yellow-800">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-red-950">
                        {item.title}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-[#f7f1e5] px-4 py-3 text-sm font-semibold text-stone-600">
                      {item.date}
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-medium text-yellow-700">
                    {item.location}
                  </p>

                  <p className="mt-4 leading-8 text-stone-600">
                    {item.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;