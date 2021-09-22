const createError = require('http-errors');
const passport = require('passport')
const kakaoStrategy = require('passport-kakao').Strategy;
const googleStrategy = require('passport-google-oauth2').Strategy;
const HTTP_STATUS = require('../constants/http-status');
const { ERROR } = require('../constants/strings');
const parsePassport = require("../utils/passport-result-parser");
const userController = require('../controllers/user.controller');

passport.use(new kakaoStrategy({
    clientID: process.env.KAKAO_REST_API_KEY,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: `${process.env.BASEURL}/user/auth/kakao/oauth`,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    const record = parsePassport(request, accessToken, refreshToken, profile);
    userController.signInUser(record)
      .then((user) => done(null, user))
      .catch((err) => {
        console.error(err);
        done(createError(HTTP_STATUS.UNAUTHORIZED, ERROR.KAKAO_LOGIN_FAILED));
      });
  }
));
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASEURL}/user/auth/google/oauth`,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    const record = parsePassport(request, accessToken, refreshToken, profile);
    userController.signInUser(record)
      .then((user) => done(null, user))
      .catch((err) => {
        console.error(err);
        done(createError(HTTP_STATUS.UNAUTHORIZED, ERROR.GOOGLE_LOGIN_FAILED));
      });
  }
));

const authKakao = passport.authenticate('kakao', { session: false });
const authGoogle = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  session: false
});

module.exports = {
  authKakao,
  authGoogle
};
