import { Router } from "express";
import { TRequest } from "../../../types";
import ProgressController from "./controller";
import { ProgressBody } from "./types";
import { UnauthenticatedError } from "../../../error/unauthenticated";

const router = Router();

router.get("/", async (req: TRequest, res, next) => {
  try {
    if (!req.user?.uid) {
      throw new UnauthenticatedError("Unauthorized");
    }
    const controller = new ProgressController();
    const result = await controller.indexUserProgress(req.user.uid);
    res.status(controller.getStatus() ?? 200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: TRequest<ProgressBody>, res, next) => {
  const controller = new ProgressController();
  try {
    if (!req.user?.uid) {
      throw new UnauthenticatedError("Unauthorized");
    }
    const result = await controller.postProgress({
      userUid: req.user?.uid,
      corpusId: req.body.corpusId
    });

    res.status(controller.getStatus() ?? 201).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
