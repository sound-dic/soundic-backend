const express = require('express');
const router = express.Router();
const authKakaoRouter = require('./kakao.route');
const authGoogleRouter = require('./google.route');

router.use('/kakao', authKakaoRouter);
router.use('/google', authGoogleRouter);

module.exports = router;
