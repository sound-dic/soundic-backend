const schedule = require('node-schedule');
const userService = require('../services/user.service');
const kakaoService = require('../services/kakaoapi.service');
const googleService = require('../services/googleapi.service');

const doSchedule = async () => {
  if (!process.env.SCHEDULER_ON) return;
  const rule = new schedule.RecurrenceRule();
  rule.minute = new schedule.Range(0, 59, 2);
  schedule.scheduleJob(rule, () => {
    const now = new Date();
    updateUsers(now);
  });
  console.log('Enabled Scheduler Jobs');
};

const updateUsers = (now) => {
  refreshTokenIfNeeds(now);
  console.debug("Updated users at scheduler.");
};

const refreshTokenIfNeeds = (now) => {
  const compareTime = new Date(now.getTime() + 10 * 60000);
  userService.find({
    access_token: { $ne: null },
    refresh_token: { $ne: null },
    access_expired_at: { $lte: compareTime }
  })
  .then((users) => {
    users.forEach(user => {
      if (user.login_type == 'kakao') {
        refreshTokenKakao(user);
      }
      if (user.login_type == 'google') {
        refreshTokenGoogle(user);
      }
    });
  });
};

const refreshTokenKakao = (user) => {
  kakaoService.oauth_token(user.refresh_token)
  .then((tokens => {
    const accessToken = tokens.access_token;
    const expiryTime = tokens.expires_in * 1000;
    updateUserToken(user, accessToken, expiryTime, tokens.refresh_token, tokens.refresh_token_expires_in);
  }))
  .catch((err => { console.error(err); }));
};

const refreshTokenGoogle = (user) => {
  googleService.refreshToken(user._id, user.refresh_token)
  .then((tokens) => {
    const accessToken = tokens.access_token;
    const expiryTime = tokens.expiry_date;
    updateUserToken(user, accessToken, expiryTime, null, null);
  })
  .catch((err => { console.error(err); }));
};

const updateUserToken = (user, accessToken, expiryTime, refreshToken, refreshExpiryTime) => {
  printDebug(user, accessToken, expiryTime);
  const now = new Date();
  user.access_token = accessToken;
  user.access_expired_at = expiryTime + now.getTime();
  if (refreshToken) {
    user.refresh_token = refreshToken;
    user.refresh_expired_at = refreshExpiryTime + now.getTime();
  }
  user.save();
};

const printDebug = (user, token, newExpiry) => {
  console.debug(`updating [${user.login_type}] ${user._id}(${user.nickname}):
    accessToken: ${user.access_token} -> ${token}
    expiry: ${user.access_expired_at} -> ${new Date(Date.now() + newExpiry)}`);
};

module.exports = doSchedule;
