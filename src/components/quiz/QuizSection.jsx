import { useQuiz } from "../../hooks/useQuiz";

import SectionTitle from "../common/SectionTitle";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import QuizTopicSelector from "./QuizTopicSelector";

function QuizSection() {
  const {
    topics,
    selectedTopic,
    currentIndex,
    selectedAnswer,
    answers,
    isFinished,
    filteredQuestions,
    currentQuestion,
    score,
    handleTopicChange,
    handleSelectAnswer,
    handleNextQuestion,
    handleRestart,
  } = useQuiz();

  return (
    <section id="quiz" className="bg-[#f7f1e5] section-padding">
      <div className="section-container">
        <SectionTitle
          label="Interactive Quiz"
          title="Quiz lịch sử"
          description="Kiểm tra kiến thức về tiểu sử, dòng thời gian, tác phẩm, tư tưởng và di sản của Chủ tịch Hồ Chí Minh thông qua hệ thống câu hỏi tương tác."
        />

        <div className="mt-10">
          <QuizTopicSelector
            topics={topics}
            selectedTopic={selectedTopic}
            onChange={handleTopicChange}
          />
        </div>

        <div className="mt-8">
          {isFinished ? (
            <QuizResult
              score={score}
              total={filteredQuestions.length}
              answers={answers}
              onRestart={handleRestart}
            />
          ) : (
            <QuizQuestion
              question={currentQuestion}
              currentIndex={currentIndex}
              total={filteredQuestions.length}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default QuizSection;
