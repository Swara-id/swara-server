const util = require("util");
import gcp from "../config/gcp";

const { Storage } = require('@google-cloud/storage');
import storage from "../config/gcp";

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



export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
   bucket.file(filePath.split(`${bucket}/`)[1]).delete((err) => {
      if (err) {
        reject(`Unable to delete file, something went wrong: ${err.message}`);
      } else {
        resolve();
      }
    });
  });
};                  