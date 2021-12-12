const mongoose = require('mongoose');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const HTTP_STATUS = require('../constants/http-status');
const { ERROR } = require('../constants/strings');

const signInUser = async (record) => {
  const user = await userService.signIn(record);
  const token = jwt.sign({
      loginType: user.login_type,
      id: user.uid,
      userId: user._id
    },
    user.jwt_key, {
      // expiresIn: '1h'
    }
  );
  const body = {
    token: token,
    profile: userService.parseUserProfile(user)
  }
  return body;
};

const getUserProfile = async (req, res, next) => {
  try {
    const info = await userService.findById(req.params.userId);
    if (!info) {
      return next(createError(HTTP_STATUS.NOT_FOUND, ERROR.NOT_FOUND_USER));
    }
    res.api(userService.parseUserProfile(info));
  }
  catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(createError(HTTP_STATUS.NOT_FOUND, ERROR.NOT_FOUND_USER));
    }
    console.error(err);
    next(createError(HTTP_STATUS.INTERNAL_ERROR, ERROR.UNKNOWN_ERROR));
  }
};

const logIn = async (req, res, next) => {
  res.api(req.user);
};

const logOut = async (req, res, next) => {
  try {
    await userService.findByIdAndUpdate(req.user.userId, {
      jwt_key: ''
    });
    req.logout();
    res.api({});
  }
  catch (err) {
    console.error(err);
    next(createError(HTTP_STATUS.INTERNAL_ERROR, ERROR.UNKNOWN_ERROR));
  }
};

const refresh = async (req, res, next) => {
  res.api({});
};

module.exports = {
  signInUser,
  getUserProfile,
  logIn,
  logOut,
  refresh
};
