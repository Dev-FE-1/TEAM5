import multer from "multer";
import path from "path";

const uploadDir = path.join(process.cwd(), "assets/profile");

// file filter
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowedExtensions.includes(ext));
};

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    let { userId } = req.params;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${userId}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
