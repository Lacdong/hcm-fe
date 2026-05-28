import { FileText } from "lucide-react";

import { worksData } from "../../data/worksData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function WorksSection() {
  return (
    <section id="works" className="bg-[#f7f1e5] section-padding">
      <div className="section-container">
        <SectionTitle
          label="Works"
          title="Tác phẩm và văn kiện tiêu biểu"
          description="Các tác phẩm, văn kiện quan trọng thể hiện tư tưởng, lập trường chính trị, đạo đức cách mạng và tầm nhìn của Chủ tịch Hồ Chí Minh."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {worksData.map((item) => (
            <Card key={item.id} className="flex h-full flex-col bg-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                <FileText size={24} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                {item.year}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-red-950">
                {item.title}
              </h3>

              <p className="mt-2 text-sm font-semibold text-stone-500">
                {item.type}
              </p>

              <p className="mt-5 leading-7 text-stone-600">
                {item.description}
              </p>

              <div className="mt-6 rounded-2xl bg-[#f7f1e5] p-4">
                <p className="text-sm font-semibold text-yellow-700">
                  Ý nghĩa
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {item.meaning}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorksSection;