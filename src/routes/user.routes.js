const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload')

router.get('/',authMiddleware, userController.getAllUsers);
router.put('/updatePhoto',authMiddleware,upload.single('profilePhoto'),userController.updatePhoto)
router.get('/:id',authMiddleware, userController.getUserById);
router.put('/updateUser',authMiddleware, userController.updateUser);
router.delete('/:id',authMiddleware, userController.deleteUser);

module.exports = router;