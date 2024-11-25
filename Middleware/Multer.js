const multer = require('multer');
const path = require('path');


// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded PDFs
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'application/pdf',          // PDF files
        'image/jpeg',               // JPEG images
        'image/png',                // PNG images
        'image/gif'                 // GIF images (optional)
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF or image files (JPEG, PNG, GIF) are allowed'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;

