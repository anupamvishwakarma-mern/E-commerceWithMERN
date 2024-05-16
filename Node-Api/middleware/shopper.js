const multer = require('multer')


const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, '../front-end/public/assets/product')
  },
  filename: (req, file, cb) => {
    let ext = file.originalname;
    cb(null, Date.now() + ext)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/webp'
    ) {
      cb(null, true)
    } else {
      console.log('Only JPG, JPEG, WEBP, and PNG file supported!')
      cb(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})

module.exports = { upload };