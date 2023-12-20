import { useEffect, useState } from "react";
import { IQuestion } from "../../../interfaces/IQuestion";
import { IAnswer } from "../../../interfaces/IAnswer";

type LearningQuestionsProps = {
  question: IQuestion;
  answers: IAnswer[];
  userAnswer: number;
  setUserAnswer: React.Dispatch<React.SetStateAction<number>>;
};

const LearningQuestion: React.FC<LearningQuestionsProps> = ({
  question,
  answers,
  userAnswer,
  setUserAnswer,
}) => {
  console.log(answers);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(Number(event.target.value));
    console.log(Number(event.target.value));
  };

  // const handleCheck = async () => {
  //   if (!currentQuestion) return;
  //   const asnwerCheck = await checkAnswerAPI(currentQuestion.id, userChoice);
  //   if (asnwerCheck === 200) {
  //     setCorrectAnswer((prev) => prev + 1);
  //   }
  // };

  return (
    <div className="learning-quiz">
      <div>
        <h1>Wybierz jedną poprawną odpowiedź</h1>
        <h2>{question.description}</h2>
        <form>
          {answers.map((answer, index) => (
            <div key={answer.id}>
              <label>
                <input
                  type="radio"
                  value={index + 1}
                  onChange={handleAnswerChange}
                  checked={userAnswer === index + 1}
                />
                <span className="answer">{answer.name}</span>
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};
export default LearningQuestion;
