import {
  BookOpen,
  Flag,
  GraduationCap,
  Heart,
  Landmark,
  MapPin,
} from "lucide-react";

import { legacyData, memorialSitesData } from "../../data/legacyData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

const iconMap = {
  BookOpen,
  Heart,
  Flag,
  GraduationCap,
};

function LegacySection() {
  return (
    <section id="legacy" className="bg-[#f7f1e5] section-padding">
      <div className="section-container">
        <SectionTitle
          label="Legacy"
          title="Di sản còn mãi"
          description="Di sản Hồ Chí Minh là sự kết tinh của tư tưởng, đạo đức, phong cách sống và tinh thần độc lập dân tộc, tiếp tục soi sáng nhiều thế hệ Việt Nam."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {legacyData.map((item) => {
            const Icon = iconMap[item.icon] || BookOpen;

            return (
              <Card key={item.id} className="bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-red-950">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-stone-600">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 rounded-[2rem] bg-white p-8 shadow-xl shadow-red-950/5 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">
                Memorial Sites
              </p>

              <h3 className="mt-3 text-3xl font-bold text-red-950 md:text-4xl">
                Công trình và địa danh tưởng niệm
              </h3>
            </div>

            <Landmark className="text-yellow-700" size={42} />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {memorialSitesData.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-yellow-700/20 bg-[#fffaf0] shadow-lg shadow-red-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="aspect-[16/9] overflow-hidden bg-red-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                      <Landmark size={24} />
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-red-950">
                        {item.title}
                      </h4>

                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-yellow-700">
                        <MapPin size={16} />
                        {item.location}
                      </p>

                      <p className="mt-4 leading-7 text-stone-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LegacySection;
