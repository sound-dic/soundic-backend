const express = require('express');
const router = express.Router();
const accessMiddleware = require('../../middlewares/access.middleware');
const userController = require('../../controllers/user.controller');
const auth = require('./auth/index.route');

router.use('/auth', auth);
router.post('/logout', accessMiddleware, userController.logOut);
router.get('/:userId', accessMiddleware, userController.getUserProfile);

module.exports = router;
