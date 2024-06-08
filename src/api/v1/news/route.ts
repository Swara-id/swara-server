import { multerMid } from "@/middleware/multer";
import NewsController from "./controller";
import { Router } from "express";
import { TRequest } from "@/types";
import { News } from "@models/News";

const router = Router();

router.get("/", async (req, res) => {
  const controller = new NewsController();

  const result = await controller.indexAllNews();

  res.status(controller.getStatus() ?? 200).json(result);
});

router.get("/:id", async (req: TRequest, res) => {
  const controller = new NewsController();

  const result = await controller.indexOneNews(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.post("/", multerMid.single("file"), async (req: TRequest<News>, res) => {
  const controller = new NewsController();

  const result = await controller.postNews(req.body, req.file);

  res.status(controller.getStatus() ?? 201).json(result);
});

router.patch("/:id", async (req: TRequest<News>, res) => {
  const controller = new NewsController();

  const result = await controller.patchNews(req.params.id, req.body);

  res.status(controller.getStatus() ?? 200).json(result);
});

router.delete("/:id", async (req: TRequest, res) => {
  const controller = new NewsController();

  const result = await controller.deleteNews(req.params.id);

  res.status(controller.getStatus() ?? 200).json(result);
});

export default router;
