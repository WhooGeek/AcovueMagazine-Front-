import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AppRouter from "./Approuter.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./components/Common/ToastProvider.jsx";


function App() {
  return (
    <BrowserRouter>  
      <AuthProvider>
        <ToastProvider>
          <Header />

          <main className="body">
            <div className="body-container">
              <AppRouter />
            </div>
          </main>

          <Footer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
