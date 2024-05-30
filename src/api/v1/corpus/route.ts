import { indexAllCorpus, postCorpus,indexOneCorpus, deleteCorpus,putCorpus } from './controller';
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllCorpus);

router.get("/:id",indexOneCorpus)

router.post("/", postCorpus)

router.delete("/:id",deleteCorpus)

router.put("/:id",putCorpus)

export default router;
