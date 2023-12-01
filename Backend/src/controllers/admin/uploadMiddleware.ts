
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("test");
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname;
    // req.body.fileNames.push(fileName);
    cb(null,fileName ); // Set the filename
  },
 
});

export const uploadMiddleware = multer({ storage: storage });


