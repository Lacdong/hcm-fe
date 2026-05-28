import { CheckCircle2 } from "lucide-react";

import { careerData } from "../../data/careerData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function CareerSection() {
  return (
    <section id="career" className="bg-[#f7f1e5] section-padding">
      <div className="section-container">
        <SectionTitle
          label="Revolutionary Career"
          title="Sự nghiệp cách mạng"
          description="Những chặng đường hoạt động cách mạng tiêu biểu, từ chuẩn bị tư tưởng và tổ chức đến lãnh đạo nhân dân giành độc lập, kháng chiến và kiến quốc."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {careerData.map((item) => (
            <Card key={item.id} className="bg-white">
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-950 text-2xl font-bold text-yellow-100">
                  {item.id}
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                    {item.period}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-red-950">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-8 text-stone-600">
                    {item.description}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {item.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 text-sm font-medium text-stone-700"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-yellow-700"
                        />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareerSection;