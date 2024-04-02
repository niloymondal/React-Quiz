import { shuffleArray } from "./Utils";
//import  {React, useEffect} from 'react'

export type Question = {
  category: string;
  correct_answers: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(endpoint);
  const data = await response.json();

  if (!data.results) {
    throw new Error("No questions fetched");
  }

  const questions: QuestionState[] = data.results.map(
    (question: Question, index: number) => {
      const answers = shuffleArray([
        ...question.incorrect_answers,
        question.correct_answers,
      ]);

      return {
        ...question,
        answers,
      };
    }
  );

  return questions;
};
