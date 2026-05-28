import { ArrowRight, Brain, Quote, Scale } from "lucide-react";

import { philosophyData } from "../../data/philosophyData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function PhilosophySection() {
  return (
    <section id="philosophy" className="bg-white section-padding">
      <div className="section-container">
        <SectionTitle
          label={philosophyData.subtitle}
          title={philosophyData.title}
          description={philosophyData.description}
        />

        <div className="mt-12 rounded-[2rem] bg-red-950 p-8 text-yellow-50 shadow-2xl shadow-red-950/15 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                Câu hỏi trung tâm
              </p>

              <h3 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-4xl">
                {philosophyData.question}
              </h3>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-yellow-100 text-red-950">
              <Brain size={38} />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {philosophyData.overviewCards.map((item) => (
            <Card key={item.id} className="bg-[#fffaf0]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                <ArrowRight size={22} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-red-950">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-stone-600">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">
              Comparison
            </p>

            <h3 className="mt-3 text-3xl font-bold text-red-950 md:text-4xl">
              So sánh các con đường cứu nước
            </h3>

            <p className="mt-5 max-w-3xl leading-8 text-stone-600">
              Hồ Chí Minh kế thừa tinh thần yêu nước của các bậc tiền bối, nhưng
              đồng thời nhận ra giới hạn lịch sử của từng khuynh hướng để tìm
              kiếm một con đường cách mạng mới.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {philosophyData.comparisons.map((item) => (
              <Card key={item.id} className="bg-[#f7f1e5]">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                    <Scale size={22} />
                  </div>

                  <h4 className="text-xl font-bold text-red-950">
                    {item.person}
                  </h4>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-yellow-700">
                      Con đường
                    </p>
                    <p className="mt-2 leading-7 text-stone-700">{item.path}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-yellow-700">
                      Giới hạn
                    </p>
                    <p className="mt-2 leading-7 text-stone-700">
                      {item.limitation}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-5">
                    <Quote size={24} className="text-yellow-700" />
                    <p className="mt-3 text-lg font-bold leading-8 text-red-950">
                      “{item.quote}”
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-yellow-700">
                      Ý nghĩa triết học
                    </p>
                    <p className="mt-2 leading-7 text-stone-700">
                      {item.philosophicalMeaning}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">
              Arguments
            </p>

            <h3 className="mt-3 text-3xl font-bold text-red-950 md:text-4xl">
              Những luận điểm triết học cốt lõi
            </h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {philosophyData.arguments.map((item) => (
              <Card key={item.id} className="bg-white">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-950 text-xl font-bold text-yellow-100">
                    {item.id}
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-red-950">
                      {item.title}
                    </h4>

                    <p className="mt-4 leading-8 text-stone-600">
                      {item.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-yellow-700/10 px-3 py-1 text-xs font-semibold text-yellow-800"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] border border-yellow-700/20 bg-[#fffaf0] p-8 shadow-xl shadow-red-950/5 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">
            Conclusion
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-950">Kết luận</h3>

          <p className="mt-6 text-lg leading-9 text-stone-700">
            {philosophyData.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
