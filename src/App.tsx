import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//components
import QuestionCard from "./components/QuestionCard";
//Types
import { QuestionState, Difficulty } from "./API";
//styles
import { GlobalStyle } from "./App.styles";

const Total_questions = 10;

export type answerObject = {
  questions: string;
  answers: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setOver(false);

    const newQuestion = await fetchQuizQuestions(
      Total_questions,
      Difficulty.EASY
    );
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answers
      const answers = e.currentTarget.value;
      //check answer against current value
      const correct = questions[number].correct_answers === answers;
      //add score if correct
      if (correct) setScore((prev) => prev + 1);
      //save answer in the array
      const answerObject = {
        questions: questions[number].question,
        answers,
        correct,
        correctAnswer: questions[number].correct_answers,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextAnswers = () => {
    //Move on to the next if not last
    const nextQuestion = number + 1;
    if (nextQuestion === Total_questions) {
      setOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === Total_questions ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <div className="loader">Loading Questions</div>}

        {!gameOver && !loading && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={Total_questions}
            questions={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswers}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== Total_questions - 1 ? (
          <button className="next" onClick={nextAnswers}>
            Next Question
          </button>
        ) : null}
      </div>
    </>
  );
};

export default App;
