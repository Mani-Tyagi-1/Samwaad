import "./App.css";
import {
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
import ProfilePage from "./pages/ProfilePage";
import ConsultantsPage from "./pages/ConsultantsPage";
import VolunteersPage from "./pages/VolunteersPage";
import ContactPage from "./pages/ContactPage";

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/consult" element={<VolunteersPage />} />
        <Route path="/experts" element={<ConsultantsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        

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
