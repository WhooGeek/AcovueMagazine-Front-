import React, { use } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logoImage from "../../assets/logoImage.png";
import "./Header.css";
import menu from "../../assets/menu.png";
import user from "../../assets/user.png";
import { putLogout } from "../../api/Login.api";

export default function Header() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 메뉴 표시 상태 관리
  const [showModal, setShowModal] = useState(false); // 로그아웃 모달 표시 상태 관리

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if(token){
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
  }, []);

  const handleUserIconClick = () => {
    if(isLoggedIn){
      setShowDropdown(!showDropdown); // 드롭다운 메뉴 토글
    } else{
      navigate("/login");
    }
  };

  //유저 아이콘 핸들러
  const handleLogoutClick = () => {
    setShowDropdown(false); // 드롭다운 닫기
    setShowModal(true); // 모달 열기
  };

  // 로그아웃 로직
  const handleConfirmLogout = async () =>{
    try{
      await putLogout();

    } catch (error){
      console.error("Logout failed:", error);
    }finally{
      localStorage.removeItem("accessToken");

      setIsLoggedIn(false);
      setShowModal(false);

      window.location.href = "/";
    }
  }

  return (
    <header className="Header" >

      {/* 1. 상단 영역 */}
      <div className="header-main-section">
        <div className="header-container">

          {/* 왼쪽: 메뉴 버튼 */}
          <div className="header-left">
            <button className="menu-button">
              <img src={menu} className="menu-icon"/>
            </button>
          </div>

          {/* 중앙: 로고 */}
          <div className="header-center">
            <Link to="/">
              <img className="logoImage" src={logoImage} alt="Acovue Logo" />
            </Link>
          </div>

          {/* 오른쪽: 회원 버튼 */}
          <div className="header-right" style={{ position: "relative" }}>   
            <button className="member-button" onClick={handleUserIconClick}>
              <img src={user} className="user-icon" alt="user" />
            </button>
            {isLoggedIn && showDropdown &&(
              <div className="dropdown-menu">
                
                <Link
                  to="/mypage"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                마이페이지
                </Link>
                <button className="dropdown-item" onClick={handleLogoutClick}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. 하단 메뉴바 */}
      <nav className="menu-bar">
        <div className="menu-bar-container">
          <Link to="/about_me" className="about">ABOUT</Link>
          <Link to="/news?page=1&limit=5&type=NEWS" className="news">NEWS</Link>
          <Link to="/behind?page=1&limit=5&type=BEHIND" className="behind">BEHIND</Link>
          <Link to="/review" className="review">REVIEW</Link>
          <Link to="/community?page=1&limit=10&type=COMMUNITY" className="community">COMMUNITY</Link>
        </div>
      </nav>

      {/* 로그아웃 확인 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={logoImage} alt="Acovue Logo" className="modal-logo" />
            <p className="modal-message">로그아웃 하시겠습니까?</p>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={handleConfirmLogout}>
                확인
              </button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
