import multer from "multer";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()} - ${file.filename}${
      file.mimetype
    }`;
    cb(null, filename);
  },
});
