import { Storage } from "@google-cloud/storage";
import path from "path";

const serviceKey = path.join(__dirname, "./keys.json");

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "swara-dev-425202",
});

export default storage;
