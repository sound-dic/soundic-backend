const express = require('express');
const router = express.Router();
const user = require('./user/index.route');

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('<a href=/user/auth/kakao>카카오로그인</a><br/><a href=/user/auth/google>구글로그인</a>');
});

router.use('/user', user);

module.exports = router;
