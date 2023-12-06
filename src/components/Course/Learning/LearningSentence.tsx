import { useEffect, useState } from "react";
import { ISentence } from "../../../interfaces/ISentence";
import "./learning.scss";

type LearningSentenceProps = {
  sentence: ISentence;
  userSentence: string[];
  setUserSentence: React.Dispatch<React.SetStateAction<string[]>>;
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const LearningSentence: React.FC<LearningSentenceProps> = ({
  sentence,
  userSentence,
  setUserSentence,
}) => {
  const [translatedSentence, setTranslatedSentence] = useState<string[]>([]);

  useEffect(() => {
    setTranslatedSentence(shuffleArray(sentence.translated.split(" ")));
  }, [sentence]);

  const handleWordClick = (word: string, isOriginal: boolean) => {
    if (isOriginal) {
      setTranslatedSentence(translatedSentence.filter((w) => w !== word));
      setUserSentence([...userSentence, word]);
    } else {
      setUserSentence(userSentence.filter((w) => w !== word));
      setTranslatedSentence([...translatedSentence, word]);
    }
  };
  return (
    <div>
      <h2>{sentence.original}</h2>
      <div className="words-container">
        {translatedSentence.map((word, index) => (
          <div
            key={index}
            className="word-tile"
            onClick={() => handleWordClick(word, true)}
          >
            {word}
          </div>
        ))}
      </div>
      <div className="words-sentence">
        {userSentence.map((word, index) => (
          <div
            key={index}
            className="word-tile"
            onClick={() => handleWordClick(word, false)}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningSentence;
