export interface IUser {
  userName: string;
  email: string;
  type: "user" | "admin";
  salt?: string;
  password: string;
}
