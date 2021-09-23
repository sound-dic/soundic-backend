const axios = require('axios');
const KAKAO_BASEURL = 'https://kapi.kakao.com/v2';
const KAUTH_BASEURL = 'https://kauth.kakao.com';

const requestKakaoApi = async (accessToken, endPoint, params = {}) => {
  let axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ContentType: 'application/x-www-form-urlencoded;charset=utf-8'
    },
    params: params
  };
  const {data} = await axios.post(
    KAKAO_BASEURL + endPoint,
    null,
    axiosConfig
  );
  return data;
};

const user_me = (accessToken) => {
  return requestKakaoApi(accessToken, '/user/me');
};

const oauth_token = async (refreshToken) => {
  let axiosConfig = {
    headers: {
      ContentType: 'application/x-www-form-urlencoded;charset=utf-8'
    },
    params: {
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_REST_API_KEY,
      refresh_token: refreshToken,
      client_secret: process.env.KAKAO_CLIENT_SECRET
    }
  };
  const {data} = await axios.post(
    `${KAUTH_BASEURL}/oauth/token`,
    null,
    axiosConfig
  );
  return data;
};

module.exports = {
  user_me,
  oauth_token
};
