import { Link } from "react-router-dom";  // 반드시 import
import logoImage from "../../assets/logoImage.png";
import "./Header.css";
import menu from "../../assets/menu.png";
import user from "../../assets/user.png";

export default function Header() {
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
          <div className="header-right">
            <button className="member-button">
              <img src={user} className="user-icon"/>
            </button>
          </div>

        </div>
      </div>

      {/* 2. 하단 메뉴바 */}
      <nav className="menu-bar">
        <div className="menu-bar-container">
          <Link to="/about_me" className="about">ABOUT</Link>
          <Link to="/news" className="news">NEWS</Link>
          <Link to="/behind" className="behind">BEHIND</Link>
          <Link to="/review" className="review">REVIEW</Link>
          <Link to="/community" className="community">COMMUNITY</Link>
        </div>
      </nav>

    </header>
  );
}
