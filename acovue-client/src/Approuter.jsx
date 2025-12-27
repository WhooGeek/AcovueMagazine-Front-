import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NewsListPage from "./pages/News/NewsListPage";
import BehindListPage from "./pages/Behind/BehindListPage"
import CommunityListPage from "./pages/Community/CommunityListPage";
import NewsDetailPage from "./pages/News/NewsDetailPage";
import BehindDetailpage from "./pages/Behind/BehindDetailPage";
import CommunityDetailPage from "./pages/Community/CommunityDetailPage";
import LoginPage from "./pages/Login/LoginPage";
import NewsCreatePage from "./pages/News/NewsCreatePage";
import BehindCreatePage from "./pages/Behind/BehindCreatePage";
import CommunityCreatePage from "./pages/Community/CommunityCreatePage";
import CommonUpdatePage from "./pages/Common/CommonUpdatePage";
import AboutMeUpdatePage from "./pages/About/AboutMeUpdatePage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about_me/" element={<About/>}/>
            <Route path="/news/" element={<NewsListPage/>} />
            <Route path="/behind/" element={<BehindListPage/>} />
            <Route path="/community/" element={<CommunityListPage/>}/>
            <Route path="/news/:postId/" element={<NewsDetailPage />} />
            <Route path="/behind/:postId/" element={<BehindDetailpage/>} />
            <Route path="/community/:postId/" element={<CommunityDetailPage/>} />
            <Route path="/news/create" element={<NewsCreatePage/>}/>
            <Route path="/behind/create" element={<BehindCreatePage/>}/>
            <Route path="/community/create" element={<CommunityCreatePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/news/:postId/update" element={<CommonUpdatePage category="NEWS" boardTitle="뉴스 수정" prevPath="/news?page=1&limit=5&type=NEWS"/>}/>
            <Route path="/behind/:postId/update" element={<CommonUpdatePage category="BEHIND" boardTitle="비하인드 수정" prevPath="/behind?page=1&limit=5&type=BEHIND"/>}/>
            <Route path="/community/:postId/update" element={<CommonUpdatePage category="COMMUNITY" boardTitle="커뮤니티 수정" prevPath="/community?page=1&limit=5&type=COMMUNITY"/>}/>
            <Route path="/about_me/update" element={<AboutMeUpdatePage prevPath="/about_me"/>}/>
            
        </Routes>
    )
}