import multerMid from "../../../middleware/multer";
import { TRequest } from "../../../types";
import QuizController from "./controller";
import { Router } from "express";
import { QuizBody } from "./types";

const router = Router();
const controller = new QuizController();

router.get("/", async (req: TRequest, res) => {
  const result = await controller.indexAllQuiz();
  res.status(controller.getStatus() ?? 200).json(result);
});

router.get("/:id", async (req: TRequest<{ id: string }>, res) => {
  const result = await controller.indexOneQuiz(req.params.id);
  res.status(controller.getStatus() ?? 200).json(result);
});

router.post(
  "/",
  multerMid.array("file"),
  async (req: TRequest<QuizBody>, res) => {
    const result = await controller.postQuiz(
      req.body.question,
      req.body.choices,
      req.files as Express.Multer.File[]
    );
    res.status(controller.getStatus() ?? 201).json(result);
  }
);

router.delete(
  "/:id",
  async (req: TRequest<unknown, unknown, { id: string }>, res) => {
    const controller = new QuizController();

    const result = await controller.deleteQuiz(req.params.id);

    res.status(controller.getStatus() ?? 204).json(result);
  }
);

export default router;
