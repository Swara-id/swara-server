import { TRequest } from "../../../types";
import UsersController, { putUser } from "./controller";
import { Router } from "express";

const router = Router();

router.get("/", async (req: TRequest, res) => {
  const controller = new UsersController();

  const result = await controller.indexAllUser();

  res.status(controller.getStatus() ?? 200).json(result);
});

router.get("/:id", async (req: TRequest, res) => {
  const controller = new UsersController();

  const result = await controller.indexOneUser(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.put("/:id", putUser);
export default router;
