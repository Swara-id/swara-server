import {
  indexAllNewsType,
  postNewsType,
  indexOneNewsType,
  deleteNewsType,
  putNewsType,
} from "./controller";
import { Router } from "express";

const router = Router();

router.get("/", indexAllNewsType);

router.get("/:id", indexOneNewsType);

router.post("/", postNewsType);

router.delete("/:id", deleteNewsType);

router.put("/:id", putNewsType);

export default router;
