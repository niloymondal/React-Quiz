import React, {useState} from 'react';
import {fetchQuizQuestions } from './API';
//components
import QuestionCard from './components/QuestionCard';
//Types
import { QuestionState, Difficulty } from './API';

const Total_questions= 10

const App= () => {

  const[loading, setLoading]= useState(false)
  const[questions, setQuestions]= useState([])
  const[number, setNumber]=useState(0)
  const[userAnswers, setUserAnswers]=useState([])
  const[score, setScore]= useState(0)
  const[gameOver, setOver]=useState(true)

  console.log(fetchQuizQuestions(Total_questions, Difficulty.EASY))

  const startTrivia = async ()=>{

  }

  const checkAnswers= (e: React.MouseEvent<HTMLButtonElement>)=>{



  }

  const nextAnswers= ()=>{


  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      <p className='score'>Score:</p>
      <div className='loader'>Loading Questions</div> 
      {/* <QuestionCard
      questionNr={number+1}
      totalQuestions={Total_question}
      question={questions[number].question}
      answer={questions[number].answer}
      userAnswer={userAnswers ? userAnswers[number]:undefined}
      callback={checkAnswers}

      /> */}
      <button className='next' onClick={nextAnswers}> Next Question</button>
    </div>
  );
}

export default App;
