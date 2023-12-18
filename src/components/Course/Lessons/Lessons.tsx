import { useEffect, useState } from "react";
import { getLessonSubjectsAPI } from "../../../server/server";
import "./lessons.scss";
import { ISubject } from "../../../interfaces/ISubject";
import Subject from "./Subject";

type LessonsProps = {
  lessonChosen: number;
  setLessonChosen: React.Dispatch<React.SetStateAction<number>>;
};

const Lessons: React.FC<LessonsProps> = ({ lessonChosen, setLessonChosen }) => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [subjectChosen, setSubjectChosen] = useState<number>(1);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchSubjects = async () => {
      const fetchedSubjects = await getLessonSubjectsAPI(lessonChosen);
      setSubjects(fetchedSubjects);
    };
    fetchSubjects();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {subjectChosen === -1 && (
        <button className="back-btn" onClick={() => setLessonChosen(-1)}>
          Powrót
        </button>
      )}

      {subjectChosen === -1 && <h1>Subjects</h1>}

      <div className="modules-container">
        {subjectChosen === -1 ? (
          <>
            {subjects.map((subject) => (
              <div key={subject.id}>
                <div
                  className="modules-container__tile"
                  onClick={() => {
                    setSubjectChosen(subject.id);
                    setCurrentSubjectIndex(
                      subjects.findIndex((s) => s.id === subject.id)
                    );
                  }}
                >
                  <div className="modules-container__tile--upper">
                    <h3>{subject.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Subject
              currentSubjectIndex={currentSubjectIndex}
              setcurrentSubjectIndex={setCurrentSubjectIndex}
              subjects={subjects}
              setSubjectChosen={setSubjectChosen}
              subjectId={subjectChosen}
            ></Subject>
          </>
        )}
      </div>
    </div>
  );
};

export default Lessons;
