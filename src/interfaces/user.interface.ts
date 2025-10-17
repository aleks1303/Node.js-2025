export interface IUser {
  _id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;

  createAt: Date;
  updateAt: Date;
}
