import { Bot, Code2, Sparkles, Wrench } from "lucide-react";

import { toolSupportData } from "../../data/toolSupportData";

import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function ToolSupportSection() {
  return (
    <section id="tool-support" className="bg-white section-padding">
      <div className="section-container">
        <SectionTitle
          label={toolSupportData.subtitle}
          title={toolSupportData.title}
          description={toolSupportData.description}
        />

        <div className="mt-14">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
              <Bot size={28} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">
                AI Support
              </p>

              <h3 className="text-3xl font-bold text-red-950">
                Công cụ AI hỗ trợ
              </h3>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {toolSupportData.aiTools.map((tool) => (
              <Card key={tool.id} className="bg-[#fffaf0]">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                    <Sparkles size={24} />
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-red-950">
                      {tool.name}
                    </h4>

                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-700">
                      {tool.type}
                    </p>

                    <p className="mt-4 leading-7 text-stone-600">
                      {tool.purpose}
                    </p>

                    <ul className="mt-5 space-y-3">
                      {tool.contributions.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 leading-7 text-stone-600"
                        >
                          <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-yellow-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
              <Wrench size={28} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">
                Development Stack
              </p>

              <h3 className="text-3xl font-bold text-red-950">
                Công nghệ và công cụ phát triển
              </h3>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {toolSupportData.developmentTools.map((tool) => (
              <Card key={tool.id} className="bg-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950 text-yellow-100">
                  <Code2 size={22} />
                </div>

                <h4 className="mt-5 text-xl font-bold text-red-950">
                  {tool.name}
                </h4>

                <p className="mt-2 text-sm font-semibold text-yellow-700">
                  {tool.type}
                </p>

                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {tool.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolSupportSection;
