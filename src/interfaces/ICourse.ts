export interface ICourse {
  id: number;
  level: string;
  language: string;
}
export type ICourseCreation = Omit<ICourse, "id">;
