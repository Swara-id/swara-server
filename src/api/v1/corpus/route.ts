import { indexAllCorpus } from './controller';
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", indexAllCorpus);

router.post("/",)

export default router;
