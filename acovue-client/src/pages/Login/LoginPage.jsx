import React from 'react';
import { postLogin } from "../../api/Login.api"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e. preventDefault();

        try{
            const response = await postLogin(email, password);
            
            if(response.data && response.data.accessToken) {

                const token = response.data.accessToken;
                localStorage.setItem("accessToken", token);
                window.location.href = "/";

            }
        } catch(error){
            alert("이메일 또는 비밀번호가 틀렸습니다.");
        }
    }

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 1. 로고 또는 타이틀 */}
        <h1 className="login-logo">렛츠젠츠</h1>

        {/* 2. 로그인 폼 */}
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="이메일 주소" 
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
          <button type="submit" className="login-submit-btn">로그인</button>
        </form>

        {/* 3. 추가 옵션 */}
        <div className="login-options">
          <span>비밀번호 찾기</span>
          <span className="divider">|</span>
          <span>회원가입</span>
        </div>

        {/* 4. 구분선 */}
        <div className="social-divider">
          <span>간편 로그인</span>
        </div>

        {/* 5. 소셜 로그인 버튼들 */}
        <div className="social-login-group">
          <button className="social-btn kakao">카카오로 시작하기</button>
          <button className="social-btn google">구글로 시작하기</button>
        </div>
      </div>
    </div>
  );
}