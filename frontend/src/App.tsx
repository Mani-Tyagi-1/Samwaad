import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./components/ThemeComponents/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/Login";
import SignupPage from "./pages/SignUp";

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* Add other routes as needed */}
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
        <LayoutWrapper />
    </ThemeProvider>
  );
}

export default App;
