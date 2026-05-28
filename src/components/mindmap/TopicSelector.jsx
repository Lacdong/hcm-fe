function TopicSelector({ topics, selectedTopicId, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {topics.map((topic) => {
        const isActive = topic.id === selectedTopicId;

        return (
          <button
            key={topic.id}
            type="button"
            onClick={() => onChange(topic.id)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              isActive
                ? "bg-red-900 text-white shadow-lg shadow-red-950/20"
                : "bg-white text-stone-700 hover:bg-red-50 hover:text-red-900"
            }`}
          >
            {topic.title}
          </button>
        );
      })}
    </div>
  );
}

export default TopicSelector;
