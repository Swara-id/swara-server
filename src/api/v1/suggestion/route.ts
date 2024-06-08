import { multerMid } from "./../../../middleware/multer";
import {
  indexAllSuggestion,
  postSuggestion,
  indexOneSuggestion,
  deleteSuggestion,
  putSuggestion,
  patchSuggestion,
} from "./controller";
import { Router } from "express";

const router = Router();

router.get("/", indexAllSuggestion);

router.get("/:id", indexOneSuggestion);

router.post("/", multerMid.single("file"), postSuggestion);

router.delete("/:id", deleteSuggestion);

router.put("/:id", putSuggestion);

router.patch("/:id/verificate", patchSuggestion);

export default router;
