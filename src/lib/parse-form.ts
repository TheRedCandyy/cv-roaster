import { NextRequest } from "next/server";
import formidable from "formidable";
import { promises as fs } from "fs";
import * as path from "path";
import * as os from "os";
import { Writable } from "stream";

export const parseForm = async (
  req: NextRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const tempDir = path.join(os.tmpdir(), "cv-uploads");

    try {
      // Ensure the temporary directory exists
      await fs.mkdir(tempDir, { recursive: true });

      const form = formidable({
        maxFiles: 1,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        uploadDir: tempDir,
        keepExtensions: true,
        allowEmptyFiles: false,
        filter: (part) => {
          return !!(
            part.mimetype?.includes("application/pdf") ||
            part.mimetype?.includes("application/msword") ||
            part.mimetype?.includes(
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) ||
            part.mimetype?.includes("text/plain")
          );
        },
      });

      // Clone the request to create a new readable stream
      const clone = req.clone();
      const formData = await clone.formData();

      // Create a temporary file to save the uploaded file
      const file = formData.get("cv") as File;
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const tempFilePath = path.join(
        tempDir,
        `upload-${Date.now()}-${file.name}`
      );
      await fs.writeFile(tempFilePath, buffer);

      // Create a response object with the expected structure
      const fileObject = {
        filepath: tempFilePath,
        originalFilename: file.name,
        mimetype: file.type,
        size: file.size,
      };

      // Get language value from form data
      const language = formData.get("language");

      resolve({
        fields: { language: language ? [language.toString()] : [] },
        files: { cv: [fileObject] as any },
      });
    } catch (error) {
      reject(error);
    }
  });
};
