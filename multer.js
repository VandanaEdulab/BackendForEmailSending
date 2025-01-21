const multer = require('multer');
const path = require('path');
const fs = require('fs');
const currentPath = process.cwd();

//Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(currentPath, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },

});

const upload = multer({ storage: storage });

module.exports = upload;