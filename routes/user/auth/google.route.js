const express = require('express');
const router = express.Router();
const passportService = require('../../../services/passport.service');
const userController = require('../../../controllers/user.controller');

router.get('/', passportService.authGoogle);
router.get('/oauth', passportService.authGoogle, userController.logIn);

module.exports = router;
