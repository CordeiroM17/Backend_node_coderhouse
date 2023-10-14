import multer from 'multer';
import { __dirname } from '../dirname.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/public/fileUpload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({ storage });
