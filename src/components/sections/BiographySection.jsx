import { biographyData } from "../../data/biographyData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function BiographySection() {
  return (
    <section id="biography" className="bg-white section-padding">
      <div className="section-container">
        <SectionTitle
          label={biographyData.subtitle}
          title={biographyData.title}
          description={biographyData.shortDescription}
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card hover={false} className="p-5">
            <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-red-950 text-center text-yellow-50">
              <div className="px-0">
               <img
                src="/images/biography/ho-chi-minh.jpg"
                alt="Chủ tịch Hồ Chí Minh"
                className="h-full w-full object-cover object-center"
              />
              </div>
            </div>
          </Card>

          <div>
            <p className="text-lg leading-9 text-stone-700">
              {biographyData.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {biographyData.info.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-yellow-700/20 bg-[#fffaf0] p-5"
                >
                  <p className="text-sm font-semibold text-yellow-700">
                    {item.label}
                  </p>
                  <p className="mt-2 font-semibold leading-7 text-red-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {biographyData.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl bg-red-950 p-6 text-yellow-50"
                >
                  <p className="text-4xl font-bold text-yellow-200">
                    {item.number}
                  </p>
                  <p className="mt-2 font-semibold">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-yellow-100/75">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BiographySection;