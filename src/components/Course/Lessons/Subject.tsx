import { useEffect, useState } from "react";
import { ISubject } from "../../../interfaces/ISubject";
import { getSubjectAPI } from "../../../server/server";
import DOMPurify from "dompurify";

type SubjectProps = {
  subjectId: number;
  currentSubjectIndex: number;
  setcurrentSubjectIndex: React.Dispatch<React.SetStateAction<number>>;
  subjects: ISubject[];
  setSubjectChosen: React.Dispatch<React.SetStateAction<number>>;
};

const Subject: React.FC<SubjectProps> = ({
  subjectId,
  currentSubjectIndex,
  setcurrentSubjectIndex,
  subjects,
  setSubjectChosen,
}) => {
  const [subject, setSubject] = useState<ISubject>();
  useEffect(() => {
    const fetchSubject = async () => {
      const fetchedSubject = await getSubjectAPI(subjectId);
      setSubject(fetchedSubject);
    };
    fetchSubject();
  }, [subjectId]);

  const handlePreviousNext = (direction: "previous" | "next") => {
    const newIndex =
      direction === "previous"
        ? currentSubjectIndex - 1
        : currentSubjectIndex + 1;
    setcurrentSubjectIndex(newIndex);
    if (newIndex >= 0 && newIndex < subjects.length) {
      setSubjectChosen(subjects[newIndex].id);
    }
  };
  return (
    <div className="subject">
      <button
        className="back-btn"
        onClick={() => {
          setSubjectChosen(-1);
        }}
      >
        Powrót
      </button>
      <h1 className="subject__header">{subject?.name}</h1>
      <div className="subject__desc">
        <span
          dangerouslySetInnerHTML={{
            __html: subject ? DOMPurify.sanitize(subject.description) : "",
          }}
        ></span>
      </div>
      <button
        className="nav-subject-btn"
        onClick={() => handlePreviousNext("previous")}
        disabled={currentSubjectIndex <= 0}
      >
        Previous
      </button>
      <button
        className="nav-subject-btn nav-subject-btn--right"
        onClick={() => handlePreviousNext("next")}
        disabled={currentSubjectIndex >= subjects.length - 1}
      >
        Next
      </button>
    </div>
  );
};
export default Subject;
