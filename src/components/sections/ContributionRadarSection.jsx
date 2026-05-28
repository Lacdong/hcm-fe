import { useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  contributionCriteria,
  contributionRadarMembers,
} from "../../data/contributionRadarData";

import SectionTitle from "../common/SectionTitle";

function CustomRadarTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-2xl border border-yellow-700/20 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-bold text-red-950">{label}</p>
      <p className="mt-1 text-sm text-stone-600">
        Mức độ đóng góp:{" "}
        <span className="font-semibold text-yellow-700">
          {payload[0].value}/5
        </span>
      </p>
    </div>
  );
}

function ContributionRadarSection() {
  const [selectedMemberId, setSelectedMemberId] = useState(
    contributionRadarMembers[0]?.id
  );

  const selectedMember = useMemo(() => {
    return contributionRadarMembers.find(
      (member) => member.id === selectedMemberId
    );
  }, [selectedMemberId]);

  if (!selectedMember) return null;

  return (
    <section id="contribution-radar" className="bg-[#f7f1e5] section-padding">
      <div className="section-container">
        <SectionTitle
          label="Contribution Radar"
          title="Mạng lưới đóng góp thành viên"
          description="Biểu đồ mạng nhện thể hiện mức độ tham gia của từng thành viên theo các mảng công việc chính trong quá trình thực hiện sản phẩm."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {contributionRadarMembers.map((member) => {
            const isActive = member.id === selectedMemberId;

            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMemberId(member.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-red-900 text-white shadow-lg shadow-red-950/20"
                    : "bg-white text-stone-700 hover:bg-red-50 hover:text-red-900"
                }`}
              >
                {member.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-red-950/5 md:p-8">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                Radar Overview
              </p>
              <h3 className="mt-2 text-2xl font-bold text-red-950">
                {selectedMember.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-stone-500">
                {selectedMember.role}
              </p>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={selectedMember.metrics}>
                  <PolarGrid stroke="#d6a738" strokeOpacity={0.45} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#7c2d12", fontSize: 12, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 5]}
                    tickCount={6}
                    tick={{ fill: "#78716c", fontSize: 11 }}
                  />
                  <Radar
                    name="Contribution"
                    dataKey="value"
                    stroke="#7f1d1d"
                    fill="#b45309"
                    fillOpacity={0.35}
                    strokeWidth={2.5}
                  />
                  <Tooltip content={<CustomRadarTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-red-950/5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                Member Summary
              </p>

              <h3 className="mt-3 text-3xl font-bold text-red-950">
                {selectedMember.name}
              </h3>

              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                {selectedMember.role}
              </p>

              <p className="mt-5 leading-8 text-stone-600">
                {selectedMember.summary}
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-700">
                  Đầu việc chính
                </p>

                <ul className="mt-4 space-y-3">
                  {selectedMember.tasks.map((task) => (
                    <li
                      key={task}
                      className="flex gap-3 leading-7 text-stone-600"
                    >
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-yellow-700" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#fffaf0] p-8 shadow-xl shadow-red-950/5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                Tiêu chí đánh giá
              </p>

              <div className="mt-5 space-y-4">
                {contributionCriteria.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white p-4">
                    <p className="font-bold text-red-950">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContributionRadarSection;