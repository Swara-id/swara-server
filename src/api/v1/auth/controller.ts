import { TUser } from "./types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { Body, Controller, Example, Post, Route, SuccessResponse } from "tsoa";

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
    @Body()
    { email, password }: { email: string; password: string }
  ): Promise<{ message: string; user?: TUser; token?: string }> {
    if (!email || !password) {
      this.setStatus(400);
      return { message: "Email and password are required" };
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (!user) {
        this.setStatus(401);
        return { message: "User is not authenticated" };
      }

      const token = await user.getIdToken();
      const res = sendEmailVerification(user)
        .then(() => {
          this.setStatus(201);
          return {
            message: "Verification email sent! User created successfully!",
            user: {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            },
            token
          };
        })
        .catch((_error) => {
          this.setStatus(500);
          return {
            message: "Error sending email verification"
          };
        });

      return res;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while registering user";
      this.setStatus(500);
      return { message: errorMessage };
    }
  }

  @Post("login")
  public async loginUser(
    @Body() { email, password }: { email: string; password: string }
  ): Promise<{ message: string; token?: string; user?: TUser }> {
    if (!email || !password) {
      this.setStatus(422);

      return { message: "Email and password are required" };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();

      this.setStatus(201);
      return {
        user: {
          uid: cred.user.uid,
          displayName: cred.user.displayName,
          email: cred.user.email,
          photoURL: cred.user.photoURL
        },
        message: "User logged in successfully",
        token
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while logging in user";
      this.setStatus(500);
      return { message: errorMessage };
    }
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
