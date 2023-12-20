import { IWord } from "../../../interfaces/IWord";
import SpeechRecognition from "../SpeechRecognition";

type LearningFlashcardProps = {
  word: IWord;
  userValue: string;
  setUserValue: React.Dispatch<React.SetStateAction<string>>;
};
const LearningFlashcard: React.FC<LearningFlashcardProps> = ({
  word,
  userValue,
  setUserValue,
}) => {
  const handleTranscript = (newTranscript: string) => {
    setUserValue(newTranscript);
  };
  return (
    <div className="learning-flashcard">
      <h1>Wypowiedz odpowiednie słowo</h1>

      <div className="learning-flashcard__flashcard">
        <div className={`learning-flashcard__flashcard__card  `}>
          {word.imageUrl === "" ? (
            <div>
              <h2>{word.translatedWord}</h2>
            </div>
          ) : (
            <>
              <img width="200px" height="200px" src={word.imageUrl} alt="img" />
            </>
          )}
        </div>
      </div>
      <SpeechRecognition onTranscript={handleTranscript} />
      <h3>Wypowiedziane słowo:</h3>
      <p>{userValue}</p>
    </div>
  );
};

export default LearningFlashcard;
