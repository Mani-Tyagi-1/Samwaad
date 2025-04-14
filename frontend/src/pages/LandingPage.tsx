import HeroSection from "../components/HeroSection";
import About from "../components/About";

const LandingPage = () => {
  return (
    <div>
      {/* Hero + Navbar together */}
      <HeroSection />
      <About />
    </div>
  );
};

export default LandingPage;
