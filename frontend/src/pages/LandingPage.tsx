import HeroSection from "../components/HeroSection";
import About from "../components/About";
import CallToAction from "../components/CallToAction";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
import KeyFeatures from "../components/KeyFeatures";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <KeyFeatures />
      <CallToAction />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
