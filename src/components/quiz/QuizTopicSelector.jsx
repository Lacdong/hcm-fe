function QuizTopicSelector({ topics, selectedTopic, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {topics.map((topic) => {
        const isActive = selectedTopic === topic;

        return (
          <button
            key={topic}
            type="button"
            onClick={() => onChange(topic)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              isActive
                ? "bg-red-900 text-white shadow-lg shadow-red-950/20"
                : "bg-white text-stone-700 hover:bg-red-50 hover:text-red-900"
            }`}
          >
            {topic}
          </button>
        );
      })}
    </div>
  );
}

export default QuizTopicSelector;
