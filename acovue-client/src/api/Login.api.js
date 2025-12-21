import client from "./client";

/**
 * 로그인 API 호출 함수
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 */
export const postLogin = (email, password) => {
  
  return client.post("/api/member/login", {
    MemberEmail: email,
    MemberPassword: password
  });
};