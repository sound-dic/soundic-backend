const axios = require('axios');
const KAKAO_BASEURL = 'https://kapi.kakao.com/v2';

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
}

const user_me = (accessToken) => {
  return requestKakaoApi(accessToken, '/user/me');
};

module.exports = {
  user_me
};
