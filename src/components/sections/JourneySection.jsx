import { MapPin } from "lucide-react";

import { journeyData } from "../../data/journeyData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function JourneySection() {
  return (
    <section id="journey" className="bg-white section-padding">
      <div className="section-container">
        <SectionTitle
          label="Journey"
          title="Hành trình tìm đường cứu nước"
          description="Hành trình của Người không chỉ là sự dịch chuyển qua nhiều quốc gia, mà còn là quá trình quan sát, học hỏi, lựa chọn và xác lập con đường giải phóng dân tộc."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journeyData.map((item, index) => (
            <Card key={item.id} className="relative overflow-hidden bg-[#fffaf0]">
              <div className="absolute right-5 top-5 text-6xl font-bold text-red-950/5">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                  <MapPin size={22} />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                  {item.date}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-red-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-yellow-700">
                  {item.location}
                </p>

                <p className="mt-5 leading-8 text-stone-600">
                  {item.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-red-950/5 px-3 py-1 text-xs font-semibold text-red-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JourneySection;