const ERROR = {
  INVALID_TOKEN: "잘못된 유저 토큰입니다.",
  NOT_FOUND_USER: "해당 유저를 발견할 수 없습니다.",
  KAKAO_LOGIN_FAILED: "카카오 소셜 로그인에 실패했습니다.",
  GOOGLE_LOGIN_FAILED: "구글 소셜 로그인에 실패했습니다.",
  DIFFERENT_LAST_IP: "로그인 위치가 달라졌습니다. 다시 로그인 하세요.",
  UNKNOWN_ERROR: "서버 내부에 오류가 발생했습니다."
};

const REDIRECT_URI = {
  KAKAO: `${process.env.BASEURL}${process.env.API_PREFIX}/user/auth/kakao/oauth`,
  GOOGLE: `${process.env.BASEURL}${process.env.API_PREFIX}/user/auth/google/oauth`
};

module.exports = { ERROR, REDIRECT_URI };
