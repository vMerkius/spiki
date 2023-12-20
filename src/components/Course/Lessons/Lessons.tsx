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
    <div style={{ position: "relative", height: "100%" }}>
      {subjectChosen === -1 && (
        <button className="back-btn" onClick={() => setLessonChosen(-1)}>
          Powrót
        </button>
      )}

      {subjectChosen === -1 && <h1>Tematy</h1>}

      <div className="modules-container">
        {subjectChosen === -1 ? (
          <>
            {subjects.map((subject, index) => (
              <div key={subject.id}>
                <div
                  onClick={() => {
                    setSubjectChosen(subject.id);
                    setCurrentSubjectIndex(
                      subjects.findIndex((s) => s.id === subject.id)
                    );
                  }}
                >
                  <p className="modules-container__subject">
                    <strong>{index + 1}.</strong> {subject.name}
                  </p>
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
              setLessonChosen={setLessonChosen}
            ></Subject>
          </>
        )}
      </div>
    </div>
  );
};

export default Lessons;
