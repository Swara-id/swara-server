import NewsTypeController from "./controller";
import { Router } from "express";
import { TRequest } from "../../../types";
import { NewsTypeBody } from "./types";

const router = Router();

router.get("/", async (req, res) => {
  const controller = new NewsTypeController();

  const result = await controller.indexAllNewsTypes();

  res.status(controller.getStatus() ?? 200).json(result);
});

router.get("/:id", async (req: TRequest, res) => {
  const controller = new NewsTypeController();

  const result = await controller.indexOneNewsType(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.post("/", async (req: TRequest<NewsTypeBody>, res) => {
  const controller = new NewsTypeController();

  const result = await controller.postNewsType(req.body);

  res.status(controller.getStatus() ?? 201).json(result);
});

router.patch("/:id", async (req: TRequest<Partial<NewsTypeBody>>, res) => {
  const controller = new NewsTypeController();

  const result = await controller.patchNewsType(req.params.id, req.body);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.delete("/:id", async (req: TRequest, res) => {
  const controller = new NewsTypeController();

  const result = await controller.deleteNewsType(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

export default router;
