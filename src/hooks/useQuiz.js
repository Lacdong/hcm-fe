import { useMemo, useState } from "react";

import { quizData } from "../data/quizData";

export function useQuiz() {
  const topics = useMemo(() => {
    return ["Tất cả", ...new Set(quizData.map((item) => item.topic))];
  }, []);

  const [selectedTopic, setSelectedTopic] = useState("Tất cả");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (selectedTopic === "Tất cả") return quizData;
    return quizData.filter((item) => item.topic === selectedTopic);
  }, [selectedTopic]);

  const currentQuestion = filteredQuestions[currentIndex];

  const score = answers.filter((item) => item.isCorrect).length;

  function handleTopicChange(topic) {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setIsFinished(false);
  }

  function handleSelectAnswer(answer) {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
  }

  function handleNextQuestion() {
    if (!selectedAnswer || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;

    const newAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    const isLastQuestion = currentIndex === filteredQuestions.length - 1;

    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer("");
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setIsFinished(false);
  }

  return {
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
  };
}