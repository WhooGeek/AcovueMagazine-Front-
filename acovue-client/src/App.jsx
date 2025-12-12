import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx"
import router from "./router";

function App() {
  return (
    <BrowserRouter>  {/* <-- 반드시 이 안에 Header와 Routes를 넣어야 함 */}
      <Header />

      <main className="body">
        <div className="body-container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
