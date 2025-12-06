import "./Home.css";
import News from "../News/News.jsx";
import Behind from "../Behind/Behind.jsx";
import Community from "../Community/Community.jsx";


export default function Home() {
  return (
    
    <div className="Home-container">
      <div className="News-section">
        <div className="News-header">
          <h2 className="header-title">NEWS</h2>
        </div>
        <div className="News-content">
          <News />
          <Behind/>
          <Community/>
          
        </div>
      </div>
    </div>
  );
}
