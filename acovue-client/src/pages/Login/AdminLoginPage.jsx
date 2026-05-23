import React, { useState } from "react";
import { postLogin } from "../../api/Login.api";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await postLogin(email, password);

      if (response.data && response.data.accessToken) {
        const accesstoken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem("accessToken", accesstoken);
        localStorage.setItem("refreshToken", refreshToken);
        window.location.href = "/";
      }
    } catch (error) {
      alert("관리자 계정 정보를 확인해주세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-logo">관리자 로그인</h1>
        <p className="login-subtitle">관리자 계정으로 로그인하세요.</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="관리자 이메일"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-submit-btn">
            관리자 로그인
          </button>
        </form>

        <div className="admin-login-guide">
          일반 사용자라면{" "}
          <Link to="/login" className="admin-login-link">
            소셜 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
