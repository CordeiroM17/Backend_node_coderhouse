import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, '/public/fileUpload');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now());
  },
});

export const upload = multer({ storage });
