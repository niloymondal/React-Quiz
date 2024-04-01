import React from "react";
//types
import { answerObject } from "../App";
//styles
//import{Wtapper, ButtonWtapper} from './QuestionCard.styles'

type props = {
  questions: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: answerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<props> = ({
  questions,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <div>
      <p className="number">
        Question:{questionNr}/{totalQuestions}
      </p>

      <p dangerouslySetInnerHTML={{ __html: questions }} />
      <div>
        {answers.map((answer, index) => (
          <div key={index}>
            <button
              disabled={userAnswer ? true : false}
              value={answers}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
