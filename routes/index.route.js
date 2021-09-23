const express = require('express');
const router = express.Router();
const user = require('./user/index.route');

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send(`<a href=${process.env.API_PREFIX}/user/auth/kakao>카카오로그인</a><br/><a href=${process.env.API_PREFIX}/user/auth/google>구글로그인</a>`);
});

router.use(`${process.env.API_PREFIX}/user`, user);

module.exports = router;
