import React, { useState, useEffect } from "react";
import mic from "../../assets/microphone.svg";
import micoff from "../../assets/microphone-off.svg";

declare const window: any;

type SpeechRecognitionProps = {
  onTranscript: (transcript: string) => void;
};

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  onTranscript,
}) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Twoja przeglądarka nie wspiera Speech API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pl-PL";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      console.log(event);
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, onTranscript]);

  return (
    <div>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => setIsListening((prevState) => !prevState)}
      >
        {isListening ? (
          <img
            src={micoff}
            alt="microphone"
            style={{ width: "25px", height: "25px" }}
          />
        ) : (
          <img
            src={mic}
            alt="microphone"
            style={{ width: "25px", height: "25px" }}
          />
        )}
      </button>
    </div>
  );
};

export default SpeechRecognition;
