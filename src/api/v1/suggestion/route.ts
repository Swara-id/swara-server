import { multerMid } from "@/middleware/multer";
import SuggestionController from "./controller";
import { Router } from "express";
import { TRequest } from "@/types";
import { Suggestion } from "@models/Suggestion";

const router = Router();

router.get("/", async (req, res) => {
  const controller = new SuggestionController();

  const result = await controller.indexAllSuggestion();

  res.status(controller.getStatus() ?? 200).json(result);
});

router.get("/:id", async (req: TRequest, res) => {
  const controller = new SuggestionController();

  const result = await controller.indexOneSuggestion(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.post(
  "/",
  multerMid.single("file"),
  async (req: TRequest<Suggestion>, res) => {
    const controller = new SuggestionController();

    const result = await controller.postSuggestion(req.body, req.file);

    res.status(controller.getStatus() ?? 201).json(result);
  }
);

router.patch("/:id", async (req: TRequest<Suggestion>, res) => {
  const controller = new SuggestionController();

  const result = await controller.patchSuggestion(req.params.id, req.body);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.patch(
  "/:id/verify",
  async (
    req: TRequest<
      {
        point: number;
      },
      unknown,
      { id: string }
    >,
    res
  ) => {
    const controller = new SuggestionController();

    const result = await controller.verifySuggestion(req.params.id, req.body);

    res.status(controller.getStatus() ?? 200).json(result);
  }
);

router.delete("/:id", async (req: TRequest, res) => {
  const controller = new SuggestionController();

  const result = await controller.deleteSuggestion(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

export default router;
