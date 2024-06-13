import { RegisterBody } from "./types";
import { UserResult } from "../users/types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { Body, Controller, Example, Post, Route, SuccessResponse } from "tsoa";
import { BadRequestError } from "../../../error/bad-request";
import { createUser, getOneUser } from "../users/service";

const auth = getAuth();

@Route("auth")
export default class UserController extends Controller {
  @Post("register")
  @SuccessResponse("201", "User created successfully")
  @Example<{
    message: string;
  }>({
    message: "message"
  })
  public async registerUser(
    @Body() body: RegisterBody
  ): Promise<{ message: string; user?: UserResult; token?: string }> {
    if (!body) {
      throw new BadRequestError("Email and password are required");
    }

    const { email, password } = body;
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    if (!user) {
      this.setStatus(401);
      return { message: "User is not authenticated" };
    }

    const token = await user.getIdToken();

    await sendEmailVerification(user);

    const result = await createUser(user);

    this.setStatus(201);
    return {
      message: "Verification email sent! User created successfully!",
      user: result,
      token
    };
  }

  @Post("login")
  public async loginUser(
    @Body() { email, password }: { email: string; password: string }
  ): Promise<{ message: string; token?: string; user?: UserResult }> {
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();

    const user = await getOneUser(cred.user.uid);

    this.setStatus(201);
    return {
      user: user,
      message: "User logged in successfully",
      token
    };
  }

  @Post("logout")
  public async logoutUser() {
    try {
      await signOut(auth);
      this.setStatus(201);
      return { message: "User logged out successfully" };
    } catch (error) {
      this.setStatus(500);
      return { message: "Internal Server Error" };
    }
  }

  @Post("reset-password")
  public async resetPassword(@Body() { email }: { email: string }) {
    if (!email) {
      this.setStatus(422);
      return { message: "Email is required" };
    }

    try {
      await sendPasswordResetEmail(auth, email);
      this.setStatus(201);
      return { message: "Password reset email sent successfully!" };
    } catch (error) {
      this.setStatus(500);
      return { message: "Internal Server Error" };
    }
  }
}
