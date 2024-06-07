import { TRequest } from "@/types";
import { Response } from "express";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Controller, Post, Request, Route, SuccessResponse } from "tsoa";

const auth = getAuth();

@Route("auth")
export default class UserController extends Controller {
  @SuccessResponse("201", "Created")
  @Post("register")
  public async registerUser(
    @Request()
    req: TRequest<{
      email: string;
      password: string;
    }>,
    @Request() res: Response
  ) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (!user) {
        res.status(500).json({ error: "User is not authenticated" });
        return;
      }

      sendEmailVerification(user)
        .then(() => {
          res.status(201).json({
            message: "Verification email sent! User created successfully!",
          });
        })
        .catch((_error) => {
          res.status(500).json({ error: "Error sending email verification" });
        });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while registering user";
      res.status(500).json({ error: errorMessage });
    }
  }

  @Post("login")
  public async loginUser(
    @Request() req: TRequest<{ email: string; password: string }>,
    @Request() res: Response
  ) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({
        message: "Email and password are required",
      });
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();

      res.cookie("access_token", idToken, {
        httpOnly: true,
      });
      res.status(200).json({ message: "User logged in successfully", cred });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while logging in" });
    }
  }

  @Post("logout")
  public async logoutUser(@Request() _req: TRequest, @Request() res: Response) {
    signOut(auth)
      .then(() => {
        res.clearCookie("access_token");
        res.status(200).json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  @Post("reset-password")
  public async resetPassword(
    @Request() req: TRequest<{ email: string }>,
    @Request() res: Response
  ) {
    const { email } = req.body;

    if (!email) {
      res.status(422).json({
        email: "Email is required",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        res
          .status(200)
          .json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
}
