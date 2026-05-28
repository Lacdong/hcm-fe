function QuizProgress({ currentIndex, total }) {
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold text-stone-600">
        <span>
          Câu {currentIndex + 1} / {total}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-red-950/10">
        <div
          className="h-full rounded-full bg-red-900 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default QuizProgress;
