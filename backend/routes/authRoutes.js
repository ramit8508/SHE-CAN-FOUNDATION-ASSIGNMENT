const express = require('express');
const router = express.Router();
const { loginAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateAdminLogin } = require('../middleware/validateMiddleware');

router.post('/login', validateAdminLogin, loginAdmin);
router.get('/me', protect, getMe);

module.exports = router;
