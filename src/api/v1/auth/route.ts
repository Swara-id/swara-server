import { TRequest } from "@/types";
import UserController from "./controller";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  async (req: TRequest<{ email: string; password: string }>, res) => {
    const controller = new UserController();

    const result = await controller.registerUser(req.body);

    res.status(controller.getStatus() ?? 201).json(result);
  }
);

router.post(
  "/login",
  async (req: TRequest<{ email: string; password: string }>, res) => {
    const controller = new UserController();

    const result = await controller.loginUser(req.body);

    if (result.token) {
      res.cookie("access_token", result.token, {
        httpOnly: true
      });
    }

    res.status(controller.getStatus() ?? 201).json(result);
  }
);

router.post("/logout", async (_req, res) => {
  const controller = new UserController();

  const result = await controller.logoutUser();

  res.clearCookie("access_token");
  res.status(controller.getStatus() ?? 201).json(result);
});

router.post(
  "/reset-password",
  async (req: TRequest<{ email: string }>, res) => {
    const controller = new UserController();

    const result = await controller.resetPassword(req.body);

    res.status(controller.getStatus() ?? 201).json(result);
  }
);

export default router;
