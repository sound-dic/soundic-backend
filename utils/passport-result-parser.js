const parse = (req, accessToken, refreshToken, profile) => {
  let record = {
    provider: profile.provider,
    id: profile.id,
    displayName: profile.displayName,
    accessToken,
    refreshToken,
    accessExpiredAt: new Date(),
    refreshExpiredAt: new Date(),
    address: req.getIp()
  };
  if (profile.provider == "kakao") {
    record.accessExpiredAt = Date.now() + 5 * 3600000;
    record.refreshExpiredAt = Date.now() + 45 * 86400000;
  }
  else if (profile.provider == "google") {
    record.accessExpiredAt = Date.now() + 1800000;
    record.refreshExpiredAt = Date.now() + 6 * 86400000;
  }
  return record;
};

module.exports = parse;
