export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  gender: string;
  country: string;
  imageUrl: string;
}

export type IUserCreation = Omit<IUser, "id">;
