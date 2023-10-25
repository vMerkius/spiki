export interface IQuiz {
  id: number;
  name: string;
  description: string;
  courseId: number;
}

export type IQuizCreation = Omit<IQuiz, "id">;
