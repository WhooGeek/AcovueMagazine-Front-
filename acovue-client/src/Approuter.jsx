import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NewsDetailPage from "./pages/News/NewsDetailPage"
import BehindDetailpage from "./pages/Behind/BehindDetailPage"
import CommunityDetailPage from "./pages/Community/CommunityDetailPage"

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about_me/" element={<About/>}/>
            <Route path="/news/:postId/" element={<NewsDetailPage />} />
            <Route path="/behind/:postId/" element={<BehindDetailpage/>} />
            <Route path="/community/:postId/" element={<CommunityDetailPage/>} />

        </Routes>
    )
}