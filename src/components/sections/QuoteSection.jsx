import { Quote } from "lucide-react";

import { quoteData } from "../../data/quoteData";

import SectionTitle from "../common/SectionTitle";

function QuoteSection() {
  return (
    <section id="quotes" className="bg-red-950 section-padding text-yellow-50">
      <div className="section-container">
        <SectionTitle
          label="Quotes"
          title="Những câu nói tiêu biểu"
          description="Những câu nói thể hiện tinh thần độc lập, tư tưởng vì dân, đạo đức cách mạng và tầm nhìn giáo dục sâu sắc."
          align="center"
          light
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quoteData.map((item) => (
            <div
              key={item.id}
              className="rounded-[2rem] border border-yellow-100/15 bg-yellow-50/5 p-8 shadow-xl shadow-black/10"
            >
              <Quote size={34} className="text-yellow-300" />

              <blockquote className="mt-6 text-2xl font-bold leading-10 text-yellow-50">
                “{item.content}”
              </blockquote>

              <div className="mt-8 border-t border-yellow-100/15 pt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                  {item.topic}
                </p>

                <p className="mt-3 text-sm leading-6 text-yellow-100/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuoteSection;