const randomstring = require("randomstring");
const { User } = require("../models/User");

const signIn = async (record) => {
  const query = {
    login_type: record.provider,
    uid: record.id
  };
  const data = {
    jwt_key: randomstring.generate(),
    nickname: record.displayName,
    access_token: record.accessToken,
    access_expired_at: record.accessExpiredAt,
    refresh_token: record.refreshToken,
    refresh_expired_at: record.refreshExpiredAt,
    last_address: record.address
  };
  return await User.findOneAndUpdate(query, data, {
    new: true,
    upsert: true
  });
};

const findById = async (userId) => {
  return await User.findById(userId);
};

const findByIdAndUpdate = async (userId, obj) => {
  return await User.findByIdAndUpdate(userId, obj);
};

const parseUserProfile = (user) => {
  return {
    userId: user._id,
    nickName: user.nickname,
    rank: user.rank
  };
};

const find = async (query) => {
  return await User.find(query);
};

module.exports = {
  signIn,
  findById,
  findByIdAndUpdate,
  parseUserProfile,
  find
};
