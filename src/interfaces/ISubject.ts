export interface ISubject {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  lessonId: number;
}
export type ISubjectCreation = Omit<ISubject, "id">;
