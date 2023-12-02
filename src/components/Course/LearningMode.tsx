import { useEffect, useState } from "react";
import SpeechRecognition from "./SpeechRecognition";
import { useParams } from "react-router";
import { getLearningAPI } from "../../server/server";

const LearningMode = () => {
  const value = useParams();
  const moduleId = Number(value.moduleId);
  const [learningData, setLearningData] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [allMaterialsQuantity, setAllMaterialsQuantity] = useState<number>(0);
  const [currentMaterial, setCurrentMaterial] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getLearningAPI(moduleId);
      console.log(fetchedData);
      setLearningData(fetchedData);
      const quantity =
        fetchedData.flashcards.length +
        fetchedData.quizQuestions.length +
        fetchedData.sentences.length;
      console.log(quantity);
      setAllMaterialsQuantity(quantity);
    };
    fetchData();
  }, []);

  const handleTranscript = (newTranscript: string) => {
    setTranscript(newTranscript);
  };

  return (
    <div className="App">
      <h2>
        {currentMaterial}/{allMaterialsQuantity}
      </h2>
      <SpeechRecognition onTranscript={handleTranscript} />
      <p>Transkrypcja: {transcript}</p>
    </div>
  );
};
export default LearningMode;
