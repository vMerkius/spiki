export interface IModule {
  id: number;
  name: string;
  description: string;
  courseId: number;
}

export type IModuleCreation = Omit<IModule, "id">;
