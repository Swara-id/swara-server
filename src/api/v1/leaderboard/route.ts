import { Router } from "express";
import LeaderboardController from "./controller";
import { TRequest } from "../../../types";
import { UserQuery } from "../users/types";

const router = Router();

router.get("/", async (req: TRequest<unknown, UserQuery>, res, next) => {
  try {
    const controller = new LeaderboardController();

    const result = await controller.indexLeaderboard(req.query);

    res.status(controller.getStatus() ?? 200).json(result);
  } catch (error) {
    next(error);
  }
});
export default router;
