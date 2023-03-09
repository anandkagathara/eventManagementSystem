const express = require('express');
const router = express.Router();

// Import controller functions
const { signup, login } = require('../controllers/auth.controller');

// Define middleware functions to handle requests to /api/auth/signup and /api/auth/login
router.post('/signup', signup);
router.post('/login', login);

// Export middleware functions
module.exports = router;
