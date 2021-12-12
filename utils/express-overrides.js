const HTTP_STATUS = require('../constants/http-status');

const override = (req, res, next) => {
  res.api = (data, statusCode = HTTP_STATUS.OK, message = null) => {
    const result = {
      status: statusCode == HTTP_STATUS.OK ? 'OK' : 'Error',
      statusCode,
      message: message,
      data: data
    };
    return res.status(statusCode).json(result);
  };
  req.getIp = () => req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  next();
};

module.exports = () => override;
