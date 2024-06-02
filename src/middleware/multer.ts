import multer from "multer";

export const multerMid = multer({
	storage: multer.memoryStorage(),
});

export default multerMid