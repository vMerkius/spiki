import { useState } from "react";
import SpeechRecognition from "./SpeechRecognition";

const LearningMode = () => {
  const [transcript, setTranscript] = useState("");

  const handleTranscript = (newTranscript: string) => {
    setTranscript(newTranscript);
  };

  return (
    <div className="App">
      <h1>Rozpoznawanie Mowy</h1>
      <SpeechRecognition onTranscript={handleTranscript} />
      <p>Transkrypcja: {transcript}</p>
    </div>
  );
};
export default LearningMode;
