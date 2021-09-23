const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { REDIRECT_URI } = require('../constants/strings');
const userService = require('./user.service');

const newOAuth2Client = () => {
  return new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI.GOOGLE
  );
};

const refreshToken = async (userId, refreshToken) => {
  const oauth2Client = newOAuth2Client();
  const res = await oauth2Client.refreshToken(refreshToken);
  return res.tokens;
};

module.exports = {
  refreshToken
};
