const express = require('express');
const router = express.Router();
const passportService = require('../services/passport.service');
const userController = require('../controllers/user.controller');

router.get('/', passportService.authKakao);
router.get('/oauth', passportService.authKakao, userController.logIn);

module.exports = router;
