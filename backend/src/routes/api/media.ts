import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true }); // Added recursive for safety
    console.log(`Uploads directory created: ${UPLOADS_DIR}`);
  } catch (error) {
    console.error(`Error creating uploads directory ${UPLOADS_DIR}:`, error);
    // If this fails at startup, the server might not be able to handle uploads.
    // Consider a more graceful shutdown or error state if this is critical.
  }
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, MP4, MOV are allowed.')); // Reject file and pass an error
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

const router = express.Router();

// @route   POST api/media/upload
// @desc    Upload a media file
// @access  Public
router.post('/upload', (req: Request, res: Response) => {
  const uploader = upload.single('media');
  uploader(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, message: `File upload error: ${err.message}`, error: err.code });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error('Unknown upload error:', err);
      return res.status(500).json({ success: false, message: 'An unknown error occurred during file upload.', error: err.message });
    }

    // Everything went fine with the upload, now check if the file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded. Ensure the form field name is \'media\'.' });
    }

    // At this point, req.file is guaranteed to be Express.Multer.File
    const uploadedFile: Express.Multer.File = req.file;

    // File is uploaded successfully
    res.status(200).json({ success: true, message: 'File uploaded successfully.', filePath: `/uploads/${uploadedFile.filename}` });
  });
});

// @route   GET api/media
// @desc    Get all media files
// @access  Public
router.get('/', (req: Request, res: Response) => {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Unable to scan files.', error: err.message });
    }
    res.send(files);
  });
});

export default router;
