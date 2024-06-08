import util from "util";
import storage from "../config/gcp";

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(process.env.BUCKET_NAME || "");

const { format } = util;

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

interface File {
  buffer: Buffer;
}

export const uploadImage = (
  file: File,
  name: string,
  folder: string = "",
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { buffer } = file;

    const filePath = folder ? `${folder}/${name}` : name;

    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("finish", () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      );
      resolve(publicUrl);
    });

    blobStream.on("error", (err) => {
      reject(`Unable to upload file, something went wrong: ${err.message}`);
    });

    blobStream.end(buffer);
  });
};

export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log("Filepath : " + filePath);
    const fileName = filePath.split(`${bucketName}/`)[1];
    console.log(fileName);
    bucket.file(fileName).delete((err) => {
      if (err) {
        reject(`Unable to delete file, something went wrong: ${err.message}`);
      } else {
        resolve();
      }
    });
  });
};
