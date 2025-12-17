const multer = require('multer');
const path = require('path');
const { Router } = require('express');
const ImageRoute = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `Uploads/`),
  filename: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
    ),
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const minetype = filetypes.test(file.minetype);
  if (extname && minetype) {
    return cb(null, true);
  } else {
    cb('Image only!', false);
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB MAX
  checkFileType,
});

ImageRoute.post('/', upload.single('image'), (req, res, next) => {
  const imagePath = `/Uploads/${req.file.filename}`;
  res.json({ message: 'Image Uploaded', image: imagePath });

  // console.log('image', `/${req.file.path}`);
  // res.json({ message: 'Image Uploaded', image: `/${req.file.path}` });
});

module.exports = ImageRoute;
