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
    <div>
      <div className="flashcard">
        <div className={`flashcard__card  `}>
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
      <h3>Value:</h3>
      <p>{userValue}</p>

      {/* <input
        type="text"
        value={userValue}
        onChange={(e) => setUserValue(e.target.value)}
      /> */}
    </div>
  );
};

export default LearningFlashcard;
