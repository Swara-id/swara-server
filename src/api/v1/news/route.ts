import { multerMid } from "../../../middleware/multer";
import NewsController from "./controller";
import { Router } from "express";
import { TRequest } from "../../../types";
import { NewsBody, NewsQuery } from "./types";

const router = Router();

router.get("/", async (req: TRequest<unknown, NewsQuery>, res, next) => {
  try {
    const controller = new NewsController();
    const result = await controller.indexAllNews(req.query);

    res.status(controller.getStatus() ?? 200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: TRequest, res, next) => {
  try {
    const controller = new NewsController();
    const result = await controller.indexOneNews(req.params.id);

    res.status(controller.getStatus() ?? 200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  multerMid.single("file"),
  async (req: TRequest<NewsBody>, res) => {
    const controller = new NewsController();

    const result = await controller.postNews(
      req.body.title,
      req.body.description,
      req.body.newsTypeId,
      req.body.dateOfEvent,
      req.file
    );

    res.status(controller.getStatus() ?? 201).json(result);
  }
);

router.patch("/:id", async (req: TRequest<Partial<NewsBody>>, res) => {
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
