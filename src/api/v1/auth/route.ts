import { multerMid } from "./../../../middleware/multer";
import UserController from "./controller";
import { Router, Request, Response } from "express";

const router = Router();
const controller = new UserController();

router.post("/register", controller.registerUser);

router.post("/login", controller.loginUser);

router.post("/logout", controller.logoutUser);

router.post("/reset-password", controller.resetPassword);

export default router;
