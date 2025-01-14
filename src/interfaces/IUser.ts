export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date | string;
  gender: string;
  country: string;
  imageUrl: string;
  isAdmin: boolean;
}

export type IUserCreation = Omit<IUser, "id">;
