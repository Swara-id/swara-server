import { TRequest } from "../../../types";
import UsersController from "./controller";
import { Router } from "express";
import { UserPatchBody, UserQuery } from "./types";

const router = Router();

router.get("/", async (req: TRequest<unknown, UserQuery>, res, next) => {
  try {
    const controller = new UsersController();

    const result = await controller.indexAllUser();

    res.status(controller.getStatus() ?? 200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/leaderboard",
  async (req: TRequest<unknown, UserQuery>, res, next) => {
    try {
      const controller = new UsersController();

      const result = await controller.indexAllUserFromLeaderboard(req.query);

      res.status(controller.getStatus() ?? 200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:uid", async (req: TRequest, res) => {
  const controller = new UsersController();

  const result = await controller.indexOneUser(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.patch(
  "/:id",
  async (req: TRequest<UserPatchBody, unknown, { uid: string }>, res) => {
    const controller = new UsersController();

    const result = await controller.patchOneUser(req.params.uid, req.body);

    res.status(controller.getStatus() ?? 200).json(result);
  }
);

// router.put("/:id", putUser);
export default router;
