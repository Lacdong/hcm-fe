import { ideologyData, ideologyDevelopmentData } from "../../data/ideologyData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function IdeologySection() {
  return (
    <section id="ideology" className="bg-white section-padding">
      <div className="section-container">
        <SectionTitle
          label="Ideology"
          title="Tư tưởng Hồ Chí Minh"
          description="Một hệ thống quan điểm sâu sắc về độc lập dân tộc, nhân dân, đạo đức, văn hóa, giáo dục, đoàn kết và con đường phát triển của cách mạng Việt Nam."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ideologyData.map((item) => (
            <Card key={item.id} className="bg-[#fffaf0]">
              <h3 className="text-xl font-bold text-red-950">{item.title}</h3>

              <p className="mt-4 leading-7 text-stone-600">
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
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] bg-red-950 p-8 text-yellow-50 md:p-10">
          <SectionTitle
            label="Development"
            title="Quá trình phát triển tư tưởng"
            description="Tư tưởng Hồ Chí Minh hình thành và phát triển qua các giai đoạn lịch sử, gắn với thực tiễn tìm đường cứu nước, tổ chức cách mạng và lãnh đạo đất nước."
            light
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ideologyDevelopmentData.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-yellow-100/15 bg-yellow-50/5 p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                  {item.period}
                </p>

                <h3 className="mt-4 text-xl font-bold text-yellow-50">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-yellow-100/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IdeologySection;