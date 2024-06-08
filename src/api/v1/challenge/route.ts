import { TRequest } from "../../../types";
import { multerMid } from "./../../../middleware/multer";
import ChallengeController from "./controller";
import { Router } from "express";
import { Challenge } from "../../../models/Challenge";

const router = Router();

router.get("/", async (req: TRequest, res) => {
  const controller = new ChallengeController();

  const result = controller.indexAllChallenge();

  res.status(controller.getStatus() ?? 200).json(result);
});

router.get("/:id", async (req: TRequest, res) => {
  const controller = new ChallengeController();

  const result = await controller.indexOneChallenge(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.post(
  "/",
  multerMid.single("file"),
  async (req: TRequest<Challenge>, res) => {
    const controller = new ChallengeController();

    const result = await controller.postChallenge(req.body);

    res.status(controller.getStatus() ?? 201).json(result);
  }
);

router.patch(
  "/:id",
  async (req: TRequest<Challenge, unknown, { id: string }>, res) => {
    const controller = new ChallengeController();

    const result = await controller.patchChallenge(req.params.id, req.body);

    res.status(controller.getStatus() ?? 200).json(result);
  }
);

router.delete(
  "/:id",
  async (req: TRequest<Challenge, unknown, { id: string }>, res) => {
    const controller = new ChallengeController();

    const result = await controller.deleteChallenge(req.params.id);

    res.status(controller.getStatus() ?? 200).json(result);
  }
);

export default router;
