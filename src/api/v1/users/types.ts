import { User } from "firebase/auth";

export type TUser = Pick<User, "uid" | "displayName" | "email" | "photoURL">;

export interface UserResult {
  uid: string;
  fullName: string;
  userName: string;
  email: string;
  about: string;
  gender: "male" | "female" | "not-set";
  profilePicURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserBody {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  gender?: "male" | "female" | "not-set";
  about?: string;
}
