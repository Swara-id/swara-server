const util = require("util");
import gc from "../config/gcp";
const bucket = gc.bucket("swara-upload-test");

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

export const uploadImage = (file: File, name: string, folder: string = ''): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { buffer } = file;

    // Create a full path with the folder and file name
    const filePath = folder ? `${folder}/${name}` : name;

    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('finish', () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      resolve(publicUrl);
    });

    blobStream.on('error', (err) => {
      reject(`Unable to upload file, something went wrong: ${err.message}`);
    });

    blobStream.end(buffer);
  });
};