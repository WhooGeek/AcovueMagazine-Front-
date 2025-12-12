import "./Footer.css";
import logoImage from "../../assets/logoImage.png";
import youtubeImage from "../../assets/youtube-icon.png";
import instagramImage from "../../assets/insta-icon.png";

export default function Footer(){
    return(
        <div className="footer-main-container">
            <div className="footer-container">
                <div className="footer-icon-box">
                    <a href="https://www.youtube.com/">
                        <img className="footer-logoImage-youtube" src={youtubeImage} alt="youtube Logo" ></img>
                    </a>
                    <a href="https://www.instagram.com/acovue?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                        <img className="footer-logoImage-insta" src={instagramImage} alt="instagram Logo" ></img>
                    </a>
                    
                </div>
                <div className="footer-content">
                    <a>국내 최대 J-POP 콘서트 원정 커뮤니티</a>
                </div>
                <div className="footer-title">
                    <a>렛츠젠츠</a>
                </div>
                <div className="footer-copyright">
                    <a>Copyright @렛츠젠츠 ALL RIGHTS RESERVED.</a>
                </div>
            </div>
        </div>
        
    );
}