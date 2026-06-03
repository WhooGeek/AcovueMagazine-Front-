import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import logoImage from "../../assets/logoImage.png";
import "./Header.css";
import { Menu, UserRound } from "lucide-react"
import { putLogout } from "../../api/Login.api";
import { useAuth } from "../../context/AuthContext";
import AppModal from "../Common/AppModal";

export default function Header() {

  const navigate = useNavigate();
  const { isLoggedIn, member, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 메뉴 표시 상태 관리
  const [showModal, setShowModal] = useState(false); 

  const getInitial = (name) => {
    if (!name) return "U";
    
    return name.trim().charAt(0).toUpperCase();
  };

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
      logout();
      setShowModal(false);

      window.location.href = "/";
    }
  }

  const getMenuLinkClass = ({ isActive }) =>
    `menu-link ${isActive ? "is-active" : ""}`;

  return (
    <header className="Header" >

      {/* 1. 상단 영역 */}
      <div className="header-main-section">
        <div className="header-container">

          {/* 왼쪽: 메뉴 버튼, 지금은 메뉴가 없어서 지워버림 */}
          <div className="header-left">
            <button className="menu-button" aria-label="메뉴 열기">
              <Menu className="header-icon-menu" />
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
              {isLoggedIn ? (
                <div className="user-avatar">
                  {getInitial(member?.memberNickname)} 
                </div>
              ) : (
                <UserRound className="header-icon-user" />
              )}
            </button>
            {isLoggedIn && showDropdown &&(
              <div className="dropdown-menu">
                
                <Link
                  to="/mypage"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false) }
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
          <NavLink to="/about_me" className={getMenuLinkClass}>렛츠젠츠</NavLink>
          <NavLink to="/guide?page=1&limit=5&type=GUIDE" className={getMenuLinkClass}>원정 가이드</NavLink>
          <NavLink to="/concert-news" className={getMenuLinkClass}>공연 소식</NavLink>
          <NavLink to="/community?page=1&limit=10&type=COMMUNITY" className={getMenuLinkClass}>커뮤니티</NavLink>
        </div>
      </nav>

      {/* 로그아웃 확인 모달 */}
      <AppModal
        open={showModal}
        title="로그아웃"
        message="로그아웃 하시겠습니까?"
        confirmText="로그아웃"
        cancelText="취소"
        showCancel={true}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowModal(false)}
      />

    </header>
  );
}
