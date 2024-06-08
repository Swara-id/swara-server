import multerMid from "@/middleware/multer";
import { TRequest } from "@/types";
import CorpusController from "./controller";
import { Router } from "express";
import { CorpusBody } from "./types";
import { Corpus } from "@/models/Corpus";

const router = Router();
const controller = new CorpusController();

router.get("/", async (req: TRequest, res) => {
  const result = await controller.indexAllCorpus();
  res.status(controller.getStatus() ?? 200).json(result);
});

router.get("/:id", async (req: TRequest<{ id: string }>, res) => {
  const result = await controller.indexOneCorpus(req.params.id);
  res.status(controller.getStatus() ?? 200).json(result);
});

router.post(
  "/",
  multerMid.array("file"),
  async (req: TRequest<CorpusBody>, res) => {
    const result = await controller.postCorpus(
      req.body,
      req.files as Express.Multer.File[]
    );
    res.status(controller.getStatus() ?? 201).json(result);
  }
);

router.delete(
  "/:id",
  async (req: TRequest<Corpus, unknown, { id: string }>, res) => {
    const controller = new CorpusController();

    const result = await controller.deleteCorpus(req.params.id);

    res.status(controller.getStatus() ?? 204).json(result);
  }
);

export default router;
