import { User } from "firebase/auth";
import { ListResponse, TResponse } from "../../../types";

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
  uid: string;
  fullName: string;
  userName: string;
  email: string;
  profilePicURL?: string;
  gender?: "male" | "female" | "not-set";
  about?: string;
}

export interface UserQuery {
  page: number;
  pageSize: number;
  search?: string;
  point?: number;
  order?: "asc" | "desc";
}

export interface UserPatchBody {
  fullName?: string;
  userName?: string;
  gender?: "male" | "female" | "not-set";
  about?: string;
}

export interface UserListResponse extends ListResponse<UserResult> {}
export interface UserResponse extends TResponse<UserResult> {}
