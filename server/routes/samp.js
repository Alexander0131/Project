import * as Sentry from "@sentry/node";
import imagemin from "imagemin";
import mozjpeg from "imagemin-mozjpeg";
import sharp from "sharp";
import isJpg from "is-jpg";
import * as aws from "aws-sdk";
import { generateFilename } from "./generateFilename";

const s3 = new aws.S3({
  signatureVersion: "v4",
  region: "us-east-1",
});

const convertToJpg = async (input) => {
  if (isJpg(input)) {
    return input;
  }

  return sharp(input).jpeg().toBuffer();
};

export const uploadBuffer = async (buffer) => {
  const miniBuffer = await imagemin.buffer(buffer, {
    plugins: [convertToJpg, mozjpeg({ quality: 85 })],
  });

  const Key = generateFilename();

  await s3
    .upload({
      Bucket: process.env.S3_BUCKET,
      Key,
      Body: miniBuffer,
    })
    .promise();

  return Key;
};

export const uploadImageStream = async (picture) => {
  const buffers = [];
  const readableStream = await picture;
  const buffer = await new Promise(async (res) =>
    readableStream
      .createReadStream()
      .on("data", (chunk) => {
        buffers.push(chunk);
      })
      .on("end", () => {
        res(Buffer.concat(buffers));
      })
      .on("error", (err) => {
        Sentry.captureException(err);
        res(null);
      })
  );

  if (!buffer) {
    return null;
  }

  return uploadBuffer(buffer);
};
