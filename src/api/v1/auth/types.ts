import { User } from "firebase/auth";

export type TUser = Pick<User, "uid" | "displayName" | "email" | "photoURL">;
