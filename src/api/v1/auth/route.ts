import { multerMid } from "./../../../middleware/multer";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
}
 from "./controller";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/reset-password", resetPassword);


export default router;
