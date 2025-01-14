import React, { useState } from "react";
import { getDefinitionAPI } from "../../server/server";
import "./dictionary.scss";

interface Definition {
  definition: string;
}
const languages = ["en"];

const Dictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [definition, setDefinition] = useState<any>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleSearch = async () => {
    const response = await getDefinitionAPI(searchTerm);
    setDefinition(response);
  };

  return (
    <div className="dictionary">
      <h2>Wyszukaj słowo</h2>

      <div className="dictionary__search">
        <select
          className="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
        <input
          className="input-style"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="dictionary__search__submit" onClick={handleSearch}>
          Wyszukaj
        </button>
      </div>
      {definition.length !== 0 ? (
        <>
          <p>{definition[0].phonetic}</p>

          <div className="dictionary__definitions">
            {definition[0].meanings[0].definitions.map(
              (item: Definition, i: number) => (
                <div className="dictionary__definitions__item" key={i}>
                  <p>
                    {i + 1}. {item.definition}
                  </p>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <p>Brak definicji</p>
      )}
    </div>
  );
};

export default Dictionary;
