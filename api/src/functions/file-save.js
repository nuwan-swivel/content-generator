const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const fileExtension = originalName.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' + fileExtension); // Rename the file
  },
});

const upload = multer({ storage });

module.exports  = {
    upload
}