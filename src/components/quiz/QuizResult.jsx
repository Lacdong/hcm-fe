import { Trophy } from "lucide-react";

import Button from "../common/Button";

function QuizResult({ score, total, answers, onRestart }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-red-950/5 md:p-10">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-950 text-yellow-100">
          <Trophy size={40} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">
          Kết quả
        </p>

        <h3 className="mt-4 text-4xl font-bold text-red-950">
          {score} / {total} câu đúng
        </h3>

        <p className="mt-3 text-lg font-semibold text-stone-600">
          Tỷ lệ hoàn thành: {percentage}%
        </p>
      </div>

      <div className="mt-10 grid gap-4">
        {answers.map((item, index) => (
          <div
            key={item.questionId}
            className={`rounded-2xl border p-5 ${
              item.isCorrect
                ? "border-green-600/30 bg-green-50"
                : "border-red-600/30 bg-red-50"
            }`}
          >
            <p className="font-bold text-red-950">
              Câu {index + 1}: {item.question}
            </p>

            <p className="mt-3 text-sm text-stone-700">
              Bạn chọn: <strong>{item.selectedAnswer}</strong>
            </p>

            <p className="mt-1 text-sm text-stone-700">
              Đáp án đúng: <strong>{item.correctAnswer}</strong>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={onRestart}>Làm lại quiz</Button>
      </div>
    </div>
  );
}

export default QuizResult;
