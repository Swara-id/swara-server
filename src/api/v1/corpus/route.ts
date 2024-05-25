import { indexAllCorpus, postCorpus,indexOneCorpus } from './controller';
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllCorpus);

router.post("/", postCorpus)

router.get("/:id",indexOneCorpus)

export default router;
