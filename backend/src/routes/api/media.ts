import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
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

const upload = multer({ storage });

const router = express.Router();

// @route   POST api/media/upload
// @desc    Upload a media file
// @access  Public
router.post('/upload', upload.single('media'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

// @route   GET api/media
// @desc    Get all media files
// @access  Public
router.get('/', (req: Request, res: Response) => {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Unable to scan files.');
    }
    res.send(files);
  });
});

export default router;
