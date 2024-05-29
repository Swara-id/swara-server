import { indexAllQuiz, postQuiz, indexOneQuiz } from './controller';
import{Router, Request, Response } from "express";

const router = Router();
router.get("/", indexAllQuiz)
router.post("/", postQuiz)
router.get("/:id",indexOneQuiz)
export default router;