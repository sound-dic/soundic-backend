const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const HTTP_STATUS = require('../constants/http-status');
const { ERROR } = require('../constants/strings');
const userService = require('../services/user.service');

const parseBearer = (autho) => {
  const bearerStr = 'Bearer ';
  if (!autho || !autho.startsWith(bearerStr))
    return null;
  return autho.slice(bearerStr.length);
};

const tryAuthorizing = async (req, res, next) => {
  const token = parseBearer(req.headers.authorization);
  if (!token) {
    console.error(`Failed to parse Bearer token from ${req.headers.authorization} [${req.getIp()}]`);
    return next(createError(HTTP_STATUS.UNAUTHORIZED, ERROR.INVALID_TOKEN));
  }
  const payload = jwt.decode(token);
  try {
    const user = await userService.findById(payload.userId);
    if (!user || !user.jwt_key) {
      console.error(`No user or jwt_key. ${user} [${req.getIp()}]`);
      return next(createError(HTTP_STATUS.UNAUTHORIZED, ERROR.INVALID_TOKEN));
    }
    jwt.verify(token, user.jwt_key, (err, decoded) => {
      if (err) {
        console.error(`Failed to verify token using key. ${user.jwt_key} [${req.getIp()}]`);
        return next(createError(HTTP_STATUS.UNAUTHORIZED, ERROR.INVALID_TOKEN));
      }
      req.user = decoded;
      next();
    });
  }
  catch (err) {
    console.error(err);
    return next(createError(HTTP_STATUS.INTERNAL_ERROR, ERROR.UNKNOWN_ERROR));
  }
};

module.exports = tryAuthorizing;
