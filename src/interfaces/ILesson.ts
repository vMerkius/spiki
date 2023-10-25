export interface ILesson {
  id: number;
  name: string;
  description: string;
  moduleId: number;
}
export type ILessonCreation = Omit<ILesson, "id">;
