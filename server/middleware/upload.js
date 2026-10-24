const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_PATH = path.join(__dirname, '..', process.env.UPLOAD_PATH || 'uploads');

// Ensure directories exist
['images', 'projects', 'gallery', 'services', 'testimonials', 'temp'].forEach(dir => {
  fs.mkdirSync(path.join(UPLOAD_PATH, dir), { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.uploadFolder || 'images';
    cb(null, path.join(UPLOAD_PATH, folder));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only image files (jpg, png, webp, gif) are allowed'));
};

const MAX_SIZE = (parseInt(process.env.MAX_FILE_SIZE_MB) || 10) * 1024 * 1024;

const upload = multer({ storage, fileFilter, limits: { fileSize: MAX_SIZE } });

// Folder setter middleware
const setUploadFolder = (folder) => (req, res, next) => {
  req.uploadFolder = folder;
  next();
};

module.exports = { upload, setUploadFolder, UPLOAD_PATH };
