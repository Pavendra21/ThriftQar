const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// Ensure the uploads directory exists

const uploadDir = path.join(__dirname, '../uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the dynamically resolved path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const upload = multer({ storage });

// Imported files

const { signup, login, addItem, Products, LogOut, ProductDetail, editProfile } = require('../Controllers/handle');
const { getUser,authMiddleware } = require('../Service/jwt');
// const authMiddleware = require ('../Middleware/authMiddleware');

// Defining router

router.post('/signup', signup);
router.post('/login', login);
router.get('/userprofile', getUser)
router.post('/additem',upload.single('image'), addItem);
router.get('/products', Products)
router.put('/editprofile', authMiddleware, editProfile);
router.post('/logout', LogOut);
router.get('/products/:id', ProductDetail)

module.exports = router;
 