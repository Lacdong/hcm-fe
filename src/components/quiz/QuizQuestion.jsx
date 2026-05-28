import { CheckCircle2, XCircle } from "lucide-react";

import Button from "../common/Button";
import QuizProgress from "./QuizProgress";

function QuizQuestion({
  question,
  currentIndex,
  total,
  selectedAnswer,
  onSelectAnswer,
  onNext,
}) {
  if (!question) return null;

  const isAnswered = Boolean(selectedAnswer);
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-red-950/5 md:p-10">
      <QuizProgress currentIndex={currentIndex} total={total} />

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
          {question.topic}
        </p>

        <h3 className="mt-4 text-2xl font-bold leading-tight text-red-950 md:text-3xl">
          {question.question}
        </h3>
      </div>

      <div className="mt-8 grid gap-4">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = question.answer === option;

          let optionClass =
            "border-yellow-700/20 bg-[#fffaf0] text-stone-700 hover:border-red-900 hover:bg-red-50";

          if (isAnswered && isAnswer) {
            optionClass = "border-green-600 bg-green-50 text-green-800";
          }

          if (isAnswered && isSelected && !isAnswer) {
            optionClass = "border-red-600 bg-red-50 text-red-800";
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelectAnswer(option)}
              className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left font-semibold transition ${optionClass}`}
            >
              <span>{option}</span>

              {isAnswered && isAnswer && (
                <CheckCircle2 size={20} className="shrink-0" />
              )}

              {isAnswered && isSelected && !isAnswer && (
                <XCircle size={20} className="shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`mt-8 rounded-3xl p-6 ${
            isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          <p className="font-bold">{isCorrect ? "Chính xác!" : "Chưa đúng."}</p>

          <p className="mt-2 leading-7">
            Đáp án đúng: <strong>{question.answer}</strong>
          </p>

          <p className="mt-2 leading-7">{question.explanation}</p>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <Button onClick={onNext} variant={selectedAnswer ? "primary" : "ghost"}>
          {currentIndex === total - 1 ? "Xem kết quả" : "Câu tiếp theo"}
        </Button>
      </div>
    </div>
  );
}

export default QuizQuestion;
